import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import UserProfile from "../../components/UserProfile";
import FollowButton from "../../components/FollowButton";
import axios from "axios";
import SearchBar from "../../components/Searchbar";
import TrendingHashtags from "../../components/TrendingHashtags";
//import styles from "./Homepage.module.css";
import TweetPost from "../../components/TweetPost";
import styles from "../../components/TweetPost.module.css";

const Profilepage = () => {
  const { userId: paramUserId } = useParams();
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);

  //  localStorage för att hämta inloggad användares ID
  const userId = paramUserId || localStorage.getItem("user")._id;
  //console.log("user info", user);

  useEffect(() => {
    if (user && user._id) {
      const fetchTweets = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/tweets/${user._id}`
          );
          setTweets(response.data);
        } catch (error) {
          console.error("Error fetching user tweets:", error);
        }
      };

      fetchTweets();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper">
      <div className="content">
        <h1>
          {user.firstName} <em>@{user.username}</em>
        </h1>
        {tweets.map((tweet) => (
          <TweetPost key={tweet._id} tweet={tweet} />
        ))}
        <h2>{user.username} följer:</h2>
        {user.following.map((followProfile) => (
          <li key={followProfile._id}>
            {followProfile.username}
            <FollowButton userId={followProfile._id} />
          </li>
        ))}
      </div>
      <div className="sidebar">
        <SearchBar />
        <TrendingHashtags />
      </div>
      <div className="footer">FOOTER</div>
    </div>
  );
};

export default Profilepage;
