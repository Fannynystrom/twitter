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
  const [likedNotification, setLikedNotification] = useState(false);
  const { user, following, setFollowing } = useContext(UserContext);

  const isFollowing = (userId) => following.includes(userId);

  const toggleFollow = (userId, willFollow) => {
    setFollowing((current) => {
      return willFollow
        ? [...current, userId]
        : current.filter((id) => id !== userId);
    });
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(CURRENT_USER_URL, {
        withCredentials: true, // Ensuring cookies are sent with the request
      });
      console.log("User data fetched:", response.data); // Check what you're actually getting back
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

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

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const addTweet = async (content, userName) => {
    try {
      const newTweet = await createTweet(content, userName); 
      setTweets((prevTweets) => [...prevTweets, newTweet]);
    } catch (error) {
      console.error("Failed to create tweet:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="content">
        <CreateTweet addTweet={addTweet} />
        {tweets.map((tweet) => (
          <TweetPost
            key={tweet._id}
            tweet={tweet}
            // onDelete={removeTweet} // Se till att du har denna funktion definierad
            // onLike={handleLike} // Se till att du har denna funktion definierad
            isFollowing={isFollowing(tweet.createdBy._id)}
            onToggleFollow={toggleFollow}
          />
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
