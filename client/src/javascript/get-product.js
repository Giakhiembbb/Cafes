import { db } from "./firebase-config.js";
import { checkSession } from "./check-session.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  getDoc, doc
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const getProductList = async (limitCount) => {
  let htmls = "";
  try {
    const q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productId = doc.id;
      const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(product.price);

      htmls += ` <div class="product-item col-md-3 col-6">
  <div class="content p-2">
    <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid rounded">
    <div class="text p-2">
      <div class="d-flex justify-content-between flex-column align-items-center">
        <h5 class="mb-2 text-uppercase">${product.name}</h5>
        <p class="mb-3">Giá: <span class="fs-6 fw-semibold text-danger">${formattedPrice}</span></p>
      </div>
      <button type="button" class="btn btn-primary mt-2 w-100 btn-order" data-id="${productId}">Đặt hàng</button>
    </div>
  </div>
</div>

            `;
    });
   // Thêm sự kiện cho các nút đặt hàng
let btnOrder = document.querySelectorAll('.btn-order');
btnOrder.forEach(btn => {
    btn.addEventListener('click', function(){
        const productId = this.getAttribute("data-id");
        checkSession();
        //Hiển thị form order
        showOrderForm(productId)
    });
});


    container.innerHTML= htmls;
  } catch (error) {
    console.log("Lỗi khi lấy sản phẩm: ", error);
  }



  // Hiển thị form đặt hàng
    const showOrderForm = async (productId) =>{
        let orderForm = document.querySelector(".order-form");
        orderForm.style.display = "block";

        try{
            const docRef = doc(db, 'products', productId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                const product = docSnap.data();
                const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
                orderForm.innerHTML = `
                 <div class="p-3 bg-light content rounded shadow">
                    <button type="button" class="btn btn-outline-dark btn-cancel mb-3">Đóng</button>
                    <div class="row">
                        <div class="col-md-4 col-12">
                            <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid rounded"> 
                        </div>
                        <div class="col-md-8 col-12">
                            <h5>${product.name}</h5>
                            <p>Giá: ${formattedPrice}</p>
                            <form id="order-form">
                                <div class="mb-3">
                                    <label for="quantity" class="form-label">Số lượng</label>
                                    <input type="number" class="form-control" id="quantity" value="1" min="1" required>
                                </div>
                                <button type="submit button" class="btn btn-primary btn-confirm-order w-100" data-price="${product.price}">Xác nhận</button>
                            </form>
                        </div>
                    </div>
                </div>
                `
            }
        }catch(error){
            console.log("Lỗi khi đặt hàng: ", error)
        }
    }
};
