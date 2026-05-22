import React, { useRef } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { useTransform, motion, useScroll } from 'framer-motion';
import Project1 from '../img/Project1.png';
import Project2 from '../img/Project2.png';
import Project3 from '../img/Project3.png';
import Project4 from '../img/Project4.png';

const fontsHref =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Syne:wght@700&family=Space+Grotesk:wght@700&family=DM+Sans:wght@400&family=Inter:wght@400;500;800&display=swap';

// --- Desktop data ---
const projects = [
  {
    id: 'p01',
    number: 'Project 01 — Cravio',
    title: 'Farm-fresh groceries, delivered to your door.',
    description:
      'Cravio connects local farms directly to your kitchen. Browse fresh produce, dairy, and pantry staples — all sourced from verified farms and delivered same-day.',
    image: Project1,
    color: '#4A3728',
    titleFont: "'Playfair Display', serif",
    bodyFont: "'DM Sans', sans-serif",
    link: 'https://cravio-grocery-shop.vercel.app/',
  },
  {
    id: 'p02',
    number: 'Project 02 — Filmora Tickets',
    title: "Your city's movies, booked in seconds.",
    description:
      'Filmora Tickets brings the full cinema experience online — browse now-showing films, pick your seat, and book instantly. Built for movie lovers who hate queues.',
    image: Project2,
    color: '#1a1a2e',
    titleFont: "'Syne', sans-serif",
    bodyFont: "'Inter', sans-serif",
    objectPosition: 'top',
  },
  {
    id: 'p03',
    number: 'Project 03 — DevMate AI',
    title: 'AI that reviews your code like a senior dev.',
    description:
      'DevMate AI scans your codebase in real time — catching bugs, flagging security risks, and suggesting clean refactors across JavaScript and C#. Your always-on code reviewer.',
    image: Project3,
    color: '#0C1929',
    titleFont: "'Space Grotesk', sans-serif",
    bodyFont: "'DM Sans', sans-serif",
    upcoming: true,
  },
  {
    id: 'p04',
    number: 'Project 04 — DocuMind',
    title: 'Ask questions. Get answers. From your own documents.',
    description:
      'DocuMind turns static PDFs and reports into a searchable knowledge base. Upload any document, ask in plain language, and get precise answers with exact page citations.',
    image: Project4,
    color: '#085041',
    titleFont: "'Space Grotesk', sans-serif",
    bodyFont: "'Inter', sans-serif",
    upcoming: true,
  },
];

// --- Mobile data ---
const mobileProjects = [
  {
    id: 'm01',
    label: 'PROJECT 01 — CRAVIO',
    title: 'Farm-fresh groceries, delivered to your door.',
    desc: 'Cravio connects local farms directly to your kitchen. Browse fresh produce, dairy, and pantry staples — all sourced from verified farms and delivered same-day.',
    image: Project1,
    bg: '#3B2314',
    titleColor: '#F5EFE6',
    titleFont: "'Playfair Display', serif",
    showArrow: true,
    link: 'https://cravio-grocery-shop.vercel.app/',
  },
  {
    id: 'm02',
    label: 'PROJECT 02 — FILMORA TICKETS',
    title: "Your city's movies, booked in seconds.",
    desc: 'Filmora Tickets brings the full cinema experience online — browse now-showing films, pick your seat, and book instantly. Built for movie lovers who hate queues.',
    image: Project2,
    bg: '#0F1628',
    titleColor: '#FFFFFF',
    titleFont: "'Syne', sans-serif",
    showArrow: true,
  },
  {
    id: 'm03',
    label: 'PROJECT 03 — DEVMATE AI',
    title: 'AI that reviews your code like a senior dev.',
    desc: 'DevMate AI scans your codebase in real time — catching bugs, flagging security risks, and suggesting clean refactors across JavaScript and C#. Your always-on code reviewer.',
    image: Project3,
    bg: '#0E1117',
    titleColor: '#FFFFFF',
    titleFont: "'Space Grotesk', sans-serif",
    upcoming: true,
  },
  {
    id: 'm04',
    label: 'PROJECT 04 — DOCUMIND',
    title: 'Ask questions. Get answers. From your own documents.',
    desc: 'DocuMind turns static PDFs and reports into a searchable knowledge base. Upload any document, ask in plain language, and get precise answers with exact page citations.',
    image: Project4,
    bg: '#0A1F14',
    titleColor: '#FFFFFF',
    titleFont: "'Space Grotesk', sans-serif",
    upcoming: true,
  },
];

