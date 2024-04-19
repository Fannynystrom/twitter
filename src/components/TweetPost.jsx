import React from "react";
import styles from "../pages/Homepage/Homepage.module.css";
import { deleteTweet } from '../API/TweetApi';  
import { format } from 'date-fns';
import { likeTweet } from '../API/TweetApi'; 

function formatDate(date) {
    return format(date, "eeee, MMMM do, yyyy 'at' h:mm:ss a");
}

function TweetPost({ tweet, onDelete, onLike }) {

    const handleLike = async () => {
        try {
          const updatedTweet = await likeTweet(tweet._id); 
          onLike(updatedTweet); // uppdaterar state i homepaaaage
        } catch (error) {
          console.error('Error liking tweet:', error);
        }
      };

    const formattedDate = format(new Date(tweet.createdAt), "eeee, MMMM do, yyyy 'at' h:mm:ss a");  // Anpassat format

    const handleDelete = async () => {
        try {
          await deleteTweet(tweet._id);
          onDelete(tweet._id);
        } catch (error) {
          console.error('Error deleting tweet:', error);
        }
      };



  return (
    <div className={styles.tweetBox}>
      <div className="tweetHeader">
      <h3>Laban Labansson</h3> <em>@laban</em>
      <div className={styles.tweetDate}>{formattedDate}</div>
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
