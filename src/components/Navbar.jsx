import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FlowButton } from "@/components/ui/FlowButton";
import { MouseFollowingEyes } from "@/components/ui/mouse-following-eyes";

const NAV_H = 68;

const INJECTED_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500&display=swap');

  body { padding-top: ${NAV_H}px; }
  body.nav-menu-open { overflow: hidden; }

  /* ── Navbar shell ─────────────────────────────────────────────────────────── */
  .monjunath-nav {
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    will-change: transform;
    background: #ffffff;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    transition:
      background      0.4s cubic-bezier(0.25,1,0.5,1),
      backdrop-filter 0.4s cubic-bezier(0.25,1,0.5,1),
      -webkit-backdrop-filter 0.4s cubic-bezier(0.25,1,0.5,1),
      box-shadow      0.4s cubic-bezier(0.25,1,0.5,1),
      border-color    0.4s cubic-bezier(0.25,1,0.5,1);
  }
  .monjunath-nav.nav-scrolled {
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.05);
    border-bottom-color: rgba(0,0,0,0.05);
  }

  /* ── Nav inner container ──────────────────────────────────────────────────── */
  .nav-inner {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    /* Desktop: generous padding */
    padding: 0 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Mobile: match reference — logo sits ~16px from left edge */
  @media (max-width: 768px) {
    .nav-inner {
      padding: 0 16px;
    }
  }

  /* ── Logo: image + wordmark ───────────────────────────────────────────────── */
  .logo-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    flex-shrink: 0;
  }
  .logo-img {
    /* Match reference: logo icon is ~28–30px tall */
    height: 28px;
    width: auto;
    display: block;
    object-fit: contain;
    transition: opacity 0.2s ease;
  }
  .logo-wrap:hover .logo-img { opacity: 0.72; }

  .logo-wordmark {
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #111111;
    letter-spacing: -0.3px;
    line-height: 1;
    white-space: nowrap;
  }

  /* ── Responsive ───────────────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .desktop-nav-links  { display: none !important; }
    .navbar-cta-desktop { display: none !important; }
    .hbg-btn            { display: flex !important; }
  }
  @media (min-width: 769px) {
    .hbg-btn { display: none !important; }
    .logo-wrap {
      gap: 10px;
    }
    .logo-img {
      height: 34px;
    }
    .logo-wordmark {
      font-size: 19px;
      letter-spacing: -0.4px;
    }
  }

  /* ── Roll-up desktop links ────────────────────────────────────────────────── */
  .roll-link {
    display: block; overflow: hidden; height: 20px;
    font-family: 'Inter', sans-serif; font-size: 14.5px;
    font-weight: 400; color: #111111; text-decoration: none;
    cursor: pointer; letter-spacing: -0.1px;
  }
  .roll-inner {
    display: flex; flex-direction: column; transform: translateY(0);
    transition: transform 0.32s cubic-bezier(0.25,1,0.5,1);
    will-change: transform; backface-visibility: hidden;
  }
  .roll-link:hover .roll-inner { transform: translateY(-20px); }
  .roll-span         { display: block; height: 20px; line-height: 20px; white-space: nowrap; }
  .roll-span-secondary { display: block; height: 20px; line-height: 20px; white-space: nowrap; color: #6b7280; }

  /* ── Hamburger ────────────────────────────────────────────────────────────── */
  .hbg-btn {
    background: none; border: none; cursor: pointer; padding: 8px;
    -webkit-tap-highlight-color: transparent; transform: translateZ(0);
    align-items: center; justify-content: center;
  }
  .hbg-box {
    display: flex; flex-direction: column;
    justify-content: space-between; width: 22px; height: 15px; position: relative;
  }
  .hbg-line {
    display: block; width: 22px; height: 1.5px; background: #111111;
    border-radius: 2px; transform-origin: center;
    transition: transform 0.38s cubic-bezier(0.23,1,0.32,1), opacity 0.22s ease, width 0.3s cubic-bezier(0.23,1,0.32,1);
    will-change: transform, opacity;
  }
  .hbg-btn.is-open .hbg-line:nth-child(1) { transform: translateY(6.75px) rotate(45deg); }
  .hbg-btn.is-open .hbg-line:nth-child(2) { opacity: 0; width: 0; }
  .hbg-btn.is-open .hbg-line:nth-child(3) { transform: translateY(-6.75px) rotate(-45deg); }

  /* ── Mobile backdrop ─────────────────────────────────────────────────────── */
  .mobile-backdrop {
    position: fixed; inset: 0; z-index: 99997;
    background: rgba(0,0,0,0); backdrop-filter: blur(0px);
    pointer-events: none; transition: background 0.3s ease, backdrop-filter 0.3s ease;
  }
  .mobile-backdrop.is-open {
    background: rgba(0,0,0,0.22); backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px); pointer-events: auto;
  }

  /* ── Mobile panel ────────────────────────────────────────────────────────── */
  .mobile-panel {
    position: absolute; top: ${NAV_H + 8}px; left: 10px; right: 10px;
    background: #1a1a1a; border-radius: 20px; z-index: 99999;
    display: flex; flex-direction: column; align-items: center;
    padding: 32px 20px 26px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.05) inset;
    transition: opacity 0.3s cubic-bezier(0.23,1,0.32,1), transform 0.3s cubic-bezier(0.23,1,0.32,1), visibility 0.3s;
    transform: translateY(-12px) scale(0.97);
    opacity: 0; visibility: hidden; pointer-events: none;
    will-change: transform, opacity;
  }
  .mobile-panel.is-open {
    transform: translateY(0) scale(1); opacity: 1; visibility: visible; pointer-events: auto;
  }

  @keyframes navItemIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .mobile-nav-item { opacity: 0; }
  .mobile-panel.is-open .mobile-nav-item { animation: navItemIn 0.4s cubic-bezier(0.23,1,0.32,1) forwards; }
  .mobile-panel.is-open .mobile-nav-item:nth-child(1) { animation-delay: 0.04s; }
  .mobile-panel.is-open .mobile-nav-item:nth-child(2) { animation-delay: 0.09s; }
  .mobile-panel.is-open .mobile-nav-item:nth-child(3) { animation-delay: 0.13s; }
  .mobile-panel.is-open .mobile-nav-item:nth-child(4) { animation-delay: 0.17s; }
  .mobile-panel.is-open .mobile-nav-item:nth-child(5) { animation-delay: 0.21s; }
  .mobile-panel.is-open .mobile-nav-item:nth-child(6) { animation-delay: 0.25s; }

  @keyframes ctaBounceIn {
    from { opacity: 0; transform: translateY(14px) scale(0.94); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .mobile-cta-wrap { opacity: 0; }
  .mobile-panel.is-open .mobile-cta-wrap {
    animation: ctaBounceIn 0.42s cubic-bezier(0.34,1.56,0.64,1) 0.3s forwards;
  }

  .mobile-divider { width: 36px; height: 1px; background: rgba(255,255,255,0.10); margin: 22px 0 18px; }

  .mobile-nav-link {
    font-family: 'Sora', sans-serif; font-size: 16.5px; font-weight: 500;
    color: rgba(255,255,255,0.78); text-decoration: none; letter-spacing: -0.2px;
    transition: color 0.2s ease; display: block; text-align: center; padding: 2px 0;
  }
  .mobile-nav-link:hover, .mobile-nav-link:focus { color: #fff; outline: none; }

  .mobile-cta-link {
    display: inline-flex; align-items: center; background-color: #c4f038; color: #111111;
    border-radius: 100px; padding: 10px 10px 10px 24px; text-decoration: none;
    font-weight: 700; font-size: 14.5px; font-family: 'Sora', sans-serif; letter-spacing: -0.2px;
    transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease;
    box-shadow: 0 4px 20px rgba(196,240,56,0.28); -webkit-tap-highlight-color: transparent;
  }
  .mobile-cta-link:hover { transform: scale(1.04); box-shadow: 0 6px 28px rgba(196,240,56,0.42); }
  .mobile-cta-icon {
    display: flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; background-color: #111111;
    border-radius: 50%; margin-left: 14px; color: #c4f038; flex-shrink: 0;
  }
`;

function RollLink({ label, to, isRoute, onClick }) {
  const inner = (
    <span className="roll-inner">
      <span className="roll-span">{label}</span>
      <span className="roll-span-secondary">{label}</span>
    </span>
  );
  return isRoute
    ? <Link to={to} className="roll-link" onClick={onClick}>{inner}</Link>
    : <a href={to} className="roll-link" onClick={onClick}>{inner}</a>;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef       = useRef(null);
  const panelRef     = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const ID = 'monjunath-nav-styles';
    if (!document.getElementById(ID)) {
      const tag = document.createElement('style');
      tag.id = ID;
      tag.textContent = INJECTED_STYLES;
      document.head.appendChild(tag);
    }
    return () => { if (process.env.NODE_ENV === 'development') document.getElementById(ID)?.remove(); };
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          navRef.current?.classList.toggle('nav-scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-menu-open', mobileMenuOpen);
    return () => document.body.classList.remove('nav-menu-open');
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const scrollToSection = useCallback((sectionId, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_H - 24, behavior: 'smooth' });
  }, []);

  const scrollToTop = useCallback(() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  const closeMenu   = useCallback(() => setMobileMenuOpen(false), []);
  const toggleMenu  = useCallback(() => setMobileMenuOpen(p => !p), []);

  const navItems = [
    { label: 'Home',          to: '/',              isRoute: true,  onClick: scrollToTop },
    { label: 'About',         to: '#about',         isRoute: false, onClick: (e) => scrollToSection('about', e) },
    { label: 'Services',      to: '#services',      isRoute: false, onClick: (e) => scrollToSection('services', e) },
    { label: 'Projects',      to: '#projects',      isRoute: false, onClick: (e) => scrollToSection('projects', e) },
    { label: 'Creative Edge', to: '#creative-edge', isRoute: false, onClick: (e) => scrollToSection('creative-edge', e) },
    { label: 'Contact',       to: '/contact',       isRoute: true,  onClick: null },
  ];

  return (
    <>
      <div className={`mobile-backdrop${mobileMenuOpen ? ' is-open' : ''}`} onClick={closeMenu} aria-hidden="true" />

      <nav
        ref={navRef}
        className="monjunath-nav"
        role="navigation"
        aria-label="Main navigation"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: NAV_H, display: 'flex', alignItems: 'center', zIndex: 99999 }}
      >
        {/* nav-inner handles all padding — desktop 36px, mobile 16px via CSS */}
        <div className="nav-inner">

          {/* ── Logo ──────────────────────────────────────────────────────────── */}
          <Link to="/" className="logo-wrap" onClick={scrollToTop} aria-label="Manjunatha — home">
            <MouseFollowingEyes />
            <span className="logo-wordmark">Manjunatha</span>
          </Link>

          {/* ── Desktop links ────────────────────────────────────────────────── */}
          <ul className="desktop-nav-links" style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
            {navItems.map(item => (
              <li key={item.label}>
                <RollLink label={item.label} to={item.to} isRoute={item.isRoute} onClick={item.onClick} />
              </li>
            ))}
          </ul>

          {/* ── Right controls ───────────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="navbar-cta-desktop">
              <FlowButton text="Contact Now" as="a" href="/contact" bgColor="#C4F038" textColor="#111111" hoverColor="#111111" />
            </div>
            <button
              ref={hamburgerRef}
              className={`hbg-btn${mobileMenuOpen ? ' is-open' : ''}`}
              onClick={toggleMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              <span className="hbg-box" aria-hidden="true">
                <span className="hbg-line" />
                <span className="hbg-line" />
                <span className="hbg-line" />
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile panel ──────────────────────────────────────────────────── */}
        <div
          ref={panelRef}
          id="mobile-nav-panel"
          className={`mobile-panel${mobileMenuOpen ? ' is-open' : ''}`}
          role="dialog" aria-modal="true" aria-label="Navigation menu"
        >
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 20, listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', width: '100%' }}>
            {navItems.map((item) => (
              <li key={item.label} className="mobile-nav-item">
                {item.isRoute
                  ? <Link to={item.to} className="mobile-nav-link" onClick={() => { closeMenu(); if (item.onClick) item.onClick(); }}>{item.label}</Link>
                  : <a href={item.to} className="mobile-nav-link" onClick={item.onClick}>{item.label}</a>
                }
              </li>
            ))}
          </ul>

          <div className="mobile-divider" aria-hidden="true" />

          <div className="mobile-cta-wrap">
            <a href="/contact" className="mobile-cta-link" onClick={closeMenu}>
              Contact Now
              <span className="mobile-cta-icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}