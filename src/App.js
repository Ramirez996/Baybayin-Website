import './App.css';
import { useState } from 'react';

function AlphabetChart() {
  const baybayinLetters = [
    { symbol: "ᜀ", latin: "A" },
    { symbol: "ᜁ", latin: "I / E" },
    { symbol: "ᜂ", latin: "U / O" },
    { symbol: "ᜃ", latin: "KA" },
    { symbol: "ᜄ", latin: "GA" },
    { symbol: "ᜅ", latin: "NGA" },
    { symbol: "ᜆ", latin: "TA" },
    { symbol: "ᜇ", latin: "DA / RA" },
    { symbol: "ᜈ", latin: "NA" },
    { symbol: "ᜉ", latin: "PA" },
    { symbol: "ᜊ", latin: "BA" },
    { symbol: "ᜌ", latin: "YA" },
    { symbol: "ᜎ", latin: "LA" },
    { symbol: "ᜋ", latin: "MA" },
    { symbol: "ᜐ", latin: "SA" },
    { symbol: "ᜑ", latin: "HA" },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h3>Baybayin Alphabet</h3>
      <div className="alphabet-grid">
        {baybayinLetters.map((letter, index) => (
          <div
            key={index}
            className="letter-card"
            onClick={() => setSelected(letter)}
          >
            {letter.symbol}
          </div>
        ))}
      </div>

      {selected && (
        <div className="selected-letter">
          <h4>{selected.symbol}</h4>
          <p>{selected.latin}</p>
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
        <div className="grid">
          <div className="card">T-shirt Designs</div>
          <div className="card">Tattoos</div>
          <div className="card">Logos & Signage</div>
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
