import React, { useContext } from "react";
// import styles from "../pages/Homepage/Homepage.module.css";
import styles from "./TweetPost.module.css";
import FollowButton from "./FollowButton";
import { deleteTweet, likeTweet } from "../API/TweetApi";
import { UserContext } from "../context/UserContext";
import profileAvatar from "../assets/woffer.png";

function TweetPost({ tweet, onDelete, onLike, onToggleFollow }) {
  const { user, isFollowing } = useContext(UserContext);
  // const isAuthenticated = localStorage.getItem("isAuthenticated");
  // const user = JSON.parse(localStorage.getItem("user"));

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

  const following = isFollowing(tweet.createdBy._id);

  return (
    <div className={styles.tweetBox}>
      <div className={styles.tweetHeader}>
        <img
          src={profileAvatar}
          alt="profileavatar"
          className={styles.profileImg}
        />
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
                isFollowing={isFollowing(tweet.createdBy._id)}
                onToggleFollow={onToggleFollow}
                className={styles.followingBtnFeed}
              />
            )}
          </span>
        </div>
      </div>
      <div className={styles.tweetBody}>
        <p>{tweet.content}</p>
      </div>
    </div>
  );
}

export default TweetPost;
