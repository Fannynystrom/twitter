import React, { useState, useEffect, useContext } from "react";
// import styles from "./Homepage.module.css";
// import Navbar from "../../components/Navbar";
import "../../index.css";
import SearchBar from "../../components/Searchbar";
import CreateTweet from "../../components/CreateTweet";
import TweetPost from "../../components/TweetPost";
import TrendingHashtags from "../../components/TrendingHashtags";
import { createTweet, getTweets } from "../../API/TweetApi";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

function Homepage() {
  const [tweets, setTweets] = useState([]);
  const { user, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const fetchTweets = async () => {
        try {
          const loadedTweets = await getTweets();
          if (user && user.following.length > 0) {
            const followingIds = user.following.map((follow) => follow._id); // filtrera enbart de man följers IDn
            const filteredTweets = loadedTweets.filter(
              (tweet) => followingIds.includes(tweet.createdBy._id) // Filtrera tweetsen därefter
            );
            setTweets(filteredTweets);
          } else {
            setTweets([]);
          }
        } catch (error) {
          console.error("Error fetching tweets:", error);
        }
      };
      fetchTweets();
    }
  }, [isLoggedIn, user, navigate]);

  const addTweet = async (content, userName) => {
    try {
      const newTweet = await createTweet(content, userName);
      if (
        user.following.includes(newTweet.createdBy._id) ||
        user._id === newTweet.createdBy._id
      ) {
        setTweets((prevTweets) => [newTweet, ...prevTweets]);
      }
    } catch (error) {
      console.error("Failed to create tweet:", error);
    }
  };

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
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;
