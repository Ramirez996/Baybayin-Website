import { useState } from 'react';
import './LoginSignup.css';

export default function LoginSignup({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Authentication class methods
  const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
  const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      onLogin({
        userID: user.userID,
        name: user.name,
        email: user.email,
        password: user.password
      });
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields to sign up.");
      return;
    }
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      alert("Email is already registered. Please login instead.");
      return;
    }
    const newUser = {
      userID: Date.now(),
      name,
      email,
      password,
    };
    saveUsers([...users, newUser]);
    alert(`Account created for ${name}! You can now log in.`);
    setIsSignup(false);
    setName(''); setEmail(''); setPassword('');
  };

  return (
    <div className="login-card">
      <h3>{isSignup ? 'Sign Up' : 'Login'}</h3>
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <p className="toggle-text">
        {isSignup ? 'Already have an account?' : 'Don’t have an account?'}
        <span className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Login here' : 'Sign up here'}
        </span>
      </p>
    </div>
  );
}