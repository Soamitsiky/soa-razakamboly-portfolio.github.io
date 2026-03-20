import { useParams, Link } from "react-router-dom";
import { projects } from "../data/data";

export default function ProjectDetail() {
  const { id } = useParams();
  const p = projects.find(p => p.id === id);
  if (!p) return <div className="page" style={{ zIndex: 1, position: "relative" }}>Projet introuvable.</div>;

  return (
    <div className="page" style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
      <Link to="/projects" className="back-link">← Retour aux projets</Link>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: `${p.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", flexShrink: 0 }}>{p.emoji}</div>
        <div style={{ flex: 1 }}>
          <div className="page-label">// Projet</div>
          <h1 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: p.color, lineHeight: 1.1, marginBottom: "0.4rem" }}>{p.title}</h1>
          <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>{p.subtitle}</div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <span className={p.status === "Terminé" ? "status-badge status-done" : "status-badge status-wip"}>
              {p.status === "Terminé" ? "✓" : "⟳"} {p.status}
            </span>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }}>
                🔗 Voir la démo
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Description */}
      <div className="card" style={{ marginBottom: "2rem", borderLeft: `3px solid ${p.color}` }}>
        <div className="page-label" style={{ marginBottom: "0.75rem" }}>// Description</div>
        <p style={{ color: "var(--muted)", lineHeight: 1.9, fontSize: "0.95rem" }}>{p.description}</p>
      </div>

      {/* Mon rôle */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div className="page-label" style={{ marginBottom: "0.75rem" }}>// Mon rôle</div>
        <p style={{ color: "var(--muted)", lineHeight: 1.9, fontSize: "0.95rem" }}>{p.myRole}</p>
      </div>

      {/* Méthodologie */}
      {p.methodology && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div className="page-label" style={{ marginBottom: "0.75rem" }}>// Méthodologie</div>
          <p style={{ color: "var(--muted)", lineHeight: 1.9, fontSize: "0.95rem" }}>{p.methodology}</p>
        </div>
      )}

      {/* DevOps details */}
      {p.devopsDetails.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <div className="page-label" style={{ marginBottom: "1rem" }}>// Infrastructure & DevOps</div>
          <div className="card" style={{ borderLeft: `3px solid ${p.color}` }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {p.devopsDetails.map((d, i) => (
                <li key={i} style={{ display: "flex", gap: "0.6rem", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.6 }}>
                  <span style={{ color: p.color, flexShrink: 0 }}>▸</span>{d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Stack */}
      {Object.keys(p.stack).length > 0 && (
        <div>
          <div className="page-label" style={{ marginBottom: "1rem" }}>// Stack technique</div>
          <div className="grid-2">
            {Object.entries(p.stack).map(([cat, items]) => (
              <div key={cat} className="card">
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: p.color, marginBottom: "0.75rem", fontFamily: "var(--mono)" }}>{cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {items.map(item => (
                    <span key={item} style={{ padding: "0.25rem 0.65rem", borderRadius: 5, fontSize: "0.72rem", background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25` }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
