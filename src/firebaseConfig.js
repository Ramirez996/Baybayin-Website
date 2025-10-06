// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3yS0o3UYPMfCt0aubXvLqaWxo7AAmVqo",
  authDomain: "baybayin-website.firebaseapp.com",
  projectId: "baybayin-website",
  storageBucket: "baybayin-website.firebasestorage.app",
  messagingSenderId: "801269485681",
  appId: "1:801269485681:web:760c33da276bbf7350cbd0",
  measurementId: "G-DCRQT3TKF7"
};  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
