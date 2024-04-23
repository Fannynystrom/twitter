import React, { useState, useContext } from "react";
import { createTweet } from "../API/TweetApi";
import styles from "../pages/Homepage/Homepage.module.css";
import { UserContext } from "../context/UserContext";

function CreateTweet({ addTweet }) {
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);

  // const handleTweetCreation = async () => {
  //   if (!content.trim()) {
  //     alert("Din tweet kan inte vara tom.");
  //     return;
  //   }
  //   try {
  //     const response = await createTweet(content);
  //     addTweet(response); // matchar med funktionen i homepage så tweeten syns där
  //     setContent(""); // rensar boxen efter tweeten har skapats
  //   } catch (error) {
  //     console.error("Fel när tweet skulle skapas:", error);
  //   }
  // };

  const handleTweetCreation = async () => {
    if (!content.trim()) {
      alert("Din tweet kan inte vara tom.");
      return;
    }
    // if (!user) {
    //   alert("You must be logged in to post a tweet.");
    //   return;
    // }
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      // Call the addTweet function with content and user ID
      await addTweet(content, userData._id);
      setContent(""); // Clear the text area after the tweet is created
    } catch (error) {
      console.error("Fel när tweet skulle skapas:", error);
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
