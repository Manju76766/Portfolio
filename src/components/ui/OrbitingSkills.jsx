import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';

// Inject keyframes once
const styleId = 'orbiting-skills-kf';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const s = document.createElement('style');
  s.id = styleId;
  s.textContent = `
    @keyframes orbitPulse {
      0%, 100% { box-shadow: 0 0 8px 2px rgba(79,195,247,0.55), 0 0 22px 6px rgba(124,110,255,0.30), inset 0 0 10px rgba(79,195,247,0.08); }
      50%       { box-shadow: 0 0 18px 6px rgba(79,195,247,0.85), 0 0 42px 14px rgba(124,110,255,0.55), inset 0 0 18px rgba(124,110,255,0.18); }
    }
    @keyframes orbitPulseHover {
      0%, 100% { box-shadow: 0 0 22px 8px rgba(79,195,247,0.9), 0 0 52px 18px rgba(124,110,255,0.65), inset 0 0 22px rgba(79,195,247,0.2); }
      50%       { box-shadow: 0 0 36px 14px rgba(124,110,255,0.95), 0 0 70px 24px rgba(79,195,247,0.55), inset 0 0 30px rgba(124,110,255,0.28); }
    }
  `;
  document.head.appendChild(s);
}

// --- Inline SVG Icons ---
const iconComponents = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26" />
      </svg>
    ),
    color: '#E34F26',
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6" />
      </svg>
    ),
    color: '#1572B6',
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <rect width="24" height="24" fill="#F7DF1E" />
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330" />
      </svg>
    ),
    color: '#F7DF1E',
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
      </svg>
    ),
    color: '#61DAFB',
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147.039c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247z" fill="#339933" />
      </svg>
    ),
    color: '#339933',
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4" />
      </svg>
    ),
    color: '#06B6D4',
  },
};

const SkillIcon = memo(({ type }) => {
  const Icon = iconComponents[type]?.component;
  return Icon ? <Icon /> : null;
});
SkillIcon.displayName = 'SkillIcon';

const skillsConfig = [
  // Inner orbit — clockwise
  { id: 'html',       orbitRadius: 100, size: 44, speed: 0.3,  iconType: 'html',       phaseShift: 0,                    glowColor: 'cyan',   label: 'HTML5' },
  { id: 'css',        orbitRadius: 100, size: 44, speed: 0.3,  iconType: 'css',        phaseShift: (2 * Math.PI) / 3,    glowColor: 'cyan',   label: 'CSS3' },
  { id: 'javascript', orbitRadius: 100, size: 44, speed: 0.3,  iconType: 'javascript', phaseShift: (4 * Math.PI) / 3,   glowColor: 'cyan',   label: 'JavaScript' },
  // Outer orbit — counter-clockwise
  { id: 'react',    orbitRadius: 175, size: 52, speed: -0.2, iconType: 'react',    phaseShift: 0,                    glowColor: 'purple', label: 'React' },
  { id: 'node',     orbitRadius: 175, size: 46, speed: -0.2, iconType: 'node',     phaseShift: (2 * Math.PI) / 3,    glowColor: 'purple', label: 'Node.js' },
  { id: 'tailwind', orbitRadius: 175, size: 44, speed: -0.2, iconType: 'tailwind', phaseShift: (4 * Math.PI) / 3,   glowColor: 'purple', label: 'Tailwind CSS' },
];

