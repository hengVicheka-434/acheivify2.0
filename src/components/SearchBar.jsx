import React from 'react';
import '../styles/App.css';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}