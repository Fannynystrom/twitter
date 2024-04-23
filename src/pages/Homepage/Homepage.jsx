import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import Navbar from "../../components/Navbar";
import "../../index.css";
import SearchBar from "../../components/Searchbar"
import CreateTweet from "../../components/CreateTweets";
import TweetPost from "../../components/TweetPost";
import { getTweets } from '../../API/TweetApi'; 


function Homepage() {
  const [tweets, setTweets] = useState([]); 
  const [likedNotification, setLikedNotification] = useState(false); 

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const loadedTweets = await getTweets();
        setTweets(loadedTweets);
      } catch (error) {
        console.error('Fel när tweets skulle hämtas:', error);
      }
    };
    fetchTweets();
  }, []);

//lägger tweet på homepage
  const addTweet = (newTweet) => {
    setTweets(prevTweets => [...prevTweets, newTweet]);
  };
//raderar på homepage
const removeTweet = (id) => {
    setTweets(tweets => tweets.filter(tweet => tweet._id !== id));
  };
//likeeees
  const onLike = (updatedTweet) => {
    setTweets(tweets =>
      tweets.map(tweet =>
        tweet._id === updatedTweet._id ? updatedTweet : tweet
      )
    );
    
  };


  

  return (
    <div className="wrapper">
      <div className="content">
        <div className={styles.tweetFeedContainer}>
          <div className={styles.tweetFeed}>
          <CreateTweet addTweet={addTweet} />
      {tweets.map((tweet, index) => (
        <TweetPost key={tweet._id} tweet={tweet} onLike={onLike} onDelete={removeTweet} />
      ))}
          </div>
        </div>
      </div>
      <div className="sidebar">
        <SearchBar />
        {/* <TrendingHashtags /> */}
      </div>
      <div className="footer">FOOTER</div>
    </div>
  );
}

export default Homepage;
