import React from 'react';
import { SiC, SiCplusplus, SiPython, SiReact, SiHtml5, SiGreensock, SiTailwindcss } from 'react-icons/si';
import { TbBrain } from 'react-icons/tb';
import { FaJava } from 'react-icons/fa';
import { DiDatabase } from 'react-icons/di';

const CSharpIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#9B4F96" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
    <path fill="#68217A" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
    <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z" />
  </svg>
);

export default function Marquee() {
  const TECHS = [
    { label: 'C', Icon: SiC, color: '#A8B9CC' },
    { label: 'C++', Icon: SiCplusplus, color: '#00599C' },
    { label: 'C#', Icon: CSharpIcon, color: '#9B4F96' },
    { label: 'SQL', Icon: DiDatabase, color: '#4479A1' },
    { label: 'Java', Icon: FaJava, color: '#ED8B00' },
    { label: 'Python', Icon: SiPython, color: '#3776AB' },
    { label: 'React', Icon: SiReact, color: '#61DAFB' },
    { label: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
    { label: 'GSAP', Icon: SiGreensock, color: '#88CE02' },
    { label: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
    { label: 'AI Prompter', Icon: TbBrain, color: '#8B5CF6' },
  ];

  /* Duplicate items 3x-4x minimum to ensure infinite loop seamlessly */
  const block = [...TECHS, ...TECHS, ...TECHS, ...TECHS];

  return (
    <section className="bg-white text-center w-full relative pt-8 md:pt-20 pb-28">
      <p style={{
        fontFamily: 'sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        color: '#9ca3af',
        letterSpacing: '0.03em',
        textAlign: 'center',
        marginBottom: '48px'
      }}>
        11+ Technologies I Work With
      </p>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          /* Increased from 35s → 70s for a noticeably slower, smoother crawl.
             will-change + translateZ push the animation onto the GPU compositor
             thread, eliminating jank on both mobile and desktop. */
          animation: marqueeScroll 70s linear infinite;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .marquee-mask {
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
      `}</style>

      {/* Wrapper handling the gradient mask and limiting visible count */}
      <div className="w-full mx-auto max-w-[1100px] overflow-hidden marquee-mask">
        <div className="flex w-max animate-marquee">
          {/* Track 1 (Animates exact half way before snapping back) */}
          <div className="flex items-center" style={{ gap: '80px', paddingRight: '80px' }}>
            {block.map((tech, index) => {
              const { Icon, label, color } = tech;
              return (
                <div key={`set1-${index}`} className="flex flex-col items-center justify-center flex-shrink-0" style={{ minWidth: '100px', gap: '12px' }}>
                  <Icon size={52} color={color} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: '#6b7280', fontFamily: 'sans-serif', fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</span>
                </div>
              );
            })}
          </div>
          {/* Track 2 (Identical block forming the seamless infinity loop) */}
          <div className="flex items-center" style={{ gap: '80px', paddingRight: '80px' }}>
            {block.map((tech, index) => {
              const { Icon, label, color } = tech;
              return (
                <div key={`set2-${index}`} className="flex flex-col items-center justify-center flex-shrink-0" style={{ minWidth: '100px', gap: '12px' }}>
                  <Icon size={52} color={color} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: '#6b7280', fontFamily: 'sans-serif', fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}