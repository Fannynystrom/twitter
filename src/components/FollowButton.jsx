import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ".././index.css";
import styles from "./FollowButton.module.css";

const FollowButton = ({ userId, className }) => {
  const { isFollowing, addFollowing, removeFollowing } =
    useContext(UserContext);

  const following = isFollowing(userId);

  const handleFollowClick = () => {
    if (following) {
      removeFollowing(userId);
    } else {
      addFollowing(userId);
    }
  };

  return (
    <button onClick={handleFollowClick} className={className}>
      {following ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
