import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import googleIcon from "../images/google.png";
import "../css/LoginSignup.css";

export default function LoginSignup({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [progress, setProgress] = useState(0);

  // 🔹 Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUserName(user.displayName || "Google User");
      setSuccess(true);
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Email/Password Authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (userCredential.user.emailVerified) {
          setUserName(userCredential.user.email);
          setSuccess(true);
        } else {
          alert(
            "Please verify your email first before logging in. Check your inbox!"
          );
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await sendEmailVerification(userCredential.user);
        alert(
          "Account created! A verification email has been sent. Please verify before logging in."
        );
        auth.signOut();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Progress bar countdown effect
  useEffect(() => {
    if (success) {
      let timer = 0;
      const interval = setInterval(() => {
        timer += 100; // every 100ms
        setProgress((timer / 3500) * 100);
        if (timer >= 3500) {
          clearInterval(interval);
          onLogin({ name: userName, email });
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [success, userName, email, onLogin]);

  return (
    <div className="login-container">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="login-card"
            className="login-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <h3>{isLogin ? "Welcome Back!" : "Create Account"}</h3>

            <form onSubmit={handleAuth}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <button className="google-btn" onClick={handleGoogleSignIn}>
              <img src={googleIcon} alt="Google" className="google-icon" />
              Continue with Google
            </button>

            <div className="toggle-text">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <span className="toggle-link" onClick={() => setIsLogin(false)}>
                    Sign up here
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="toggle-link" onClick={() => setIsLogin(true)}>
                    Login here
                  </span>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-card"
            className="success-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="success-icon">Success!!</div>
            <h2>Welcome, {userName.split("@")[0]}!</h2>
            <p>You’ve successfully logged in!</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#555", marginTop: "8px" }}>
              Redirecting shortly...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
