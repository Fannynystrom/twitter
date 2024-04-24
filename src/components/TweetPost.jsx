import React from "react";
// import styles from "../pages/Homepage/Homepage.module.css";
import styles from "./TweetPost.module.css";

import { deleteTweet, likeTweet } from "../API/TweetApi";

function TweetPost({ tweet, onDelete, onLike }) {
  const handleLike = async () => {
    try {
      const updatedTweet = await likeTweet(tweet._id);
      onLike(updatedTweet); // uppdaterar state i homepaaaage
    } catch (error) {
      console.error("Error liking tweet:", error);
    }
  };

  function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    return "nyss";
  }
  const relativeTime = timeSince(new Date(tweet.createdAt));

  const handleDelete = async () => {
    try {
      await deleteTweet(tweet._id);
      onDelete(tweet._id);
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };

  return (
    <div className={styles.tweetBox}>
      <div className={styles.tweetHeader}>
        <div className={styles.profileImg}></div>
        <h3 className={styles.tweetHeaderContent}>
          {tweet.createdBy.firstName} <em>@{tweet.createdBy.username}</em>
          <div className={styles.tweetMetadata}>
            <span className={styles.tweetRelativeTime}>
              &middot; {relativeTime}
            </span>
          </div>
        </h3>
      </div>
      <div className={styles.tweetBody}>
        <p>{tweet.content}</p>
      </div>
      <div className={styles.tweetButtons}>
        <button onClick={handleLike}>Gilla</button>
        <span>{tweet.likes} likes</span>
        <button>Kommentera</button>
        <button>Retweeta</button>
        <button onClick={handleDelete}>Radera</button>
      </div>
    </div>

    //   <div className={styles.tweetBox}>
    //     <div className={styles.tweetHeader}>
    //       <div className={styles.profileImg}></div>
    //       <div className={styles.tweetHeaderContent}>
    //         <h3>{tweet.createdBy.firstName}</h3>
    //         <em>@{tweet.createdBy.username}</em>
    //         <div className={styles.tweetMetadata}>
    //           <span className={styles.tweetRelativeTime}>
    //             &middot; {relativeTime}
    //           </span>
    //         </div>
    //       </div>
    //     </div>

    //     <div className={styles.tweetBody}>
    //       <p>{tweet.content}</p>
    //     </div>

    //     <div className={styles.tweetButtons}>
    //       <button onClick={handleLike}>Gilla</button>
    //       <span>{tweet.likes} likes</span>
    //       <button>Kommentera</button>
    //       <button>Retweeta</button>
    //       <button onClick={handleDelete}>Radera</button>
    //     </div>
    //   </div>
  );
}

export default TweetPost;
