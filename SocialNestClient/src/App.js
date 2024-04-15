import Landing from "./components/LandingPage";
import Input from "./components/InputPage";
import Browse from "./components/BrowsePage";

import "./App.css";
import { useState } from "react";

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
        <Browse onEnterClick={onEnterClick} />
      </div>
    );
  }
}

export default App;
