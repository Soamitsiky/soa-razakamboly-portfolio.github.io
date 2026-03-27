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
        <div className="page-label">// Recherche</div>
        <h1 className="page-title">Recherche d'alternance</h1>
        <p className="page-subtitle">{alternance.recherche}</p>
      </div>

      {/* Infos clés */}
      <div className="grid-3 reveal" style={{ marginBottom: "3rem" }}>
        {[
          { icon: "📅", label: "Disponibilité", value: alternance.disponibilite },
          { icon: "🔄", label: "Rythme", value: alternance.rythme },
          { icon: "📍", label: "Mobilité", value: alternance.mobilite },
        ].map(item => (
          <div key={item.label} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{item.icon}</div>
            <div style={{ color: "var(--muted)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{item.label}</div>
            <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--sky)" }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Domaines */}
      <div className="reveal" style={{ marginBottom: "3rem" }}>
        <div className="page-label" style={{ marginBottom: "1rem" }}>// Domaines recherchés</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {alternance.domaines.map(d => (
            <span key={d} className="card" style={{ padding: "0.7rem 1.4rem", fontWeight: 700, fontSize: "0.9rem", color: "var(--sky)", cursor: "default" }}>{d}</span>
          ))}
        </div>
      </div>

      {/* Motivation */}
      <div className="reveal" style={{ marginBottom: "3rem" }}>
        <div className="page-label" style={{ marginBottom: "1rem" }}>// Ma motivation</div>
        <div className="card" style={{ borderLeft: "3px solid var(--sky)" }}>
          <p style={{ color: "var(--muted)", lineHeight: 1.9, fontSize: "0.95rem" }}>{alternance.motivation}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="reveal" style={{ textAlign: "center" }}>
        <Link to="/contact" className="btn btn-outline">Me contacter →</Link>
      </div>
    </div>
  );
}