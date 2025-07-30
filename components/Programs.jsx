import React from "react";
import { useTranslations } from "next-intl";
/**
 * Programs section with three main programs.
 */
const Programs = () => {
  const t = useTranslations("programsSection");

  const programs = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/b/b5/LMP_2008_Reforestation_Effort.jpg",
      title: t("urbanReforestationTitle"),
      desc: t("urbanReforestationDesc"),
      features: [
        t("urbanFeature1"),
        t("urbanFeature2"),
        t("urbanFeature3")
      ],
      link: "/volunteer",
    },
    {
      img: "https://media.licdn.com/dms/image/v2/D5612AQGT9my7qyifPQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709107731096?e=2147483647&v=beta&t=pwfGVRf-e3tt9nMC4vBkwqKiQvbnZgErbAjSGHdsEpY",
      title: t("communityDrivesTitle"),
      desc: t("communityDrivesDesc"),
      features: [
        t("communityFeature1"),
        t("communityFeature2"),
        t("communityFeature3")
      ],
      link: "/volunteer",
    },
    {
      img: "https://growbilliontrees.com/cdn/shop/files/GROW-BILLION-TREES-500-TREES.jpg?v=1735294078",
      title: t("schoolProgramsTitle"),
      desc: t("schoolProgramsDesc"),
      features: [
        t("schoolFeature1"),
        t("schoolFeature2"),
        t("schoolFeature3")
      ],
      link: "/volunteer",
    },
  ];

  return (
    <section id="programs" className="programs">
      <div className="container">
        <div className="programs-grid">
          {programs.map((p) => (
            <div className="program-card" key={p.title}>
              <div className="program-image">
                <img src={p.img} alt={p.title} />
              </div>
              <div className="program-content">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul className="program-features">
                  {p.features.map((f, i) => (
                    <li key={i}>
                      <i className="fas fa-check"></i> {f}
                    </li>
                  ))}
                </ul>
                <a href={p.link} className="btn btn-outline">
                  {t("joinProgram")}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;