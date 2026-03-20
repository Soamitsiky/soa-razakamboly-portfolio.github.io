import { recommendations } from "../data/data";
import { useEffect } from "react";

export default function Recommendations() {
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
        <div className="page-label">// Témoignages</div>
        <h1 className="page-title">Recommandations</h1>
        <p className="page-subtitle">Ce que disent mes encadrants et professeurs.</p>
      </div>

      <div className="grid-2 reveal">
        {recommendations.map((r, i) => (
          <div key={i} className="card" style={{ borderTop: `3px solid ${r.color}` }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem", opacity: 0.4 }}>"</div>
            <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.9rem", marginBottom: "1.5rem", fontStyle: "italic" }}>
              {r.text}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                background: `${r.color}25`, border: `2px solid ${r.color}50`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.85rem", color: r.color,
              }}>{r.initials}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{r.name}</div>
                <div style={{ color: "var(--muted)", fontSize: "0.78rem" }}>{r.role}</div>
                <div style={{ color: r.color, fontSize: "0.75rem" }}>{r.company}</div>
              </div>
              <div style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--muted)" }}>{r.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
