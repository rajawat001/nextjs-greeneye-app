'use client';
import React from 'react';
import Link from 'next/link';

/**
 * Global page footer with links and contact info
 */
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <i className="fas fa-seedling"></i>
            <span>GreenEye</span>
          </div>
          <p>
            Dedicated to creating a greener, more sustainable future through tree
            plantation and environmental conservation.
          </p>
          <div className="footer-social">
            <a
              href="https://www.facebook.com/piyush.gig"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com/"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com/"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/piyugig/"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/programs">Programs</Link></li>
            <li><Link href="/volunteer">Volunteer</Link></li>
            <li><Link href="/donate">Donate</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Programs</h4>
          <ul className="footer-links">
            <li><Link href="/programs">Urban Reforestation</Link></li>
            <li><Link href="/programs">Community Drives</Link></li>
            <li><Link href="/programs">School Programs</Link></li>
            <li><Link href="/programs">Corporate Partnerships</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="footer-contact">
            <p><i className="fas fa-map-marker-alt"></i> Prime, C11, Kanak Vrindavan, Jaipur, Rajasthan, Bajiri Mandi-302034</p>
            <p><i className="fas fa-phone"></i> 7023277322</p>
            <p><i className="fas fa-envelope"></i> contact@greeneye.foundation</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2025 GreenEye. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
            <Link href="/legal/terms-of-service">Terms of Service</Link>
            <Link href="/legal/cookies-policy">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
