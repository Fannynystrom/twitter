import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Assuming you have a session-based endpoint to get the current user
const CURRENT_USER_URL = "http://localhost:3000/api/users";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem("user")) || {
    following: [],
  };

  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);

  const isFollowing = (userId) => {
    return following.includes(userId);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(CURRENT_USER_URL, {
          withCredentials: true, // Ensuring cookies are sent with the request
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const addFollowing = async (userId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.post(
        `${CURRENT_USER_URL}/${userId}/follow`,
        {},
        { withCredentials: true }
      );
      setFollowing((prev) => [...prev, userId]); // Update context state
      const updatedUser = { ...user, following: [...user.following, userId] };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      console.log(updatedUser);
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };
  const removeFollowing = async (userId) => {
    try {
      const response = await axios.post(
        `${CURRENT_USER_URL}/${userId}/unfollow`,
        {},
        { withCredentials: true }
      );
      const newFollowing = following.filter((id) => id !== userId);
      setFollowing(newFollowing);
      // Uppdatera även localStorage för att hålla den synkroniserad
      const updatedUser = { ...user, following: newFollowing };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        following,
        isFollowing,
        setFollowing,
        addFollowing,
        removeFollowing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
