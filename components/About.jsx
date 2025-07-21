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
            src="https://scontent.fjai6-1.fna.fbcdn.net/v/t39.30808-6/466140338_10233836470838714_8014111389483907172_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=CUIOh2pT028Q7kNvwF0cLSM&_nc_oc=AdmjcCUpAv2N9DNzoMMduIsqY3yZtIG6tgk2HPgwFHiExtfI0Azh8Wjw2YeYKOYt5uZVO6w2SDKJZXR8q5SEUQLQ&_nc_zt=23&_nc_ht=scontent.fjai6-1.fna&_nc_gid=FyHhpJvqLKi6bapeXXW6Tw&oh=00_AfQrtz2dsW-e9Co0nMqzKjfFdWErdbANKpJeWFCYJfJpzA&oe=687EB2A6"
            alt="Environmental Conservation"
            className="about-img"
          />
        </div>
      </div>
    </div>
  </section>
);

export default About;