import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Assuming you have a session-based endpoint to get the current user
const CURRENT_USER_URL = "http://localhost:3000/api/users";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(() => {
    // Hämta användardata från localStorage vid initialisering
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : { isLoggedIn: "false", following: [] };
  });

  useEffect(() => {
    // Lyssna på förändringar i 'user' och uppdatera localStorage
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Hämta användardata från localStorage vid initialisering
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser === "true") {
      return true;
    } else return false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    console.log("vad är isLoggedIn", isLoggedIn);
    console.log(
      "vad är localstorage.getItem",
      localStorage.getItem("isLoggedIn")
    );
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(CURRENT_USER_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  // const [user, setUser] = useState(initialUser);
  const [following, setFollowing] = useState(user?.following || []);

  const isFollowing = (userId) => {
    return following.map((user) => user._id).includes(userId);

    // return following.includes(userId);
  };

  const addFollowing = async (userId) => {
    // const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(
        `${CURRENT_USER_URL}/${userId}/follow`,
        { userId: user._id }, // Skicka med userId om det behövs för autentisering/verifiering
        { withCredentials: true }
      );

      // Uppdatera context state och localStorage med den returnerade användaren
      const updatedUser = response.data;
      // localStorage.setItem("user", JSON.stringify(updatedUser));
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
        users,
        setUsers,
        isLoggedIn,
        setIsLoggedIn,
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

