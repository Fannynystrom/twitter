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

  const [user, setUser] = useState(initialUser);
  const [following, setFollowing] = useState(initialUser?.following || []);

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
        setFollowing(response.data.following || []);
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
        { userId: user._id }, // Skicka med userId om det behövs för autentisering/verifiering
        { withCredentials: true }
      );

      // Uppdatera context state och localStorage med den returnerade användaren
      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser); // Antag att setUser är tillgängligt via useContext(UserContext)
      setFollowing(updatedUser.following); // Uppdatera din following state om nödvändigt

      console.log("Updated user with new following:", updatedUser);
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const removeFollowing = async (userId) => {
    try {
      const response = await axios.post(
        `${CURRENT_USER_URL}/${userId}/unfollow`,
        { userId: user._id }, // Skicka med userId för verifiering
        { withCredentials: true }
      );

      // Uppdatera context state och localStorage med den returnerade användaren
      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser); // Antag att setUser är tillgängligt via useContext(UserContext)
      setFollowing(updatedUser.following); // Uppdatera din following state

      console.log("Updated user after unfollowing:", updatedUser);
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
