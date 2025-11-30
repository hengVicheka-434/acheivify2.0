import React, { useState } from "react";
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
    console.log("Form Data:", formData);
    alert("Message Sent!");
  };

  return (
    <div id="wrapper">
      <div className="top">
        <header>
          <img src="img/acheivify.jpg" alt="Acheivify's Logo" className="logo-img" />
          <p>
            <a href="index.html" className="logo-text">ACHEIVIFY</a>
          </p>
        </header>

        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="to-do.html">To Do</a></li>
            <li><a href="report.html">Report</a></li>
            <li><a href="history.html">History</a></li>
            <li><a href="faq.html">FAQs</a></li>
            <li><a href="user-guide.html">User Guide</a></li>
            <li><a href="archive.html">Archive</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </nav>
      </div>

      <main>
        <h1>Contact Us</h1>
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

          <button type="submit" href={`mailto:vichekaheng2@gmail.com`}>Send</button>
        </form>
      </main>

      <footer>
        <div id="contact">
          <p><br />Copyright © 2025 Acheivify</p>
          <a className="email-link" href="mailto:acheivify@gmail.com">
            acheivify@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
