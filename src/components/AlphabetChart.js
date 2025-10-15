import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import baybayinImage from '../images/baybayinLetter.png';
import kapanganakanImage from '../images/Kapanganakan.png';
import kasalImage from '../images/Kasal.png';
import kamatayanImage from '../images/Kamatayan.png';
import letterImage from '../images/letter.png';
import kudlitImage from '../images/Kudlit.png';
import pamudpodImage from '../images/Pamudpod.png';
import modernRevivalImage from '../images/ModernRevival.png';

export default function AlphabetChart() {
  // === States ===
  const [showHistory, setShowHistory] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [showTrivia, setShowTrivia] = useState(false);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const toggleHistory = () => setShowHistory(!showHistory);
  const toggleFullHistory = () => setShowFullHistory(!showFullHistory);
  const [showPractice, setShowPractice] = useState(false);
  const [practiceInput, setPracticeInput] = useState("");
  const togglePractice = () => setShowPractice(!showPractice);
  const [selectedCard, setSelectedCard] = useState(null);

  const trivia = [
    { q: "What does the word 'Baybayin' mean?", a: ["To write", "To spell", "To speak", "To draw"], correct: "To spell" },
    { q: "What type of writing system is Baybayin?", a: ["Alphabet", "Syllabary", "Abugida", "Abjad"], correct: "Abugida" },
    { q: "Which mark changes the vowel sound in Baybayin?", a: ["Kudlit", "Pamudpod", "Krus", "Ekis"], correct: "Kudlit" },
    { q: "What is used to remove the vowel 'a' sound in Baybayin?", a: ["Pamudpod", "Kudlit", "Bituin", "Tambal"], correct: "Pamudpod" },
    { q: "Which ancient script influenced Baybayin?", a: ["Kawi", "Greek", "Arabic", "Latin"], correct: "Kawi" },
    { q: "Which ancient script influenced Baybayin?", a: ["Kawi", "Greek", "Arabic", "Latin"], correct: "Kawi" },
    { q: "Which book was published in Baybayin in 1593?", a: ["Noli Me Tangere", "Doctrina Christiana", "Florante at Laura", "El Filibusterismo"], correct: "Doctrina Christiana" },
    { q: "What kind of symbols does Baybayin use?", a: ["Syllables", "Letters", "Numbers", "Pictures"], correct: "Syllables" },
    { q: "What does the Kudlit mark do?", a: ["Changes vowel", "Removes vowel", "Adds consonant", "Makes pause"], correct: "Changes vowel" },
  ];

  const currentTrivia = trivia[questionIndex];
  const handleTriviaAnswer = (choice) => {
    if (choice === currentTrivia.correct) setScore(score + 1);
    if (questionIndex + 1 < trivia.length) setQuestionIndex(questionIndex + 1);
    else setQuizFinished(true);
  };
  const resetTrivia = () => {
    setScore(0);
    setQuestionIndex(0);
    setQuizFinished(false);
  };

  // === History Cards ===
  const historyCards = [
    {
      id: 1,
      title: "🌅 Origins of Baybayin",
      image: baybayinImage,
      content: `Baybayin originated from ancient scripts used in the Philippines before Spanish colonization.`,
      details: `Baybayin descended from Brahmic scripts via Kawi, used by Tagalog and Kapampangan groups for poetry, letters, and rituals.`
    },
    {
      id: 2,
      title: "✒️ Kudlit Marks",
      image: kudlitImage,
      content: `A kudlit is a small mark used to change vowel sounds.`,
      details: `Kudlit marks alter the inherent "a" sound — above for "e/i" and below for "o/u".`
    },
    {
      id: 3,
      title: "➖ Pamudpod Symbol",
      image: pamudpodImage,
      content: `The pamudpod removes the vowel “a” sound, turning “ka” into “k”.`,
      details: `Introduced during Spanish influence, it allowed Baybayin to represent final consonants.`
    },
    {
      id: 4,
      title: "🕊️ Modern Revival",
      image: modernRevivalImage,
      content: `Baybayin was revived in the 2000s as a symbol of Filipino identity and heritage.`,
      details: `Today, Baybayin appears in art, education, and cultural law efforts like the 2018 Baybayin Bill.`
    }
  ];

  // === Timeline ===
  const timeline = [
    { year: 900, event: "Kawi script influences early Filipino writing." },
    { year: 1565, event: "Spanish colonization begins; Baybayin widely used." },
    { year: 1593, event: "Doctrina Christiana published in Baybayin." },
    { year: 1700, event: "Latin alphabet replaces Baybayin in daily use." },
    { year: 2000, event: "Cultural resurgence of Baybayin begins." },
    { year: 2018, event: "Philippine Congress approves Baybayin Bill (House Bill 1022)." },
  ];

  const practiceExamples = [
    { tagalog: "Araw", baybayin: "ᜀᜇᜏ᜔" },
    { tagalog: "Bayan", baybayin: "ᜊᜌᜈ᜔" },
    { tagalog: "Puso", baybayin: "ᜉᜓᜐᜓ" },
    { tagalog: "Gabi", baybayin: "ᜄᜊᜒ" },
  ];

  // === Transliteration System ===
  const transliterateToBaybayin = (word) => {
    if (!word) return "";
    const map = {
      a: "ᜀ", e: "ᜁ", i: "ᜁ", o: "ᜂ", u: "ᜂ",
      ka: "ᜃ", ga: "ᜄ", nga: "ᜅ", ta: "ᜆ",
      da: "ᜇ", na: "ᜈ", pa: "ᜉ", ba: "ᜊ",
      ma: "ᜋ", ya: "ᜌ", ra: "ᜍ", la: "ᜎ",
      wa: "ᜏ", sa: "ᜐ", ha: "ᜑ"
    };
    const kudlit = { i: "ᜒ", e: "ᜒ", u: "ᜓ", o: "ᜓ" };
    let result = "", i = 0;
    const text = word.toLowerCase().replace(/[^a-z]/g, "");
    while (i < text.length) {
      let chunk = text.slice(i, i + 3);
      if (chunk.startsWith("nga")) { result += map["nga"]; i += 3; continue; }
      const c = text[i], v = text[i + 1];
      if (["k", "g", "t", "d", "n", "p", "b", "m", "y", "r", "l", "w", "s", "h"].includes(c)) {
        if (v === "a") { result += map[c + "a"]; i += 2; }
        else if (v && kudlit[v]) { result += map[c + "a"] + kudlit[v]; i += 2; }
        else { result += map[c + "a"] + "᜔"; i += 1; }
        continue;
      }
      if (["a", "e", "i", "o", "u"].includes(c)) { result += map[c]; i += 1; continue; }
      i += 1;
    }
    return result;
  };

  return (
    <div className="alphabet-chart-container">
      <div className="history-btn-container">
        <button
          className={`history-btn ${showHistory ? 'active' : ''}`}
          onClick={toggleHistory}
        >
          {showHistory ? '▲ Interactive History' : '▼ Explore History'}
        </button>
      </div>

      {/* === Practice Section === */}
      <div className="practice-btn-container">
        <button className={`practice-toggle-btn ${showPractice ? "active" : ""}`} onClick={togglePractice}>
          {showPractice ? "▲ Hide Practice Area" : "✍️ Practice Baybayin Writing"}
        </button>
      </div>

      <AnimatePresence>
        {showPractice && (
          <motion.div
            className="practice-section section-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <h3 className="section-title">✍️ Practice Baybayin</h3>
            <p>Type a Tagalog word to automatically see its Baybayin translation:</p>
            <input
              type="text"
              placeholder="Halimbawa: kamusta, araw, tubig..."
              className="practice-input"
              value={practiceInput}
              onChange={(e) => setPracticeInput(e.target.value)}
            />
            {practiceInput && (
              <div className="translation-result">
                <p><strong>Tagalog:</strong> {practiceInput}</p>
                <p className="baybayin-script">{transliterateToBaybayin(practiceInput)}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Interactive History === */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            className="interactive-history section-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <h2 className="section-title">🧭 Journey Through Baybayin</h2>
            <p className="intro-text">Discover how this ancient script shaped Filipino culture through stories, symbols, and sounds.</p>

            {/* === Card Modals === */}
            <AnimatePresence>
              {selectedCard && (
                <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.div className="modal-content" initial={{ scale: 0.8, y: -30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 30 }}>
                    <h3>{selectedCard.title}</h3>
                    <p>{selectedCard.details}</p>
                    <button className="close-modal-btn" onClick={() => setSelectedCard(null)}>Close</button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* === Cards === */}
            <div className="history-card-grid">
              {historyCards.map((card) => (
                <motion.div
                  key={card.id}
                  className={`history-card ${activeCard === card.id ? "active" : ""}`}
                  onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                  whileHover={{ scale: 1.05 }}
                >
                  {activeCard === card.id ? (
                    <motion.div className="card-content" initial={{ rotateY: 180 }} animate={{ rotateY: 0 }}>
                      <h4>{card.title}</h4>
                      <p>{card.content}</p>
                      <button
                        className="see-more-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCard(card);
                        }}
                      >
                        See More
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div className="card-front">
                      <img src={card.image} alt={card.title} />
                      <h4>{card.title}</h4>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* === Timeline === */}
            <div className="timeline-container">
              <h3>📜 Timeline of Baybayin</h3>
              <div className="timeline">
                {timeline.map((t, index) => (
                  <motion.div key={index} className="timeline-event" whileHover={{ scale: 1.05 }}>
                    <span className="timeline-year">{t.year}</span>
                    <p>{t.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* === Trivia === */}
            <div className="trivia-section">
              <button className="practice-btn" onClick={() => setShowTrivia(!showTrivia)}>
                {showTrivia ? "▲ Hide Trivia Quiz" : "🧠 Try Baybayin Trivia Quiz"}
              </button>

              <AnimatePresence>
                {showTrivia && (
                  <motion.div className="trivia-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {!quizFinished ? (
                      <>
                        <h4>{currentTrivia.q}</h4>
                        <div className="quiz-choices">
                          {currentTrivia.a.map((ans, i) => (
                            <button key={i} className="quiz-choice-btn" onClick={() => handleTriviaAnswer(ans)}>
                              {ans}
                            </button>
                          ))}
                        </div>
                        <p>Score: {score} / {trivia.length}</p>
                      </>
                    ) : (
                      <div className="quiz-results">
                        <h4>🎉 You finished the trivia!</h4>
                        <p>Your score: {score} / {trivia.length}</p>
                        <button className="retry-btn" onClick={resetTrivia}>Try Again</button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* === Full History Button Below Trivia === */}
            <div className="full-history-btn-container">
              <button
                className={`history-btn ${showFullHistory ? 'active' : ''}`}
                onClick={toggleFullHistory}
              >
                {showFullHistory ? '▲ Hide Full Written History' : '📖 Read Full History'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Full Baybayin History Section === */}
      <AnimatePresence>
        {showFullHistory && (
          <motion.div
            className="baybayin-history section-content"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="section-title">What Is Baybayin?</h3>
            <p>Baybayin is a script that predated the Spanish colonization of the Philippines in 1565...</p>

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

            {/* === Close Button === */}
            <button
              className="close-full-history-btn"
              onClick={() => setShowFullHistory(false)}
              style={{
                marginTop: "2rem",
                padding: "10px 20px",
                backgroundColor: "#8B4513",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Close Full History
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
