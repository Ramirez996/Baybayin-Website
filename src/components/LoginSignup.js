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
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  // Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      if (!agreed) {
        alert("Please agree to the Terms and Conditions first.");
        return;
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUserName(user.displayName || "Google User");
      setSuccess(true);
    } catch (error) {
      alert(error.message);
    }
  };

  // Email/password auth
  const handleAuth = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to the Terms and Conditions first.");
      return;
    }

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
          alert("Please verify your email first before logging in.");
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await sendEmailVerification(userCredential.user);
        alert("Account created! Please verify your email before logging in.");
        auth.signOut();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Progress animation after success
  useEffect(() => {
    if (success) {
      let timer = 0;
      const interval = setInterval(() => {
        timer += 100;
        setProgress((timer / 3500) * 100);
        if (timer >= 3500) {
          clearInterval(interval);
          onLogin({ name: userName, email });
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [success, userName, email, onLogin]);

  // Handle scroll detection for Terms modal
  const handleScroll = (e) => {
    const el = e.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setScrolledToBottom(true);
    }
  };

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

              {/* Terms checkbox */}
              <div className="termsContainer">
                <label className="termsLabel">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    disabled={!scrolledToBottom}
                  />
                  <span>
                    I have read and agree to the{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTerms(true);
                      }}
                    >
                      Terms and Conditions
                    </a>
                  </span>
                </label>
                {!scrolledToBottom && (
                  <p className="termsHint">
                    *You must read all Terms & Conditions before agreeing.
                  </p>
                )}
              </div>

              <button type="submit" disabled={!agreed}>
                {isLogin ? "Login" : "Sign Up"}
              </button>
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
            <div className="success-icon">Login Success!</div>
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

      {/* ✅ Terms & Conditions Modal */}
      {showTerms && (
        <div className="termsModal">
          <div className="termsBox">
            <h2>Terms and Conditions</h2>
            <div className="termsContent" onScroll={handleScroll}>
              <p>
               <strong> Welcome to our platform. By creating an account, you agree to the following: </strong>
              </p>
              <ul>
                <li>
                  1. Privacy Policy: Your personal data will be handled securely
                  and used only for academic and project purposes.
                </li>
                <li>
                  2. Confidentiality: We do not share your responses or results
                  with third parties without consent.
                </li>
                <li>
                  3. Dsiclaimer: This website's translation may not be completely accurate, especially for non-Tagalog words, and that users should not rely on it for permanent use like tattoos.
                </li>
                <li>
                  4. User Conduct: You agree not to misuse, copy, or distribute system
                  materials without authorization.
                </li>
                <li>
                  5. Updates: Terms may be updated periodically; continued use implies acceptance.
                </li>
              </ul>

              <p>
               <strong> By clicking “I Agree,” you acknowledge that you have read, understood, and agree to
                these terms.</strong>
              </p>
            </div>

            <div className="termsActions">
              <button
                className="close-btn"
                onClick={() => setShowTerms(false)}
              >
                Close
              </button>
              <button
                className="agree-btn"
                disabled={!scrolledToBottom}
                onClick={() => {
                  setAgreed(true);
                  setShowTerms(false);
                }}
              >
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
