import './App.css';
import { useState } from 'react';
import tshirt from './images/1.jpeg';
import backpack from './images/2.jpeg';
import wallet from './images/3.jpeg';
import slingbag1 from './images/4.png';
import slingbag2 from './images/5.png';
import slingbag3 from './images/6.png';

function AlphabetChart() {
  const baybayinLetters = [
    { latin: "A", symbol: "ᜀ", notes: "Vowel A" },
    { latin: "B", symbol: "ᜊ", notes: "BA" },
    { latin: "C", symbol: "ᜃ / ᜐ", notes: "KA or SA (depends on context)" },
    { latin: "D", symbol: "ᜇ", notes: "DA / RA" },
    { latin: "E", symbol: "ᜁ", notes: "Vowel I/E" },
    { latin: "F", symbol: "ᜉ", notes: "PA (approximation)" },
    { latin: "G", symbol: "ᜄ", notes: "GA" },
    { latin: "H", symbol: "ᜑ", notes: "HA" },
    { latin: "I", symbol: "ᜁ", notes: "Vowel I" },
    { latin: "J", symbol: "ᜇ", notes: "DA/RA (approximation)" },
    { latin: "K", symbol: "ᜃ", notes: "KA" },
    { latin: "L", symbol: "ᜎ", notes: "LA" },
    { latin: "M", symbol: "ᜋ", notes: "MA" },
    { latin: "N", symbol: "ᜈ", notes: "NA" },
    { latin: "O", symbol: "ᜂ", notes: "Vowel O/U" },
    { latin: "P", symbol: "ᜉ", notes: "PA" },
    { latin: "Q", symbol: "ᜃ", notes: "KA (approximation)" },
    { latin: "R", symbol: "ᜇ", notes: "RA" },
    { latin: "S", symbol: "ᜐ", notes: "SA" },
    { latin: "T", symbol: "ᜆ", notes: "TA" },
    { latin: "U", symbol: "ᜂ", notes: "Vowel U/O" },
    { latin: "V", symbol: "ᜊ", notes: "BA (approximation)" },
    { latin: "W", symbol: "ᜏ", notes: "WA" },
    { latin: "X", symbol: "ᜐ / ᜃ", notes: "SA/KA (approximation)" },
    { latin: "Y", symbol: "ᜌ", notes: "YA" },
    { latin: "Z", symbol: "ᜐ", notes: "SA (approximation)" },
  ];

  const [selected, setSelected] = useState(null);

  const handleLetterClick = (letter) => {
    setSelected(letter); // Show popup
    setTimeout(() => {
      const popup = document.getElementById('selected-popup');
      if (popup) {
        popup.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0); // Wait for DOM to render popup
  };

  return (
    <div>
      <h3>Baybayin Alphabet (A–Z)</h3>
      <div className="alphabet-grid">
        {baybayinLetters.map((letter) => (
          <div
            key={letter.latin}
            className="letter-card"
            onClick={() => handleLetterClick(letter)}
          >
            {letter.symbol}
          </div>
        ))}
      </div>

      {/* Popup for selected letter */}
      {selected && (
        <div id="selected-popup" className="selected-letter">
          <h4>{selected.symbol} — {selected.latin}</h4>
          <p>{selected.notes}</p>
          <button className="close-btn" onClick={() => setSelected(null)}>
            ✖ Close
          </button>
        </div>
      )}
    </div>
  );
}



export default function App() {
  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="baybayin">ᜊᜌ᜔ᜊᜌᜒᜈ᜔</h1>
        <h2>Reviving Baybayin in the Digital Age</h2>
        <p>
          Preserving our cultural heritage through education, fashion, and government support.
        </p>
      </section>

      {/* Education Section */}
      <section className="section">
        <h2>📚 Education</h2>
        <p>
          Baybayin is being integrated into Araling Panlipunan subjects to strengthen cultural identity.
        </p>
        <div className="card">
          <AlphabetChart />
        </div>
      </section>

      {/* Design & Fashion Section */}
      <section className="section alt">
  <h2>🎨 Design & Fashion</h2>
  <p>
    Baybayin finds its place in t-shirts, tattoos, logos, and signage, symbolizing cultural pride.
  </p>
  <div className="gallery">
    <img src={tshirt} alt="Baybayin T-shirt" />
    <img src={backpack} alt="Baybayin Backpack" />
    <img src={wallet} alt="Baybayin Wallets" />
    <img src={slingbag1} alt="Baybayin Sling Bag 1" />
    <img src={slingbag2} alt="Baybayin Sling Bag 2" />
    <img src={slingbag3} alt="Baybayin Sling Bag 3" />
  </div>
</section>

      {/* Government Efforts Section */}
      <section className="section">
        <h2>🏛️ Government Efforts</h2>
        <p>
          Recent bills and proposals push for the inclusion of Baybayin in official communications and signage.
        </p>
        <div className="card">
          <h3>Baybayin Bill</h3>
          <p>
            https://legacy.senate.gov.ph/lisdata/4073037114!.pdf
          </p>
          <p>
            Senator Loren B. Legarda has introduced the bill promoting the use of Baybayin as a tool for cultural
            development of the Philippines, providing for its
            promotion, protection, preservation and
            conservation, and for other purposes. This bill seeks the promotion, protection, preservation, and conservation of the
"Baybayin" script.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Reviving Baybayin Project | Preserving Heritage Through Technology</p>
      </footer>
    </div>
  );  
}
