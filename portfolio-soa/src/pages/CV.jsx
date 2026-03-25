import { useEffect } from "react";

export default function CV() {
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
        <div className="page-label">// Documents</div>
        <h1 className="page-title">Mon CV</h1>
        <p className="page-subtitle">Téléchargez mon CV en français ou en anglais.</p>
      </div>

      <div className="grid-2 reveal" style={{ maxWidth: 700 }}>
        {/* CV FR */}
        <div className="card" style={{ textAlign: "center", padding: "3rem 2rem", borderTop: "3px solid var(--sky)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🇫🇷</div>
          <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>CV Français</h3>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "2rem" }}>Version française de mon curriculum vitae</p>
          <a href="CV-Soa_Razakamboly-fr.pdf" download className="btn btn-primary" style={{ display: "inline-flex" }}>
            ⬇ Télécharger
          </a>
        </div>

        {/* CV EN */}
        <div className="card" style={{ textAlign: "center", padding: "3rem 2rem", borderTop: "3px solid var(--lilac)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🇬🇧</div>
          <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>CV English</h3>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "2rem" }}>English version of my resume</p>
          <a href="CV-Soa_Razakamboly-ang.pdf" download className="btn btn-outline" style={{ display: "inline-flex" }}>
            ⬇ Download
          </a>
        </div>
      </div>
    </div>
  );
}
