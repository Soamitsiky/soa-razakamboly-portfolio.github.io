import { education, profile } from "../data/data";
import { useEffect } from "react";

export default function Education() {
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
      
        <h1 className="page-title">Parcours académique</h1>
      </div>

      <div style={{ maxWidth: 700, marginBottom: "4rem" }} className="reveal">
        <div className="timeline">
          {education.map((e, i) => (
            <div key={i} className="tl-item">
              <div className="tl-dot" style={{ background: e.color, boxShadow: `0 0 12px ${e.color}88` }} />
              <div className="card" style={{ borderLeft: `3px solid ${e.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1.05rem", color: e.color }}>{e.degree}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "0.2rem" }}>{e.school}</div>
                    {e.note && <div style={{ color: "var(--green)", fontSize: "0.78rem", marginTop: "0.3rem" }}>{e.note}</div>}
                  </div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "0.78rem", color: e.color, fontWeight: 700 }}>{e.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}
