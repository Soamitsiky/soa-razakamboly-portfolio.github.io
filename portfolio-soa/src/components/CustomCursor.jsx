import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  let mx = 0, my = 0, rx = 0, ry = 0;

  useEffect(() => {
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) { dot.current.style.left = mx + "px"; dot.current.style.top = my + "px"; }
    };
    document.addEventListener("mousemove", move);

    const animRing = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ring.current) { ring.current.style.left = rx + "px"; ring.current.style.top = ry + "px"; }
      requestAnimationFrame(animRing);
    };
    animRing();

    const over = () => {
      if (dot.current) { dot.current.style.width = "20px"; dot.current.style.height = "20px"; dot.current.style.background = "var(--lilac)"; }
    };
    const out = () => {
      if (dot.current) { dot.current.style.width = "10px"; dot.current.style.height = "10px"; dot.current.style.background = "var(--sky)"; }
    };
    document.querySelectorAll("a,button,.card,.btn").forEach(el => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });

    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        width: 10, height: 10, borderRadius: "50%",
        background: "var(--sky)", transform: "translate(-50%,-50%)",
        transition: "width 0.2s, height 0.2s, background 0.2s",
        mixBlendMode: "screen",
      }} />
      <div ref={ring} style={{
        position: "fixed", zIndex: 9998, pointerEvents: "none",
        width: 34, height: 34, borderRadius: "50%",
        border: "1.5px solid rgba(56,189,248,0.45)",
        transform: "translate(-50%,-50%)",
      }} />
    </>
  );
}
