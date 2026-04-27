import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  
  { label: "À propos", anchor: "#about" },
  { label: "Compétences", anchor: "#skills" },
   { label: "Expériences", anchor: "#experiences" },
  { label: "Projets", anchor: "#projects" },
  { label: "Formation", anchor: "#education" },
  { label: "Recs", anchor: "#recs" },
  { label: "Alternance", anchor: "#alternance" },
  { label: "Contact", anchor: "#contact" },
];

const mobileLinks = [
  
  { label: "À propos",    anchor: "#about",       path: "/",  color: "#A78BFA" },
  { label: "Compétences", anchor: "#skills",      path: "/",  color: "#FB923C" },
  { label: "Expériences", anchor: "#experiences", path: "/",  color: "#818CF8" },
  { label: "Projets",     anchor: "#projects",    path: "/",  color: "#34D399" },
  { label: "Formation",   anchor: "#education",   path: "/",  color: "#F472B6" },
  { label: "Recs",        anchor: "#recs",        path: "/",  color: "#ecf65c" },
  { label: "Alternance",  anchor: "#alternance",  path: "/",  color: "#8B5CF6" },
  { label: "Contact",     anchor: "#contact",     path: "/",  color: "#EC4899" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";

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

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.anchor) {
      if (isHome) {
        document.querySelector(link.anchor)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.querySelector(link.anchor)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else if (link.path) {
      navigate(link.path);
    }
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 64,
        background: scrolled ? "rgba(4,12,24,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(56,189,248,0.1)" : "none",
        transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5vw",
      }}>
        <button onClick={() => handleNavClick({ anchor: "#hero" })}
          style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "1rem", color: "var(--sky)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.05em" }}>
          Soa<span style={{ color: "var(--lilac)" }}>R</span>
        </button>

        <div className="desktop-nav" style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          {navLinks.map(l => (
            <button key={l.label}
              onClick={() => handleNavClick(l)}
              style={{ padding: "0.4rem 0.75rem", borderRadius: 8, fontSize: "0.82rem", fontWeight: 500, color: "var(--muted)", background: "transparent", border: "1px solid transparent", transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button onClick={() => setMenuOpen(v => !v)} className="hamburger-btn"
          style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: "8px" }} aria-label="Menu">
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: "block", width: 22, height: 2, background: "var(--sky)", borderRadius: 2, transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? i === 0 ? "translateY(7px) rotate(45deg)" : i === 2 ? "translateY(-7px) rotate(-45deg)" : "scaleX(0)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1 }} />
          ))}
        </button>
      </nav>

      <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 998, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "all" : "none", transition: "opacity 0.35s ease" }} />

      <div style={{ position: "fixed", top: 0, right: 0, width: "280px", height: "100vh", background: "rgba(4,12,24,0.98)", backdropFilter: "blur(40px)", borderLeft: "1px solid rgba(56,189,248,0.1)", transform: menuOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)", zIndex: 999, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(56,189,248,0.1)" }}>
          <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "0.9rem", color: "var(--sky)" }}>Soa<span style={{ color: "var(--lilac)" }}>R</span></span>
          <button onClick={() => setMenuOpen(false)} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--sky)", fontSize: "1.2rem" }}>×</button>
        </div>
        {mobileLinks.map((l, i) => (
          <button key={l.label} onClick={() => handleNavClick(l)}
            style={{ padding: "0.85rem 1rem", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "var(--white)", fontWeight: 500, fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "0.75rem", transition: "all 0.2s", cursor: "pointer",
              transform: menuOpen ? "translateX(0)" : "translateX(20px)", opacity: menuOpen ? 1 : 0, transitionDelay: `${i * 0.04}s` }}>
            <div style={{ width: 3, height: 18, borderRadius: 2, background: l.color, flexShrink: 0 }} />
            {l.label}
          </button>
        ))}
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