import './App.css';
import { useState } from 'react';
import LoginSignup from './components/LoginSignup';
import AlphabetChart from './components/AlphabetChart';
import Shop from './components/Shop';
import GovernmentBills from './components/GovernmentBills';

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginSignup onLogin={(email) => setUser(email)} />;
  }

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="baybayin">ᜊᜌ᜔ᜊᜌᜒᜈ᜔</h1>
        <h2>Reviving Baybayin in the Digital Age</h2>
        <p>Welcome, {user}! Preserving heritage through education, fashion, and governance.</p>
      </section>

      {/* Education Section */}
      <section className="section">
        <h2>📚 Education</h2>
        <AlphabetChart />
      </section>

      {/* Design & Fashion (Shop) */}
      <section className="section alt">
        <h2>🎨 Design & Fashion</h2>
        <Shop />
      </section>

      {/* Government Efforts */}
      <section className="section">
        <h2>🏛️ Government Efforts</h2>
        <GovernmentBills />
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>CSA5| © 2025 Reviving Baybayin Project | Preserving Heritage Through Technology</p>
      </footer>
    </div>
  );
}
