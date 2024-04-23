import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({ users: [], posts: [] });

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/search", { searchTerm });

      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <h2>Users</h2>
        <ul>
          {searchResults.users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Posts</h2>
        <ul>
          {searchResults.posts.map((post, index) => (
            <li key={index}>{post.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
