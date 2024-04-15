import "./About.css";

function About({ onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="content" onClick={(e) => e.stopPropagation()}>
        <p>
          Social networks have vastly expanded beyond mere platforms for
          socializing, emerging as ecosystems that significantly impact
          virtually every aspect of contemporary life. These networks shape how
          we form relationships, communicate, and even perceive and interact
          with the political, cultural, and commercial realms. This evolution
          sets the stage for "SocialNest," a website designed to map and explore
          the intricate web of social connections that bind us. "SocialNest"
          seeks to provide a unique lens through which users can view and
          understand the complex networks of relationships that define the
          social universe.
        </p>
      </div>
    </div>
  );
}

export default About;
