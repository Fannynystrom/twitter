import React, { useState, useEffect, useContext } from "react";
import styles from "./Homepage.module.css";
import Navbar from "../../components/Navbar";
import "../../index.css";

import SearchBar from "../../components/Searchbar";
import CreateTweet from "../../components/CreateTweets";
import TweetPost from "../../components/TweetPost";
import TrendingHashtags from "../../components/TrendingHashtags";

import { createTweet, getTweets } from "../../API/TweetApi";
import { UserContext } from "../../context/UserContext";

function Homepage() {
  const [tweets, setTweets] = useState([]);
  const [likedNotification, setLikedNotification] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const loadedTweets = await getTweets();
        setTweets(loadedTweets);
        console.log(loadedTweets);
      } catch (error) {
        console.error("Fel när tweets skulle hämtas:", error);
      }
    };
    fetchTweets();
  }, []);

  //lägger tweet på homepage
  // const addTweet = (newTweet) => {
  //   setTweets((prevTweets) => [...prevTweets, newTweet]);
  // };

  // Lägger till kontroller här
  if (!user) {
    return <div>Loading user data...</div>; // Eller någon annan indikation på att data laddas eller inte är tillgänglig
  }

  const addTweet = async (content, userName) => {
    try {
      const newTweet = await createTweet(content, userName); // Antag att API förväntar sig användarnamnet som en del av anropet
      setTweets((prevTweets) => [...prevTweets, newTweet]);
    } catch (error) {
      console.error("Failed to create tweet:", error);
    }
  };

  // //raderar på homepage
  // const removeTweet = (id) => {
  //   setTweets((tweets) => tweets.filter((tweet) => tweet._id !== id));
  // };
  // //likeeees
  // const onLike = (updatedTweet) => {
  //   setTweets((tweets) =>
  //     tweets.map((tweet) =>
  //       tweet._id === updatedTweet._id ? updatedTweet : tweet
  //     )
  //   );
  // };

  return (
    <div className="wrapper">
      <div className="content">
        <div className={styles.tweetFeedContainer}>
          <div className={styles.tweetFeed}>
            <CreateTweet addTweet={addTweet} />
            {tweets.map((tweet, index) => (
              <TweetPost
                key={tweet._id}
                createdBy={
                  tweet.createdBy ? tweet.createdBy : "Okänd användare"
                }
                tweet={tweet}
                // onLike={onLike}
                // onDelete={removeTweet}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="sidebar">
        <SearchBar />
        <TrendingHashtags />
      </div>
      <div className="footer">FOOTER</div>
    </div>
  );
}

export default Homepage;
