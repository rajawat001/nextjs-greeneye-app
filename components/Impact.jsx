import React, { useEffect, useRef } from "react";

/**
 * Impact section: stats, visual, and key points.
 */
const stats = [
  {
    icon: "fas fa-seedling",
    label: "Trees Planted",
    number: 50000,
    description: "Across 25 cities in the last 3 years",
  },
  {
    icon: "fas fa-wind",
    label: "Tons CO₂ Absorbed",
    number: 75000,
    description: "Annual carbon dioxide absorption",
  },
  {
    icon: "fas fa-users",
    label: "Active Volunteers",
    number: 1200,
    description: "Dedicated environmental advocates",
  },
  {
    icon: "fas fa-map-marked-alt",
    label: "Cities Covered",
    number: 25,
    description: "Growing network of green initiatives",
  },
];

const Impact = () => {
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
  }, []);

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
              alt="Green Landscape"
            />
          </div>
          <div className="impact-content">
            <h3>Creating Lasting Change</h3>
            <p>
              Every tree we plant contributes to cleaner air, reduced carbon footprint, and biodiversity conservation.
              Our strategic approach ensures maximum environmental benefit through:
            </p>
            <ul className="impact-list">
              <li><i className="fas fa-leaf"></i> Native species selection for optimal growth</li>
              <li><i className="fas fa-leaf"></i> Long-term maintenance and care programs</li>
              <li><i className="fas fa-leaf"></i> Community education and involvement</li>
              <li><i className="fas fa-leaf"></i> Habitat restoration and wildlife protection</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;