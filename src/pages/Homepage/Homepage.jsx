import React, { useState, useEffect, useContext } from "react";
import styles from "./Homepage.module.css";
import Navbar from "../../components/Navbar";
import "../../index.css";
import SearchBar from "../../components/Searchbar";
import CreateTweet from "../../components/CreateTweet";
import TweetPost from "../../components/TweetPost";
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

  //tog bort denna pga den sparade aldrig fullständiga tweeten
  // const addTweet = (newTweet) => {
  //   setTweets((prevTweets) => [...prevTweets, newTweet]);
  // };

  // En extragrej, bara för att inte allt ska krascha om ingen användare finns
  if (!user) {
    return <div>Loading user data...</div>;
  }

  const addTweet = async (content, userName) => {
    try {
      const newTweet = await createTweet(content, userName); // Antag att API förväntar sig användarnamnet som en del av anropet
      setTweets((prevTweets) => [...prevTweets, newTweet]);
    } catch (error) {
      console.error("Failed to create tweet:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="content">
        <CreateTweet addTweet={addTweet} />
        {tweets.map((tweet, index) => (
          <TweetPost
            key={tweet._id}
            createdBy={tweet.createdBy ? tweet.createdBy : "Okänd användare"}
            tweet={tweet}
            // onLike={onLike}
            // onDelete={removeTweet}
          />
        ))}
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
