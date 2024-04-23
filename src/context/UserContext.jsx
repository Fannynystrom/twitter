import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Assuming you have a session-based endpoint to get the current user
const CURRENT_USER_URL = "http://localhost:3000/api/tweets";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:3000/api/tweets";

// // Create the context
// export const UserContext = createContext();

// // Create a provider component
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Simulate fetching user data from an API
//     const fetchUser = async () => {
//       try {
//         // Simulate an API call
//         const userData = await fetch("/api/current_user");
//         const json = await userData.json();
//         setUser(json);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
