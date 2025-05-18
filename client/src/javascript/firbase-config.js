// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdP47ouWtaIs9xP4Yjbj5IaViA8e1qtGY",
  authDomain: "cafe-manager-d9472.firebaseapp.com",
  projectId: "cafe-manager-d9472",
  storageBucket: "cafe-manager-d9472.firebasestorage.app",
  messagingSenderId: "911435554994",
  appId: "1:911435554994:web:d0c1d531ede56c0b1529ab",
  measurementId: "G-KHGT3X64WD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);