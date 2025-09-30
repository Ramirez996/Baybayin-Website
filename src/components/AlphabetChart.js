import { useState } from 'react';
import baybayinImage from '../images/baybayinLetter.png'; // Make sure this path is correct
import kapanganakanImage from '../images/Kapanganakan.png'; 
import kasalImage from '../images/Kasal.png'; 
import kamatayanImage from '../images/Kamatayan.png'; 
import letterImage from '../images/letter.png';

export default function AlphabetChart() {
  const baybayinLetters = [
    // ... (your existing baybayinLetters array) ...
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
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    setSelected(null);
  };

  const handleLetterClick = (letter) => {
    setSelected(letter);
    setShowHistory(false);
  };

  return (
    <div>
      <button className="history-btn" onClick={toggleHistory}>
        {showHistory ? '▲ Hide Baybayin History' : '▼ Show Baybayin History'}
      </button>

      {showHistory && (
        // Add 'section-content' for general section styling
        <div className="baybayin-history section-content"> 
          <h3 className="section-title">What Is Baybayin?</h3> {/* Add a title class for consistent styling */}
          <p>
            Baybayin is a script that predated the Spanish colonization of the Philippines in 1565. The name "Baybayin" comes from the Tagalog root word "baybay" which means "to spell," and in addition to Tagalog, the script was used to write other Philippine languages like Ilocano, Pangasinan, and Bisaya.
          </p>
          
          {/* Main content area for image and text */}
          <div className="history-main-content">
            <img 
              src={baybayinImage} 
              alt="Baybayin characters for consonants and vowels" 
              className="baybayin-script-image"
            />
            
            <div className="history-text-right">
              <p>
                Baybayin is an abugida, which is a writing system that combines a consonant and a vowel in the same symbol. These script symbols represent syllables, not letters. Baybayin represents 14 syllabic consonant characters (Ba, Da, Ga, Ha, Ka, La, Ma, Na, Nga, Pa, Sa, Ta, Wa, Ya) and 3 vowel characters (a, e-i, o-u).
              </p>
              <p>
                Each consonant character combines the consonant sound with the vowel sound "a" (for example, the consonant "B" becomes "Ba"). If you need to change the "a" sound to another vowel, a diacritical mark called a "kudlit" is used. This mark can look like a dot or a tilted comma and is placed either on top of the character to change the vowel sound to "e-i" or under the bottom of the character to change the vowel sound to "o-u".
              </p>
            </div>
          </div>
          
          <p>
            To remove the vowel attached to the base letter, a "pamudpod" (,), "krus" (+), or "ekis" (x) is placed under the symbol. In this example, the (,) underneath removes the "a" vowel from the "Ka" symbol, making the syllable only read as "K."
          </p>
          <h3> The History of Filipino Baybayin Writing </h3>
          <p>Baybayin was commonly used in parts of the Philippines, especially in the Luzon area, up until the mid-1600s. You will find it used in record-keeping, poetry, letters, rituals, and ceremonies. It is one of dozens of indigenous scripts of the Philippines.</p>
          <p>One of the earliest published books in the Philippines, printed in 1593, is titled Doctrina Christiana. This 74-page book was written in Spanish, in Tagalog written with the Latin alphabet, and in Tagalog written with the ancient script of Baybayin. However, as Spanish rule expanded across the islands, the use of the Latin alphabet soon overshadowed the Baybayin script of the past.</p>
          <h3>Learn to Read and Write in Baybayin</h3>
          <p>Let’s take a look at this ancient Philippine writing system and a few examples.</p>

          <p>The Tagalog word for birth is "kapanganakan." First, separate the syllables: Ka-pa-nga-na-ka-n</p>
          <p>There is one symbol for each syllable. Note the sound ‘nga’ has its own symbol. The (,) mark underneath the last symbol of kapanganakan turns the “na” syllable into only an “n” to end the word.</p> 

          <div className="baybayin-example-container">
              <img 
                  src={kapanganakanImage} 
                  alt="Baybayin word for Kapanganakan" 
                  className="baybayin-example-image"
              />
          </div>
          <p>The Tagalog word for marriage is "kasal." Here is the word in Baybayin.</p>

          <div className="baybayin-example-container">
              <img 
                  src={kasalImage} 
                  alt="Baybayin word for Kasal (Marriage)" 
                  className="baybayin-example-image"
              />
          </div>

          <p>The Tagalog word for death is "kamatayan." Here is the word in Baybayin.</p>
          <div className="baybayin-example-container">
              <img 
                  src= {kamatayanImage}
                  alt="Baybayin word for Kamatayan (Death)"
                  className="baybayin-example-image"
              />
          </div>

        <h3>The Use of Baybayin Today</h3>
        <p>Baybayin is still in use today, most often used in artistic compositions, such as calligraphy, tattoos, and clothing. Several contemporary authors even have written full novels and poetry in the Baybayin script.</p>
        <p>Recently, the Philippine government took action to reestablish Baybayin in their signage, food labels, government documents, newspapers, and educational systems to promote and preserve the script. In 2018, the Committee on Basic Education and Culture of the Philippine Congress approved House Bill 1022. This bill, known as the National Writing System Act, declared Baybayin—alongside one of the existing native written languages—as the collective national writing script of the country.</p>
        <p>Today, visitors to the University of Santo Tomas can also see the largest collection of ancient Baybayin scripts in the world.</p>

        <h3>The Difference Between Baybayin and Alibata</h3>
         <p>Sometimes Baybayin is referred to as "Alibata." Paul Rodriguez Verzosa invented the term "Alibata" in 1914, basing his suggested term on the first 3 letters of Arabic script: "alif," "baa," and "taa" (ali-ba-ta). However, scholars who study Baybayin say that the script was derived from Kawi or other Indic scripts after the year 900 and was widely used until the Spanish arrived. Because there is no evidence that the script was derived from Arabic, these scholars suggest the term “Alibata” is inaccurate, and the script should be strictly referred to as “Baybayin.”</p>
         
         <h3>Baybayin Compared to Other Writing Systems</h3>
          <p>There are many ancient and modern writing systems in the world. The 5 most commonly used systems are abugida (sometimes called alphasyllabary), abjad, alphabet, logography, and syllabary.</p>

        <div className="history-letter-image-container">
              <img 
                  src={letterImage} 
                  alt="Old letters and envelopes" 
                  className="baybayin-script-image" // Reusing the script image class for shadow/border-radius
              />
          </div>

        <h3>Abugida</h3>
          <p>Baybayin is just one abugida. There are many other cultures who have writing systems based on combining a consonant and a vowel into one symbol. Some of these abugidas include Burmese, Thai, and Lao.</p>

        <h3>Abjad</h3> 
          <p>Abjad is a writing system containing symbols for consonants and none for vowels. Hebrew and Arabic are examples of languages that use an abjad writing system. You may have seen something that tested you in deciphering English text without any vowels, like the following: f y cn rd ths thn y cn prbbly rd nythng!</p>
          <p>This example is similar to how an abjad writing system works. The reader intuitively puts the necessary vowels back into the words when the language is read or spoken.</p>
        
        <h3>Alphabet</h3>
          <p>An alphabet uses one symbol to represent a specific sound, and those sound symbols are put together to form a word. About 70% of the world’s population uses the Latin alphabet.</p>

        <h3>Logography</h3>
          <p>The logography writing system is based on one symbol representing one word. Languages that use this type of script include Egyptian hieroglyphs and Chinese characters.</p>

        <h3>Syllabary</h3>
          <p>Syllabary, like abugidas, has one symbol that represents one syllable. However, while phonetically related syllables in abugida systems look similar to each other, the phonetically related syllables in a syllabary system look completely different.</p>
          <p>For example, the symbols for ”Ma” (Ꮉ), ”Me” (Ꮊ) and ”Mi” (Ꮋ) in the Cherokee syllabary writing system have different symbols, even though they all share the consonant ”M.” Japanese hiragana and katakana are other examples of syllabaries.</p>

        <h3>Learn More About Your Filipino Heritage</h3>
          <p>Now you can begin researching your Filipino family and heritage using the FamilySearch Philippines page. Here you can use the Baybayin names translator to write your surname in Baybayin and download and print a name sheet for your family history files.</p>
          <p>Thank you for reading! I hope you learn a lot!</p>


        </div>
      )}
      
      <h3>Baybayin Alphabet (A–Z)</h3>
      <div className="alphabet-grid">
        {baybayinLetters.map((letter) => (
          <div
            key={letter.alphabetID}
            className="letter-card"
            onClick={() => handleLetterClick(letter)}
          >
            {letter.symbol}
          </div>
        ))}
      </div>

      {selected && (
        <div className="selected-letter">
          <h4>{selected.symbol} — {selected.letter}</h4>
          <p>{selected.pronunciation}</p>
          <button className="close-btn" onClick={() => setSelected(null)}>✖ Close</button>
        </div>
      )}
    </div>
  );
}