import React, { useState, useContext } from "react";
import styles from "./CreateTweet.module.css";
import { UserContext } from "../context/UserContext";
import profileAvatar from "../assets/woffer.png";

function CreateTweet({ addTweet }) {
  console.log(profileAvatar);
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
      const userData = user ? JSON.parse(localStorage.getItem("user")) : null;

      if (userData && content.trim()) {
        await addTweet(content, userData._id);
        setContent("");
      } else {
        alert("You must be logged in and the tweet cannot be empty.");
      }
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
      <div className={styles.profileImg}>
        <img src={profileAvatar} alt="profileavatar" />
      </div>
      <textarea
        className={styles.tweetInput}
        placeholder="Skriv din woof här"
        value={content}
        onChange={handleContentChange}
        maxLength={maxTweetLength}
        id="woofpost"
      />
      <div className={charCountClass}>
        {maxTweetLength - content.length} tecken kvar
      </div>
      <button
        id="woofsubmit"
        className={styles.tweetButton}
        onClick={handleTweetCreation}
      >
        Woof
      </button>
    </div>
  );
}

export default CreateTweet;
