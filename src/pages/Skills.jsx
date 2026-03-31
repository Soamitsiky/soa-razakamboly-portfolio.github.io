import { useEffect } from "react";
import { skills } from "../data/data";

export default function Skills() {
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
        <div className="page-label"></div>
        <h1 className="page-title">Compétences</h1>
        <p className="page-subtitle">Les technologies et outils que j'utilise au quotidien.</p>
      </div>

      <div className="grid-3 reveal">
        {skills.map((s, i) => (
          <div key={i} className="card">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
              <span style={{ fontWeight: 700, fontSize: "0.9rem", color: s.color }}>{s.category}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {s.items.map(item => (
                <span key={item} style={{
                  padding: "0.25rem 0.65rem", borderRadius: 5, fontSize: "0.7rem",
                  background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30`
                }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
