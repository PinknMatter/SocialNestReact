import "./InputPage.css";
import logo from "../img/logo.png";

// import { Link } from "react-router-dom";

function Input(props) {
  function submitEvent() {
    props.onSubmitClick();
  }
  return (
    <div>
      <div className="App">
        <img src={logo} className="input-logo" alt="logo" />
      </div>

      <div className="input-container">
        <p>Enter your name</p>
        <input></input>
        <p>Enter a friend's name</p>
        <input></input>
        <button className="input-button">+</button>

        {/* <Link to="/browse"></Link> */}
        <button onClick={submitEvent} className="input-button">
          Submit
        </button>
        <button className="skip-button">Skip</button>
      </div>
    </div>
  );
}

export default Input;
