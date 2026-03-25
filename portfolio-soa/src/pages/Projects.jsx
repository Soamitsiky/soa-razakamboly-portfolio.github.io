import { Link } from "react-router-dom";
import { projects } from "../data/data";
import { useEffect } from "react";

export default function Projects() {
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
        <div className="page-label">// Réalisations</div>
        <h1 className="page-title">Projets</h1>
        <p className="page-subtitle">Cliquez sur un projet pour voir les détails techniques.</p>
      </div>

      <div className="grid-2 reveal">
        {projects.map(p => (
          <Link key={p.id} to={`/projects/${p.id}`} style={{ textDecoration: "none" }}>
            <div className="card" style={{ height: "100%", position: "relative", overflow: "hidden", borderLeft: `3px solid ${p.color}` }}>
              <div style={{ position: "absolute", top: -10, right: -10, fontSize: "5rem", opacity: 0.05 }}>{p.emoji}</div>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${p.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", marginBottom: "1.2rem" }}>{p.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.3rem" }}>{p.title}</div>
              <div style={{ color: p.color, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.9rem" }}>{p.subtitle}</div>
              <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.75, marginBottom: "1.2rem" }}>{p.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <span className={p.status === "Terminé" ? "status-badge status-done" : "status-badge status-wip"}>
                  {p.status === "Terminé" ? "✓" : "⟳"} {p.status}
                </span>
                <span style={{ color: "var(--sky)", fontSize: "0.85rem", fontWeight: 600 }}>Voir le détail →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
