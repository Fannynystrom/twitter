import React, { useState } from "react";
import { createTweet } from '../API/TweetApi';  // Justera sökvägen baserat på din projektsstruktur
import styles from "../pages/Homepage/Homepage.module.css";

function CreateTweet({ addTweet }) {
  const [content, setContent] = useState('');

  const handleTweetCreation = async () => {
    if (!content.trim()) {
      alert('Din tweet kan inte vara tom.');
      return;
    }
    try {
      const response = await createTweet(content);
      addTweet(response);  // Funktionen för att lägga till den nya tweeten i listan i HomePage
      setContent('');  // Rensar textfältet efter en tweet har skapats
    } catch (error) {
      console.error('Fel när tweet skulle skapas:', error);
    }
  };

  return (
    <div className={styles.createTweetBox}>
      <div className={styles.profileImg} /> {/* Om du har en profilbild, säkerställ att denna är korrekt hanterad */}
      <div className={styles.createInput}>
        <textarea
          placeholder="Skriv din tweet här"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleTweetCreation}>Tweet</button>
    </div>
  );
}

export default CreateTweet;
