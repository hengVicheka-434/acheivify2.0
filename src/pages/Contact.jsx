import React, { useState } from "react";
import PageContent from "../components/PageContent";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reasons: "",
    requests: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // build a mailto link containing the form content
    const to = "acheivify@gmail.com";
    const subject = `Contact from ${formData.name || "Website Visitor"}`;
    const bodyLines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Reason for contacting: ${formData.reasons}`,
      `Requests: ${formData.requests}`,
    ];
    const body = bodyLines.join("\r\n");

    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // open the user's mail client with the composed message
    window.location.href = mailto;
  };

  return (
    <PageContent pageTitle="Contact Us">
      <div className="contact-wrapper">
      <main>
        <form id="contactForm" onSubmit={handleSubmit}>
          <div className="text">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your user name . . ."
            />

            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email . . ."
            />
          </div>

          <div className="textarea">
            <label htmlFor="reasons">Reason for Contacting:</label>
            <textarea 
              id="reasons" 
              name="reasons"
              rows="3"
              value={formData.reasons}
              onChange={handleChange}
              placeholder="Web lag . . ."
            ></textarea>

            <label htmlFor="requests">Requests:</label>
            <textarea 
              id="requests" 
              name="requests"
              rows="3"
              value={formData.requests}
              onChange={handleChange}
              placeholder="Improve Web Speed . . ."
            ></textarea>
          </div>

          <button type="submit">Send</button>
        </form>
      </main>   
      </div>   
    </PageContent>
  );
}
