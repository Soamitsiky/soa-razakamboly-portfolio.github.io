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
          minHeight: "autos", display: "flex", alignItems: "center",
          padding: "80px 5vw 4rem", gap: "2rem", flexWrap: "wrap",
          flexDirection: "column",
        
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
          gap: "4rem", alignItems: "center", width: "100%", maxWidth: "1200px",
        }}>
          {/* Left */}
          <div>

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
              <TypedText words={["Étudiante en ...","Cloud Computing", "Administration Réseaux", "DevOps", "Cybersécurité"]} />
            </div>

            <p className="fade-in" style={{
              color: "var(--white)", fontSize: "1rem", lineHeight: 1.8,
              maxWidth: 520, marginBottom: "2rem",
            }}>
              {profile.presentation}
            </p>

        

           <div className="fade-in" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
  <a
  href={`${process.env.PUBLIC_URL}/CV-Soa_Razakamboly-fr.pdf`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary"
  >
    Voir mon CV
  </a>

  <a
    href="https://www.linkedin.com/in/soa-razakamboly-7016b0327"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: "0.75rem 1.5rem",
      background: "linear-gradient(135deg, #00c6ff, #0072ff)",
      color: "#fff",
      borderRadius: "999px",
      fontWeight: "600",
      textDecoration: "none",
    }}
  >
    LinkedIn
  </a>
</div>
</div>  {/* ← ferme le bloc Left */}

          {/* Photo */}
          <div style={{ flexShrink: 0, animation: "fadeUp .8s .4s both", display: "none" }}>
            
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
                  src={process.env.PUBLIC_URL + "/photosoa.jpg"}
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
                <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--white)" }}>{item.label}</span>
                <span style={{ marginLeft: "auto", color: "var(--muted)", fontSize: "1.1rem" }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      
    </div>
    </>
  );
}