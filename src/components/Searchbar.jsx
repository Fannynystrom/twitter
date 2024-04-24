// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./Searchbar.module.css";

// const SEARCH_URL = "http://localhost:3000/api/search";

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState({ users: [], tweets: [] });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//     console.log(searchTerm);
//   };

//   useEffect(() => {
//     console.log("Updaterad sökterm:", searchTerm);
//   }, [searchTerm]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     setError("");
//     try {
//       const response = await axios.post(SEARCH_URL, { searchTerm });
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error searching:", error);
//       setError("Failed to find results. Please try again.");
//     }
//     setIsLoading(false);
//   };

//   return (
//     <div className={styles.searchContainer}>
//       <form onSubmit={handleSubmit} className={styles.searchForm}>
//         <input
//           type="text"
//           className={styles.searchInput}
//           value={searchTerm}
//           onChange={handleChange}
//           placeholder="Search"
//           disabled={isLoading}
//         />
//         <button
//           className={styles.searchButton}
//           type="submit"
//           disabled={isLoading}
//         >
//           Search
//         </button>
//       </form>
//       {error && <p className={styles.errorMessage}>{error}</p>}
//       <div className={styles.searchResults}>
//         <h2>Users</h2>
//         <ul>
//           {searchResults.users.map((user, index) => (
//             <li key={index} className={styles.resultItem}>
//               {user.username}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className={styles.searchResults}>
//         <h2>Posts</h2>
//         <ul>
//           {searchResults.tweets.map((tweet, index) => (
//             <li key={index} className={styles.resultItem}>
//               {tweet.content}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Searchbar.module.css";

const SEARCH_URL = "http://localhost:3000/api/search";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({ users: [], tweets: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  useEffect(() => {
    console.log("Updaterad sökterm:", searchTerm);
  }, [searchTerm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(SEARCH_URL, { searchTerm });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
      setError("Failed to find results. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search"
          disabled={isLoading}
        />
        <button
          className={styles.searchButton}
          type="submit"
          disabled={isLoading}
        >
          Search
        </button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.searchResults}>
        <h2>Users</h2>
        <ul>
          {searchResults.users.map((user, index) => (
            <li key={index} className={styles.resultItem}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.searchResults}>
        <h2>Woofs</h2>
        <ul>
          {searchResults.tweets.map((tweet, index) => (
            <li key={index} className={styles.resultItem}>
              {tweet.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;