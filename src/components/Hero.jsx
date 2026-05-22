import React, { useEffect, useState } from 'react';
import { FlowButton } from "@/components/ui/FlowButton";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fadeIn = (delay = 0) => ({
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
  });

  const socialLinks = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.41 7.86 10.94.57.11.78-.25.78-.55v-2.02c-3.19.69-3.86-1.38-3.86-1.38-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.18.91-.25 1.88-.37 2.85-.37s1.93.12 2.85.37c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.4-5.25 5.68.41.35.77 1.03.77 2.08v3.08c0 .3.2.67.79.55C20.71 21.41 24 17.1 24 12c0-6.27-5.23-11.5-12-11.5z" />
        </svg>
      ),
      href: 'https://github.com/Manju76766',
      label: 'GitHub',
    },
    {
      icon: <span style={{ fontFamily: '"Sora",sans-serif', fontWeight: 800, fontSize: 16, lineHeight: 1 }}>X</span>,
      href: 'https://x.com/manju_naik46',
      label: 'X',
    },
    {
      icon: <span style={{ fontFamily: '"Sora",sans-serif', fontWeight: 700, fontSize: 14, lineHeight: 1 }}>in</span>,
      href: 'https://www.linkedin.com/in/manju-naik-b4a1333b1/',
      label: 'LinkedIn',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.4.6.22 1.03.48 1.48.93.45.45.71.88.93 1.48.16.46.34 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.012 3.58-.07 4.85c-.056 1.17-.24 1.97-.4 2.43-.22.6-.48 1.03-.93 1.48-.45.45-.88.71-1.48.93-.46.16-1.26.34-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.4-.6-.22-1.03-.48-1.48-.93-.45-.45-.71-.88-.93-1.48-.16-.46-.34-1.26-.4-2.43C2.212 15.58 2.2 15.2 2.2 12s.012-3.58.07-4.85c.056-1.17.24-1.97.4-2.43.22-.6.48-1.03.93-1.48.45-.45.88-.71 1.48-.93.46-.16 1.26-.34 2.43-.4C8.42 2.212 8.8 2.2 12 2.2zm0 3.1A6.7 6.7 0 1 0 18.7 12 6.708 6.708 0 0 0 12 5.3zm0 10.95A4.25 4.25 0 1 1 16.25 12 4.255 4.255 0 0 1 12 16.25zm5.4-10.9a1.56 1.56 0 1 1-1.56-1.56 1.56 1.56 0 0 1 1.56 1.56z" />
        </svg>
      ),
      href: 'https://www.instagram.com/_mr_bloody_sweet_/',
      label: 'Instagram',
    },
  ];

  const avatarUrls = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&fit=crop',
  ];

  return (
    <section
      className="hero-section"
      style={{
        background: '#ffffff',
        width: '100%',
        minHeight: 'calc(100vh - 68px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >

      {/* ============================================================
          DESKTOP LAYOUT — text updated to match Webflow reference
          Hidden on mobile via CSS: .hero-desktop { display: none }
         ============================================================ */}
      <div
        className="hero-desktop"
        style={{
          maxWidth: 1400,
          width: '100%',
          margin: '0 auto',
          padding: '0px 36px 0px 36px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 0,
        }}
      >
        {/* LEFT COLUMN — text restyled to match Image 2 reference exactly */}
        <div
          style={{
            width: '33%',
            maxWidth: 396.24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            paddingBottom: 56,
            ...fadeIn(0),
          }}
        >
          {/* ── "Hey there. I'm" ──────────────────────────────────────
              Reference inspector: 28px "Schibsted Grotesk", #333333
             ────────────────────────────────────────────────────────── */}
          <span
            style={{
              fontFamily: '"Schibsted Grotesk", "Inter", sans-serif',
              fontSize: 28,
              lineHeight: '42px',
              fontWeight: 400,
              color: '#333333',
              marginBottom: 8,
              display: 'block',
              letterSpacing: '-0.01em',
            }}
          >
            Hey there. I'm
          </span>

          {/* ── Name ──────────────────────────────────────────────────
              Reference inspector: 86.4px "Schibsted Grotesk", #000000
              Two-tone: first part black, second part gray (#4F4F4F)
             ────────────────────────────────────────────────────────── */}
          <h1
            style={{
              fontFamily: '"Schibsted Grotesk", "Inter", sans-serif',
              fontSize: '86.4px',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              margin: '0 0 24px 0',
              padding: 0,
            }}
          >
            <span style={{ color: '#000000', display: 'block', fontWeight: 800 }}>Manju</span>
            <span style={{ color: '#4F4F4F', display: 'block', fontWeight: 600 }}>natha S</span>
          </h1>

          {/* ── Description ───────────────────────────────────────────
              Reference: ~16px sans-serif, dark gray
             ────────────────────────────────────────────────────────── */}
          <p
            style={{
              fontFamily: '"Schibsted Grotesk", "Inter", sans-serif',
              fontSize: 16,
              fontWeight: 400,
              color: '#555555',
              lineHeight: 1.7,
              maxWidth: 340,
              marginBottom: 36,
              marginTop: 0,
            }}
          >
            Building scalable, high-performance web apps with clean code and
            thoughtful user experiences — from backend APIs to pixel-perfect UIs.
          </p>

          <FlowButton
            text="Let's Connect"
            as="a"
            href="/contact"
            bgColor="#C4F038"
            textColor="#111111"
            hoverColor="#111111"
          />
        </div>

        {/* CENTER COLUMN — Photo Card (UNCHANGED) */}
        <div
          style={{
            width: '35%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            ...fadeIn(150),
          }}
        >
          <div
            style={{
              position: 'relative',
              overflow: 'visible',
              background: '#ffffff',
              borderRadius: 32,
              boxShadow: '0 20px 60px rgba(0,0,0,0.09)',
              width: '100%',
              maxWidth: 420,
              padding: '12px 12px 0 12px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Photo area */}
            <div
              style={{
                background: '#EAEDF0',
                borderRadius: 22,
                overflow: 'hidden',
                height: 480,
                width: '100%',
              }}
            >
              <img
                src="/hero-portrait.jpg"
                alt="Manjunatha S"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
            </div>

            {/* Available badge */}
            <div
              style={{
                height: 62, width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 10,
                fontFamily: 'sans-serif', fontSize: 16, fontWeight: 600, color: '#111111',
              }}
            >
              <span
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#A3D936',
                  boxShadow: '0 0 0 3px rgba(163,217,54,0.25)',
                  flexShrink: 0,
                }}
              />
              Available for new projects
            </div>

            {/* Social Icons — right side column on desktop */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: -22,
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                zIndex: 40,
              }}
            >
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  style={{
                    width: 44, height: 44,
                    borderRadius: '50%',
                    background: 'rgba(30,30,30,0.72)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ffffff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.14)',
                    textDecoration: 'none',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#C4F038';
                    e.currentTarget.style.color = '#111111';
                    e.currentTarget.style.transform = 'scale(1.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(30,30,30,0.72)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Stats (UNCHANGED) */}
        <div
          style={{
            width: '30%',
            paddingLeft: 56,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            paddingBottom: 56,
            ...fadeIn(300),
          }}
        >
          <div
            style={{
              paddingLeft: 16,
              borderLeft: '2px solid #e5e7eb',
              marginBottom: 28,
              fontFamily: '"Schibsted Grotesk", "Inter", sans-serif',
              fontSize: 14,
              fontWeight: 500,
              color: '#4F4F4F',
              lineHeight: 1.5,
            }}
          >
            Rising Dev of 2025<br />Full-Stack Developer
          </div>

          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontFamily: '"Schibsted Grotesk", "Inter", sans-serif',
                fontSize: 'clamp(40px, 4vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ color: '#111111' }}>Full</span>
              <span style={{ color: '#4F4F4F' }}> Stack Dev</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            {avatarUrls.map((src, i) => (
              <div key={i}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '3px solid #fff',
                  overflow: 'hidden',
                  marginLeft: i === 0 ? 0 : -14,
                  zIndex: 4 - i,
                  position: 'relative',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                  flexShrink: 0,
                }}
              >
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: '#111111', color: '#fff',
              fontSize: 12, fontWeight: 700, fontFamily: '"Schibsted Grotesk", "Inter", sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: -14, zIndex: 5, position: 'relative',
              border: '3px solid #fff',
              boxShadow: '0 1px 6px rgba(0,0,0,0.18)',
              flexShrink: 0,
            }}>
              98%
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{
                fontFamily: '"Schibsted Grotesk", "Inter", sans-serif',
                fontSize: 'clamp(40px, 4vw, 52px)',
                fontWeight: 800, color: '#111111',
                letterSpacing: '-0.03em', lineHeight: 1,
              }}>
                10+
              </span>
              <span style={{ fontFamily: '"Schibsted Grotesk", "Inter", sans-serif', fontSize: 15, fontWeight: 500, color: '#4F4F4F' }}>
                Programming Languages
              </span>
            </div>
            <span style={{ fontFamily: '"Schibsted Grotesk", "Inter", sans-serif', fontSize: 15, fontWeight: 700, color: '#1f2937' }}>
              Known & Always learning more
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================
          MOBILE LAYOUT — COMPLETELY UNCHANGED
          Shown on mobile via CSS: .hero-mobile { display: flex }
         ============================================================ */}
      <div
        className="hero-mobile"
        style={{
          display: 'none', /* CSS overrides this to flex on mobile */
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '32px 22px 48px 22px',
          boxSizing: 'border-box',
          ...fadeIn(0),
        }}
      >
        {/* 1 — Greeting */}
        <span
          style={{
            fontFamily: '"Schibsted Grotesk", "Inter", sans-serif',
            fontSize: 24,
            fontWeight: 400,
            color: '#6b7280',
            marginBottom: 6,
            display: 'block',
            textAlign: 'left',
            width: '100%',
          }}
        >
          Hey there. I'm
        </span>

        {/* 2 — Name inline two-tone on one line */}
        <div style={{ marginBottom: 16, lineHeight: 1.08, letterSpacing: '-0.025em', textAlign: 'left', width: '100%' }}>
          <span
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(44px, 13vw, 60px)',
              fontWeight: 900,
              color: '#111111',
            }}
          >
            Manju
          </span>
          <span
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(44px, 13vw, 60px)',
              fontWeight: 700,
              color: '#888888',
            }}
          >
            natha S
          </span>
        </div>

        {/* 3 — Description */}
        <p
          style={{
            fontFamily: 'sans-serif',
            fontSize: 15,
            fontWeight: 400,
            color: '#6b7280',
            lineHeight: 1.7,
            textAlign: 'left',
            maxWidth: '100%',
            margin: '0 0 28px 0',
          }}
        >
          Building scalable, high-performance web apps with clean code and
          thoughtful user experiences — from backend APIs to pixel-perfect UIs.
        </p>

        {/* 4 — Photo Card: full bleed, icons inside photo over gradient */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.10)',
            background: '#EAEDF0',
          }}
        >
          <img
            src="/hero-portrait.jpg"
            alt="Manjunatha S"
            style={{
              width: '100%',
              height: 420,
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
            }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: 120,
              background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Social icons inside photo */}
          <div
            style={{
              position: 'absolute',
              bottom: 20, left: 0, right: 0,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
              zIndex: 10,
            }}
          >
            {socialLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                style={{
                  width: 46, height: 46,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  border: '1.5px solid rgba(255,255,255,0.40)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  flexShrink: 0,
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                }}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* 5 — Available badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginTop: 14,
          width: '100%',
          fontFamily: 'sans-serif',
          fontSize: 12,
          fontWeight: 600,
          color: '#111111',
        }}>
          <span
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#A3D936',
              boxShadow: '0 0 0 3px rgba(163,217,54,0.28)',
              flexShrink: 0,
            }}
          />
          Available for new projects
        </div>

        {/* 6 — Full Stack Dev */}
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginTop: 20,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ fontFamily: '"Sora", sans-serif', fontSize: 32, fontWeight: 900, color: '#111111' }}>
            Full
          </span>
          <span style={{ fontFamily: '"Sora", sans-serif', fontSize: 32, fontWeight: 900, color: '#C8C8C8' }}>
            {' '}Stack Dev
          </span>
        </div>

        {/* 7 — Badge label */}
        <div
          style={{
            display: 'block',
            textAlign: 'center',
            width: '100%',
            marginTop: 8,
            marginBottom: 32,
            fontFamily: 'sans-serif',
            fontSize: 14,
            fontWeight: 400,
            color: '#9ca3af',
            lineHeight: 1.5,
          }}
        >
          Rising Dev of 2025 &nbsp;·&nbsp; Full-Stack Developer
        </div>

        {/* 8 — CTA Button */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <FlowButton
            text="Let's Connect"
            as="a"
            href="/contact"
            bgColor="#C4F038"
            textColor="#111111"
            hoverColor="#111111"
          />
        </div>

        {/* 9 — Avatars */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
          {avatarUrls.map((src, i) => (
            <div
              key={i}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '3px solid #ffffff',
                overflow: 'hidden',
                marginLeft: i === 0 ? 0 : -14,
                zIndex: 4 - i,
                position: 'relative',
                boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                flexShrink: 0,
              }}
            >
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
          <div
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: '#111111', color: '#ffffff',
              fontSize: 12, fontWeight: 700, fontFamily: 'sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: -14, zIndex: 5, position: 'relative',
              border: '3px solid #ffffff',
              boxShadow: '0 1px 6px rgba(0,0,0,0.18)',
              flexShrink: 0,
            }}
          >
            98%
          </div>
        </div>

        {/* 10 — Stats */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span
              style={{
                fontFamily: '"Sora", sans-serif',
                fontSize: '28px',
                fontWeight: 700, color: '#111111',
                letterSpacing: '-0.02em', lineHeight: 1,
              }}
            >
              10+
            </span>
            <span style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 500, color: '#6b7280' }}>
              Programming Languages
            </span>
          </div>
          <span style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 500, color: '#111111' }}>
            Known & Always learning more
          </span>
        </div>
      </div>

    </section>
  );
}