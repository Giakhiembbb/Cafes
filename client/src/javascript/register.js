import { auth, db } from "./firbase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import{ collection, addDoc} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const inpUsername = document.querySelector("#email");
const inpEmail = document.querySelector("#email");
const inpPwd = document.querySelector("#password");
const inpConfirmPwd = document.querySelector("#confirm-password");



const handleReigister = (event) => {
  event.preventDefault();
  let username = inpUsername.value;
  let email = inpEmail.value;
  let password = inpPwd.value;
  let confirmPassword = inpConfirmPwd.value;
  let role_id = 2; // mác định sẽ có quyền User, 1: admin, 2: user

  if (!username || !email || !password || !confirmPassword) {
    alert("Vui lòng nhập đầy đủ tất cả các trường dữ liệu");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData ={
        username,
        email,
        password, // Luu y: trong thuc te, khong password plaintext=> ma hoa
        role_id,
        balance: 0 //vi tien
      };


      return addDoc(collection(db, "users"), userData);
    })

    .then(() => {
      alert("đăng ký thành công");
      window.location.href = "login.html";
    })
    .catch((e) => {
      if (e.code === "auth/weak-password") {
        alert("Mật khẩu phải có ít nhất 6 ký tựtự");
      } else {
        console.log("Lỗi: " + e.message);
      }
    });
};

document
  .querySelector("#register-form")
  .addEventListener("submit", handleReigister);
