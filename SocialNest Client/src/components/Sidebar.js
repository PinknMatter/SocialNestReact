import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ show }) => {
  return (
    <div className={show ? "sidebar active" : "sidebar"}>
      <ul>
        <li>
          <Link to="/">browse</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/sources">sources</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
