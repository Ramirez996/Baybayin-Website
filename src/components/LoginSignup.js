import { useState } from 'react';

export default function LoginSignup({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      onLogin(email);
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div className="card">
      <h3>Login / Sign Up</h3>
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
      <button onClick={handleLogin}>Enter</button>
    </div>
  );
}
