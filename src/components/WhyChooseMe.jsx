import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

import Icon1 from '../Icons/Icon1.webp';
import Icon2 from '../Icons/Icon2.webp';
import Icon3 from '../Icons/Icon3.webp';
import Icon4 from '../Icons/Icon4.webp';

const cardsData = [
  {
    id: 0,
    icon: Icon1,
    title: 'Ontime Delivery',
    desc: 'Crafting visually stunning, user-centered websites tailored to your brand and business — always delivered on schedule.'
  },
  {
    id: 1,
    icon: Icon2,
    title: 'Creative Innovation',
    desc: 'Driving creative innovation by transforming fresh ideas into impactful, forward-thinking design solutions.'
  },
  {
    id: 2,
    icon: Icon3,
    title: 'Continuous Learning',
    desc: 'Always expanding my skill set to stay ahead of the curve and deliver cutting-edge digital experiences.'
  },
  {
    id: 3,
    icon: Icon4,
    title: 'Proven Results',
    desc: 'Delivering proven results by turning strategies and ideas into measurable, impactful outcomes that consistently exceed expectations.'
  }
];

export default function WhyChooseMe() {
  const [activeId, setActiveId] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const descRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/tablet to disable desktop flex styles
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Init: hide all descriptions except first
  useEffect(() => {
    descRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === 0) {
        gsap.set(el, { height: 'auto', opacity: 1, marginTop: 12, y: 0 });
      } else {
        gsap.set(el, { height: 0, opacity: 0, marginTop: 0, y: 10 });
      }
    });
  }, []);

  const handleCardClick = (clickedIdx) => {
    if (clickedIdx === activeId) return;

    const prevIdx = activeId;
    setActiveId(clickedIdx);

    const tl = gsap.timeline();

    const prevCard = cardsRef.current[prevIdx];
    const nextCard = cardsRef.current[clickedIdx];
    const prevDesc = descRefs.current[prevIdx];
    const nextDesc = descRefs.current[clickedIdx];

    // 1. Super Smooth Layout Transition (GSAP handles the sub-pixel flex better than CSS)
    tl.to(prevCard, {
      flexGrow: 0.7,
      backgroundColor: '#ffffff',
      borderColor: '#e5e5e5',
      duration: 0.45,
      ease: 'power3.inOut'
    }, 0);

    tl.to(nextCard, {
      flexGrow: 2.5,
      backgroundColor: '#ebebeb',
      borderColor: '#22C55E',
      duration: 0.45,
      ease: 'power3.inOut'
    }, 0);

    // 2. Sequenced Description Reveal
    // Collapse previous
    tl.to(prevDesc, {
      opacity: 0,
      height: 0,
      marginTop: 0,
      duration: 0.25,
      ease: 'power2.in'
    }, 0);

    // Reveal next
    gsap.set(nextDesc, { y: 15, opacity: 0 });
    tl.to(nextDesc, {
      height: 'auto',
      marginTop: 12,
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'back.out(1.2)'
    }, 0.2); // Start halfway through expansion for peak smoothness
  };

  return (
    <section ref={sectionRef} className="pb-0 md:pb-[40px] pt-0 bg-white w-full">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <style>
          {`
            @media (min-width: 768px) {
              .wcm-title-part2-desktop-hollow {
                color: transparent !important;
                -webkit-text-stroke: 1.5px #888780;
              }
              .wcm-header {
                align-items: center !important;
                text-align: center !important;
                margin-bottom: 80px !important;
              }
              .wcm-subtitle {
                text-align: center !important;
              }
            }
          `}
        </style>
        <div className="wcm-header flex flex-col items-start text-left md:items-center md:text-center mb-[40px] md:mb-[40px]">
          <motion.div
            className="inline-flex items-center gap-2 border border-[#d0d0d0] rounded-full text-[14px] text-[#333] mb-5"
            style={{ padding: '6px 18px' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="w-[6px] h-[6px] rounded-full bg-[#333] inline-block" />
            Why Choose
          </motion.div>
          <motion.h2
            className="m-0 leading-[1.2] text-[40px] md:text-[56px]"
            style={{ fontFamily: '"Sora", sans-serif' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="font-bold text-[#1A1A1A]">Why </span>
            <span className="font-normal text-[#888780] wcm-title-part2-desktop-hollow">Choose me</span>
          </motion.h2>
          <motion.p
            className="wcm-subtitle text-[#888780] mt-3 max-w-[560px] leading-[1.6] text-[15px] md:text-[16px]"
            style={{ fontFamily: '"Inter", sans-serif' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            Combining innovation, strategy, and design to craft powerful brand
            experiences that drive real results.
          </motion.p>
        </div>

        {/* Cards Row */}
        <div className="why-choose-me-cards flex flex-col lg:flex-row items-stretch gap-[16px] lg:gap-[12px] h-auto lg:h-[335px]">
          {cardsData.map((card, i) => {
            const isActive = i === activeId;

            return (
              <div
                key={card.id}
                ref={el => cardsRef.current[i] = el}
                onClick={() => handleCardClick(i)}
                className="why-choose-me-card relative rounded-[16px] border cursor-pointer p-[24px] lg:p-[20px] flex flex-col justify-between overflow-hidden w-full lg:w-auto"
                style={{
                  flexGrow: isMobile ? 0 : (isActive ? 2.5 : 0.7),
                  flexBasis: isMobile ? 'auto' : 0,
                  backgroundColor: isActive ? '#ebebeb' : '#ffffff',
                  borderColor: (isActive && !isMobile) ? '#22C55E' : '#e5e5e5',
                  // Entrance animation
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: `${i * 80}ms`,
                  willChange: 'flex-grow, background-color'
                }}
              >
               {/* Shine Border Animation - Only on active card */}
               {(isActive && !isMobile) && (
                 <div
                   className="absolute inset-0 pointer-events-none shine-border"
                   style={{
                     '--shine-color-1': '#FF007F',
                     '--shine-color-2': '#39FF14',
                     '--shine-color-3': '#00FFFF'
                   }}
                 />
               )}

               {/* Subtle background texture for active card */}
               <div
                 className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                 style={{
                   opacity: isActive ? 1 : 0,
                   backgroundImage: `
                     radial-gradient(ellipse at 70% 30%, rgba(200,200,210,0.3) 0%, transparent 65%),
                     radial-gradient(ellipse at 30% 80%, rgba(210,210,220,0.15) 0%, transparent 60%)
                   `,
                   zIndex: 0
                 }}
               />

               {/* Noise Texture (Darker Dots) Background - Only on active card */}
               {(isActive && !isMobile) && (
                 <div
                   className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                   style={{
                     opacity: isActive ? 1 : 0,
                     background: "#ffffff",
                     backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
                     backgroundSize: "20px 20px",
                     zIndex: 0
                   }}
                 />
               )}

                {/* Icon */}
                <div className="relative z-10">
                  <div className="relative w-[36px] h-[36px]">
                 {/* Orbiting dots animation - Only on active card */}
                     {(isActive && !isMobile) && (
                       <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
                         <svg width="36" height="36" viewBox="0 0 36 36" className="absolute inset-0">
                           <circle cx="18" cy="3" r="2" fill="#1A1A1A" />
                           <circle cx="18" cy="33" r="2" fill="#1A1A1A" />
                           <circle cx="3" cy="18" r="2" fill="#1A1A1A" />
                           <circle cx="33" cy="18" r="2" fill="#1A1A1A" />
                         </svg>
                       </div>
                     )}
                    <img
                      src={card.icon}
                      alt={card.title}
                      style={{
                        width: '36px',
                        height: '36px',
                        objectFit: 'contain',
                        position: 'relative',
                        zIndex: 1
                      }}
                    />
                  </div>
                </div>

                {/* Bottom content */}
                <div className="relative z-10 mt-auto">
                  <h3
                    style={{
                      fontSize: isActive ? '22px' : '20px',
                      fontWeight: isActive ? 700 : 600,
                      color: '#1a1a1a',
                      lineHeight: 1.25,
                      margin: 0,
                      fontFamily: '"Sora", sans-serif',
                      transition: 'font-size 0.4s ease'
                    }}
                  >
                    {card.title}
                  </h3>
                  <div
                    ref={el => descRefs.current[i] = el}
                    className="why-choose-me-desc"
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        lineHeight: 1.6,
                        margin: 0,
                        fontFamily: '"Inter", sans-serif'
                      }}
                    >
                      {card.desc}
                    </p>                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}