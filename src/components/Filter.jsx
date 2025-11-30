import React from "react";

export default function Filter({ filter, setFilter }) {
  return (
    <div>
        {/* <label htmlFor="filter">Filter Tasks: </label> */}
        <select
          className="filter-container"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="high-priority">High Priority</option>
          <option value="medium-priority">Medium Priority</option>
          <option value="low-priority">Low Priority</option>
        </select>
    </div>
  );
}