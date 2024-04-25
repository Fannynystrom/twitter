import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const FollowButton = ({ userId }) => {
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
    <button onClick={handleFollowClick}>
      {following ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
