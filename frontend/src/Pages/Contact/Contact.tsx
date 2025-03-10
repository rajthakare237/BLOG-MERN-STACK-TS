import React from "react";
import "./Contact.css";


const Contact: React.FC = () => {
  

  return (
    <div className="contact-info">
  <div className="info-card">
    <div className="icon-container">
      <div className="location-icon"></div>
    </div>
    <div className="card-content">
      <h3>Headquarters</h3>
      <address>
        456 Geopolitics Lane<br/>
        Kalyani Nagar<br/>
        Pune, Maharashtra 411014<br/>
        India
      </address>
    </div>
  </div>

  <div className="info-card">
    <div className="icon-container">
      <div className="email-icon"></div>
    </div>
    <div className="card-content">
      <h3>Email</h3>
      <p>
        <a href="mailto:contact@earthchronicle.in">contact@earthchronicle.in</a><br/>
        <a href="mailto:support@earthchronicle.in">support@earthchronicle.in</a>
      </p>
    </div>
  </div>

  <div className="info-card">
    <div className="icon-container">
      <div className="phone-icon"></div>
    </div>
    <div className="card-content">
      <h3>Phone</h3>
      <p>
        <a href="tel:+911234567890">+91 12345 67890</a><br/>
        <a href="tel:+919876543210">+91 98765 43210</a>
      </p>
    </div>
  </div>
</div>
  );
};

export default Contact;