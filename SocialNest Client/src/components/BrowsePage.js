import React, { useState, useEffect, useRef } from "react";
import "./BrowsePage.css";
import search from "../img/search-icon.png";
import add from "../img/add-icon.png";
import iconlogo from "../img/fav.png";
import Loading from "./Loading";
import Canvas from "./Canvas";

import Sidebar from "./Sidebar";
import About from "./About";
import Sources from "./Sources";

import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

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

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideNavBar, true);
  }, []);

  const history = useHistory();
  const refOne = useRef(null);

  const handleClickOutsideNavBar = (e) => {
    // console.log(history);
    if (!refOne.current !== undefined && !refOne.current.contains(e.target)) {
      // console.log("Clicked outside");
      history.push("/");
      setShowNav(false);

      document.getElementsByClassName("container").style.display = "none";
    }
  };

  // let menuRef = useRef();

  // useEffect(() => {
  //   let handler = (enterEvent) => {
  //     if (!menuRef.current(enterEvent.target)) {
  //       setShowNav(false);
  //       console.log(menuRef.current);
  //     }
  //   };
  // });

  // console.log(refOne);

  return (
    <Router>
      <div className="BrowseContainer">
        <div className="CanvasContainer">
          <Canvas />
        </div>

        {/* Toggling search container */}
        <div ref={refOne}>
          <Sidebar show={showNav} />

          <div className="fade">
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
          </div>

          <div className="main">
            <Switch>
              <Route path="/about" exact={true} component={About} />
              <Route path="/sources" exact={true} component={Sources} />
              {/* <Route path="/" exact={true} component={Browse} /> */}
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Browse;
