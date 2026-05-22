import React, { useLayoutEffect, useEffect, useRef, useState, useCallback } from 'react';
import Card1 from '../img/Card1.png';
import Card2 from '../img/Card2.png';
import Card3 from '../img/Card3.png';
import Card4 from '../img/Card4.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 0,
    title: 'UI/UX DESIGN',
    desc: 'I specialize in crafting intuitive and engaging UI/UX designs that prioritize user needs and seamless interaction.',
    bullets: ['Wireframing & prototyping', 'Usability testing & user feedback analysis'],
    image: Card1,
    imgPos: 'top center',
  },
  {
    id: 1,
    title: 'GRAPHIC DESIGN',
    desc: 'I create visually compelling graphics that communicate your brand message effectively.',
    bullets: ['Visual identity', 'Marketing materials'],
    image: Card2,
    imgPos: 'center center',
  },
  {
    id: 2,
    title: 'WEB DESIGN',
    desc: 'I design modern, responsive websites that blend aesthetics with functionality for an exceptional user experience.',
    bullets: ['Custom layouts & responsive design', 'Optimized visuals & seamless navigation'],
    image: Card3,
    imgPos: 'center center',
  },
  {
    id: 3,
    title: 'BRANDING DESIGN',
    desc: 'I craft cohesive branding that reflects your vision and builds a strong, memorable identity.',
    bullets: ['Brand strategy', 'Logo & typography'],
    image: Card4,
    imgPos: '20% center',
  },
];

const N = ITEMS.length;
const DESK_PANEL_H = 300;   // fixed panel height on desktop (px)
const DESK_IMG_H = 260;   // image height on desktop (px)
const MOB_IMG_H = 190;   // image height on mobile (px)

// ─── FIX #1 ───────────────────────────────────────────────────────────────────
// Was 1.0 → required 2 swipes per card on mobile because one natural swipe
// gesture travels ~40–60 % of the viewport. 0.5 = exactly one swipe per card.
const MOB_SCROLL_RATIO = 0.5;

