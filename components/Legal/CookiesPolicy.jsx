// components/Legal/CookiesPolicy.jsx

import React from "react";
import { useTranslations } from "next-intl";

const CookiesPolicy = () => {
  const t = useTranslations("cookiesPolicy");
  return (
    <main style={{ background: "#f0fdf4" }}>
      <header style={{
        backgroundColor: "#2d6a4f",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        marginTop: 40
      }}>
        <h1>{t("title")}</h1>
      </header>
      <div style={{
        maxWidth: 800,
        margin: "auto",
        padding: "2rem",
        lineHeight: 1.6,
        color: "#1b4332"
      }}>
        <p>{t("effectiveDate")}</p>
        <p>
          <strong>GreenEye</strong> {t("intro")}
          <a href="https://greeneye.foundation">https://greeneye.foundation</a>.
        </p>
        <h2 style={{ color: "#2d6a4f" }}>{t("noTrackingTitle")}</h2>
        <p>{t("noTrackingText")}</p>
        <h2 style={{ color: "#2d6a4f" }}>{t("thirdPartyTitle")}</h2>
        <p>{t("thirdPartyText")}</p>
        <h2 style={{ color: "#2d6a4f" }}>{t("changesTitle")}</h2>
        <p>{t("changesText")}</p>
        <h2 style={{ color: "#2d6a4f" }}>{t("contactTitle")}</h2>
        <p>{t("contactText")}</p>
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
        &copy; 2025 GreenEye. {t("rightsReserved")}
      </footer>
    </main>
  );
};

export default CookiesPolicy;