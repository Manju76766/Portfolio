import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import card5Img from '../img/Card5.png';

const fontsHref =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    title: 'Front-End Engineering',
    desc: 'Engineering the visual soul of the web — where clean code meets bold design and users never want to leave.',
    tags: ['React / Vue', 'TypeScript', 'CSS / Tailwind', 'Performance'],
  },
  {
    title: 'Back-End Architecture',
    desc: 'Designing robust APIs, databases, and server logic that scale under pressure.',
    tags: ['Node / Python', 'REST / GraphQL', 'SQL / NoSQL', 'Auth & Security'],
  },
  {
    title: 'GSAP Animation',
    desc: 'Creating fluid, timeline-based animations and scroll-triggered experiences that bring interfaces to life.',
    tags: ['GSAP Timeline', 'ScrollTrigger', 'Tweening', 'Easing'],
  },
  {
    title: 'Database Design',
    desc: 'Structuring relational data with MySQL — from schema design and indexing to complex joins and stored procedures.',
    tags: ['MySQL', 'SQL Server', 'Stored Procs', 'Indexing'],
  },
];

/* ─── Timing — same easing curves as FlowButton ─── */
const T_CIRCLE = '700ms cubic-bezier(0.19,1,0.22,1)';
const T_ARROW = '700ms cubic-bezier(0.34,1.56,0.64,1)';
const T_TEXT = '700ms ease-out';
const T_BTN = '500ms cubic-bezier(0.23,1,0.32,1)';