// ─── FIX #6 ───────────────────────────────────────────────────────────────────
// On iOS Safari, window.innerHeight is the *layout* viewport and does NOT
// update when the browser chrome (address bar) shows / hides, causing a
// mismatch with 100dvh used in CSS. visualViewport.height is the actual
// visible area and stays in sync with the dynamic viewport.
const getVh = () => window.visualViewport?.height ?? window.innerHeight;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Services() {
  // DOM refs
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const headerRef = useRef(null);
  const panelRefs = useRef([]);
  const bulletRefs = useRef([]);
  const titleRefs = useRef([]);
  const plusRefs = useRef([]);
  const textRefs = useRef([]);
  const imgRefs = useRef([]);

  // Mutable state
  const activeRef = useRef(-1);
  const mobHRef = useRef([]);
  const stRef = useRef(null);
  const scrollerRef = useRef(null);

  const [activeId, setActiveId] = useState(-1);

  // ── Utility ──────────────────────────────────────────────────────────────────
  const isMob = () => window.innerWidth < 768;

  const measurePanels = useCallback(() => {
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const s = panel.style;
      const saved = { h: s.height, ov: s.overflow, pos: s.position, vis: s.visibility };
      s.position = 'absolute';
      s.visibility = 'hidden';
      s.overflow = 'visible';
      s.height = 'auto';
      void panel.offsetHeight;
      mobHRef.current[i] = panel.scrollHeight + 24;
      s.height = saved.h;
      s.overflow = saved.ov;
      s.position = saved.pos;
      s.visibility = saved.vis;
    });
  }, []);

  // ── Core animation ───────────────────────────────────────────────────────────
  const animateTo = useCallback((next) => {
    const prev = activeRef.current;
    if (prev === next) return;

    const mob = isMob();
    const openH = mob ? (mobHRef.current[next] ?? 340) : DESK_PANEL_H;
    const tl = gsap.timeline({ overwrite: 'auto' });

    // ── Close previous ──────────────────────────────────────────────────────
    if (prev >= 0 && panelRefs.current[prev]) {
      const bPrev = (bulletRefs.current[prev] ?? []).filter(Boolean);

      // FIX #4 — reset overflow to hidden BEFORE the close animation so that
      // content (set visible after open) doesn't bleed outside during collapse.
      tl.call(() => {
        if (panelRefs.current[prev]) gsap.set(panelRefs.current[prev], { overflow: 'hidden' });
      }, [], 0);

      tl
        .to(bPrev, { opacity: 0, x: -6, duration: 0.10, stagger: { each: 0.03, from: 'end' }, ease: 'power1.in' }, 0)
        .to(imgRefs.current[prev], { opacity: 0, scale: 0.94, y: -8, duration: 0.16, ease: 'power2.in' }, 0)
        .to(textRefs.current[prev], { opacity: 0, y: -6, duration: 0.13, ease: 'power2.in' }, 0)
        .to(plusRefs.current[prev], { rotation: 0, color: '#c8c8c8', duration: 0.16 }, 0)
        .to(titleRefs.current[prev], { color: '#c8c8c8', duration: 0.16 }, 0)
        .to(panelRefs.current[prev], { height: 0, duration: 0.38, ease: 'expo.inOut' }, 0.04);
    }

    // ── Open next ───────────────────────────────────────────────────────────
    if (next >= 0 && panelRefs.current[next]) {
      const d = prev >= 0 ? 0.13 : 0;
      const bNext = (bulletRefs.current[next] ?? []).filter(Boolean);
      tl
        .set(textRefs.current[next], { opacity: 0, y: 18 })
        .set(imgRefs.current[next], { opacity: 0, y: 20, scale: 0.94 })
        .set(bNext, { opacity: 0, x: -12 })
        .to(titleRefs.current[next], { color: '#111', duration: 0.26, ease: 'power2.out' }, d)
        .to(plusRefs.current[next], { rotation: 45, color: '#111', duration: 0.26 }, d)
        .to(panelRefs.current[next], {
          height: openH,
          duration: 0.52,
          ease: 'expo.out',
          // FIX #3 — after the panel has fully expanded, release overflow so
          // content is never clipped. Desktop only: on mobile the sticky
          // wrapper has overflow:hidden which is intentional for the clip effect.
          onComplete: () => {
            if (!mob && panelRefs.current[next]) {
              gsap.set(panelRefs.current[next], { overflow: 'visible' });
            }
          },
        }, d + 0.02)
        .to(textRefs.current[next], { opacity: 1, y: 0, duration: 0.36, ease: 'power3.out' }, d + 0.18)
        .to(bNext, { opacity: 1, x: 0, duration: 0.24, stagger: { each: 0.08, from: 'start' }, ease: 'power2.out' }, d + 0.26)
        .to(imgRefs.current[next], { opacity: 1, y: 0, scale: 1, duration: 0.52, ease: 'back.out(1.4)' }, d + 0.24);
    }

    activeRef.current = next;
    setActiveId(next);
  }, []);

  // Reset all cards to a known visual state
  const initCards = useCallback((openFirst) => {
    ITEMS.forEach((_, i) => {
      const open = openFirst && i === 0;
      // FIX #5 — on desktop the initially-open card needs overflow:visible so
      // its content is never clipped from the start (was always 'hidden' before).
      gsap.set(panelRefs.current[i], {
        height: open ? DESK_PANEL_H : 0,
        overflow: (open && !isMob()) ? 'visible' : 'hidden',
      });
      gsap.set(textRefs.current[i], { opacity: open ? 1 : 0, y: 0 });
      gsap.set(imgRefs.current[i], { opacity: open ? 1 : 0, y: 0, scale: 1 });
      gsap.set(titleRefs.current[i], { color: open ? '#111' : '#c8c8c8' });
      gsap.set(plusRefs.current[i], { rotation: open ? 45 : 0, color: open ? '#111' : '#c8c8c8' });
      gsap.set((bulletRefs.current[i] ?? []).filter(Boolean), { opacity: open ? 1 : 0, x: 0 });
    });
    activeRef.current = openFirst ? 0 : -1;
    setActiveId(openFirst ? 0 : -1);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  //  MOBILE ENGINE
  //
  //  Why not GSAP ScrollTrigger on mobile?
  //  ───────────────────────────────────────────────────────────────────────────
  //  ScrollTrigger.pin() measures the pinned element's height to compute how
  //  much spacer to inject. When a card panel opens, that element grows by
  //  300-400 px. ScrollTrigger re-measures → its internal `end` pixel shifts →
  //  `progress` changes non-linearly → one scroll sometimes jumps 2 cards,
  //  sometimes needs 2 scrolls for 1 card. Completely unpredictable.
  //
  //  Solution:
  //  • Give <section> a fixed JS height = N × vh (never changes, no panels inside)
  //  • Make .svc-sticky { position: sticky; top: 0 } via CSS only
  //  • Listen to window.scroll, compute idx = floor(scrolledIntoSection / pxPerCard)
  //  • Zero GSAP involvement in scroll math — pure browser-native arithmetic
  //  • One scroll = exactly one pxPerCard = exactly one card change. Always.
  // ─────────────────────────────────────────────────────────────────────────────
  const setupMobile = useCallback(() => {
    if (stRef.current) { stRef.current.kill(); stRef.current = null; }
    if (scrollerRef.current) { window.removeEventListener('scroll', scrollerRef.current); scrollerRef.current = null; }

    measurePanels();
    initCards(false);

    const section = sectionRef.current;

    // FIX #6 — use visualViewport height so the section height stays in sync
    // with 100dvh used in CSS (both reflect the visible area, not layout viewport).
    const vh = getVh();
    const pxPerCard = vh * MOB_SCROLL_RATIO;           // FIX #1 — now 0.5 × vh
    const totalH = pxPerCard * N + vh;

    section.style.height = totalH + 'px';
    section.style.position = 'relative';

    let rafId = null;
    let lastIdx = -1;

    const handler = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;

        const sectionTop = section.getBoundingClientRect().top;
        const scrolled = -sectionTop;

        if (scrolled < 0 || scrolled >= totalH - vh) return;

        const idx = Math.min(Math.floor(scrolled / pxPerCard), N - 1);
        if (idx !== lastIdx) {
          lastIdx = idx;
          animateTo(idx);
        }
      });
    };

    window.addEventListener('scroll', handler, { passive: true });
    scrollerRef.current = handler;

    handler();
  }, [animateTo, initCards, measurePanels]);

  const teardownMobile = useCallback(() => {
    if (scrollerRef.current) {
      window.removeEventListener('scroll', scrollerRef.current);
      scrollerRef.current = null;
    }
    if (sectionRef.current) {
      sectionRef.current.style.height = '';
      sectionRef.current.style.position = '';
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  //  DESKTOP ENGINE  (GSAP ScrollTrigger — safe because DESK_PANEL_H is fixed)
  // ─────────────────────────────────────────────────────────────────────────────
  const setupDesktop = useCallback(() => {
    teardownMobile();
    if (stRef.current) { stRef.current.kill(); stRef.current = null; }

    initCards(true);

    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true }
      }
    );

    stRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${N * window.innerHeight}`,
      pin: stickyRef.current,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate(self) {
        const idx = Math.min(Math.floor(Math.min(self.progress, 0.9999) * N), N - 1);
        if (idx !== activeRef.current) animateTo(idx);
      },
      onEnter() { if (activeRef.current !== 0) { activeRef.current = -1; animateTo(0); } },
      onLeaveBack() { activeRef.current = -1; animateTo(0); },
    });
  }, [animateTo, initCards, teardownMobile]);

  // ── Breakpoint switching ──────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        setupDesktop();
        return () => { if (stRef.current) { stRef.current.kill(); stRef.current = null; } };
      });
      mm.add('(max-width: 767px)', () => {
        setupMobile();
        return () => teardownMobile();
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Resize handler ────────────────────────────────────────────────────────────
  useEffect(() => {
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isMob()) { ScrollTrigger.refresh(); return; }
        setupMobile();
        const cur = activeRef.current;
        if (cur >= 0 && panelRefs.current[cur]) {
          gsap.set(panelRefs.current[cur], { height: mobHRef.current[cur] ?? 'auto' });
        }
      }, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { window.removeEventListener('resize', onResize); clearTimeout(timer); };
  }, [setupMobile]);

  // ── Image preload → re-measure ─────────────────────────────────────────────────
  useEffect(() => {
    let alive = true;
    Promise.all(ITEMS.map(it => new Promise(res => {
      const img = new window.Image();
      img.onload = img.onerror = res;
      img.src = it.image;
    }))).then(() => {
      if (!alive) return;
      if (isMob()) {
        measurePanels();
        const cur = activeRef.current;
        if (cur >= 0 && panelRefs.current[cur]) {
          gsap.set(panelRefs.current[cur], { height: mobHRef.current[cur] ?? 'auto' });
        }
        if (scrollerRef.current) scrollerRef.current();
      } else {
        ScrollTrigger.refresh();
      }
    });
    return () => { alive = false; };
  }, [measurePanels]);

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        /* ── Section shell ───────────────────────────────────────── */
        #services {
          position: relative;
          z-index: 1;
        }

        /* ── Sticky container ────────────────────────────────────── */
        .svc-sticky {
          background: #fff;
          width: 100%;
          box-sizing: border-box;
          padding: 44px 0 48px;
        }
        @media (max-width: 767px) {
          .svc-sticky {
            position: sticky;
            top: 0;
            padding: 24px 0 20px;
            overflow: hidden;
            min-height: 100dvh;
          }
        }

        /* ── Inner wrap ──────────────────────────────────────────── */
        .svc-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          box-sizing: border-box;
        }
        @media (max-width: 767px) { .svc-wrap { padding: 0 18px; } }

        /* ── Header ──────────────────────────────────────────────── */
        .svc-head {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          margin-bottom: 40px;
          gap: 0;
        }
        .svc-h2 {
          font-family: 'Sora', sans-serif;
          font-size: 40px;
          font-weight: 800;
          line-height: 1.08;
          margin: 0 0 0px;
          color: #111;
          letter-spacing: -0.5px;
        }
        .svc-h2 span { color: #888780; font-weight: 400; }
        .svc-sub {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          color: #888780;
          max-width: 560px;
          line-height: 1.6;
          margin: 12px 0 0;
        }
        @media (max-width: 767px) {
          .svc-head { flex-direction: column; align-items: flex-start; text-align: left; margin-bottom: 40px; gap: 0; }
          .svc-h2   { font-size: 40px; margin-bottom: 0px; }
          .svc-sub  { font-size: 15px; line-height: 1.6; margin-top: 12px; }
          .svc-btn-hide { display: none !important; }
        }
        @media (min-width: 768px) {
          .svc-sub { font-size: 16px; }
          .svc-head { flex-direction: row; justify-content: space-between; align-items: center; text-align: left; }
        }

        /* ── Progress dots ───────────────────────────────────────── */
        .svc-dots { display: flex; gap: 7px; margin-bottom: 14px; }
        .svc-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #e0e0e0;
          transition: width .38s cubic-bezier(.22,1,.36,1),
                      background .38s ease,
                      border-radius .38s ease;
        }
        .svc-dot.on { width: 24px; border-radius: 4px; background: #111; }
        @media (max-width: 767px) {
          .svc-dots { margin-bottom: 10px; gap: 6px; }
          .svc-dot  { width: 5px; height: 5px; }
          .svc-dot.on { width: 18px; }
        }

        /* ── Accordion ───────────────────────────────────────────── */
        .svc-list { border-top: 1px solid #e8e8e8; }
        .svc-item { border-bottom: 1px solid #e8e8e8; }

        .svc-hd {
          padding: 15px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          cursor: default;
          user-select: none;
        }
        @media (max-width: 767px) { .svc-hd { padding: 12px 0; } }

        .svc-title {
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: #c8c8c8;
        }
        @media (max-width: 767px) { .svc-title { font-size: 13px; letter-spacing: 0.03em; } }

        .svc-plus {
          font-size: 22px;
          font-weight: 300;
          color: #c8c8c8;
          flex-shrink: 0;
          display: inline-block;
          width: 26px;
          text-align: center;
          line-height: 1;
        }
        @media (max-width: 767px) { .svc-plus { font-size: 19px; width: 22px; } }

        /* GSAP is the sole authority on .svc-panel height */
        .svc-panel {
          overflow: hidden;
          height: 0;
          /* FIX #2 — promote panel to its own GPU layer so height animation
             is composited off the main thread → no jank during expand/collapse */
          will-change: height;
        }

        /* ── Card grid ───────────────────────────────────────────── */
        .svc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          padding-bottom: 18px;
          align-items: start;
        }
        @media (max-width: 767px) {
          .svc-grid { grid-template-columns: 1fr; gap: 14px; padding-bottom: 14px; }
        }

        .svc-text {
          padding-top: 8px;
          /* FIX #2 — GPU layer for opacity + transform animations */
          will-change: transform, opacity;
          transform: translateZ(0);
        }
        @media (max-width: 767px) { .svc-text { padding-top: 4px; } }

        .svc-desc {
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #555;
          line-height: 1.75;
          margin: 0 0 16px;
        }
        @media (max-width: 767px) { .svc-desc { font-size: 12.5px; line-height: 1.6; margin-bottom: 10px; } }

        .svc-ul { list-style: none; padding: 0; margin: 0; }
        .svc-li {
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          /* FIX #2 — GPU layer for stagger animations on bullet items */
          will-change: transform, opacity;
          transform: translateZ(0);
        }
        @media (max-width: 767px) { .svc-li { font-size: 12px; margin-bottom: 8px; gap: 8px; } }

        .svc-bullet {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #111;
          flex-shrink: 0;
        }
        @media (max-width: 767px) { .svc-bullet { width: 5px; height: 5px; } }

        /* ── Image box ───────────────────────────────────────────── */
        .svc-img-box {
          border-radius: 12px;
          overflow: hidden;
          background: #f4f4f4;
          width: 100%;
          height: ${DESK_IMG_H}px;
          box-shadow: 0 4px 22px rgba(0,0,0,0.09);
          flex-shrink: 0;
          /* FIX #2 — GPU layer: scale + opacity + translateY animate on this
             element; compositing prevents layout recalculation on every frame */
          will-change: transform, opacity;
          transform: translateZ(0);
        }
        @media (max-width: 767px) {
          .svc-img-box { height: ${MOB_IMG_H}px; border-radius: 10px; }
        }
        .svc-img { width: 100%; height: 100%; display: block; object-fit: cover; }
      `}</style>

      <section id="services" ref={sectionRef}>
        <div className="svc-sticky" ref={stickyRef}>
          <div className="svc-wrap">

            <div
              className="pill-label"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid #d0d0d0',
                borderRadius: '9999px',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '14px',
                color: '#333333',
                padding: '6px 18px',
                marginBottom: '20px',
              }}
            >
              Service
            </div>

            <div className="svc-head" ref={headerRef}>
              <div>
                <h2 className="svc-h2">My <span>Services</span></h2>
                <p className="svc-sub">
                  Modern, functional design that puts users first and helps your product stand out.
                </p>
              </div>
              <a href="#" className="btn-pill btn-dark svc-btn-hide">
                View My Service <span className="arrow-circle">→</span>
              </a>
            </div>

            <div className="svc-dots">
              {ITEMS.map((_, i) => (
                <div key={i} className={`svc-dot${activeId === i ? ' on' : ''}`} />
              ))}
            </div>

            <div className="svc-list">
              {ITEMS.map((item, i) => (
                <div key={item.id} className="svc-item">

                  <div className="svc-hd">
                    <span className="svc-title" ref={el => (titleRefs.current[i] = el)}>
                      {item.title}
                    </span>
                    <span className="svc-plus" ref={el => (plusRefs.current[i] = el)}>+</span>
                  </div>

                  <div className="svc-panel" ref={el => (panelRefs.current[i] = el)}>
                    <div className="svc-grid">

                      <div className="svc-text" ref={el => (textRefs.current[i] = el)}>
                        <p className="svc-desc">{item.desc}</p>
                        <ul className="svc-ul">
                          {item.bullets.map((b, bi) => (
                            <li
                              key={bi}
                              className="svc-li"
                              ref={el => {
                                if (!bulletRefs.current[i]) bulletRefs.current[i] = [];
                                bulletRefs.current[i][bi] = el;
                              }}
                            >
                              <span className="svc-bullet" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div
                        className="svc-img-box"
                        ref={el => (imgRefs.current[i] = el)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="svc-img"
                          loading="eager"
                          style={{ objectPosition: item.imgPos }}
                        />
                      </div>

                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}