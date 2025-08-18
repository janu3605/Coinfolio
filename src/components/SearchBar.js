import React from 'react';

const SearchBar = ({ search, setSearch }) => (
  <div style={{ margin: '1rem auto', maxWidth: 400 }}>
    <input
      type="text"
      placeholder="Search by country, year, or denomination..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{
        width: '100%',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem',
      }}
    />
  </div>
);

export default SearchBar;