/* ─── SkillTag — FlowButton expanding circle, no arrows ─── */
function SkillTag({ label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: hovered ? '10px' : '50px',
        border: `1.5px solid ${hovered ? 'transparent' : '#bbb'}`,
        padding: '6px 20px',
        background: 'transparent',
        color: '#333',
        fontSize: '0.88rem',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 400,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        cursor: 'default',
        userSelect: 'none',
        transition: `border-color ${T_BTN}, border-radius ${T_BTN}`,
      }}
    >
      {/* Label */}
      <span style={{ position: 'relative', zIndex: 1 }}>
        {label}
      </span>

      {/* Expanding #C4F038 circle */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: hovered ? '240px' : '12px',
          height: hovered ? '240px' : '12px',
          borderRadius: '50%',
          background: '#C4F038',
          opacity: hovered ? 1 : 0,
          transition: `width ${T_CIRCLE}, height ${T_CIRCLE}, opacity ${T_CIRCLE}`,
          zIndex: 0,
        }}
      />
    </span>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function CreativeEdge() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageWrapRef = useRef(null);
  const skillRefs = useRef([]);
  const skillTitleRefs = useRef([]);
  const skillDescRefs = useRef([]);
  const skillTagGroupRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Header fade in
      gsap.set([titleRef.current, textRef.current], { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: headerRef.current, start: 'top 85%',
        onEnter: () => {
          gsap.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
          gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power3.out' });
        },
        once: true,
      });

      // 2. Image fade in
      gsap.set(imageWrapRef.current, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 75%',
        onEnter: () => {
          gsap.to(imageWrapRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' });
        },
        once: true,
      });

      // 3. Each skill row
      skillRefs.current.forEach((skillEl, i) => {
        if (!skillEl) return;
        const titleEl = skillTitleRefs.current[i];
        const descEl = skillDescRefs.current[i];
        const tagsEl = skillTagGroupRefs.current[i];

        gsap.set(titleEl, { opacity: 0, y: 30 });
        gsap.set(descEl, { opacity: 0, y: 24 });
        if (tagsEl) gsap.set(tagsEl.children, { opacity: 0, scale: 0.5 });

        ScrollTrigger.create({
          trigger: skillEl, start: 'top 85%',
          onEnter: () => {
            gsap.to(titleEl, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' });
            gsap.to(descEl, { opacity: 1, y: 0, duration: 0.55, delay: 0.12, ease: 'power2.out' });
            if (tagsEl) {
              Array.from(tagsEl.children).forEach((tag, j) => {
                gsap.to(tag, { opacity: 1, scale: 1, duration: 0.5, delay: 0.2 + j * 0.08, ease: 'back.out(1.7)' });
              });
            }
          },
          once: true,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <link rel="stylesheet" href={fontsHref} />
      <section
        ref={sectionRef}
        id="creative-edge"
        style={{ backgroundColor: '#ffffff', padding: '80px 0', width: '100%', boxSizing: 'border-box' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px', boxSizing: 'border-box' }}>

          {/* HEADER */}
          <div
            ref={headerRef}
            className="ce-header"
            style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}
          >
            {/* Badge Pill */}
            <div
              className="ce-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid #d0d0d0',
                borderRadius: '9999px',
                padding: '6px 18px',
                marginBottom: '20px',
                fontSize: '14px',
                color: '#333333',
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              Creative Edge
            </div>

            {/* Heading */}
            <style>
              {`
                @media (min-width: 769px) {
                  .ce-title-part2-desktop-hollow {
                    color: transparent !important;
                    -webkit-text-stroke: 1.5px #888780;
                  }
                  .ce-header {
                    align-items: center !important;
                    text-align: center !important;
                    margin-bottom: 80px !important;
                  }
                  .ce-title {
                    font-size: 56px !important;
                  }
                  .ce-subtitle {
                    text-align: center !important;
                    font-size: 16px !important;
                    margin-top: 16px !important;
                  }
                  .ce-badge::before {
                    content: '■';
                    font-size: 10px;
                    margin-right: 6px;
                    line-height: 1;
                  }
                }
              `}
            </style>
            <h2
              ref={titleRef}
              className="ce-title"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '40px',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                lineHeight: 1.08,
                margin: 0,
                color: '#111',
              }}
            >
              My Creative{' '}
              <span className="ce-title-part2 ce-title-part2-desktop-hollow" style={{ color: '#888780', fontWeight: 400 }}>Edge</span>
            </h2>

            {/* Paragraph */}
            <p
              ref={textRef}
              className="ce-subtitle"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: '#888780',
                maxWidth: '560px',
                margin: '12px 0 0',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Combining innovation, strategy, and design to craft powerful brand
              experiences that drive real results.
            </p>
          </div>

          {/* BODY */}
          <div className="creative-edge-content" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 'clamp(32px, 5vw, 72px)' }}>

            {/* Sticky image */}
            <div className="creative-edge-image" style={{ width: '100%', maxWidth: '420px', flexShrink: 0, position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
              <div ref={imageWrapRef} style={{
                width: '100%', aspectRatio: '3 / 4', borderRadius: '20px', overflow: 'hidden',
                background: 'linear-gradient(160deg, #b8cece 0%, #ccdede 30%, #d8eaea 60%, #c8dcdc 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              }}>
                <img
                  src={card5Img} alt="Creative Edge"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>

            {/* Skills list */}
            <div className="creative-edge-skills" style={{ flex: 1, width: '100%' }}>
              {skills.map((skill, i) => (
                <div
                  key={i}
                  ref={(el) => (skillRefs.current[i] = el)}
                  style={{
                    paddingTop: i === 0 ? '8px' : '48px',
                    paddingBottom: '44px',
                    paddingLeft: '32px',
                    borderLeft: '2px solid #e8e8e8',
                  }}
                >
                  <h3
                    ref={(el) => (skillTitleRefs.current[i] = el)}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(1.6rem, 2.8vw, 2rem)',
                      fontWeight: 700, color: '#111',
                      marginBottom: '12px', lineHeight: 1.15, letterSpacing: '-0.01em',
                    }}
                  >
                    {skill.title}
                  </h3>

                  <p
                    ref={(el) => (skillDescRefs.current[i] = el)}
                    style={{
                      fontSize: '0.97rem', color: '#555',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      lineHeight: 1.7, marginBottom: '20px', maxWidth: '500px', fontWeight: 400,
                    }}
                  >
                    {skill.desc}
                  </p>

                  {/* Tags — each has the exact FlowButton animation */}
                  <div
                    ref={(el) => (skillTagGroupRefs.current[i] = el)}
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
                  >
                    {skill.tags.map((tag) => (
                      <SkillTag key={tag} label={tag} />
                    ))}
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