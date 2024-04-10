import "./BrowsePage.css";
import search from "../img/search-icon.png";
import add from "../img/add-icon.png";
import iconlogo from "../img/fav.png";

function Browse(props) {
  function enterEvent() {
    props.onEnterClick();
  }
  return (
    <div>
      <div className="icon-container">
        <img className="iconlogo" src={iconlogo} alt="logo" />

        <img className="icon" src={search} alt="search" />
        <img onClick={enterEvent} className="icon" src={add} alt="add" />
      </div>
    </div>
  );
}

export default Browse;
