import React from 'react';

const SearchBar = ({ search, setSearch }) => (
  <div className="search-bar-container">
    <input
      type="text"
      className="search-bar-input"
      placeholder="Search by country, year, or denomination..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  </div>
);

export default SearchBar;
