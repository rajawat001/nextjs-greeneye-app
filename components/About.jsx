// src/components/About.jsx

import React from "react";

/**
 * About section for GreenEye homepage and about page.
 */
const About = () => (
  <section id="about" className="about">
    <div className="container">
      <div className="about-content">
        <div className="about-text">
          <h3>Our Vision</h3>
          <p>
            To create a world where every community has access to clean air, green spaces,
            and a sustainable environment through massive reforestation efforts and environmental education.
          </p>
          <h3>Our Impact</h3>
          <p>
            Since our founding, we've planted over 50,000 trees, educated thousands of community members
            about environmental conservation, and established sustainable green practices in urban and rural areas.
          </p>
          <div className="about-features">
            <div className="feature">
              <i className="fas fa-tree"></i>
              <h4>Tree Plantation</h4>
              <p>Large-scale plantation drives in deforested areas</p>
            </div>
            <div className="feature">
              <i className="fas fa-graduation-cap"></i>
              <h4>Education</h4>
              <p>Environmental awareness programs for all ages</p>
            </div>
            <div className="feature">
              <i className="fas fa-recycle"></i>
              <h4>Sustainability</h4>
              <p>Promoting eco-friendly practices and recycling</p>
            </div>
          </div>
        </div>
        <div className="about-image">
          <img
            src="/assets/Environmental COnservation.png"
            alt="Environmental Conservation"
            className="about-img"
          />
        </div>
      </div>
    </div>
  </section>
);

export default About;