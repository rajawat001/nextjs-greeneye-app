// components/Legal/TermsOfService.jsx

import React from "react";

/**
 * Terms of Service static content component.
 * Use in legal pages or directly in a route.
 */
const TermsOfService = () => (
  <main style={{ background: "#f0fdf4" }}>
    <header style={{
      backgroundColor: "#2d6a4f",
      color: "#fff",
      padding: "1rem",
      textAlign: "center",
      marginTop: 40
    }}>
      <h1>Terms of Service</h1>
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
        Welcome to <strong>GreenEye</strong>. By accessing our website (<a href="https://greeneye.foundation">https://greeneye.foundation</a>),
        you agree to these Terms of Service. Please read them carefully.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Use of Website</h2>
      <p>
        This website is intended to provide information about our environmental efforts and allow users to connect with us.
        You agree not to misuse the site or post any harmful, illegal, or offensive content.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>User Data</h2>
      <p>
        By submitting forms on our website, you agree to provide accurate information. You are solely responsible for the data you submit.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Content Ownership</h2>
      <p>
        All content on this website, including text, images, and logos, are the property of GreenEye unless stated otherwise.
        Unauthorized use is prohibited.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Updates will be posted on this page with a revised date.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Contact Us</h2>
      <p>
        For any questions regarding these terms, you can contact:
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

export default TermsOfService;