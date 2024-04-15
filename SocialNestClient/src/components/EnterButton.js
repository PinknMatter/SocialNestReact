import "./EnterButton.css";
// import { Link } from "react-router-dom";

function EnterButton(props) {
  function enterEvent() {
    props.onEnterClick();
  }
  return (
    <div id="A" className="EnterButton">
      <button onClick={enterEvent} className="enter-button">
        Enter
      </button>
    </div>
  );
}

export default EnterButton;
