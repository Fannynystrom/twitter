import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('username'); // Default search type

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Här kan du implementera söklogik baserat på vald söktyp
    // t.ex. anropa en API med den aktuella söktermen och söktypen
    // För närvarande är det bara en stubbe.
    console.log(`Searching for ${searchTerm} with search type ${searchType}`);
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
        <select value={searchType} onChange={handleTypeChange}>
          <option value="username">Username</option>
          <option value="author">Author</option>
          <option value="hashtag">Hashtag</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;


