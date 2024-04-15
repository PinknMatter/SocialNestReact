import { useState } from "react";

import "./BrowsePage.css";
import search from "../img/search-icon.png";
import add from "../img/add-icon.png";
import iconlogo from "../img/fav.png";
import Sidebar from "./Sidebar";
import About from "./About";
import Sources from "./Sources";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Browse(props) {
  function enterEvent() {
    props.onEnterClick();
  }

  const [showNav, setShowNav] = useState(false);

  return (
    <div>
      <Router>
        <div className="icon-container">
          <img
            className="iconlogo"
            src={iconlogo}
            alt="logo"
            onClick={() => setShowNav(!showNav)}
          />
          <Sidebar show={showNav} />

          <img className="icon" src={search} alt="search" />
          <img onClick={enterEvent} className="icon" src={add} alt="add" />
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
