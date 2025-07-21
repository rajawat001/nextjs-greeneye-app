// components/Legal/CookiesPolicy.jsx

import React from "react";

/**
 * Cookies Policy static content component.
 * Use in legal pages or directly in a route.
 */
const CookiesPolicy = () => (
  <main style={{ background: "#f0fdf4" }}>
    <header style={{
      backgroundColor: "#2d6a4f",
      color: "#fff",
      padding: "1rem",
      textAlign: "center",
      marginTop: 40
    }}>
      <h1>Cookies Policy</h1>
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
        <strong>GreenEye</strong> does not use cookies on its website{" "}
        <a href="https://greeneye.foundation">https://greeneye.foundation</a>.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>No Tracking Cookies</h2>
      <p>
        We respect your privacy and do not track your behavior or usage across the website using cookies.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Third-Party Cookies</h2>
      <p>
        Since we do not use third-party services like analytics or advertising, there are no external cookies installed via our platform.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Changes to This Policy</h2>
      <p>
        We may update this Cookies Policy if our practices change. You will be notified on this page.
      </p>
      <h2 style={{ color: "#2d6a4f" }}>Contact</h2>
      <p>
        For any questions regarding our Cookies Policy, you may contact us at:
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

export default CookiesPolicy;