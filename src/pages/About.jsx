import { useState, useEffect, useCallback } from "react";

const phrases = [
  { text: "Une vraie curiosité technique," },
  { text: "le goût du défi," },
  { text: "et une envie naturelle d'aider les gens." },
];

const softSkills = [
  {
    icon: "🧘",
    title: "Calme & sang-froid",
    color: "#38BDF8",
    situation: "2 semaines seule en autonomie chez Anywr",
    text: "Gérée seule pendant 2 semaines sans accompagnement, j'ai appris que la persévérance paie toujours. Peu importe le temps que ça prend, je cherche jusqu'à trouver.",
  },
  {
    icon: "🤝",
    title: "Écoute & patience",
    color: "#818CF8",
    situation: "Support utilisateurs chez Anywr Group",
    text: "Le support m'a appris à écouter, reformuler et rassurer — même face à des utilisateurs stressés. J'aime autant le côté humain que le côté technique du métier.",
  },
  {
    icon: "💬",
    title: "Communication adaptée",
    color: "#FBBF24",
    situation: "Docs & réunions internationales",
    text: "J'ai rédigé des documentations techniques pour des non-techniciens et participé à des réunions en anglais — j'ai appris à adapter mon discours selon l'interlocuteur.",
  },
  {
    icon: "💡",
    title: "Initiative & exécution",
    color: "#34D399",
    situation: "Projet KodoLike",
    text: "Sur KodoLike, j'ai pris l'initiative de coordonner les équipes front, back et infra — un rôle informel mais essentiel. Je propose, j'organise, et j'exécute.",
  },
  {
    icon: "🔄",
    title: "Adaptabilité",
    color: "#F472B6",
    situation: "Environnements variés",
    text: "D'un ticket support à la configuration Azure, en passant par Docker et PowerShell, j'adapte rapidement ma posture selon le contexte et les interlocuteurs.",
  },
];

const langues = [
  { lang: "Français", level: "Courant", pct: 100, color: "#38BDF8" },
  { lang: "Anglais", level: "Courant", pct: 75, color: "#818CF8" },
  { lang: "Malgache", level: "Natif", pct: 100, color: "#34D399" },
];

const hobbies = [
  { emoji: "🏊", label: "Natation pro" },
  { emoji: "🎨", label: "Dessin & Peinture" },
  { emoji: "🎸", label: "Guitare" },
  { emoji: "🎲", label: "Sudoku" },
];

/* ══ CAROUSEL ══ */
function Carousel({ skills }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const goTo = useCallback((index, dir = "next") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 350);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % skills.length, "next");
  }, [current, skills.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + skills.length) % skills.length, "prev");
  }, [current, skills.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const s = skills[current];

  return (
    <div className="carousel-wrapper">

      <div className="carousel-stage">
        <button className="carousel-arrow" onClick={prev}>‹</button>

        <div
          className={`carousel-card ${animating ? `carousel-exit-${direction}` : "carousel-enter"}`}
          style={{ borderColor: `${s.color}40` }}
        >
          <div className="carousel-card-header">
            <span className="carousel-icon">{s.icon}</span>
            <div>
              <h3 className="carousel-title" style={{ color: s.color }}>{s.title}</h3>
              <span
                className="carousel-badge"
                style={{ color: s.color, background: `${s.color}15`, border: `1px solid ${s.color}30` }}
              >
                {s.situation}
              </span>
            </div>
          </div>

          <p className="carousel-text">{s.text}</p>

          
          
          
        </div>

        <button className="carousel-arrow" onClick={next}>›</button>
      </div>

      {/* Points */}
      <div className="carousel-dots">
        {skills.map((sk, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? "carousel-dot-active" : ""}`}
            style={i === current ? { background: sk.color, borderColor: sk.color } : {}}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
          />
        ))}
      </div>

      

    </div>
  );
}

/* ══ PAGE ABOUT ══ */
export default function About() {

  useEffect(() => {
    // Phrases animées au chargement
    document.querySelectorAll(".ab-phrase").forEach((el, i) => {
      setTimeout(() => el.classList.add("ab-visible"), 200 + i * 300);
    });

    // Sections au scroll
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ab-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".ab-reveal").forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return (
    <div className="ab-page">

      {/* ══ HERO — QUI SUIS-JE ══ */}
      <div className="ab-hero">

        <div className="ab-hero-left">
          
          <h1 className="ab-hero-title">
            Qui suis-je <span className="ab-accent">?</span>
          </h1>

          <p className="ab-hero-intro">
            Je suis <strong>Soa</strong>, étudiante en BUT 3ème année Réseaux &
            Systèmes à l'IUT de Villeneuve-d'Ascq, en alternance chez{" "}
            <strong>Anywr Group</strong>.</p>

            <p className="ab-hero-intro"style={{ marginTop: "1.5rem" }}></p>
             Ce qui me définit professionnellement ?
            

          <div className="ab-story">
            {phrases.map((p, i) => (
              <div key={i} className="ab-phrase">
                <span className="ab-phrase-dot" />
                <span className="ab-phrase-text">{p.text}</span>
              </div>
            ))}
          </div>

          

         
        </div>

        {/* Colonne droite */}
        <div style={{ position: "relative", display: "inline-block" }}>

  {/* Ton cadre photo existant — inchangé sauf width/height */}
  <div style={{
    width: 320,
    height: 320,
    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
    background: "var(--grad)",
    padding: 3,
  }}>
    <div style={{ width: "100%", height: "100%", borderRadius: "inherit", overflow: "hidden" }}>
      <img src={process.env.PUBLIC_URL + "/photosoa.jpg"} alt="Soa"
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  </div>

  {/* Badge LinkedIn-style — positionné sur la photo */}
  <div style={{
    position: "absolute",
    bottom: 16,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(4,12,24,0.88)",
    border: "1px solid rgba(52,211,153,0.5)",
    borderRadius: 999,
    padding: "0.35rem 1rem",
    fontSize: "0.72rem",
    fontFamily: "var(--mono)",
    color: "var(--green)",
    display: "flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
    backdropFilter: "blur(8px)",
  }}>
    <span style={{
      width: 7, height: 7, borderRadius: "50%",
      background: "var(--green)",
      animation: "pulse 1.5s ease-in-out infinite",
      display: "inline-block",
      flexShrink: 0,
    }} />
    Recherche alternance - sept 2026
  </div>

</div>
</div>
      {/* ══ SOFT SKILLS — CAROUSEL ══ */}
      <div className="ab-section ab-reveal">
        
        <h2 className="ab-section-title"> Mes Soft skills</h2>
        <Carousel skills={softSkills} />
      </div>

      {/* ══ LANGUES ══ */}
      <div className="ab-section ab-reveal">
        <p className="ab-label">Langues</p>
        <div className="ab-langs">
          {langues.map((l) => (
            <div className="ab-lang-card" key={l.lang} style={{ borderColor: `${l.color}30` }}>
              <div className="ab-lang-top">
                <span className="ab-lang-name">{l.lang}</span>
                <span className="ab-lang-level" style={{ color: l.color }}>{l.level}</span>
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* ══ HOBBIES ══ */}
      <div className="ab-section ab-reveal">
        <p className="ab-label">En dehors du travail</p>
        <div className="ab-hobbies">
          {hobbies.map((h) => (
            <div className="ab-hobby" key={h.label}>
              <span className="ab-hobby-emoji">{h.emoji}</span>
              <span className="ab-hobby-label">{h.label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}