import { useState } from 'react';

export default function AlphabetChart() {
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

  return (
    <div>
      <h3>Baybayin Alphabet (A–Z)</h3>
      <div className="alphabet-grid">
        {baybayinLetters.map((letter) => (
          <div
            key={letter.latin}
            className="letter-card"
            onClick={() => setSelected(letter)}
          >
            {letter.symbol}
          </div>
        ))}
      </div>

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
