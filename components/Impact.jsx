import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

/**
 * Impact section: stats, visual, and key points.
 */
const Impact = () => {
  const t = useTranslations("impact");

  // Stats now use translations
  const stats = [
    {
      icon: "fas fa-seedling",
      label: t("statTrees"),
      number: 50000,
      description: t("statTreesDesc"),
    },
    {
      icon: "fas fa-wind",
      label: t("statCO2"),
      number: 75000,
      description: t("statCO2Desc"),
    },
    {
      icon: "fas fa-users",
      label: t("statVolunteers"),
      number: 1200,
      description: t("statVolunteersDesc"),
    },
    {
      icon: "fas fa-map-marked-alt",
      label: t("statCities"),
      number: 25,
      description: t("statCitiesDesc"),
    },
  ];

  // Animated counter effect
  const numberRefs = useRef([]);

  useEffect(() => {
    numberRefs.current.forEach((ref, idx) => {
      if (ref) {
        const end = stats[idx].number;
        const duration = 1500;
        const increment = end / (duration / 16);
        let current = 0;
        let frame;
        function animate() {
          current += increment;
          if (current >= end) {
            ref.textContent = end.toLocaleString();
          } else {
            ref.textContent = Math.floor(current).toLocaleString();
            frame = requestAnimationFrame(animate);
          }
        }
        animate();
        return () => cancelAnimationFrame(frame);
      }
    });
  }, [stats]);

  return (
    <section id="impact" className="impact">
      <div className="container">
        <div className="impact-grid">
          {stats.map((stat, idx) => (
            <div className="impact-card" key={stat.label}>
              <div className="impact-icon">
                <i className={stat.icon}></i>
              </div>
              <div
                className="impact-number"
                data-target={stat.number}
                ref={(el) => (numberRefs.current[idx] = el)}
              >
                0
              </div>
              <div className="impact-label">{stat.label}</div>
              <div className="impact-description">{stat.description}</div>
            </div>
          ))}
        </div>
        <div className="impact-visual">
          <div className="impact-image">
            <img
              src="/assets/GreenLandscape.png"
              alt={t("landscapeAlt")}
            />
          </div>
          <div className="impact-content">
            <h3>{t("heading")}</h3>
            <p>{t("blurb")}</p>
            <ul className="impact-list">
              <li><i className="fas fa-leaf"></i> {t("listNative")}</li>
              <li><i className="fas fa-leaf"></i> {t("listCare")}</li>
              <li><i className="fas fa-leaf"></i> {t("listEducation")}</li>
              <li><i className="fas fa-leaf"></i> {t("listHabitat")}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;