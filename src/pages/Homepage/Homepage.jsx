import React, { useState, useEffect, useContext } from "react";
import styles from "./Homepage.module.css";
import Navbar from "../../components/Navbar";
import "../../index.css";
import SearchBar from "../../components/Searchbar";
import CreateTweet from "../../components/CreateTweet";
import TweetPost from "../../components/TweetPost";
import TrendingHashtags from "../../components/TrendingHashtags";

import { createTweet, getTweets } from "../../API/TweetApi";
import { UserContext } from "../../context/UserContext";

function Homepage() {
  const [tweets, setTweets] = useState([]);
  const { user, addFollowing, removeFollowing } = useContext(UserContext);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const loadedTweets = await getTweets();
        setTweets(loadedTweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };
    fetchTweets();
  }, []);

  //FILTRERA ANVÄNDARE - avvaktar med denna tills vi får profilesidan att fungera
  // useEffect(() => {
  //   const fetchTweets = async () => {
  //     try {
  //       const loadedTweets = await getTweets();
  //       // Filtrera tweets för att endast inkludera de från användare som den inloggade användaren följer
  //       const filteredTweets = loadedTweets.filter((tweet) =>
  //         user.following.includes(tweet.createdBy._id)
  //       );
  //       setTweets(filteredTweets);
  //     } catch (error) {
  //       console.error("Error fetching tweets:", error);
  //     }
  //   };
  //   if (user && user.following) {
  //     fetchTweets();
  //   }
  // }, [user]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const addTweet = async (content, userName) => {
    try {
      const newTweet = await createTweet(content, userName);
      setTweets((prevTweets) => [newTweet, ...prevTweets]);
    } catch (error) {
      console.error("Failed to create tweet:", error);
    }
  };

  //VISA FILTRERAD TWEET - avvaktar med denna
  // const addTweet = async (content, userName) => {
  //   try {
  //     const newTweet = await createTweet(content, userName);
  //     // Endast lägg till tweet om användaren följer skaparen av tweeten eller om det är användarens egna tweets
  //     if (
  //       user.following.includes(newTweet.createdBy._id) ||
  //       user._id === newTweet.createdBy._id
  //     ) {
  //       setTweets((prevTweets) => [newTweet, ...prevTweets]);
  //     }
  //   } catch (error) {
  //     console.error("Failed to create tweet:", error);
  //   }
  // };

  return (
    <div className="wrapper">
      <div className="content">
        <CreateTweet addTweet={addTweet} />
        {tweets.map((tweet) => (
          <TweetPost key={tweet._id} tweet={tweet} />
        ))}
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
