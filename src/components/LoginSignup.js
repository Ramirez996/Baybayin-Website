import { useState } from 'react';
import '../css/LoginSignup.css';

export default function LoginSignup({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  // NEW: State for loading status
  const [isLoading, setIsLoading] = useState(false); 

  // Helper component for message box (used only within this component)
  const Message = ({ text, type }) => {
      const className = `login-message ${type || 'info'}`;
      return (
          <div className={className}>
              <p>{text}</p>
              <button onClick={() => setMessage(null)}>Close</button>
          </div>
      );
  };

  // Authentication class methods
  const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
  const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true); // Start loading animation

    setTimeout(() => { // Added delay for visual effect
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
        setMessage({text: "Invalid email or password. Please try again.", type: 'error'});
        setIsLoading(false); // Stop loading on failure
      }
    }, 800); // 800ms delay
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setMessage(null);
    if (!name || !email || !password) {
      setMessage({text: "Please fill in all fields to sign up.", type: 'error'});
      return;
    }
    
    setIsLoading(true); // Start loading animation
    
    setTimeout(() => { // Added delay for visual effect
      const users = getUsers();
      if (users.find(u => u.email === email)) {
        setMessage({text: "Email is already registered. Please login instead.", type: 'error'});
        setIsLoading(false); // Stop loading on failure
        return;
      }
      const newUser = {
        userID: Date.now(),
        name,
        email,
        password,
      };
      saveUsers([...users, newUser]);
      setMessage({text: `Account created for ${name}! You can now log in.`, type: 'success'});
      
      // Reset form and state after success
      setIsSignup(false);
      setName(''); setEmail(''); setPassword('');
      setIsLoading(false); // Stop loading on success
    }, 800); // 800ms delay
  };

  return (
    <div className="login-card">
      {message && <Message text={message.text} type={message.type} />} 

      <h3>{isSignup ? 'Sign Up' : 'Welcome Back!'}</h3>
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading} // Disable fields while loading
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading} // Disable fields while loading
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading} // Disable fields while loading
        />
        {/* Conditional rendering of spinner and text, disabled attribute controls CSS styles */}
        <button type="submit" disabled={isLoading}>
            {isLoading && <div className="loading-spinner"></div>}
            <span className="button-text">
                {isSignup ? 'Sign Up' : 'Login'}
            </span>
        </button>
      </form>
      <p className="toggle-text">
        {isSignup ? 'Already have an account?' : 'Don’t have an account?'}
        <span className="toggle-link" onClick={() => {setIsSignup(!isSignup); setMessage(null);}}>
          {isSignup ? 'Login here' : ' Sign up here'}
        </span>
      </p>
    </div>
  );
}
