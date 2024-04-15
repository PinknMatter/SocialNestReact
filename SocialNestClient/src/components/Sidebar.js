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
        <li onClick={() => handleOptionClick("about")}>about</li>
        <li onClick={() => handleOptionClick("sources")}>sources</li>
      </ul>
      {selectedOption && (
        <div className="overlay" onClick={handleClose}>
          <div className="fade">
            <div className="content" onClick={(e) => e.stopPropagation()}>
              {selectedOption === "about" && (
                <div className="line">
                  <p>
                    Social networks have vastly expanded beyond mere platforms
                    for socializing, emerging as ecosystems that significantly
                    impact virtually every aspect of contemporary life. These
                    networks shape how we form relationships, communicate, and
                    even perceive and interact with the political, cultural, and
                    commercial realms. This evolution sets the stage for
                    "SocialNest," a website designed to map and explore the
                    intricate web of social connections that bind us.
                    "SocialNest" seeks to provide a unique lens through which
                    users can view and understand the complex networks of
                    relationships that define the social universe.
                  </p>
                </div>
              )}
              {selectedOption === "sources" && (
                <div className="line">
                  <p>
                    Karínthy, F. (1929). Chains. In Everything is Different.
                    Budapest: Atheneum.
                  </p>
                  <p>
                    Maslow, A. H. (1943). A theory of human motivation.
                    Psychological Review, 50(4), 370.
                  </p>
                  <p>
                    Wellman, B., & Berkowitz, S. D. (Eds.). (1988). Social
                    structures: A network approach. Cambridge University Press.
                  </p>
                  <p>
                    Sheskin, Ira M., and Arnold Dashefsky. "‘Jewish Geography’
                    in the United States: A Spatial
                  </p>
                  <p>
                    Analysis of the 2015 Jewish Community Study Data."
                    Contemporary Jewry, vol. 35, no. 2, 2015, pp. 123-145.
                  </p>
                </div>
              )}
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
