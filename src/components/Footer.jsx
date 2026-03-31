// src/components/Footer.jsx
export default function Footer() {
  return (
    <div style={{ textAlign: "center", padding: "1.5rem 0 1rem" }}>
      <hr style={{
        border: "none",
        borderTop: "1px solid rgba(56,189,248,0.08)",
        marginBottom: "1rem"
      }} />
      <p style={{
        fontSize: "0.72rem",
        color: "rgba(148, 163, 184, 0.75)"
        
      }}>
        © {new Date().getFullYear()} · Conçu & développé par Soa Razakamboly
      </p>
    </div>
  );
}