import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <div className="searchbox">
      <input type="text" placeholder="Search here..." />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBox;