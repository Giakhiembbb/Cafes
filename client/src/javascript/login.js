import { auth } from "./firbase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const inpEmail = document.querySelector("#email");
const inpPwd = document.querySelector("#password");

const handleLogin = (event) => {
  event.preventDefault();

  let email = inpEmail.value;
  let password = inpPwd.value;

  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ các trường dữ liệu");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const usersession = {
        user: {
          email: user.email,
        },
        expiry: new Date().getTime() + 2 * 60 * 60 * 1000,
      };
      localStorage.setItem("user_session", JSON.stringify(usersession));
      alert("Đăng nhập thành công");
      window.location.href = "index.html";
    })

    .catch((e) => {
      alert("Lỗi: " + e.message);
    });
};
document.querySelector("#login-form").addEventListener("submit", handleLogin);
