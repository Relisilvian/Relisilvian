import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCpcgTbkPmz9TlO2BaynLn7np8bnEZo_LI",
  authDomain: "relisite.firebaseapp.com",
  projectId: "relisite",
  storageBucket: "relisite.appspot.com",
  messagingSenderId: "999973325634",
  appId: "1:999973325634:web:a2d39715981b30f42e96db",
  measurementId: "G-J8MJEYGDT6"
};
const app = initializeApp(firebaseConfig), auth = getAuth(app), provider = new GoogleAuthProvider();

const email = document.getElementById("email"),
  password = document.getElementById("password"),
  submitBtn = document.getElementById("submit-btn"),
  toggleText = document.getElementById("toggle-text"),
  toggleLink = document.getElementById("toggle-link"),
  formTitle = document.getElementById("form-title"),
  message = document.getElementById("message"),
  authForm = document.getElementById("auth-form"),
  forgotPassword = document.getElementById("forgot-password"),
  togglePasswordBtn = document.getElementById("toggle-password"),
  eyeIcon = document.getElementById("eye-icon");

let isLogin = true;
const resetForm = () => { email.value = password.value = ""; message.textContent = ""; };

togglePasswordBtn.addEventListener("click", () => {
  const hidden = password.type === "password";
  password.type = hidden ? "text" : "password";
  eyeIcon.innerHTML = hidden
    ? `<path stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19.5c-5 0-9.27-3.61-10.5-7.5a10.05 10.05 0 011.38-2.632m2.33-2.348A9.969 9.969 0 0112 4.5c5 0 9.27 3.61 10.5 7.5a10.05 10.05 0 01-4.095 5.616M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>`
    : `<path stroke-width="2" d="M3 3l18 18M9.53 9.53a3 3 0 104.95 4.95M10.477 10.477L3 3m18 18l-7.623-7.623"/>`;
  togglePasswordBtn.setAttribute("aria-label", hidden ? "Sembunyikan Password" : "Tampilkan Password");
});

authForm.addEventListener("submit", async e => {
  e.preventDefault();
  message.textContent = "";
  try {
    if (isLogin) await signInWithEmailAndPassword(auth, email.value, password.value), message.textContent = "Berhasil login!";
    else await createUserWithEmailAndPassword(auth, email.value, password.value), message.textContent = "Akun berhasil dibuat!";
    message.style.color = "green"; resetForm();
  } catch (err) {
    message.style.color = "red"; message.textContent = err.message;
  }
});

toggleLink.addEventListener("click", e => {
  e.preventDefault();
  isLogin = !isLogin;
  if (formTitle) formTitle.textContent = isLogin ? "Login" : "Daftar";
  submitBtn.textContent = isLogin ? "Masuk" : "Daftar";
  toggleText.textContent = isLogin ? "Belum punya akun?" : "Sudah punya akun?";
  toggleLink.textContent = isLogin ? "Daftar di sini" : "Login di sini";
  message.textContent = "";
});

forgotPassword?.addEventListener("click", async e => {
  e.preventDefault();
  if (!email.value) return message.style.color = "red", message.textContent = "Masukkan email terlebih dahulu.";
  try {
    await sendPasswordResetEmail(auth, email.value);
    message.style.color = "green"; message.textContent = "Link reset password telah dikirim.";
  } catch (err) {
    message.style.color = "red"; message.textContent = err.message;
  }
});
