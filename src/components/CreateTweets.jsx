import React, { useState } from "react";
import { createTweet } from '../API/TweetApi';  
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
      addTweet(response);  // matchar med funktionen i homepage så tweeten syns där
      setContent('');  // rensar boxen efter tweeten har skapats
    } catch (error) {
      console.error('Fel när tweet skulle skapas:', error);
    }
  };

  return (
    <div className={styles.createTweetBox}>
      <div className={styles.profileImg} /> 
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
