// components/Legal/PrivacyPolicy.jsx

import React from "react";

/**
 * Privacy Policy static content component.
 * Use in legal pages or directly in a route.
 */
const PrivacyPolicy = () => (
  <main style={{ background: "#f0fdf4" }}>
    <header style={{
      backgroundColor: "#2d6a4f",
      color: "#fff",
      padding: "1rem",
      textAlign: "center",
      marginTop: 40
    }}>
      <h1>Privacy Policy</h1>
    </header>
    <div style={{
      maxWidth: 800,
      margin: "auto",
      padding: "2rem",
      lineHeight: 1.6,
      color: "#1b4332"
    }}>
      <p>Effective Date: July 14, 2025</p>
      <p>
        At <strong>GreenEye</strong>, accessible at{" "}
        <a href="https://greeneye.foundation">https://greeneye.foundation</a>,
        we are committed to protecting your privacy. This Privacy Policy explains how we collect,
        use, and protect the personal information you provide through our website.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Information We Collect</h2>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
      </ul>
      <p>
        We collect this information through our contact and inquiry forms.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>How We Use Your Information</h2>
      <p>
        Your data is used only to contact you regarding your inquiry or to respond to your messages.
        We do not share, sell, or rent your information with any third party.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Cookies</h2>
      <p>
        Our website does not use cookies or any third-party tracking services.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Data Protection</h2>
      <p>
        We follow standard data protection practices to ensure your information remains secure. However,
        no method of internet transmission is 100% secure.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Contact Information</h2>
      <p>
        If you have any questions about our privacy policy, you can contact us:
      </p>
      <p>
        📞 Phone: 7023277322<br />
        📧 Email: contact@greeneye.foundation<br />
        🏠 Address: Prime, C11, Kanak Vrindavan, Jaipur, Rajasthan, Bajiri Mandi-302034
      </p>
    </div>
    <footer style={{
      background: "#2d6a4f",
      color: "#fff",
      textAlign: "center",
      padding: "1rem",
      marginTop: "2rem"
    }}>
      &copy; 2025 GreenEye. All rights reserved.
    </footer>
  </main>
);

export default PrivacyPolicy;