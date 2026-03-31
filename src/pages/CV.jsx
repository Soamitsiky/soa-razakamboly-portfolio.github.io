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
        
        <h1 className="page-title">Mon CV</h1>
        <p className="page-subtitle">Téléchargez mon CV en français ou en anglais.</p>
      </div>

      <div className="grid-2 reveal" style={{ maxWidth: 700 }}>
        {/* CV FR */}
        <div className="card" style={{ textAlign: "center", padding: "3rem 2rem", borderTop: "3px solid var(--sky)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>Version Française</div>
        
          
          <a href="CV-Soa_Razakamboly-fr.pdf" download className="btn btn-primary" style={{ display: "inline-flex" }}>
            ⬇ Télécharger
          </a>
        </div>

        {/* CV EN */}
        <div className="card" style={{ textAlign: "center", padding: "3rem 2rem", borderTop: "3px solid var(--lilac)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>Version Anglaise</div>
          
        
          <a href="CV-Soa_Razakamboly-ang.pdf" download className="btn btn-outline" style={{ display: "inline-flex" }}>
            ⬇ Download
          </a>
        </div>
      </div>
    </div>
  );
}
