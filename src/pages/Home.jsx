import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { profile, skills, experiences, projects } from "../data/data";

// Animated counter
function Counter({ target }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let n = 0; const step = target / 40;
        const t = setInterval(() => {
          n = Math.min(n + step, target);
          setVal(Math.floor(n));
          if (n >= target) clearInterval(t);
        }, 30);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}+</span>;
}

// Typing animation
function TypedText({ words }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, words]);
  return (
    <span style={{ color: "var(--sky)" }}>
      {displayed}
      <span style={{ animation: "blink 1s step-end infinite", borderRight: "2px solid var(--sky)", marginLeft: 2 }} />
    </span>
  );
}

const navItems = [
  { label: "Expériences", path: "/experiences", color: "#38BDF8", icon: "💼" },
  { label: "Compétences", path: "/skills", color: "#818CF8", icon: "⚙️" },
  { label: "Projets", path: "/projects", color: "#34D399", icon: "🚀" },
  { label: "Formation", path: "/education", color: "#FB923C", icon: "🎓" },
  { label: "Alternance", path: "/alternance", color: "#F472B6", icon: "🔍" },
  { label: "Contact", path: "/contact", color: "#38BDF8", icon: "✉️" },
];

export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>


{/* MENU MOBILE */}
<div id="nav-menu" style={{
  position: "fixed", top: 0, left: 0, width: "280px", height: "100vh",
  background: "rgba(4,12,24,0.98)", backdropFilter: "blur(40px)",
  transform: "translateX(-100%)", transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
  zIndex: 999, padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem",
}}>
  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
    <div style={{
      width: 32, height: 32, borderRadius: 8,
      background: "rgba(56,189,248,0.2)", border: "1px solid rgba(56,189,248,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
    }}
    onClick={() => document.getElementById("nav-menu").classList.remove("open")}
    >
      <span style={{ fontSize: "1.4rem", color: "var(--sky)" }}>×</span>
    </div>
  </div>
  
  {[
    { label: "Accueil", path: "/", color: "#38BDF8" },
    { label: "CV", path: "/cv", color: "#34D399" },
    { label: "Expériences", path: "/experiences", color: "#818CF8" },
    { label: "Compétences", path: "/skills", color: "#FB923C" },
    { label: "Projets", path: "/projects", color: "#F472B6" },
    { label: "Formation", path: "/education", color: "#10B981" },
    { label: "Alternance", path: "/alternance", color: "#8B5CF6" },
    { label: "Contact", path: "/contact", color: "#EC4899" },
  ].map(item => (
    <Link 
      key={item.path} 
      to={item.path} 
      onClick={() => document.getElementById("nav-menu").classList.remove("open")}
      style={{
        padding: "1rem 1.5rem", borderRadius: 12,
        background: "rgba(56,189,248,0.05)", border: `1px solid ${item.color}20`,
        color: "var(--white)", textDecoration: "none", fontWeight: 600,
        fontSize: "0.95rem", letterSpacing: "-0.01em",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{
          width: 4, height: 24, borderRadius: 2, background: item.color,
        }} />
        {item.label}
      </div>
    </Link>
  ))}
</div>
    <div>

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: "60vh", display: "flex", alignItems: "felx-start", flexDirection: "column", justifyContent: "center",
        padding: "0 8vw",  paddingBottom: "6rem", position: "relative", overflow: "hidden",
      }}>
        {/* Ambient glow blobs */}
        <div style={{
          position: "absolute", top: "15%", left: "5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "8%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto",
          gap: "4rem", alignItems: "center", width: "100%", maxWidth: 1200,flex: 1, 
        }}>
          {/* Left */}
          <div>
            <div className="fade-in" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)",
              borderRadius: 20, padding: "0.35rem 1rem", marginBottom: "1.5rem",
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: "var(--green)",
                animation: "pulse 1.2s ease-in-out infinite",
                display: "inline-block",
              }} />
              <span style={{ fontSize: "0.75rem", fontFamily: "var(--mono)", color: "var(--green)", fontWeight: 600 }}>
                {profile.disponibilite}
              </span>
            </div>

            <h1 className="fade-in" style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.05,
              marginBottom: "1rem",
            }}>
              {profile.name.split(" ")[0]}{" "}
              <span style={{
                background: "var(--grad)", WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {profile.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <div className="fade-in" style={{
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: 600,
              marginBottom: "1.25rem", color: "var(--white)", minHeight: "2em",
            }}>
              <TypedText words={["Cloud Computing", "Administration Réseaux", "DevOps", "Cybersécurité"]} />
            </div>

            <p className="fade-in" style={{
              color: "var(--muted)", fontSize: "1rem", lineHeight: 1.8,
              maxWidth: 520, marginBottom: "2rem",
            }}>
              {profile.presentation}
            </p>

            <div className="fade-in" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
              {["Cloud", "Réseaux", "Systèmes", "Cybersécurité"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div className="fade-in" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/cv" className="btn btn-primary">Voir mon CV →</Link>
              <Link to="/contact" className="btn btn-outline">Me contacter</Link>
            </div>
          </div>

          {/* Photo */}
          <div className="fade-in" style={{
            position: "relative",
            animation: "float 5s ease-in-out infinite",
          }}>
            <div style={{
              width: 260, height: 260,
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              background: "var(--grad)",
              padding: 3,
            }}>
              <div style={{
                width: "100%", height: "100%",
                borderRadius: "inherit",
                overflow: "hidden",
                background: "var(--bg2)",
              }}>
                <img
                  src="https://raw.githubusercontent.com/Soamitsiky/soa-razakamboly-portfolio.github.io/main/src/pages/photosoa.jpg"
                  alt="Soa Razakamboly"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
            <div style={{
              position: "absolute", bottom: 12, right: -12,
              background: "rgba(4,12,24,0.9)", border: "1px solid rgba(52,211,153,0.4)",
              borderRadius: 10, padding: "0.4rem 0.8rem",
              fontSize: "0.7rem", fontFamily: "var(--mono)", color: "var(--green)",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse 2s ease-in-out infinite", display: "inline-block" }} />
              Open to work
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          marginTop: "auto", paddingBottom: "2rem",
          display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap",
        }}>
          {[
            { val: 3, label: "Expériences" },
            { val: 15, label: "Compétences" },
            { val: 3, label: "Projets" },
            { val: 4, label: "Recommandations" },
          ].map(s => (
            <div key={s.label} className="reveal" style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800,
                background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                <Counter target={s.val} />
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.78rem", fontFamily: "var(--mono)", letterSpacing: "0.1em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUICK NAV ─── */}
      <section style={{ padding: "2rem 8vw 4rem" }}>
        
        <div className="grid-3">
          {navItems.map((item, i) => (
            <Link key={item.path} to={item.path} style={{ textDecoration: "none" }}>
              <div className="card reveal" style={{
                transitionDelay: `${i * 0.07}s`,
                display: "flex", alignItems: "center", gap: "1rem",
                cursor: "none",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = item.color;
                  e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}25`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(56,189,248,0.15)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span style={{
                  width: 42, height: 42, borderRadius: 10, display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: "1.3rem",
                  background: `${item.color}15`, border: `1px solid ${item.color}30`, flexShrink: 0,
                }}>{item.icon}</span>
                <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{item.label}</span>
                <span style={{ marginLeft: "auto", color: "var(--muted)", fontSize: "1.1rem" }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA CONTACT ─── */}
      <section style={{ padding: "4rem 8vw 6rem", textAlign: "center" }}>
        <div className="reveal" style={{
          maxWidth: 600, margin: "0 auto",
          background: "rgba(56,189,248,0.04)",
          border: "1px solid rgba(56,189,248,0.15)",
          borderRadius: 24, padding: "3rem 2rem",
        }}>
          <div style={{
            fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem",
            background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Travaillons ensemble
          </div>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Je recherche une alternance à partir de septembre 2026 dans les Hauts-de-France.
          </p>
          <Link to="/contact" className="btn btn-primary">Me contacter →</Link>
        </div>
      </section>

    </div>
    </>
  );
}