import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import UserProfile from "../../components/UserProfile";
import FollowButton from "../../components/FollowButton";
import axios from "axios";
import SearchBar from "../../components/Searchbar";
import TrendingHashtags from "../../components/TrendingHashtags";
import TweetPost from "../../components/TweetPost";
import styles from "../../components/FollowButton";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import CollapsibleList from "../../components/CollapsibleList";
import Footer from "../../components/Footer";

const Profilepage = () => {
  const { userId: paramUserId } = useParams();
  const { user, isLoggedIn, users } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);
  const [showUser, setShowUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (paramUserId) {
        const findUser = users.find(
          (userOfUsers) => userOfUsers._id == paramUserId
        );
        if (findUser) {
          setShowUser(findUser);
        }
      } else {
        setShowUser(user);
      }
    }
  }, [paramUserId]);

  useEffect(() => {
    if (showUser && showUser._id) {
      const fetchTweets = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/tweets/${showUser._id}`
          );
          setTweets(response.data || []);
        } catch (error) {
          console.error("Error fetching user tweets:", error);
          setTweets([]);
        }
      };

      fetchTweets();
    }
  }, [showUser]);

  if (!showUser) {
    return <div>Loading...</div>;
  }
  const isOwner = showUser._id === user._id;

  return (
    <div className="wrapper">
      <div className="content">
        <h3>
          {showUser.firstName} <em>@{showUser.username}</em>
        </h3>
        <p>About: {showUser.about || "No details provided."}</p>
        <p>Work: {showUser.work || "No details provided."}</p>
        <p>Hometown: {showUser.hometown || "No details provided."}</p>
        <p>
          Website:{" "}
          {showUser.website ? (
            <a
              href={showUser.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {showUser.website}
            </a>
          ) : (
            "No details provided."
          )}
        </p>
        <div className="profileListsContainer">
          <CollapsibleList
            title={`${showUser.username} följer`}
            users={showUser.following || []}
            isOwner={isOwner}
            className="collapsibleList"
          />
          <CollapsibleList
            title={`${showUser.username}'s följare`}
            users={showUser.followers || []}
            className="collapsibleList"
          />
        </div>

        <div className="profileTweetsWrapper">
          <h4>@{showUser.username}'s tweets:</h4>
          {tweets.map((tweet) => (
            <TweetPost key={tweet._id} tweet={tweet} />
          ))}
        </div>
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
};

export default Profilepage;
