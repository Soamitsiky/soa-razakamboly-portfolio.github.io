import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { profile, skills, experiences, projects, recommendations, alternance, education } from "../data/data";


import emailjs from "@emailjs/browser";




// ── Typing animation ──
function TypedText({ words }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx];
    let timeout;
    if (!deleting && displayed.length < word.length)
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === word.length)
      timeout = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && displayed.length > 0)
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    else { setDeleting(false); setIdx((idx + 1) % words.length); }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, words]);
  return (
    <span style={{ color: "var(--sky)" }}>
      {displayed}
      <span style={{ borderRight: "2px solid var(--sky)", marginLeft: 2, animation: "blink 1s step-end infinite" }} />
    </span>
  );
}


// ── Soft skills data ──
const softSkills = [
  { icon: "🧘", title: "Calme & sang-froid", color: "#38BDF8", situation: "2 semaines seule en autonomie chez Anywr", text: "Gérée seule pendant 2 semaines sans accompagnement, j'ai appris que la persévérance paie toujours. Peu importe le temps que ça prend, je cherche jusqu'à trouver." },
  { icon: "🤝", title: "Écoute & patience", color: "#818CF8", situation: "Support utilisateurs chez Anywr Group", text: "Le support m'a appris à écouter, reformuler et rassurer — même face à des utilisateurs stressés. J'aime autant le côté humain que le côté technique du métier." },
  { icon: "💬", title: "Communication adaptée", color: "#FBBF24", situation: "Docs & réunions internationales", text: "J'ai rédigé des documentations techniques pour des non-techniciens et participé à des réunions en anglais — j'ai appris à adapter mon discours selon l'interlocuteur." },
  { icon: "💡", title: "Initiative & exécution", color: "#34D399", situation: "Projet KodoLike", text: "Sur KodoLike, j'ai pris l'initiative de coordonner les équipes front, back et infra — un rôle informel mais essentiel. Je propose, j'organise, et j'exécute." },
  { icon: "🔄", title: "Adaptabilité", color: "#F472B6", situation: "Environnements variés", text: "D'un ticket support à la configuration Azure, en passant par Docker et PowerShell, j'adapte rapidement ma posture selon le contexte et les interlocuteurs." },
];


const langues = [
  { lang: "Français", level: "Courant", color: "#38BDF8" },
  { lang: "Anglais", level: "Courant", color: "#818CF8" },
  { lang: "Malgache", level: "Natif", color: "#34D399" },
];


const hobbies = [
  { emoji: "🏊", label: "Natation pro" },
  { emoji: "🎨", label: "Dessin & Peinture" },
  { emoji: "🎸", label: "Guitare" },
  { emoji: "🎲", label: "Sudoku" },
];


