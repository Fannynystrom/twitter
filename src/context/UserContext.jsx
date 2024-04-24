import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Assuming you have a session-based endpoint to get the current user
const CURRENT_USER_URL = "http://localhost:3000/api/users";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);

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
    try {
      const response = await axios.post(
        `${CURRENT_USER_URL}/follow/${userId}`,
        {},
        { withCredentials: true }
      );
      setFollowing((prev) => [...prev, userId]); // Update context state
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };
  const removeFollowing = async (userId) => {
    try {
      const response = await axios.post(
        `${CURRENT_USER_URL}/unfollow/${userId}`,
        {},
        { withCredentials: true }
      );
      setFollowing((prev) => prev.filter((id) => id !== userId)); // Update context state
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
        setFollowing,
        addFollowing,
        removeFollowing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
