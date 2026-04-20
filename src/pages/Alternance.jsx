import { alternance } from "../data/data";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Alternance() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page" style={{ position: "relative", zIndex: 1 }}>
      <div className="page-header">
        
        <h1 className="page-title">Recherche d'alternance</h1>
        
      </div>

      {/* Formation recherchée */}
<div className="reveal" style={{ marginBottom: "3rem" }}>
  <div className="page-label" style={{ marginBottom: "1rem" }}>Formation recherchée</div>
  <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <span style={{
      fontSize: "1.8rem", flexShrink: 0,
    }}>🎓</span>
    <div>
      <div style={{ fontWeight: 700, color: "var(--white)", fontSize: "1rem", marginBottom: "0.25rem" }}>
        École d'ingénieurs ou Master
      </div>
      <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
        Dans toute la France
      </div>
    </div>
    <span style={{
      marginLeft: "auto",
      background: "rgba(52,211,153,0.1)",
      border: "1px solid rgba(52,211,153,0.3)",
      borderRadius: 999,
      padding: "0.3rem 0.9rem",
      fontSize: "0.72rem",
      fontFamily: "var(--mono)",
      color: "var(--green)",
      whiteSpace: "nowrap",
      display: "flex", alignItems: "center", gap: 6,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: "var(--green)",
        animation: "pulse 1.5s ease-in-out infinite",
        display: "inline-block",
      }} />
      En recherche
    </span>
  </div>
</div>

      {/* Domaines */}
      <div className="reveal" style={{ marginBottom: "3rem" }}>
        <div className="page-label" style={{ marginBottom: "1rem" }}>Domaines recherchés</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {alternance.domaines.map(d => (
            <span key={d} className="card" style={{ padding: "0.7rem 1.4rem", fontWeight: 700, fontSize: "0.9rem", color: "var(--sky)", cursor: "default" }}>{d}</span>
          ))}
        </div>
      </div>

      {/* Motivation */}
      <div className="reveal" style={{ marginBottom: "3rem" }}>
        <div className="page-label" style={{ marginBottom: "1rem" }}>Ma motivation</div>
        <div className="card" style={{ borderLeft: "3px solid var(--sky)" }}>
         <p style={{ color: "#cbd5e1", opacity: 1 }}>{alternance.motivation}</p>
        </div>
      </div>

      {/* Vidéo *
      <div className="reveal" style={{ marginBottom: "3rem" }}>
        <div className="page-label" style={{ marginBottom: "1rem" }}>// Vidéo de motivation</div>
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎬</div>
          <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>Découvrez ma vidéo de motivation</p>
          <a href={alternance.videoMotivation} target="_blank" rel="noreferrer" className="btn btn-primary">
            ▶ Voir la vidéo
          </a>
        </div>
      </div>/}

      {/* CTA */}
      <div className="reveal" style={{ textAlign: "center" }}>
        <Link to="/contact" className="btn btn-outline">Me contacter →</Link>
      </div>
    </div>
  );
}
