import React from "react";
import styles from "../pages/Homepage/Homepage.module.css";

//import styles from "./Homepage.module.css";

function TweetPost({ tweet }) {
  return (
    <div className={styles.tweetBox}>
      <div className="tweetHeader">
      <h3>Laban Labansson</h3> <em>@laban</em>
      </div>
      <div className={styles.tweetBody}>
        <p>{tweet.content}</p>
      </div>
      <div className={styles.tweetButtons}>
        <button>Gilla</button>
        <button>Kommentera</button>
        <button>Retweeta</button>
      </div>
    </div>
  );
}

export default TweetPost;
