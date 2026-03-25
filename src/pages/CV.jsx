import { useEffect } from "react";

export default function CV() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const cvs = [
    {
      lang: "Français",
      file: "CV-Soa_Razakamboly-fr.pdf",
      label: "Télécharger",
      color: "#38BDF8",
    },
    {
      lang: "English",
      file: "CV-Soa_Razakamboly-ang.pdf",
      label: "Download",
      color: "#818CF8",
    },
  ];

  return (
    <div className="page" style={{ position: "relative", zIndex: 1 }}>
      <div className="page-header">
        <h1 className="page-title">Curriculum Vitae</h1>
        <p className="page-subtitle">Téléchargez mon CV en français ou en anglais.</p>
      </div>

      <div className="reveal" style={{
        display: "flex", gap: "2rem", justifyContent: "center",
        flexWrap: "wrap", maxWidth: 700, margin: "0 auto",
      }}>
        {cvs.map(cv => (
          <div key={cv.lang} className="card" style={{
            textAlign: "center", padding: "3rem 2.5rem",
            borderTop: `3px solid ${cv.color}`,
            flex: "1 1 250px", maxWidth: 300,
          }}>
            <div style={{
              fontFamily: "var(--mono)", fontSize: "0.72rem",
              color: cv.color, letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: "1rem", fontWeight: 700,
            }}>
              {cv.lang}
            </div>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "2rem", lineHeight: 1.7 }}>
              {cv.desc}
            </p>
            <a
              href={cv.file}
              download
              style={{
                display: "inline-block", padding: "0.7rem 1.8rem",
                borderRadius: 8, fontWeight: 700, fontSize: "0.85rem",
                background: cv.color, color: "#040c18",
                textDecoration: "none", letterSpacing: "0.05em",
                transition: "transform 0.2s, box-shadow 0.2s, filter 0.2s",
                cursor: "none",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.04)";
                e.currentTarget.style.boxShadow = `0 12px 30px ${cv.color}50`;
                e.currentTarget.style.filter = "brightness(1.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            >
              ↓ {cv.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
