import { useState } from 'react';

export default function AlphabetChart() {
  const baybayinLetters = [
    { alphabetID: 1, letter: "A", symbol: "ᜀ", pronunciation: "Vowel A" },
    { alphabetID: 2, letter: "B", symbol: "ᜊ", pronunciation: "BA" },
    { alphabetID: 3, letter: "C", symbol: "ᜃ", pronunciation: "KA" },
    { alphabetID: 4, letter: "D", symbol: "ᜇ", pronunciation: "DA / RA" },
    { alphabetID: 5, letter: "E", symbol: "ᜁ", pronunciation: "Vowel I/E" },
    { alphabetID: 6, letter: "F", symbol: "ᜉ", pronunciation: "PA" },
    { alphabetID: 7, letter: "G", symbol: "ᜄ", pronunciation: "GA" },
    { alphabetID: 8, letter: "H", symbol: "ᜑ", pronunciation: "HA" },
    { alphabetID: 9, letter: "I", symbol: "ᜁ", pronunciation: "Vowel I" },
    { alphabetID: 10, letter: "J", symbol: "ᜇ", pronunciation: "DA/RA" },
    { alphabetID: 11, letter: "K", symbol: "ᜃ", pronunciation: "KA" },
    { alphabetID: 12, letter: "L", symbol: "ᜎ", pronunciation: "LA" },
    { alphabetID: 13, letter: "M", symbol: "ᜋ", pronunciation: "MA" },
    { alphabetID: 14, letter: "N", symbol: "ᜈ", pronunciation: "NA" },
    { alphabetID: 15, letter: "O", symbol: "ᜂ", pronunciation: "Vowel O/U" },
    { alphabetID: 16, letter: "P", symbol: "ᜉ", pronunciation: "PA" },
    { alphabetID: 17, letter: "Q", symbol: "ᜃ", pronunciation: "KA" },
    { alphabetID: 18, letter: "R", symbol: "ᜇ", pronunciation: "RA" },
    { alphabetID: 19, letter: "S", symbol: "ᜐ", pronunciation: "SA" },
    { alphabetID: 20, letter: "T", symbol: "ᜆ", pronunciation: "TA" },
    { alphabetID: 21, letter: "U", symbol: "ᜂ", pronunciation: "Vowel U/O" },
    { alphabetID: 22, letter: "V", symbol: "ᜊ", pronunciation: "BA" },
    { alphabetID: 23, letter: "W", symbol: "ᜏ", pronunciation: "WA" },
    { alphabetID: 24, letter: "X", symbol: "ᜐ", pronunciation: "SA" },
    { alphabetID: 25, letter: "Y", symbol: "ᜌ", pronunciation: "YA" },
    { alphabetID: 26, letter: "Z", symbol: "ᜐ", pronunciation: "SA" },
  ];

  const [selected, setSelected] = useState(null);

  // viewAlphabetKeys() method
  const viewAlphabetKeys = () => {
    return baybayinLetters.map((letter) => (
      <div
        key={letter.alphabetID}
        className="letter-card"
        onClick={() => setSelected(letter)}
      >
        {letter.symbol}
      </div>
    ));
  };

  // learnAlphabet() method (represented by the popup)
  const learnAlphabet = () => {
    return (
      <div className="selected-letter">
        <h4>{selected.symbol} — {selected.letter}</h4>
        <p>{selected.pronunciation}</p>
        <button className="close-btn" onClick={() => setSelected(null)}>✖ Close</button>
      </div>
    );
  };

  return (
    <div>
      <h3>Baybayin Alphabet (A–Z)</h3>
      <div className="alphabet-grid">
        {viewAlphabetKeys()}
      </div>

      {selected && learnAlphabet()}
    </div>
  );
}