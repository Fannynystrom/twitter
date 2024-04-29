import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import UserProfile from "../../components/UserProfile";
import ProfilePictureUpload from "../../components/ProfilePicture"; 
// import styles from "./profilepagemodule.css";
import axios from "axios";
import SearchBar from "../../components/Searchbar";
import TrendingHashtags from "../../components/TrendingHashtags";
//import styles from "./Homepage.module.css";
import TweetPost from "../../components/TweetPost";
import styles from "../../components/TweetPost.module.css"

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
          const response = await axios.get(`http://localhost:3000/tweets/${user._id}`);
          setTweets(response.data);
        } catch (error) {
          console.error('Error fetching user tweets:', error);
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
        <div className={styles.profileHeader}>
        <ProfilePictureUpload />
          <h1>{user.firstName} <span>@{user.username}</span></h1>
          <div className={styles.userInfo}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>About:</strong> {user.about}</p>
            <p><strong>Occupation:</strong> {user.occupation}</p>
            <p><strong>Hometown:</strong> {user.hometown}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <p><strong>Registration Date:</strong> {new Date(user.registrationDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className={styles.tweetsContainer}>
          {tweets.map(tweet => (
            <TweetPost key={tweet._id} tweet={tweet} />
          ))}
        </div>
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

