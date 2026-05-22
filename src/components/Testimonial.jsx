import React, { useRef } from 'react';
import { TimelineContent } from './ui/TimelineContent';

/* Stagger-blur-in variants — exact match to the reference code */
const revealVariants = {
  visible: (i) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.4,
      duration: 0.5,
    },
  }),
  hidden: {
    filter: 'blur(10px)',
    y: -20,
    opacity: 0,
  },
};

/* Grid line overlay used on the light/white cards — taken directly from reference */
const GRID_BG = {
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'linear-gradient(to right,rgba(79,79,79,.18) 1px,transparent 1px),' +
    'linear-gradient(to bottom,rgba(79,79,79,.18) 1px,transparent 1px)',
  backgroundSize: '50px 56px',
  WebkitMaskImage:
    'radial-gradient(ellipse 80% 50% at 50% 0%,#000 70%,transparent 110%)',
  maskImage:
    'radial-gradient(ellipse 80% 50% at 50% 0%,#000 70%,transparent 110%)',
  pointerEvents: 'none',
};

/* Shared card base */
const cardBase = {
  position: 'relative',
  borderRadius: '16px',
  border: '1px solid rgba(220,220,220,0.7)',
  padding: '28px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  overflow: 'hidden',
};

export default function Testimonial() {
  const testimonialRef = useRef(null);

  return (
    <section
      ref={testimonialRef}
      className="testimonial-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#f8f9fa',
        paddingTop: '150px',
        paddingBottom: '56px',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top fade so heading area is clean */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, #f8f9fa 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── CONTENT ── */}
      <div
        className="testimonial-content"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Header */}
        <div className="testimonial-header" style={{ maxWidth: '768px', margin: '0 auto', textAlign: 'center', marginBottom: '0' }}>

          {/* Mobile-only badge */}
          <div
            className="testimonial-mobile-badge"
            style={{
              display: 'none',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '14px',
              color: '#333333',
              border: '1px solid #d0d0d0',
              borderRadius: '9999px',
              padding: '6px 18px',
              marginBottom: '20px',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Team Says
          </div>

          <TimelineContent
            as="h1"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: '#111',
              fontFamily: "'Playfair Display', Georgia, serif",
              marginBottom: '8px',
              letterSpacing: '-0.5px',
              lineHeight: 1.15,
            }}
          >
            <span className="testimonial-title-line1">
              <span style={{ color: '#111', fontWeight: 800 }}>What My Team </span>
              <span className="testimonial-title-colored" style={{ color: '#888780', fontWeight: 400 }}>Says</span>
            </span>
            <br className="testimonial-title-br" />
            <span className="testimonial-title-line2" style={{ color: '#b0b0b0', fontWeight: 400 }}>About My Work</span>
          </TimelineContent>
          <TimelineContent
            as="p"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
            style={{ color: '#6b7280', fontSize: '16px', margin: '0 auto' }}
          >
            Feedback from team leads, seniors, and architects I've built with.
          </TimelineContent>
        </div>

        {/* Bento Grid */}
        <div
          className="testimonial-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            paddingTop: '100px',
            paddingBottom: '24px',
          }}
        >
          {/* ── COLUMN 1 ── */}
          <div className="testimonial-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Large light card */}
            <TimelineContent
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              style={{
                ...cardBase,
                flex: 7,
                backgroundColor: '#ffffff',
                minHeight: '320px',
              }}
            >
              <div style={GRID_BG} />
              <article style={{ marginTop: 'auto' }}>
                <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.6 }}>
                  "Manjunatha's frontend work is genuinely impressive — responsive layouts,
                  pixel-perfect UI, and zero rework needed on every delivery."
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px' }}>
                  <div>
                    <h2 style={{ fontWeight: 600, fontSize: '16px', margin: 0 }}>Vikram S.</h2>
                    <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Team Lead · Frontend</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop"
                    alt="Vikram S."
                    style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                </div>
              </article>
            </TimelineContent>

            {/* Blue card */}
            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              style={{
                ...cardBase,
                flex: 3,
                backgroundColor: '#2563eb',
                color: 'white',
                minHeight: '200px',
              }}
            >
              <article style={{ marginTop: 'auto' }}>
                <p style={{ fontSize: '14px', lineHeight: 1.6 }}>
                  "Manjunatha jumped into a legacy codebase and refactored the auth
                  module in 2 days — zero downtime, zero bugs."
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px' }}>
                  <div>
                    <h2 style={{ fontWeight: 600, fontSize: '16px', margin: 0 }}>Kiran V.</h2>
                    <p style={{ margin: 0, fontSize: '13px', opacity: 0.8 }}>Project Lead · FullStack</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=687&auto=format&fit=crop"
                    alt="Kiran V."
                    style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* ── COLUMN 2 — three dark cards ── */}
          <div className="testimonial-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                quote: "The database schema Manjunatha designed is scalable and future-proof — easy to extend without breaking existing flows.",
                name: "Neha R.",
                role: "Tech Lead · Backend",
                img: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop",
              },
              {
                quote: "Manjunatha's queries are optimized, indexes are in the right places. The app handles thousands of records without any lag.",
                name: "Rahul T.",
                role: "DB Architect · MySQL",
                img: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop",
              },
              {
                quote: "Manjunatha independently debugged a critical prod issue, root-caused it to a race condition, and fixed it within the hour.",
                name: "Meera J.",
                role: "Scrum Master · Agile",
                img: "https://images.unsplash.com/photo-1740102074295-c13fae3e4f8a?q=80&w=687&auto=format&fit=crop",
              },
            ].map((t, idx) => (
              <TimelineContent
                key={idx}
                animationNum={idx + 2}
                customVariants={revealVariants}
                timelineRef={testimonialRef}
                className={idx > 0 ? 'testimonial-hide-mobile' : ''}
                style={{
                  ...cardBase,
                  flex: 1,
                  backgroundColor: "#111111",
                  color: "white",
                  minHeight: "180px",
                }}
              >
                <article style={{ marginTop: "auto" }}>
                  <p style={{ fontSize: "13px", lineHeight: 1.6 }}>"{t.quote}"</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      paddingTop: "16px",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontWeight: 600,
                          fontSize: "15px",
                          margin: 0,
                        }}
                      >
                        {t.name}
                      </h2>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          opacity: 0.7,
                        }}
                      >
                        {t.role}
                      </p>
                    </div>
                    <img
                      src={t.img}
                      alt={t.name}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </article>
              </TimelineContent>
            ))}
          </div>

          {/* ── COLUMN 3 ── */}
          <div className="testimonial-col" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Blue card */}
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              style={{
                ...cardBase,
                flex: 3,
                backgroundColor: "#2563eb",
                color: "white",
                minHeight: "200px",
              }}
            >
              <article style={{ marginTop: "auto" }}>
                <p style={{ fontSize: "14px", lineHeight: 1.6 }}>
                  "Manjunatha delivered the API ahead of schedule and his documentation
                  was cleaner than most seniors on the team."
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "20px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        margin: 0,
                      }}
                    >
                      Arjun M.
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        opacity: 0.8,
                      }}
                    >
                      Engineering Manager
                    </p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=765&auto=format&fit=crop"
                    alt="Arjun M."
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </article>
            </TimelineContent>

            {/* Large light card */}
            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              style={{
                ...cardBase,
                flex: 7,
                backgroundColor: "#ffffff",
                minHeight: "320px",
              }}
            >
              <div style={GRID_BG} />
              <article style={{ marginTop: "auto" }}>
                <p style={{ fontSize: "14px", color: "#333", lineHeight: 1.6 }}>
                  "Component structure is clean. Reusable pieces, proper state
                  management, and clear separation of concerns — this codebase
                  will scale for years without major rework."
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "20px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        margin: 0,
                      }}
                    >
                      Deepa K.
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#666",
                      }}
                    >
                      Senior Dev · React
                    </p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=687&auto=format&fit=crop"
                    alt="Deepa K."
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>

        {/* Bottom decorative border — exact from reference */}
        <div
          style={{
            borderBottom: "3px solid #111",
            height: "64px",
            position: "relative",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "-8px",
              bottom: "-8px",
              width: "16px",
              height: "16px",
              backgroundColor: "#111",
              border: "2px solid #111",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-8px",
              bottom: "-8px",
              width: "16px",
              height: "16px",
              backgroundColor: "#111",
              border: "2px solid #111",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    </section>
  );
}