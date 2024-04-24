import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const FollowButton = ({ userId, isFollowing, onToggleFollow }) => {
  const { user } = useContext(UserContext);
  if (!user) return null; // Ensure there's a logged-in user

  const handleFollowClick = async () => {
    const action = isFollowing ? "unfollow" : "follow";
    try {
      await fetch(`/api/users/${userId}/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Assume your user context holds the auth token
        },
      });
      onToggleFollow(userId, !isFollowing); // This function needs to update the state that tracks following status
    } catch (error) {
      console.error(`Error updating follow status: ${error}`);
    }
  };

  return (
    <button onClick={handleFollowClick}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
