import React, { useState } from "react";
import "./BrowsePage.css";
import search from "../img/search-icon.png";
import add from "../img/add-icon.png";
import iconlogo from "../img/fav.png";
import Loading from "./Loading";
import Canvas from "./Canvas";

import Sidebar from "./Sidebar";
import About from "./About";
import Sources from "./Sources";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Browse(props) {
  const [showSearch, setShowSearch] = useState(false); // State to toggle visibility

  function toggleSearch() {
    setShowSearch((prev) => !prev); // Toggle the current state
  }

  function enterEvent() {
    props.onEnterClick();
  }

  function enterEvent() {
    props.onEnterClick();
  }

  const [showNav, setShowNav] = useState(false);

  return (
    <div className="BrowseContainer">
      <div className="CanvasContainer">
        <Canvas />
      </div>

      {/* Toggling search container */}

      <Router>
        <Sidebar show={showNav} />

        <div className="icon-container">
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
          <img
            className="iconlogo"
            src={iconlogo}
            alt="logo"
            onClick={() => setShowNav(!showNav)}
          />
        </div>

        <div className="main">
          <Route path="/about" exact={true} component={About} />
          <Route path="/sources" exact={true} component={Sources} />
        </div>
      </Router>
    </div>
  );
}

export default Browse;
