import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import UserProfile from '../../components/UserProfile';
import axios from 'axios';
import SearchBar from "../../components/Searchbar";
import TrendingHashtags from "../../components/TrendingHashtags";
import styles from "./Homepage.module.css";
import TweetPost from "../../components/TweetPost";

const Profilepage = () => {
  const { userId: paramUserId } = useParams();
  const { user } = useContext(UserContext);
  const [profileUser, setProfileUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  //  localStorage för att hämta inloggad användares ID
  const userId = paramUserId || localStorage.getItem('userId');

 

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper">
      <div className="content">
      <h1>{user.firstName} @{user.username}</h1>

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
