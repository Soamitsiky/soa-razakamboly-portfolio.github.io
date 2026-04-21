import { Link, useNavigate } from "react-router-dom";
import { experiences } from "../data/data";
import { useEffect } from "react";

export default function Experiences() {
  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".flip-card-wrapper").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "6rem 2rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* En-tête */}
      
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "var(--sky)", marginBottom: "0.75rem" }}>
        Expériences
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "3rem" }}>
        Survolez une carte pour découvrir le détail complet.
      </p>

      {/* Grille de flip cards */}
      <div className="flip-grid">
        {experiences.map((exp) => (
          <div
            className="flip-card-wrapper"
            key={exp.id}
            onClick={() => navigate(`/experiences/${exp.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="flip-card">

              {/* FACE AVANT */}
              <div className="flip-face flip-front" style={{ borderColor: exp.color }}>
                <div className="flip-front-top">
                  <span className="flip-badge" style={{ background: `${exp.color}20`, color: exp.color, border: `1px solid ${exp.color}40` }}>
                    {exp.type}
                  </span>
                  <span className="flip-period">{exp.period}</span>
                </div>
                <h2 className="flip-title" style={{ color: exp.color }}>{exp.title}</h2>
                <p className="flip-company">{exp.company}</p>
                <p className="flip-hint">Survolez pour voir le détail →</p>
                <div className="flip-glow" style={{ background: exp.color }} />
              </div>

              {/* FACE ARRIÈRE */}
              <div className="flip-face flip-back" style={{ borderColor: exp.color }}>
                <div className="flip-front-top">
                  <span className="flip-badge" style={{ background: `${exp.color}20`, color: exp.color, border: `1px solid ${exp.color}40` }}>
                    {exp.type}
                  </span>
                  <span className="flip-period">{exp.period}</span>
                </div>
                <p className="flip-summary">{exp.summary}</p>
                <div className="flip-techs">
                  {exp.technologies.map((t) => (
                    <span key={t} className="flip-tech" style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}>
                      {t}
                    </span>
                  ))}
                </div>
                {/* Indicateur visuel — plus besoin d'un vrai Link */}
                <div style={{
                  marginTop: "auto",
                  flexShrink: 0,
                  color: exp.color,
                  border: `1px solid ${exp.color}50`,
                  borderRadius: 999,
                  padding: "0.5rem 1.2rem",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  textAlign: "center",
                  background: `${exp.color}10`,
                }}>
                  Voir le détail
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}