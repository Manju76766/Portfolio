import React from 'react';

const skills = [
  {
    title: 'Frontend Dev',
    desc: 'Building responsive, performant UIs with React, Vite, and modern CSS tooling.',
    tags: ['React', 'Vite', 'Tailwind', 'GSAP'],
  },
  {
    title: 'Backend Dev',
    desc: 'Designing robust REST APIs and database-driven systems with .NET and SQL Server.',
    tags: ['ASP.NET Core', 'REST API', 'SQL Server', 'C#'],
  },
  {
    title: 'Programming',
    desc: 'Writing clean, efficient code across multiple languages for web and scripting tasks.',
    tags: ['JavaScript', 'Python', 'Java', 'TypeScript'],
  },
  {
    title: 'AI & Tooling',
    desc: 'Integrating AI APIs and building intelligent tools with effective prompt engineering.',
    tags: ['Claude API', 'AI Prompting', 'PWA', 'Claude Vision'],
  },
];

export default function Skills() {
  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
      `}</style>

      <section className="py-24 bg-white">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium text-gray-800 mb-6">
            <span
              className="inline-block bg-gray-900"
              style={{ width: '8px', height: '8px', borderRadius: '2px' }}
            />
            My Skills
          </div>

          {/* Heading */}
          <h2
            className="mb-4"
            style={{
              fontSize: '56px',
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1.1,
              color: '#111',
            }}
          >
            My Creative{' '}
            <span style={{ color: '#999' }}>Edge</span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
            Building full-stack applications with modern tools and clean, scalable code.
          </p>
        </div>

        {/* Two-Column Sticky Layout */}
        <div className="max-w-6xl mx-auto px-8 flex items-start gap-16">

          {/* LEFT — Sticky Image */}
          <div
            className="w-[40%] flex-shrink-0"
            style={{ position: 'sticky', top: '120px', alignSelf: 'flex-start' }}
          >
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: '3 / 4' }}
            >
              <div
                className="w-full h-full"
                style={{
                  background:
                    'linear-gradient(135deg, #b2c8c8 0%, #d6e4e4 50%, #c4d4d4 100%)',
                }}
              />
            </div>
          </div>

          {/* RIGHT — Scrolling Skill Items */}
          <div className="flex-1">
            {skills.map((skill, i) => (
              <div
                key={i}
                style={{
                  paddingTop: '80px',
                  paddingBottom: '80px',
                  borderTop: i > 0 ? '1px solid #e5e7eb' : 'none',
                  paddingLeft: '24px',
                  borderLeft: '1px solid #e5e7eb',
                }}
              >
                {/* Skill Heading */}
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    fontFamily: "'Playfair Display', serif",
                    color: '#111',
                    lineHeight: 1.2,
                  }}
                >
                  {skill.title}
                </h3>

                {/* Skill Description */}
                <p
                  className="mb-5"
                  style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}
                >
                  {skill.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-gray-300 rounded-full px-4 py-1 text-sm text-gray-700 bg-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}