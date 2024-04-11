import "./BrowsePage.css";
import search from "../img/search-icon.png";
import add from "../img/add-icon.png";
import iconlogo from "../img/fav.png";
import Loading from "./Loading";
import Canvas from "./Canvas";

function Browse(props) {
  function enterEvent() {
    props.onEnterClick();
  }
  return (
    <div className="BrowseContainer">
      <div className="icon-container">
        <img className="iconlogo" src={iconlogo} alt="logo" />

        <img className="icon" src={search} alt="search" />
        <img onClick={enterEvent} className="icon" src={add} alt="add" />
      </div>

      <div className="CanvasContainer">
        <Canvas />
      </div>
    </div>
  );
}

export default Browse;
