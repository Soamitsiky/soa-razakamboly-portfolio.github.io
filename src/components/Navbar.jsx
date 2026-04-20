import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { path: "/", label: "Accueil", color: "#38BDF8" },
  { path: "/about", label: "À propos", color: "#A78BFA" },
  { path: "/experiences", label: "Expériences", color: "#818CF8" },
  { path: "/projects", label: "Projets", color: "#34D399" },
  { path: "/skills", label: "Compétences", color: "#FB923C" },
  { path: "/education", label: "Formation", color: "#F472B6" },
  { path: "/alternance", label: "Alternance", color: "#8B5CF6" },
  { path: "/recommendations", label: "Recs", color: "#10B981" },
  { path: "/cv", label: "CV", color: "#38BDF8" },
  { path: "/contact", label: "Contact", color: "#EC4899" },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 64,
        background: scrolled ? "rgba(4,12,24,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(56,189,248,0.1)" : "none",
        transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5vw",
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "var(--mono)", fontWeight: 700, fontSize: "1rem",
          color: "var(--sky)", textDecoration: "none", marginRight: "auto",
          letterSpacing: "0.05em",
        }}>
          Soa<span style={{ color: "var(--lilac)" }}>R</span>
        </Link>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          {links.map(l => {
            const active = location.pathname === l.path;
            return (
              <Link key={l.path} to={l.path} style={{
                padding: "0.4rem 0.75rem",
                borderRadius: 8,
                fontSize: "0.82rem",
                fontWeight: active ? 700 : 500,
                color: active ? "var(--sky)" : "var(--muted)",
                textDecoration: "none",
                background: active ? "rgba(56,189,248,0.1)" : "transparent",
                border: active ? "1px solid rgba(56,189,248,0.25)" : "1px solid transparent",
                transition: "all 0.2s",
                cursor: "none",
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "var(--white)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "var(--muted)"; }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="hamburger-btn"
          style={{
            display: "none",
            flexDirection: "column", gap: 5,
            background: "none", border: "none",
            cursor: "pointer", padding: "8px",
          }}
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 2,
              background: "var(--sky)", borderRadius: 2,
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen
                ? i === 0 ? "translateY(7px) rotate(45deg)"
                  : i === 2 ? "translateY(-7px) rotate(-45deg)"
                    : "scaleX(0)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Overlay sombre derrière le panneau */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 998,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Panneau menu — côté DROIT */}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "280px",
        height: "100vh",
        background: "rgba(4,12,24,0.98)",
        backdropFilter: "blur(40px)",
        borderLeft: "1px solid rgba(56,189,248,0.1)",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        zIndex: 999,
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        overflowY: "auto",
      }}>

        {/* Header panneau */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(56,189,248,0.1)",
        }}>
          <span style={{
            fontFamily: "var(--mono)", fontWeight: 700,
            fontSize: "0.9rem", color: "var(--sky)",
            letterSpacing: "0.05em",
          }}>
            Soa<span style={{ color: "var(--lilac)" }}>R</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(56,189,248,0.1)",
              border: "1px solid rgba(56,189,248,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--sky)", fontSize: "1.2rem",
            }}
          >
            ×
          </button>
        </div>

        {/* Liens */}
        {links.map((l, i) => {
          const active = location.pathname === l.path;
          return (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "0.85rem 1rem",
                borderRadius: 10,
                background: active ? `${l.color}15` : "rgba(255,255,255,0.03)",
                border: `1px solid ${active ? l.color + "40" : "rgba(255,255,255,0.06)"}`,
                color: active ? l.color : "var(--white)",
                textDecoration: "none",
                fontWeight: active ? 700 : 500,
                fontSize: "0.92rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                transition: "all 0.2s",
                transform: menuOpen ? "translateX(0)" : "translateX(20px)",
                opacity: menuOpen ? 1 : 0,
                transitionDelay: `${i * 0.04}s`,
              }}
            >
              {/* Barre colorée gauche */}
              <div style={{
                width: 3, height: 18, borderRadius: 2,
                background: active ? l.color : "rgba(255,255,255,0.15)",
                flexShrink: 0,
                transition: "background 0.2s",
              }} />
              {l.label}
              {active && (
                <span style={{
                  marginLeft: "auto",
                  fontSize: "0.7rem",
                  color: l.color,
                  fontFamily: "var(--mono)",
                }}>●</span>
              )}
            </Link>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}