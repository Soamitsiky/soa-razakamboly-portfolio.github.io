import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { path: "/", label: "Accueil" },
  { path: "/about", label: "À propos" },
  { path: "/experiences", label: "Expériences" },
  { path: "/projects", label: "Projets" },
  { path: "/education", label: "Formation" },
  { path: "/alternance", label: "Alternance" },
  { path: "/recommendations", label: "Recommandations" },
  { path: "/cv", label: "CV" },
  { path: "/contact", label: "Contact" },
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

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 6vw",
      background: scrolled ? "rgba(4,12,24,0.92)" : "rgba(4,12,24,0.7)",
      backdropFilter: "blur(18px)",
      borderBottom: "1px solid rgba(56,189,248,0.12)",
      transition: "background 0.3s",
    }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div style={{
          fontFamily: "var(--mono)", fontWeight: 700, fontSize: "1.1rem",
          background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          letterSpacing: "0.05em",
        }}>SR/</div>
      </Link>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: "0.2rem", flexWrap: "wrap", alignItems: "center" }}>
        {links.map(l => (
          <Link key={l.path} to={l.path} style={{ textDecoration: "none" }}>
            <span style={{
              padding: "0.35rem 0.7rem", borderRadius: 7, fontSize: "0.78rem",
              fontWeight: 600, letterSpacing: "0.03em",
              color: location.pathname === l.path ? "var(--sky)" : "var(--muted)",
              background: location.pathname === l.path ? "rgba(56,189,248,0.1)" : "transparent",
              transition: "all 0.2s", display: "inline-block",
              cursor: "none",
            }}>
              {l.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
