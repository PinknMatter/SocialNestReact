import Landing from "./components/LandingPage";
import Input from "./components/InputPage";
import Browse from "./components/BrowsePage";
import About from "./components/About";
import Sources from "./components/Sources";

import "./App.css";
import { useState } from "react";
import { OpenNav } from "./components/Sidebar";
import { CloseNav } from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from "react-router-dom";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [menuSelector, setMenuSelector] = useState(0);

  function onEnterClick() {
    setMenuSelector(1);
  }

  function onSubmitClick() {
    setMenuSelector(2);
  }

  if (menuSelector === 0) {
    return (
      <div>
        <Landing onEnterClick={onEnterClick} />
      </div>
    );
  } else if (menuSelector === 1) {
    return (
      <div className="slide-up">
        <Input onSubmitClick={onSubmitClick} />
      </div>
    );
  } else if (menuSelector === 2) {
    return (
      <div>
        <Router>
          <Browse onEnterClick={onEnterClick} />
          {/* <Switch> */}
          {/* <Route path="/about" exact={true} component={About} /> */}
          {/* <Route path="/sources" exact={true} component={Sources} /> */}
          {/* <Route path="/" exact={true} component={Browse} /> */}
          {/* </Switch> */}
        </Router>
      </div>
    );
  }
}

export default App;
