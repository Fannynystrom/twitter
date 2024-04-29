import React, { useState, useContext } from "react";
import { createTweet } from "../API/TweetApi";
import styles from "./CreateTweet.module.css";
import { UserContext } from "../context/UserContext";

function CreateTweet({ addTweet }) {
  const maxTweetLength = 140;
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);

  const handleContentChange = (e) => {
    setContent(e.target.value.substring(0, maxTweetLength));
  };

  const handleTweetCreation = async () => {
    if (!content.trim()) {
      alert("Din tweet kan inte vara tom.");
      return;
    }
    if (!user) {
      alert("You must be logged in to post a tweet.");
      return;
    }
    try {
      const userData = JSON.parse(localStorage.getItem("user"));

      await addTweet(content, userData._id);

      setContent("");
    } catch (error) {
      console.error("Fel när tweet skulle skapas:", error);
    }
  };

  const charCountClass =
    content.length > maxTweetLength - 10
      ? `${styles.charCount} ${styles.charCountWarning}`
      : styles.charCount;

  return (
    <div className={styles.createTweetBox}>
      <div className={styles.profileImg}></div>
      <textarea
        className={styles.tweetInput}
        placeholder="Skriv din woof här"
        value={content}
        onChange={handleContentChange}
        maxLength={maxTweetLength}
      />
      <div className={charCountClass}>
        {maxTweetLength - content.length} tecken kvar
      </div>
      <button className={styles.tweetButton} onClick={handleTweetCreation}>
        Woof
      </button>
    </div>
  );
}

export default CreateTweet;
