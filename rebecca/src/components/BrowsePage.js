import React, { useState } from "react";
import "./BrowsePage.css";
import search from "../img/search-icon.png";
import add from "../img/add-icon.png";
import iconlogo from "../img/fav.png";
import Loading from "./Loading";
import Canvas from "./Canvas";

function Browse(props) {
  const [showSearch, setShowSearch] = useState(false); // State to toggle visibility

  function toggleSearch() {
    setShowSearch((prev) => !prev); // Toggle the current state
  }

  function enterEvent() {
    props.onEnterClick();
  }

  return (
    <div className="BrowseContainer">
      <div className="icon-container">
        <img className="iconlogo" src={iconlogo} alt="logo" />

        <img
          className="icon"
          src={search}
          alt="search"
          onClick={toggleSearch}
        />
        <img onClick={enterEvent} className="icon" src={add} alt="add" />
        <div
          className="SearchContainer"
          style={{ display: showSearch ? "block" : "none" }}
        >
          <input
            className="Search"
            type="text"
            id="searchInput"
            placeholder="Search for a node..."
          />
          <button className="Search" id="searchButton">
            Search
          </button>
        </div>
      </div>

      <div className="CanvasContainer">
        <Canvas />
      </div>

      {/* Toggling search container */}
    </div>
  );
}

export default Browse;