/* ─── Desktop Card (untouched) ─── */
function Card({ i, project, progress, range, targetScale }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: project.color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="portfolio-card flex flex-col relative h-[520px] w-[85%] max-w-[1100px] rounded-2xl p-10 origin-top shadow-2xl"
      >
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease',
              zIndex: 10,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >
            <FiArrowUpRight size={18} color="#ffffff" />
          </a>
        )}

        {project.upcoming && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: '#C4F038',
              color: '#111111',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily: "'Inter', sans-serif",
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            Upcoming
          </div>
        )}

        <p
          style={{
            fontFamily: project.bodyFont,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ffffff',
            opacity: 0.6,
            margin: '0 0 6px 0',
          }}
        >
          {project.number}
        </p>

        <h2
          style={{
            fontFamily: project.titleFont,
            fontWeight: 700,
            fontSize: '28px',
            color: '#FFFFFF',
            letterSpacing: '-0.5px',
            textAlign: 'left',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h2>

        <div className="portfolio-card-content flex h-full mt-6 gap-10">
          <div className="portfolio-card-text w-[35%] flex flex-col justify-center gap-4">
            <p
              style={{
                fontFamily: project.bodyFont,
                fontWeight: 400,
                fontSize: '14px',
                color: 'rgba(255,255,255,0.88)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {project.description}
            </p>
            <a
              href={project.link || "#"}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              style={{
                fontFamily: project.bodyFont,
                fontWeight: 500,
                fontSize: '13px',
                color: '#FFFFFF',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                opacity: 0.75,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                width: 'fit-content',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
            >
              View →
            </a>
          </div>

          <div className="portfolio-card-image relative flex-1 h-full rounded-xl overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <img
                src={project.image}
                alt={project.number}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: project.objectPosition || 'center' }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Mobile Card ─── */
function MobileCard({ i, project, progress, range, targetScale }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  // Subtle parallax on image
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  // Stacking scale from parent progress
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      /* FIX: was h-[100dvh] items-start pt-[120px] — caused huge dead space */
      className="h-[100dvh] flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: project.bg,
          scale,
          top: `calc(-2vh + ${i * 10}px)`,
          /* ── Card container sizing ── */
          padding: '20px 20px 24px 20px',
          borderRadius: '20px',
          marginBottom: '12px',
          /* ── Visual polish ── */
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        }}
        className="flex flex-col relative w-[92%] origin-top"
      >
        {/* Arrow button */}
        {project.showArrow && (
          <a
            href={project.link || "#"}
            target={project.link ? "_blank" : undefined}
            rel={project.link ? "noopener noreferrer" : undefined}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <FiArrowUpRight size={16} color="#ffffff" />
          </a>
        )}

        {/* Upcoming badge */}
        {project.upcoming && (
          <div
            className="animate-pulse"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: '#B6FF4A',
              color: '#0A1F14',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.05em',
              fontFamily: "'Inter', sans-serif",
              padding: '5px 12px',
              borderRadius: '6px',
              zIndex: 10,
            }}
          >
            UPCOMING
          </div>
        )}

        {/* Project label */}
        <div
          style={{
            fontSize: '11px',
            color: '#ffffff',
            opacity: 0.6,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '8px',
            fontFamily: "'Inter', sans-serif",
            paddingRight: '44px',
          }}
        >
          {project.label}
        </div>

        {/* Headline */}
        <h3
          style={{
            fontSize: '26px',
            fontWeight: 700,
            color: project.titleColor,
            lineHeight: 1.2,
            letterSpacing: '-0.3px',
            marginBottom: '12px',
            fontFamily: project.titleFont,
          }}
        >
          {project.title}
        </h3>

        {/* Mockup image with parallax */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '195px',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '14px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            flexShrink: 0,
          }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              scale: imageScale,
            }}
          />
        </div>

        {/* Body text */}
        <p
          style={{
            fontSize: '14px',
            color: '#ffffff',
            opacity: 0.75,
            lineHeight: 1.6,
            marginBottom: '14px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {project.desc}
        </p>

        {/* See more link */}
        <a
          href={project.link || "#"}
          target={project.link ? "_blank" : undefined}
          rel={project.link ? "noopener noreferrer" : undefined}
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#ffffff',
            textDecoration: 'underline',
            textUnderlineOffset: '5px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'Inter', sans-serif",
            marginTop: 0,
            opacity: 0.85,
          }}
        >
          View <span>→</span>
        </a>
      </motion.div>
    </div>
  );
}

