// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div>
      <header>
        <div className="logo-container">
          <img src="C:\Users\ryana\OneDrive\Desktop\VS Code\Roadside-service-web-app-main\my-app\public\logo.png" alt="Logo" className="logo" />
        </div>
        <h1>About Us</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/service-request">Request Service</a></li>
            <li><a href="/account">Create Account</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/about" className="active">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="about-section">
          <h2>Who We Are</h2>
          <p>
            We are a team dedicated to providing fast and reliable roadside assistance.
            Our goal is to make sure you are never stranded for long. Whether it's a flat tire,
            running out of gas, or needing a jump start, we're here to help!
          </p>

          <h3>Our Mission</h3>
          <p>
            Our mission is to offer a quick, safe, and affordable roadside assistance service for
            drivers. We pride ourselves on excellent customer service and timely arrivals.
          </p>

          <h3>Why Choose Us?</h3>
          <ul>
            <li>24/7 Service - We're here for you, day or night.</li>
            <li>Reliable Assistance - Our team is equipped with the tools to help you on the spot.</li>
            <li>Affordable Rates - We offer competitive pricing without compromising on quality.</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Roadside Assistance. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
