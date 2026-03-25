import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { profile, skills, experiences, projects } from "../data/data";

function Counter({ target }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let n = 0; const step = target / 40;
        const t = setInterval(() => { n = Math.min(n + step, target); setVal(Math.floor(n)); if (n >= target) clearInterval(t); }, 30);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}+</span>;
}

export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 1 }}>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "80px 8vw 4rem", gap: "5rem", flexWrap: "wrap",
      }}>
        {/* Left */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.25)",
            borderRadius: 20, padding: "0.3rem 1rem",
            fontFamily: "var(--mono)", fontSize: "0.72rem", color: "var(--sky)",
            letterSpacing: "0.12em", marginBottom: "1.5rem",
            animation: "fadeUp 0.6s 0.1s both",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "blink 1.5s infinite" }} />
            {profile.disponibilite}
          </div>

          <h1 style={{
            fontFamily: "var(--font)", fontWeight: 800,
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05,
            marginBottom: "1rem", animation: "fadeUp 0.7s 0.25s both",
          }}>
            {profile.name.split(" ")[0]}<br />
            <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p style={{
            color: "var(--muted)", fontSize: "1rem", lineHeight: 1.8,
            maxWidth: 520, marginBottom: "2rem",
            animation: "fadeUp 0.7s 0.4s both",
          }}>
            {profile.presentation}
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem", animation: "fadeUp 0.7s 0.5s both" }}>
            {["Cloud", "DevOps", "Réseaux", "Cybersécurité"].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeUp 0.7s 0.6s both" }}>
            <Link to="/contact" className="btn btn-primary">Me contacter →</Link>
            <Link to="/projects" className="btn btn-outline">Voir mes projets</Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: "3rem", marginTop: "3.5rem", flexWrap: "wrap",
            animation: "fadeUp 0.7s 0.8s both",
          }}>
            {[{ val: 3, label: "Expériences" }, { val: 15, label: "Compétences" }, { val: 3, label: "Projets" }, { val: 4, label: "Recommandations" }].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "2rem", background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <Counter target={s.val} />
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div style={{ flexShrink: 0, animation: "fadeUp 0.8s 0.4s both" }}>
          <div style={{ position: "relative", width: 280, height: 280 }}>
            <div style={{
              position: "absolute", inset: -10, borderRadius: "50%",
              border: "2px dashed rgba(56,189,248,0.3)",
              animation: "spin 20s linear infinite",
            }} />
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              boxShadow: "0 0 60px rgba(56,189,248,0.3), 0 0 120px rgba(129,140,248,0.15)",
            }} />
            <img src="photosoa.jpg" alt="Soa Razakamboly" style={{
              width: 280, height: 280, borderRadius: "50%",
              objectFit: "cover", objectPosition: "top",
              border: "3px solid transparent",
              background: "linear-gradient(var(--bg),var(--bg)) padding-box, var(--grad) border-box",
              position: "relative", zIndex: 1, display: "block",
            }} />
            <div style={{
              position: "absolute", bottom: 12, right: 0, zIndex: 2,
              background: "rgba(4,12,24,0.92)", border: "1px solid rgba(56,189,248,0.4)",
              borderRadius: 20, padding: "0.3rem 0.9rem",
              fontFamily: "var(--mono)", fontSize: "0.72rem", fontWeight: 700,
              color: "var(--sky)", letterSpacing: "0.08em",
              display: "flex", alignItems: "center", gap: "0.4rem",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "blink 1.5s infinite" }} />
              Open to work
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS PREVIEW 
      <section style={{ padding: "4rem 8vw", background: "rgba(7,18,36,0.6)" }}>
        <div className="reveal">
          <div className="page-label">// Compétences clés</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Stack technique</h2>
            <Link to="/experiences" className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "0.5rem 1.2rem" }}>Voir tout →</Link>
          </div>
          <div className="grid-3">
            {skills.slice(0, 3).map((s, i) => (
              <div key={i} className="card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: s.color }}>{s.category}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {s.items.slice(0, 5).map(item => (
                    <span key={item} style={{ padding: "0.2rem 0.6rem", borderRadius: 5, fontSize: "0.7rem", background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30` }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */

      /* EXPERIENCES PREVIEW 
      <section style={{ padding: "4rem 8vw" }}>
        <div className="reveal">
          <div className="page-label">// Parcours</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Expériences</h2>
            <Link to="/experiences" className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "0.5rem 1.2rem" }}>Voir tout →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {experiences.map(exp => (
              <Link key={exp.id} to={`/experiences/${exp.id}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderLeft: `3px solid ${exp.color}` }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: exp.color }}>{exp.title}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{exp.company}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--muted)" }}>{exp.period}</span>
                    <span style={{ color: "var(--sky)", fontSize: "1.2rem" }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      */

      /* PROJECTS PREVIEW 
      <section style={{ padding: "4rem 8vw", background: "rgba(7,18,36,0.6)" }}>
        <div className="reveal">
          <div className="page-label">// Réalisations</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projets</h2>
            <Link to="/projects" className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "0.5rem 1.2rem" }}>Voir tout →</Link>
          </div>
          <div className="grid-3">
            {projects.map(p => (
              <Link key={p.id} to={`/projects/${p.id}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ height: "100%" }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>{p.emoji}</span>
                  <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.3rem" }}>{p.title}</div>
                  <div style={{ color: p.color, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.8rem" }}>{p.subtitle}</div>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>{p.summary}</p>
                  <div style={{ marginTop: "1rem" }}>
                    <span className={p.status === "Terminé" ? "status-badge status-done" : "status-badge status-wip"}>
                      {p.status === "Terminé" ? "✓" : "⟳"} {p.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* CTA CONTACT */}
      <section style={{ padding: "5rem 8vw", textAlign: "center" }}>
        <div className="reveal">
          <h2 style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 3rem)", background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>
            Travaillons ensemble
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto 2rem", lineHeight: 1.8 }}>
            Je recherche une alternance à partir de septembre 2026 dans les Hauts-de-France.
          </p>
          <Link to="/contact" className="btn btn-primary">Me contacter →</Link>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem", borderTop: "1px solid rgba(56,189,248,0.1)", color: "var(--muted)", fontSize: "0.78rem", position: "relative", zIndex: 1 }}>
        Conçu avec ❤️ — Soa Razakamboly · 2026
      </footer>
    </div>
  );
}