/* ─── Main Export ─── */
export default function Portfolio() {
  // Desktop scroll ref
  const desktopContainer = useRef(null);
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopContainer,
    offset: ['start start', 'end end'],
  });

  // FIX: Mobile gets its OWN scroll ref — was incorrectly using desktop ref before
  const mobileContainer = useRef(null);
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileContainer,
    offset: ['start start', 'end end'],
  });

  return (
    <div id="projects">
      <link rel="stylesheet" href={fontsHref} />

      {/* ── Desktop View (untouched) ── */}
      <section
        id="projects-desktop"
        ref={desktopContainer}
        className="bg-white hidden md:block"
      >
        <style>
          {`
            @media (min-width: 768px) {
              .portfolio-title-part2-desktop-hollow {
                color: transparent !important;
                -webkit-text-stroke: 1.5px #888780;
                font-weight: 400;
              }
            }
          `}
        </style>
        <div className="max-w-[1200px] mx-auto px-6 pt-4 mb-[80px] relative z-10 pointer-events-none flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 border border-[#CCCCCC] rounded-full px-4 py-1.5 mb-5 pointer-events-auto">
            <span className="w-[8px] h-[8px] bg-[#111] rounded-sm" />
            <span className="text-[14px] font-medium text-[#111]">Featured Projects</span>
          </div>
          <h2
            className="text-[56px] font-extrabold text-[#111] tracking-tight pointer-events-auto leading-[1.08]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Recent <span className="portfolio-title-part2-desktop-hollow">Works</span>
          </h2>
          <p className="text-[#666] mt-4 max-w-[600px] mx-auto text-[16px] leading-relaxed pointer-events-auto">
            Combining innovation, strategy, and design to craft powerful brand
            experiences that drive real results.
          </p>
        </div>

        <div className="w-full relative z-0">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={project.id}
                i={i}
                project={project}
                progress={desktopProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </section>

      {/* ── Mobile View ── */}
      <section
        id="projects-mobile"
        ref={mobileContainer}           /* FIX: own ref for correct scroll tracking */
        className="bg-white block md:hidden"
      >
        <div
          className="px-6 pt-[16px] pb-[40px] relative z-10 pointer-events-none flex flex-col items-start text-left"
          style={{ marginBottom: '40px' }}
        >
          {/* Badge Pill */}
          <div
            className="pointer-events-auto"
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
            Featured Projects
          </div>

          {/* Heading */}
          <h2
            className="pointer-events-auto"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '40px',
              fontWeight: 800,
              lineHeight: 1.08,
              margin: 0,
              color: '#111',
              letterSpacing: '-0.5px',
            }}
          >
            My Recent{' '}
            <span style={{ color: '#888780', fontWeight: 400 }}>Works</span>
          </h2>

          {/* Paragraph */}
          <p
            className="pointer-events-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: '#888780',
              maxWidth: '560px',
              lineHeight: 1.6,
              margin: '12px 0 0',
            }}
          >
            Combining innovation, strategy, and design to craft powerful brand
            experiences that drive real results.
          </p>
        </div>

        <div className="w-full relative z-0">
          {mobileProjects.map((project, i) => {
            const targetScale = 1 - (mobileProjects.length - i) * 0.05;
            return (
              <MobileCard
                key={project.id}
                i={i}
                project={project}
                progress={mobileProgress}   /* FIX: was scrollYProgress (desktop ref) */
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}