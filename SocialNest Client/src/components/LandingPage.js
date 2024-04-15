import logo from "../img/logo.png";
import EnterButton from "../components/EnterButton.js";
import "./LandingPage.css";

function Landing(props) {
  return (
    <div>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <EnterButton onEnterClick={props.onEnterClick} />
      </div>
    </div>
  );
}

export default Landing;