// ── Carousel ──
function Carousel({ skills: items }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const goTo = useCallback((index, dir = "next") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 350);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % items.length, "next"), [current, items.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + items.length) % items.length, "prev"), [current, items.length, goTo]);

  useEffect(() => { const t = setInterval(next, 4000); return () => clearInterval(t); }, [next]);

  const s = items[current];
  return (
    <div className="carousel-wrapper">
      <div className="carousel-stage">
        <button className="carousel-arrow" onClick={prev}>‹</button>
        <div className={`carousel-card ${animating ? `carousel-exit-${direction}` : "carousel-enter"}`} style={{ borderColor: `${s.color}40` }}>
          <div className="carousel-card-header">
            <span className="carousel-icon">{s.icon}</span>
            <div>
              <h3 className="carousel-title" style={{ color: s.color }}>{s.title}</h3>
              <span className="carousel-badge" style={{ color: s.color, background: `${s.color}15`, border: `1px solid ${s.color}30` }}>{s.situation}</span>
            </div>
          </div>
          <p className="carousel-text">{s.text}</p>
        </div>
        <button className="carousel-arrow" onClick={next}>›</button>
      </div>
      <div className="carousel-dots">
        {items.map((sk, i) => (
          <button key={i}
            className={`carousel-dot ${i === current ? "carousel-dot-active" : ""}`}
            style={i === current ? { background: sk.color, borderColor: sk.color } : {}}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
          />
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    emailjs.sendForm("service_d6da80n", "template_oe1srhd", formRef.current, "-bHHR-hvIsM-Rm5aa")
      .then(() => { setLoading(false); setSent(true); setForm({ name: "", email: "", message: "" }); })
      .catch(() => { setLoading(false); setError(true); });
  };

  const inputStyle = {
    padding: "0.875rem 1rem", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
    color: "#fff", fontSize: "1rem", outline: "none", width: "100%"
  };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "3rem", color: "#00bcd4" }}>
      <h2>Message envoyé ! ✅</h2>
      <p style={{ marginTop: "1rem", color: "#aaa" }}>Je vous répondrai dans les plus brefs délais.</p>
      <button onClick={() => setSent(false)}
        style={{ marginTop: "1.5rem", padding: "0.75rem 2rem", background: "transparent", border: "1px solid #00bcd4", color: "#00bcd4", borderRadius: "8px", cursor: "pointer" }}>
        Envoyer un autre message
      </button>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit}
     style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ color: "#aaa", fontSize: "0.875rem" }}>Votre nom</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nom" required style={inputStyle} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ color: "#aaa", fontSize: "0.875rem" }}>Votre email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="nom@exemple.com" required style={inputStyle} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ color: "#aaa", fontSize: "0.875rem" }}>Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Votre message..." required rows={6}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
      </div>
      {error && <p style={{ color: "#ff6b6b", fontSize: "0.875rem" }}>❌ Une erreur s'est produite. Vérifie tes clés EmailJS.</p>}
      <button type="submit" disabled={loading}
        style={{ padding: "0.875rem 2rem", background: loading ? "rgba(0,188,212,0.4)" : "rgb(0, 171, 244)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "1rem", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}>
        {loading ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}

// ── CSS keyframes pour colonnes ──
const skillColumnsStyle = `
  @keyframes tickerLTR { 0% { transform: translateX(0); }          100% { transform: translateX(-33.333%); } }
  @keyframes tickerRTL { 0% { transform: translateX(-33.333%); }   100% { transform: translateX(0); } }
`;

// ── Skills : Colonnes verticales défilantes avec logos ──
// ── SVG inline pour produits Microsoft & PowerShell ──
const CUSTOM_SVG = {
  "Microsoft 365 administration": (
    <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect x="1"  y="1"  width="10" height="10" fill="#f25022"/>
      <rect x="13" y="1"  width="10" height="10" fill="#7fba00"/>
      <rect x="1"  y="13" width="10" height="10" fill="#00a4ef"/>
      <rect x="13" y="13" width="10" height="10" fill="#ffb900"/>
    </svg>
  ),
  "Microsoft Azure": (
    <svg viewBox="0 0 96 96" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="azGrad1" x1="0.676" y1="0.096" x2="0.326" y2="0.868">
          <stop offset="0" stopColor="#114a8b"/>
          <stop offset="1" stopColor="#0669bc"/>
        </linearGradient>
        <linearGradient id="azGrad2" x1="0.462" y1="0.341" x2="0.563" y2="0.315">
          <stop offset="0" stopColor="#000000" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#000000" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="azGrad3" x1="0.313" y1="0.098" x2="0.677" y2="0.872">
          <stop offset="0" stopColor="#3ccbf4"/>
          <stop offset="1" stopColor="#2892df"/>
        </linearGradient>
      </defs>
      <path d="M33.338 6.544h26.038L33.402 89.456a4.27 4.27 0 0 1-4.048 2.9H8.067a4.27 4.27 0 0 1-4.048-5.638L29.29 9.442a4.27 4.27 0 0 1 4.048-2.898z" fill="url(#azGrad1)"/>
      <path d="M71.174 61.244H29.902a1.967 1.967 0 0 0-1.343 3.4l26.555 24.804a4.272 4.272 0 0 0 2.91 1.152H81.24z" fill="url(#azGrad2)"/>
      <path d="M33.338 6.544a4.24 4.24 0 0 0-4.057 2.964L4.077 86.73a4.267 4.267 0 0 0 4.048 5.626H24.99a4.576 4.576 0 0 0 3.502-2.976l5.052-14.894 18.077 16.879a4.35 4.35 0 0 0 2.747.991H81.24l-10.102-28.912-29.504.007L59.37 6.544z" fill="url(#azGrad3)"/>
    </svg>
  ),
  "PowerShell": (
    <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#012456"/>
      <path d="M5 7l5.5 5L5 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="12" y1="17" x2="19" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "Windows Server": (
    <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect x="1"  y="1"  width="10" height="10" fill="#f25022"/>
      <rect x="13" y="1"  width="10" height="10" fill="#7fba00"/>
      <rect x="1"  y="13" width="10" height="10" fill="#00a4ef"/>
      <rect x="13" y="13" width="10" height="10" fill="#ffb900"/>
    </svg>
  ),
  "Active Directory": (
    <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#00a4ef"/>
      <circle cx="12" cy="12" r="6" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="12" cy="12" r="2.5" fill="white"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
    </svg>
  ),
};

// Simple Icons slugs confirmés
// Simple Icons slugs confirmés
const SKILL_ICON_MAP = {
  "Microsoft Azure":  "microsoftazure",
  "Google Cloud":     "googlecloud",
  "Bash":             "gnubash",
  "PowerShell":       "powershell",
  "Kubernetes":       "kubernetes",
  "Docker":           "docker",
  "CI/CD GitLab":     "gitlab",
  "Linux":            "linux",
  "Python":           "python",
  "C":                "c",
};

const SKILL_EMOJI_MAP = {};

function SkillItem({ item, color }) {
  const customSvg = CUSTOM_SVG[item];
  const slug = SKILL_ICON_MAP[item];
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.45rem",
      minWidth: 64,
      padding: "0 0.75rem",
      flexShrink: 0,
    }}>
      {customSvg ? (
        customSvg
      ) : slug && !imgError ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
          alt={item}
          width={32}
          height={32}
          loading="lazy"
          style={{ objectFit: "contain" }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>⚙️</span>
      )}
      <span style={{
        fontSize: "0.62rem",
        color: "rgba(255,255,255,0.5)",
        textAlign: "center",
        whiteSpace: "nowrap",
      }}>{item}</span>
    </div>
  );
}