// Glowing orbit ring
const GlowingOrbitPath = memo(({ radius, glowColor }) => {
  const colors = {
    cyan:   { ring: 'rgba(6,182,212,0.35)',   glow: 'rgba(6,182,212,0.18)' },
    purple: { ring: 'rgba(147,51,234,0.35)', glow: 'rgba(147,51,234,0.18)' },
  }[glowColor] || { ring: 'rgba(6,182,212,0.35)', glow: 'rgba(6,182,212,0.18)' };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: radius * 2, height: radius * 2,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        border: `1.5px solid ${colors.ring}`,
        boxShadow: `0 0 40px ${colors.glow}, inset 0 0 40px ${colors.glow}`,
        background: `radial-gradient(circle, transparent 40%, ${colors.glow} 100%)`,
      }}
    />
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// Single orbiting icon
const OrbitingSkill = memo(({ config, angle }) => {
  const [hovered, setHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;
  const iconColor = iconComponents[iconType]?.color || '#fff';

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: size, height: size,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: hovered ? 20 : 10,
        transition: 'transform 0s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: '100%', height: '100%',
          background: 'rgba(30,32,48,0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 10,
          cursor: 'pointer',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          transform: hovered ? 'scale(1.28)' : 'scale(1)',
          boxShadow: hovered
            ? `0 0 28px ${iconColor}60, 0 0 60px ${iconColor}25`
            : '0 4px 16px rgba(0,0,0,0.32)',
        }}
      >
        <SkillIcon type={iconType} />
      </div>
      {hovered && (
        <div style={{
          position: 'absolute',
          bottom: -28, left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(15,17,30,0.92)',
          color: '#fff',
          fontSize: 11, fontWeight: 600,
          padding: '3px 8px',
          borderRadius: 6,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          fontFamily: 'sans-serif',
        }}>
          {label}
        </div>
      )}
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// ── Center "Start Project" glowing CTA button ──
function CenterButton({ hideText }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to="/contact" style={{ textDecoration: 'none' }}>
      <div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: `translate(-50%, -50%) scale(${hovered ? 1.08 : 1})`,
          width: 96, height: 96,
          borderRadius: '50%',
          zIndex: 30,
          cursor: 'pointer',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
      {/* Animated glow ring border */}
      <div style={{
        position: 'absolute', inset: -2,
        borderRadius: '50%',
        border: '2px solid transparent',
        background: 'linear-gradient(135deg, #4FC3F7, #7C6EFF, #4FC3F7) border-box',
        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'destination-out',
        maskComposite: 'exclude',
        animation: hovered ? 'orbitPulseHover 1.2s ease-in-out infinite' : 'orbitPulse 2.4s ease-in-out infinite',
      }} />

      {/* Main button body */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '50%',
        background: 'linear-gradient(145deg, #1A1F2E 0%, #0D1117 60%, #12172a 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
        // fallback glow via box-shadow when mask trick unsupported
        boxShadow: hovered
          ? '0 0 24px 8px rgba(79,195,247,0.6), 0 0 48px 16px rgba(124,110,255,0.4), inset 0 0 20px rgba(79,195,247,0.12)'
          : '0 0 10px 3px rgba(79,195,247,0.35), 0 0 24px 8px rgba(124,110,255,0.2), inset 0 0 10px rgba(79,195,247,0.06)',
        transition: 'box-shadow 0.35s ease',
      }}>
        {/* Radial inner pulse overlay */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: hovered
            ? 'radial-gradient(circle, rgba(79,195,247,0.22) 0%, rgba(124,110,255,0.14) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(79,195,247,0.10) 0%, rgba(124,110,255,0.06) 50%, transparent 75%)',
          transition: 'background 0.35s ease',
        }} />

        {!hideText ? (
          <>
            {/* Arrow icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="url(#btnGrad)" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'relative', zIndex: 1 }}>
              <defs>
                <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4FC3F7" />
                  <stop offset="100%" stopColor="#7C6EFF" />
                </linearGradient>
              </defs>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>

            {/* Label */}
            <span style={{
              position: 'relative', zIndex: 1,
              color: '#FFFFFF',
              fontSize: 10,
              fontWeight: 700,
              fontFamily: '"Sora", sans-serif',
              letterSpacing: '0.08em',
              textAlign: 'center',
              lineHeight: 1.3,
              userSelect: 'none',
            }}>
              START<br />PROJECT
            </span>
          </>
        ) : (
          <span style={{
            position: 'relative', zIndex: 1,
            color: '#FFFFFF',
            fontSize: 20,
            fontWeight: 600,
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}>
            &lt;/&gt;
          </span>
        )}
      </div>
    </div>
    </Link>
  );
}

// Main component
export default function OrbitingSkills({ hideText = false }) {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    let id;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setTime(t => t + dt);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [paused]);

  return (
    <div
      style={{ position: 'relative', width: 420, height: 420, flexShrink: 0 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Orbit rings */}
      <GlowingOrbitPath radius={100} glowColor="cyan" />
      <GlowingOrbitPath radius={175} glowColor="purple" />

      {/* ── Center "Start Project" Button ── */}
      <CenterButton hideText={hideText} />

      {/* Orbiting skill icons */}
      {skillsConfig.map(config => (
        <OrbitingSkill
          key={config.id}
          config={config}
          angle={time * config.speed + config.phaseShift}
        />
      ))}
    </div>
  );
}

