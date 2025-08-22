import { useState } from 'react';
import './LoginSignup.css';

export default function LoginSignup({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false); // toggle login/signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Load users from localStorage or empty array
  const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSubmit = () => {
    let users = getUsers();

    if (isSignup) {
      // --- SIGN UP MODE ---
      if (!name || !email || !password) {
        alert("Please fill in all fields to sign up.");
        return;
      }
      // Check if email already exists
      if (users.find((u) => u.email === email)) {
        alert("Email is already registered. Please login instead.");
        return;
      }
      // Save new user
      users.push({ name, email, password });
      saveUsers(users);
      alert(`Account created for ${name}! You can now log in.`);
      setIsSignup(false); // switch to login mode
      setName(""); setEmail(""); setPassword("");
    } else {
      // --- LOGIN MODE ---
      if (!email || !password) {
        alert("Please enter your email and password.");
        return;
      }
      // Check if user exists
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        onLogin(user.name); // Pass name back to App
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <div className="login-card">
      <h3>{isSignup ? "Sign Up" : "Login"}</h3>

      {isSignup && (
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={handleSubmit}>
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p className="toggle-text">
        {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
        <span className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login here" : "Sign up here"}
        </span>
      </p>
    </div>
  );
}
