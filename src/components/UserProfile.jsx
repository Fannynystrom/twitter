// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import TweetPost from "./TweetPost";
// import axios from "axios";
// import FollowButton from "./FollowButton"; // Assuming you have a FollowButton component

// const UserProfile = () => {
//   const [profileUser, setProfileUser] = useState(null);
//   const [tweets, setTweets] = useState([]);
//   const { userId } = useParams();
//   const { user, following, addFollowing, removeFollowing } =
//     useContext(UserContext);

//   const [isFollowing, setIsFollowing] = useState(following.includes(userId));

//   useEffect(() => {
//     fetchProfileData();
//   }, [userId]);

//   const fetchProfileData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/users/${userId}`
//       );
//       console.log("API response:", response.data);
//       setProfileUser(response.data.user);
//       setTweets(response.data.tweets);
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   const handleToggleFollow = () => {
//     if (isFollowing) {
//       removeFollowing(userId);
//       setIsFollowing(false);
//     } else {
//       addFollowing(userId);
//       setIsFollowing(true);
//     }
//   };

//   if (!profileUser) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>
//         {user.firstName} @{user.username}
//       </h1>
//       <FollowButton
//         userId={userId}
//         isFollowing={isFollowing}
//         onToggleFollow={handleToggleFollow}
//       />
//       <p>Following: {following.length}</p>
//       {Array.isArray(tweets) &&
//         tweets.map((tweet) => (
//           <TweetPost
//             key={tweet._id}
//             tweet={tweet}
//             isFollowing={isFollowing}
//             onToggleFollow={handleToggleFollow}
//           />
//         ))}
//     </div>
//   );
// };

// export default UserProfile;



// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import TweetPost from "./TweetPost";
// import axios from "axios";
// import FollowButton from "./FollowButton"; // Assuming you have a FollowButton component

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [tweets, setTweets] = useState([]);
//   const { userId } = useParams();
//   const { user: loggedInUser, following, addFollowing, removeFollowing } =
//     useContext(UserContext);

//   const [isFollowing, setIsFollowing] = useState(following.includes(userId));

//   useEffect(() => {
//     fetchProfileData();
//   }, [userId]);

//   const fetchProfileData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/users/${userId}`
//       );
//       console.log("API response:", response.data);
//       setUser(response.data);
//       setTweets(response.data.tweets);
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   const handleToggleFollow = () => {
//     if (isFollowing) {
//       removeFollowing(userId);
//       setIsFollowing(false);
//     } else {
//       addFollowing(userId);
//       setIsFollowing(true);
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>
//         {user.firstName} {user.lastName} @{user.username}
//       </h1>
//       <p>Email: {user.email}</p>
//       <p>About: {user.about}</p>
//       <p>Occupation: {user.occupation}</p>
//       <p>Hometown: {user.hometown}</p>
//       <p>Website: {user.website}</p>
//       <p>Registration Date: {new Date(user.registrationDate).toLocaleDateString()}</p>
//       <FollowButton
//         userId={userId}
//         isFollowing={isFollowing}
//         onToggleFollow={handleToggleFollow}
//       />
//       <p>Following: {following.length}</p>
//       {Array.isArray(tweets) &&
//         tweets.map((tweet) => (
//           <TweetPost
//             key={tweet._id}
//             tweet={tweet}
//             isFollowing={isFollowing}
//             onToggleFollow={handleToggleFollow}
//           />
//         ))}
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import TweetPost from "./TweetPost";
import axios from "axios";
import FollowButton from "./FollowButton";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const { userId } = useParams();
  const { user: loggedInUser, following, addFollowing, removeFollowing } =
    useContext(UserContext);

  const [isFollowing, setIsFollowing] = useState(following.includes(userId));

  useEffect(() => {
    fetchProfileData();
  }, [userId]);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${userId}`
      );
      setUser(response.data.user);
      setTweets(response.data.tweets);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleToggleFollow = () => {
    if (isFollowing) {
      removeFollowing(userId);
      setIsFollowing(false);
    } else {
      addFollowing(userId);
      setIsFollowing(true);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div className="profile-header">
        <img src={`/images/avatar.jpg`} alt="Avatar" className="avatar" />
        <h1>
          {user.firstName} {user.lastName} @{user.username}
        </h1>
      </div>
      <div className="profile-info">
        <p>Email: {user.email}</p>
        <p>About: {user.about}</p>
        <p>Occupation: {user.occupation}</p>
        <p>Hometown: {user.hometown}</p>
        <p>Website: {user.website}</p>
        <p>Registration Date: {new Date(user.registrationDate).toLocaleDateString()}</p>
        <FollowButton
          userId={userId}
          isFollowing={isFollowing}
          onToggleFollow={handleToggleFollow}
        />
        <p>Following: {following.length}</p>
      </div>
      <div className="tweets">
        {Array.isArray(tweets) &&
          tweets.map((tweet) => (
            <TweetPost
              key={tweet._id}
              tweet={tweet}
              isFollowing={isFollowing}
              onToggleFollow={handleToggleFollow}
            />
          ))}
      </div>
    </div>
  );
};


export default UserProfile;
