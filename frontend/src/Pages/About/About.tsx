import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobeAmericas,
  faRocket,
  faAtom,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="about-container">
      <div className="hero-section">
        <h1 className="exploring-text">Exploring the Frontiers of Knowledge</h1>
        <p>Your gateway to understanding our world and beyond</p>
      </div>

      <div className="content-section">
        <div className="mission-statement">
          <h2>Our Mission</h2>
          <p>
            We strive to deliver insightful, accurate, and engaging content about
            the forces shaping our planet and the mysteries of the cosmos. 
            Our team of experts brings complex concepts from geopolitics, 
            space exploration, and scientific discovery into clear focus.
          </p>
        </div>

        <div className="categories-grid">
          <div className="category-card">
            <FontAwesomeIcon icon={faGlobeAmericas} className="category-icon" />
            <h3>Geopolitics</h3>
            <p>Understanding global power dynamics and international relations</p>
          </div>
          
          <div className="category-card">
            <FontAwesomeIcon icon={faRocket} className="category-icon" />
            <h3>Space Exploration</h3>
            <p>Latest developments in astronomy and space technology</p>
          </div>
          
          <div className="category-card">
            <FontAwesomeIcon icon={faAtom} className="category-icon" />
            <h3>Science & Technology</h3>
            <p>Cutting-edge research and technological breakthroughs</p>
          </div>
          
          <div className="category-card">
            <FontAwesomeIcon icon={faBookOpen} className="category-icon" />
            <h3>In-Depth Analysis</h3>
            <p>Comprehensive reports and expert commentary</p>
          </div>
        </div>

        {/* <div className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-number">01</div>
              <h4>Scientific Integrity</h4>
              <p>Rigorous fact-checking and peer-reviewed sources</p>
            </div>
            <div className="value-item">
              <div className="value-number">02</div>
              <h4>Global Perspective</h4>
              <p>Diverse viewpoints from international experts</p>
            </div>
            <div className="value-item">
              <div className="value-number">03</div>
              <h4>Accessible Knowledge</h4>
              <p>Making complex topics understandable for all</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About;