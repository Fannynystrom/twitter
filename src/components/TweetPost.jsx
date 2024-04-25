import React from "react";
// import styles from "../pages/Homepage/Homepage.module.css";
import styles from "./TweetPost.module.css";
import FollowButton from "./FollowButton";
import { deleteTweet, likeTweet } from "../API/TweetApi";

function TweetPost({ tweet, onDelete, onLike, isFollowing, onToggleFollow }) {
  const handleLike = async () => {
    try {
      const updatedTweet = await likeTweet(tweet._id);
      onLike(updatedTweet); // uppdaterar state i homepaaaage
    } catch (error) {
      console.error("Error liking tweet:", error);
    }
  };
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const user = JSON.parse(localStorage.getItem("user"));

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
        <div className={styles.tweetHeaderContent}>
          {tweet.createdBy.firstName} <em>@{tweet.createdBy.username}</em>
          <span className={styles.tweetRelativeTime}>
            &middot; {relativeTime}
          </span>
          <span className={styles.tweetMetadata}>
            {tweet.createdBy.username === user.username ? (
              ""
            ) : (
              <FollowButton
                userId={tweet.createdBy._id}
                isFollowing={isFollowing}
                onToggleFollow={onToggleFollow}
              />
            )}
          </span>
        </div>
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
  );
}

export default TweetPost;
