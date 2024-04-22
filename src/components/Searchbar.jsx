import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Här kan du implementera söklogik, t.ex. anropa en API
    // med den aktuella söktermen och uppdatera sökresultaten.
    // För närvarande är det bara en stubbe.
    setSearchResults([
      `Result 1 for ${searchTerm}`,
      `Result 2 for ${searchTerm}`,
      `Result 3 for ${searchTerm}`,
    ]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search Twitter"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;

