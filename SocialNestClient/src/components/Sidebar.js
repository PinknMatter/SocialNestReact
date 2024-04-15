import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ show }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleClose = () => {
    setSelectedOption(null);
  };

  return (
    <div className={show ? "sidebar active" : "sidebar"}>
      <ul>
        <li onClick={() => handleOptionClick("browse")}>browse</li>
        <li onClick={() => handleOptionClick("about")}>about</li>
        <li onClick={() => handleOptionClick("sources")}>sources</li>
      </ul>
      {selectedOption && (
        <div className="overlay" onClick={handleClose}>
          <div className="content" onClick={(e) => e.stopPropagation()}>
            {selectedOption === "browse" && (
              <p>Here's where browsing content would go.</p>
            )}
            {selectedOption === "about" && (
              <p>
                Social networks have vastly expanded beyond mere platforms for
                socializing...
              </p>
            )}
            {selectedOption === "sources" && (
              <p>
                List of sources like Karínthy, Maslow, Wellman, & Berkowitz.
              </p>
            )}
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
