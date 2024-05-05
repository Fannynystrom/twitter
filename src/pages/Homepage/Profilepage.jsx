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
<<<<<<< HEAD
=======
import CollapsibleList from "../../components/CollapsibleList";
import Footer from "../../components/Footer";
import profileAvatar from "../../assets/woffer.png";
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a

const Profilepage = () => {
  const { userId: paramUserId } = useParams();
  const { user, isLoggedIn, users } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);
<<<<<<< HEAD
  const [showUser, setShowUser] = useState([]);
  const [displayUser, setDisplayUser] = useState([]);
=======
  const [showUser, setShowUser] = useState({});
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (paramUserId) {
<<<<<<< HEAD
        console.log("paramuserId is set to ", paramUserId);
        const findUser = users.find(
          (userOfUsers) => userOfUsers._id == paramUserId
        );
        console.log("this search", findUser);
        if (findUser) {
          setShowUser(findUser);
        }
        console.log("showwuser", showUser);
=======
        const findUser = users.find(
          (userOfUsers) => userOfUsers._id == paramUserId
        );
        if (findUser) {
          setShowUser(findUser);
        }
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a
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
<<<<<<< HEAD
            `http://localhost:3000/tweets/${showUser._id}`
=======
            `http://localhost:3000/api/tweets/${showUser._id}`
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a
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
<<<<<<< HEAD
        <h3>
          {showUser.firstName} <em>@{showUser.username}</em>
        </h3>
        <p>Här ska det stå profiltext</p>
=======
        <div className="profileArea">
          <div className="profileHead">
            <div className="profilePageImg">
              <img src={profileAvatar} alt="profileavatar" />
            </div>
            <div className="profilePageTitle">
              <h3>
                {showUser.firstName} <br />
                <em>@{showUser.username}</em>
              </h3>
            </div>
          </div>
          <div className="profileBody">
            <p>
              Om mig: <em>{showUser.about || "No details provided."}</em>
            </p>
            <p>
              Sysselsättning: <em>{showUser.work || "No details provided."}</em>
            </p>
            <p>
              Hemstad:<em> {showUser.hometown || "No details provided."}</em>
            </p>
            <p>
              Hemsida:{" "}
              <em>
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
              </em>{" "}
            </p>
          </div>
        </div>
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

>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a
        <div className="profileTweetsWrapper">
          <h4>@{showUser.username}'s tweets:</h4>
          {tweets.map((tweet) => (
            <TweetPost key={tweet._id} tweet={tweet} />
          ))}
        </div>
<<<<<<< HEAD
        <div className="followList">
          <h3>{showUser.username} följer:</h3>
=======
      </div>
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a

          {showUser.following?.map((followProfile) => (
            <li key={followProfile._id}>
              {followProfile.username}
              {showUser._id === user._id ? (
                <FollowButton
                  userId={followProfile._id}
                  className={styles.followingBtnFeed}
                />
              ) : (
                ""
              )}
            </li>
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
