import React from 'react';

const SearchBar = ({ search, setSearch, placeholder }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder={placeholder || "Search by country, year, or denomination..."}
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  </div>
);

export default SearchBar;