function SkillColumns() {
  // Chaque catégorie = une rangée horizontale défilante
  // Rangées paires : droite → gauche | Rangées impaires : gauche → droite

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {skills.map((s, rowIdx) => {
        const items = [...s.items, ...s.items, ...s.items]; // triple pour boucle fluide
        const duration = 18 + rowIdx * 4;
        const animName = rowIdx % 2 === 0 ? "tickerLTR" : "tickerRTL";

        return (
          <div key={rowIdx}>
            {/* Label catégorie */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              marginBottom: "1rem",
            }}>
              <span style={{ fontSize: "1rem" }}>{s.icon}</span>
              <span style={{
                fontSize: "0.72rem", fontWeight: 700, color: s.color,
                fontFamily: "var(--mono)", letterSpacing: "0.1em",
              }}>
                {s.category.toUpperCase()}
              </span>
              <div style={{
                flex: 1, height: 1,
                background: `linear-gradient(90deg, ${s.color}50, transparent)`,
              }} />
            </div>

            {/* Bande défilante */}
            <div style={{ overflow: "hidden", position: "relative" }}>
              {/* Fondu gauche */}
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
                background: "linear-gradient(to right, #040c18, transparent)",
                zIndex: 2, pointerEvents: "none",
              }} />
              {/* Fondu droite */}
              <div style={{
                position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
                background: "linear-gradient(to left, #040c18, transparent)",
                zIndex: 2, pointerEvents: "none",
              }} />

              <div style={{
                display: "flex",
                gap: "0.5rem",
                animation: `${animName} ${duration}s linear infinite`,
                width: "max-content",
              }}>
                {items.map((item, i) => (
                  <SkillItem key={i} item={item} color={s.color} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


// ── Main component ──
export default function Home() {
 useEffect(() => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        e.target.classList.add("ab-visible");
        e.target.classList.add("pj-visible");
        e.target.classList.add("visible"); 
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal, .ab-reveal, .pj-card-wrapper, .flip-card-wrapper").forEach(el => obs.observe(el));
  return () => obs.disconnect();
}, []);

  return (
    <>
      <style>{skillColumnsStyle}</style>
      {/* ─── HERO ─── */}
      <section id="about" style={{ padding: "6rem 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center", width: "100%", maxWidth: "1200px" }}>
          <div>
            <h1 className="fade-in" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.05, marginBottom: "1rem" }}>
              {profile.name.split(" ")[0]}{" "}
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {profile.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <div className="fade-in" style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontWeight: 600, marginBottom: "1.25rem", minHeight: "2em" }}>
              <TypedText words={["Étudiante en ...", "Cloud Computing", "Administration Réseaux", "DevOps", "Cybersécurité"]} />
            </div>
            <p className="fade-in" style={{ color: "var(--white)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 520, marginBottom: "2rem" }}>
              {profile.presentation}
            </p>
            <div className="fade-in" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={`${process.env.PUBLIC_URL}/CV-Soa_Razakamboly-fr.pdf`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Voir mon CV
              </a>
              <a href="https://www.linkedin.com/in/soa-razakamboly-7016b0327" target="_blank" rel="noopener noreferrer"
                style={{ padding: "0.75rem 1.5rem", background: "linear-gradient(135deg, #00c6ff, #0072ff)", color: "#fff", borderRadius: "999px", fontWeight: "600", textDecoration: "none" }}>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Photo */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{ width: 280, height: 280, borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", background: "var(--grad)", padding: 3 }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "inherit", overflow: "hidden" }}>
                <img src={process.env.PUBLIC_URL + "/photosoa.jpg"} alt="Soa Razakamboly" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", background: "rgba(4,12,24,0.88)", border: "1px solid rgba(52,211,153,0.5)", borderRadius: 999, padding: "0.35rem 1rem", fontSize: "0.72rem", fontFamily: "var(--mono)", color: "var(--green)", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", backdropFilter: "blur(8px)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", animation: "pulse 1.5s ease-in-out infinite", display: "inline-block" }} />
              Recherche alternance - sept 2026
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(56,189,248,0.08)", maxWidth: 1200, margin: "0 auto" }} />

      {/* ─── À PROPOS ─── */}
      <section id="about" style={{ padding: "6rem 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <div className="ab-hero" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
              Qui suis-je <span style={{ color: "var(--sky)" }}>?</span>
            </h2>
            <p style={{ color: "var(--white)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Je suis <strong>Soa</strong>, étudiante en BUT 3ème année Réseaux & Systèmes à l'IUT de Villeneuve-d'Ascq, en alternance chez <strong>Anywr Group</strong>.
            </p>
            <p style={{ color: "var(--white)", lineHeight: 1.8 }}>
              Une vraie curiosité technique, le goût du défi, et une envie naturelle d'aider les gens.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
              {hobbies.map(h => (
                <div key={h.label} className="ab-hobby" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.15)", borderRadius: 999, padding: "0.4rem 1rem", fontSize: "0.85rem" }}>
                  <span>{h.emoji}</span>
                  <span style={{ color: "var(--white)" }}>{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Langues */}
          <div className="ab-reveal" style={{ minWidth: 200 }}>
            <p style={{ fontFamily: "var(--mono)", color: "var(--muted)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>LANGUES</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {langues.map(l => (
                <div key={l.lang} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", background: "rgba(255,255,255,0.03)", border: `1px solid ${l.color}25`, borderRadius: 10, padding: "0.6rem 1rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--white)", fontSize: "0.9rem" }}>{l.lang}</span>
                  <span style={{ color: l.color, fontSize: "0.8rem", fontFamily: "var(--mono)" }}>{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Soft skills carousel */}
        <div className="ab-reveal" style={{ marginTop: "4rem" }}>
          <p style={{ fontFamily: "var(--mono)", color: "var(--muted)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>SOFT SKILLS</p>
          <Carousel skills={softSkills} />
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(56,189,248,0.08)", maxWidth: 1200, margin: "0 auto" }} />

      {/* ─── COMPÉTENCES ─── */}
      <section id="skills" style={{ padding: "6rem 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
          Technologies & Outils
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "2.5rem", fontFamily: "var(--mono)" }}>
          {skills.reduce((acc, s) => acc + s.items.length, 0)} technologies · {skills.length} domaines
        </p>
        <SkillColumns />
      </section>

      {/* ─── EXPÉRIENCES — flip cards ─── */}
<section id="experiences" style={{ padding: "6rem 5vw", maxWidth: 1200, margin: "0 auto" }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
    <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}>Expériences</h2>
  </div>
  <div className="flip-grid">
    {experiences.slice(0, 3).map((exp, i) => (
      <div className="flip-card-wrapper" key={exp.id} style={{ transitionDelay: `${i * 0.1}s` }}>
        <div className="flip-card">
          {/* FACE AVANT */}
          <div className="flip-face flip-front" style={{ borderColor: exp.color }}>
            <div className="flip-glow" style={{ background: exp.color }} />
            <div className="flip-front-top">
              <span className="flip-badge" style={{
                background: exp.type === "Alternance" ? "rgba(251,191,36,0.15)" : "rgba(129,140,248,0.15)",
                color: exp.type === "Alternance" ? "#FBBF24" : "#818CF8",
                border: `1px solid ${exp.type === "Alternance" ? "#FBBF2440" : "#818CF840"}`
              }}>
                {exp.type}
              </span>
              <span style={{ fontSize: "1.4rem" }}>
                {exp.type === "Alternance" ? "⚡" : "🎓"}
              </span>
            </div>
            <div>
              <h3 className="flip-title" style={{ color: exp.color }}>{exp.title}</h3>
              <p className="flip-company">{exp.company}</p>
              <p className="flip-period">{exp.period}</p>
              <p className="flip-hint" style={{ marginTop: "0.75rem" }}>Survolez pour les détails →</p>
            </div>
          </div>
          {/* FACE ARRIÈRE */}
          <div className="flip-face flip-back" style={{ borderColor: exp.color }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: exp.color }}>{exp.title}</h3>
              <span style={{ fontSize: "1.1rem" }}>{exp.type === "Alternance" ? "⚡" : "🎓"}</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "var(--mono)" }}>{exp.company} · {exp.period}</p>
            <p className="flip-summary">{exp.description || exp.summary || ""}</p>
            {exp.stack && (
              <div className="flip-techs">
                {(Array.isArray(exp.stack) ? exp.stack : Object.values(exp.stack).flat()).slice(0, 6).map(t => (
                  <span key={t} className="flip-tech" style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}>{t}</span>
                ))}
              </div>
            )}
            <Link to={`/experiences/${exp.id}`} className="flip-link" style={{ color: exp.color, borderColor: `${exp.color}50` }}>
              Voir le détail →
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      <div style={{ height: 1, background: "rgba(56,189,248,0.08)", maxWidth: 1200, margin: "0 auto" }} />

      {/* ─── PROJETS — flip cards ─── */}
      <section id="projects" style={{ padding: "6rem 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}>Projets récents</h2>
        </div>
        <div className="pj-grid">
          {projects.slice(0, 4).map((proj, i) => (
            <div className="pj-card-wrapper" key={proj.id} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="pj-card">
                {/* FACE AVANT */}
                <div className="pj-face pj-front" style={{ borderColor: proj.color }}>
                  <span className="pj-bg-emoji">{proj.emoji}</span>
                  <div className="pj-front-top">
                    <span className="pj-status" style={{
                      background: proj.status === "Terminé" ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)",
                      color: proj.status === "Terminé" ? "#34D399" : "#FBBF24",
                      border: `1px solid ${proj.status === "Terminé" ? "#34D39940" : "#FBBF2440"}`
                    }}>
                      {proj.status === "Terminé" ? "✓ Terminé" : "⟳ En cours"}
                    </span>
                    <span className="pj-emoji-icon">{proj.emoji}</span>
                  </div>
                  <div className="pj-front-body">
                    <h2 className="pj-title" style={{ color: proj.color }}>{proj.title}</h2>
                    <p className="pj-subtitle">{proj.subtitle}</p>
                    <p className="pj-summary">{proj.summary}</p>
                  </div>
                  <p className="pj-hint">Survolez pour les détails →</p>
                  <div className="pj-glow" style={{ background: proj.color }} />
                </div>
                {/* FACE ARRIÈRE */}
                <div className="pj-face pj-back" style={{ borderColor: proj.color }}>
                  <div className="pj-front-top">
                    <h3 className="pj-back-title" style={{ color: proj.color }}>{proj.title}</h3>
                    <span className="pj-emoji-icon">{proj.emoji}</span>
                  </div>
                  {proj.stack && Object.keys(proj.stack).length > 0 && (
                    <div className="pj-stack-section">
                      <p className="pj-stack-label" style={{ color: proj.color }}>Stack</p>
                      <div className="pj-techs">
                        {Object.values(proj.stack).flat().slice(0, 8).map((t) => (
                          <span key={t} className="pj-tech" style={{ background: `${proj.color}12`, color: proj.color, border: `1px solid ${proj.color}30` }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="pj-back-links">
                    {proj.id !== "vps-portfolio" && proj.id !== "portfolio" && (
                      <Link to={`/projects/${proj.id}`} className="pj-link" style={{ color: proj.color, borderColor: `${proj.color}50` }}>
                        Voir le détail →
                      </Link>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="pj-link" style={{ color: "#94a3b8", borderColor: "rgba(148,163,184,0.3)" }}>
                        🔗 Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(56, 191, 248, 0.22)", maxWidth: 1200, margin: "0 auto" }} />

{/* Formation */}
<section id="education" style={{ padding: "6rem 5vw", maxWidth: 1200, margin: "0 auto" }}>
  <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "3rem" }}>
    Mon parcours
  </h2>
  <div style={{ maxWidth: 700, marginBottom: "4rem" }} className="reveal">
    <div className="timeline">
      {education.map((e, i) => (
        <div key={i} className="tl-item">
          <div className="tl-dot" style={{ background: e.color, boxShadow: `0 0 12px ${e.color}88` }} />
          <div className="card" style={{ borderLeft: `3px solid ${e.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.05rem", color: e.color }}>{e.degree}</div>
                <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "0.2rem" }}>{e.school}</div>
                {e.note && <div style={{ color: "var(--green)", fontSize: "0.78rem", marginTop: "0.3rem" }}>{e.note}</div>}
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.78rem", color: e.color, fontWeight: 700 }}>{e.year}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <div style={{ height: 1, background: "rgba(56, 191, 248, 0.22)", maxWidth: 1200, margin: "0 auto" }} />

      {/* ─── RECOMMANDATIONS ─── */}
      <section id="recs" style={{ padding: "6rem 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "1rem" }}>Recommandations</h2>
        <p style={{ color: "#cbd5e1", marginBottom: "2.5rem" }}>Ce que disent mes encadrants et professeurs.</p>
        <div className="grid-2 reveal">
          {recommendations.map((r, i) => (
            <div key={i} className="card" style={{ borderTop: `3px solid ${r.color}` }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem", opacity: 0.4 }}>"</div>
              <p style={{ color: "#cbd5e1", lineHeight: 1.85, fontSize: "0.9rem", marginBottom: "1.5rem", fontStyle: "italic" }}>
                {r.text}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, background: `${r.color}25`, border: `2px solid ${r.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", color: r.color }}>
                  {r.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{r.name}</div>
                  <div style={{ color: "#6f7277", fontSize: "0.78rem" }}>{r.role}</div>
                  <div style={{ color: r.color, fontSize: "0.75rem" }}>{r.company}</div>
                </div>
                <div style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--muted)" }}>{r.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(56,189,248,0.08)", maxWidth: 1200, margin: "0 auto" }} />

      {/* ─── ALTERNANCE ─── */}
      <section id="alternance" style={{ padding: "6rem 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "3rem" }}>Recherche d'alternance</h2>

        {/* Formation recherchée */}
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          <div className="page-label" style={{ marginBottom: "1rem" }}>Formation recherchée</div>
          <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>🎓</span>
            <div>
              <div style={{ fontWeight: 700, color: "var(--white)", fontSize: "1rem", marginBottom: "0.25rem" }}>École d'ingénieurs ou Master</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Dans toute la France</div>
            </div>
            <span style={{ marginLeft: "auto", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 999, padding: "0.3rem 0.9rem", fontSize: "0.72rem", fontFamily: "var(--mono)", color: "var(--green)", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse 1.5s ease-in-out infinite", display: "inline-block" }} />
              En recherche
            </span>
          </div>
        </div>

        {/* Domaines */}
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          <div className="page-label" style={{ marginBottom: "1rem" }}>Domaines recherchés</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {alternance.domaines.map(d => (
              <span key={d} className="card" style={{ padding: "0.7rem 1.4rem", fontWeight: 700, fontSize: "0.9rem", color: "var(--sky)", cursor: "default" }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          <div className="page-label" style={{ marginBottom: "1rem" }}>Ma motivation</div>
          <div className="card" style={{ borderLeft: "3px solid var(--sky)" }}>
            <p style={{ color: "#cbd5e1" }}>{alternance.motivation}</p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <a href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn btn-outline">
            Me contacter →
          </a>
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(56,189,248,0.08)", maxWidth: 1200, margin: "0 auto" }} />

      {/* ─── CONTACT ─── */}
<section id="contact" style={{ padding: "6rem 5vw", maxWidth: 1200, margin: "0 auto" }}>
  <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "1rem", textAlign: "center" }}>
    Travaillons ensemble
  </h2>

  {/* Boutons rapides */}
  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem", justifyContent: "center" }}>
    <a href="https://www.linkedin.com/in/soa-razakamboly-7016b0327" target="_blank" rel="noopener noreferrer"
      style={{ padding: "0.75rem 1.5rem", background: "linear-gradient(135deg, #00c6ff, #0072ff)", color: "#fff", borderRadius: "999px", fontWeight: "600", textDecoration: "none" }}>
      LinkedIn
    </a>
    <a href="mailto:soa.raza.pro@gmail.com"
      style={{ padding: "0.75rem 1.5rem", border: "2px solid #00c6ff", color: "#82c5d8", borderRadius: "999px", fontWeight: "600", textDecoration: "none", background: "transparent" }}>
      soa.raza.pro@gmail.com
    </a>
  </div>

  {/* Formulaire */}
  <ContactForm />

  {/* Footer */}
  <footer style={{ marginTop: "4rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", lineHeight: "1.7" }}>
    <p>© 2026 <span style={{ color: "var(--sky)" }}>Soa Razakamboly</span> — <span style={{ color: "var(--lilac)" }}>Tous droits réservés</span></p>
    <details style={{ marginTop: "0.4rem" }}>
      <summary style={{ cursor: "pointer", opacity: 0.8 }}>Mentions légales</summary>
      <p style={{ marginTop: "0.4rem" }}><strong>Éditeur :</strong> Soa M. Razakamboly — particulier</p>
      <p><strong>Contact :</strong> soa.raza.pro@gmail.com</p>
      <p><strong>Hébergeur :</strong> GitHub Pages — GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA</p>
    </details>
  </footer>
</section>
    </>
  );
}
