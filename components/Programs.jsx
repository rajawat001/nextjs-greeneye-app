import React from "react";

/**
 * Programs section with three main programs.
 */
const programs = [
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/b/b5/LMP_2008_Reforestation_Effort.jpg",
    title: "Urban Reforestation",
    desc: "Transforming concrete jungles into green oases through strategic tree plantation in urban areas, parks, and abandoned lots.",
    features: [
      "500+ trees per drive",
      "Native species selection",
      "Community involvement",
    ],
    link: "/volunteer",
  },
  {
    img: "https://media.licdn.com/dms/image/v2/D5612AQGT9my7qyifPQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709107731096?e=2147483647&v=beta&t=pwfGVRf-e3tt9nMC4vBkwqKiQvbnZgErbAjSGHdsEpY",
    title: "Community Plantation Drives",
    desc: "Engaging local communities in large-scale plantation activities to create awareness and foster environmental stewardship.",
    features: [
      "Weekend activities",
      "Family-friendly events",
      "Educational workshops",
    ],
    link: "/volunteer",
  },
  {
    img: "https://growbilliontrees.com/cdn/shop/files/GROW-BILLION-TREES-500-TREES.jpg?v=1735294078",
    title: "School Green Programs",
    desc: "Educating the next generation through hands-on environmental programs in schools and educational institutions.",
    features: [
      "Curriculum integration",
      "School garden projects",
      "Student leadership",
    ],
    link: "/volunteer",
  },
];

const Programs = () => (
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
                {p.features.map((f) => (
                  <li key={f}>
                    <i className="fas fa-check"></i> {f}
                  </li>
                ))}
              </ul>
              <a href={p.link} className="btn btn-outline">
                Join Program
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Programs;