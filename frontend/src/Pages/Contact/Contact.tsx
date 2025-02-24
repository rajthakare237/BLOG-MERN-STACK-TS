import React, { useState } from "react";
import "./Contact.css";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Replace with your actual API endpoint
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Submission error:", error);
    }
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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