import { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [currentWord, setCurrentWord] = useState({ en: "Loading...", tr: "Yükleniyor..." });
  const [isFlipped, setIsFlipped] = useState(false);

  const fetchNewWord = async () => {
    setIsFlipped(false);
    setCurrentWord({ en: "Loading...", tr: "Yükleniyor..." });

    try {
      const wordResponse = await fetch('https://random-word-api.herokuapp.com/word?number=1');
      const wordData = await wordResponse.json();
      const randomEnglishWord = wordData[0];

      const translationResponse = await fetch(`https://api.mymemory.translated.net/get?q=${randomEnglishWord}&langpair=en|tr`);
      const translationData = await translationResponse.json();
      const turkishTranslation = translationData.responseData.translatedText;

      setCurrentWord({ 
        en: randomEnglishWord, 
        tr: turkishTranslation 
      });

    } catch (error) {
      console.error("Veri çekilirken hata oluştu:", error);
      setCurrentWord({ en: "Error", tr: "Bağlantı Hatası" });
    }
  };

  useEffect(() => {
    fetchNewWord();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="app-container" style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '50px' }}>
      <h1>Kelime Öğren</h1>
      
      <div className="flashcard" onClick={handleFlip}
        style={{ 
          border: '2px solid #646cff', 
          padding: '60px', 
          margin: '20px auto', 
          maxWidth: '300px',
          cursor: 'pointer', 
          borderRadius: '15px',
          backgroundColor: isFlipped ? '#f9f9f9' : '#e0e7ff',
          transition: 'all 0.3s ease'
        }}
      >
        <h2>{isFlipped ? currentWord.tr : currentWord.en}</h2>
        <p className="hint">(Çeviriyi görmek için karta tıkla)</p>
      </div>

      <button className="next-button" onClick={fetchNewWord} style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#646cff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}>
        Yeni Kelime Çek
      </button>
<br/> <br/>
      <footer style={{ marginTop: '20px', fontSize: '14px', color: '#888' } }>
        Developed by Yakup Yılmaz. <a href="https://github.com/JacoBeruS" target='_blank'>GitHub</a>
      </footer>
    </div>
  );
}

export default App;
