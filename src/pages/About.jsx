import { useEffect } from "react";
import { profile, skills } from "../data/data";

export default function About() {
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
        
        <h1 className="page-title">Qui suis-je ?</h1>
      </div>

      {/* Présentation + photo */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "start", marginBottom: "4rem", flexWrap: "wrap" }} className="reveal">
        <div>
         
          <h1 style={{ color: "var(--muted)", lineHeight: 2, fontSize: "1.5rem", marginBottom: "2rem" }}>
            Étudiante en <strong style={{ color: "var(--white)" }}> BUT 3ème année Réseaux & Systèmes</strong> à l'IUT de Villeneuve-d'Ascq.
          </h1>

          {/* Infos rapides */}
          <div className="card" style={{ display: "inline-block", minWidth: 300 }}>
            <h3 style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--sky)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Infos clés</h3>
            {[
              ["Formation", "BUT Réseaux & Systèmes"],
              ["École", "IUT A Villeneuve-d'Ascq"],
              ["Email", profile.email],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.55rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "0.85rem", gap: "2rem" }}>
                <span style={{ color: "var(--muted)" }}>{k}</span>
                <span style={{ color: "var(--sky)", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flexShrink: 0 }}>
          <img src="photosoa.jpg" alt="Soa" style={{
            width: 200, height: 200, borderRadius: "50%", objectFit: "cover", objectPosition: "top",
            border: "3px solid transparent",
            background: "linear-gradient(var(--bg),var(--bg)) padding-box, var(--grad) border-box",
            boxShadow: "0 0 40px rgba(56,189,248,0.25)",
          }} />
        </div>
      </div>

      {/* Soft skills */}
      <div className="reveal" style={{ marginBottom: "3rem" }}>
        <div className="page-label" style={{ marginBottom: "1rem" }}>Soft skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {profile.softSkills.map(s => (
            <span key={s} className="card" style={{ padding: "0.6rem 1.2rem", fontSize: "0.88rem", fontWeight: 600, cursor: "default" }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Langues */}
      <div className="reveal" style={{ marginBottom: "3rem" }}>
        <div className="page-label" style={{ marginBottom: "1rem" }}>Langues</div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {profile.languages.map(l => (
            <div key={l.name} className="card" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.9rem 1.5rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{l.flag}</span>
              <div>
                <div style={{ fontWeight: 700 }}>{l.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{l.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centres d'intérêt */}
      <div className="reveal" style={{ marginBottom: "3rem" }}>
        <div className="page-label" style={{ marginBottom: "1rem" }}>Centres d'intérêt</div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {profile.hobbies.map(h => (
            <div key={h} className="card" style={{ padding: "0.8rem 1.5rem", fontWeight: 600, cursor: "default" }}>{h}</div>
          ))}
        </div>
      </div>

      
    </div>
  );
}
