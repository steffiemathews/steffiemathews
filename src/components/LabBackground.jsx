// Faint animated "molecule" background behind the whole site: atoms drift slowly and
// bond to neighbours that come close. Colours come from theme.css (--muted, --accent-solid),
// so it follows light/dark automatically. Static when reduced motion is requested.
import { useEffect, useRef } from "react";
import { useTheme } from "../theme/ThemeContext";

const DENSITY = 1 / 14000;  // atoms per px² of viewport
const MAX_ATOMS = 80;
const BOND_DIST = 130;      // px: closer than this and two atoms bond
const SPEED = 0.18;         // px per frame
const ACCENT_SHARE = 0.18;  // fraction of atoms drawn in the accent colour

const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export default function LabBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme(); // re-read colours when the theme flips
  const redrawRef = useRef(() => {});

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let atoms = [], W = 0, H = 0, raf = 0, colors = {};

    const readColors = () => { colors = { base: cssVar("--muted"), accent: cssVar("--accent-solid") }; };

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1); // cheaper to paint under scrolling content
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(MAX_ATOMS, Math.round(W * H * DENSITY));
      atoms = Array.from({ length: n }, () => {
        const a = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * W, y: Math.random() * H,
          vx: Math.cos(a) * SPEED * (0.4 + Math.random()), vy: Math.sin(a) * SPEED * (0.4 + Math.random()),
          r: 1.4 + Math.random() * 1.8, accent: Math.random() < ACCENT_SHARE,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];
        for (let j = i + 1; j < atoms.length; j++) {
          const b = atoms[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > BOND_DIST) continue;
          ctx.globalAlpha = (1 - d / BOND_DIST) * 0.32;
          ctx.strokeStyle = a.accent && b.accent ? colors.accent : colors.base;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      for (const a of atoms) {
        ctx.globalAlpha = a.accent ? 0.7 : 0.45;
        ctx.fillStyle = a.accent ? colors.accent : colors.base;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let frame = 0;
    const step = () => {
      raf = requestAnimationFrame(step);
      if (++frame % 2) return; // ~30fps is plenty for a slow drift
      for (const a of atoms) {
        a.x += a.vx * 2; a.y += a.vy * 2; // x2 because we step every other frame
        if (a.x < -10) a.x = W + 10; else if (a.x > W + 10) a.x = -10;
        if (a.y < -10) a.y = H + 10; else if (a.y > H + 10) a.y = -10;
      }
      draw();
    };

    const start = () => { cancelAnimationFrame(raf); if (!reduced) raf = requestAnimationFrame(step); };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    // freeze while the page is scrolling (the canvas is the costliest thing to repaint under
    // moving content), then drift again once scrolling has stopped
    let idle = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle);
      idle = setTimeout(start, 180);
    };
    const onResize = () => { resize(); draw(); };

    readColors(); resize(); draw(); start();
    redrawRef.current = () => { readColors(); draw(); };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => { redrawRef.current(); }, [theme]);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 w-full h-full pointer-events-none" />;
}
