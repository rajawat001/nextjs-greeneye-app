import React from "react";
import { useTranslations } from "next-intl";

/**
 * About section for GreenEye homepage and about page.
 */
const About = () => {
  const t = useTranslations("about");
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h3>{t("visionTitle")}</h3>
            <p>{t("visionText")}</p>
            <h3>{t("impactTitle")}</h3>
            <p>{t("impactText")}</p>
            <div className="about-features">
              <div className="feature">
                <i className="fas fa-tree"></i>
                <h4>{t("featurePlantationTitle")}</h4>
                <p>{t("featurePlantationText")}</p>
              </div>
              <div className="feature">
                <i className="fas fa-graduation-cap"></i>
                <h4>{t("featureEducationTitle")}</h4>
                <p>{t("featureEducationText")}</p>
              </div>
              <div className="feature">
                <i className="fas fa-recycle"></i>
                <h4>{t("featureSustainabilityTitle")}</h4>
                <p>{t("featureSustainabilityText")}</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img
              src="/assets/Environmental Conservation.png"
              alt={t("imgAlt")}
              className="about-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;