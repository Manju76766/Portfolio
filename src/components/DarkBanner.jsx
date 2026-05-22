import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MagicText } from "@/components/ui/magic-text";

// ── COUNT UP COMPONENT ──────────────────────────────────────────────────
// Optimized with requestAnimationFrame for silky 60fps
function CountUp({ target, duration, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      // Mobile check: reduce duration by 30%
      const isMobile = window.innerWidth < 768;
      const finalDuration = isMobile ? duration * 0.7 : duration;
      
      let startTimestamp = null;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (finalDuration * 1000), 1);
        
        // Easing: easeOutCubic (fast start, slow finish)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentCount = Math.floor(easeOut * target);
        setCount(currentCount);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(target);
          setShowSuffix(true);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, target, duration]);

  return (
    <div ref={nodeRef} style={{ display: 'inline-flex' }}>
      {count}
      <span style={{ 
        opacity: showSuffix ? 1 : 0, 
        transition: 'opacity 0.2s ease',
        marginLeft: '2px'
      }}>
        {suffix}
      </span>
    </div>
  );
}

export default function DarkBanner() {
  return (
    <section
      style={{ backgroundColor: '#313131' }}
      className="w-full py-[60px] px-[36px]"
    >
      {/* Tagline */}
      <div className="max-w-[1100px] mx-auto text-center">
        <motion.h2
          className="font-bold text-white m-0 leading-[1.4] text-center text-[22px] md:text-[28px]"
          style={{ fontFamily: '"Lora", serif' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <MagicText 
            text="I am passionate about building modern web applications and scalable systems, clean code, full stack experiences." 
          />
        </motion.h2>
      </div>

      {/* Stats Row */}
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-center mt-10 gap-8 md:gap-0">

        {/* Stat 1 */}
        <motion.div
          className="dark-banner-stat flex flex-col items-center flex-1 py-[4px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div
            className="font-bold leading-none text-white mb-[8px]"
            style={{ fontSize: '52px', fontFamily: '"Lora", serif' }}
          >
            <CountUp target={3} duration={1.2} suffix="+" />
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#888] font-semibold">
            Years of Coding
          </div>
        </motion.div>

        <div className="hidden md:block w-[1px] h-[60px] bg-[#555]" />

        {/* Stat 2 */}
        <motion.div
          className="dark-banner-stat flex flex-col items-center flex-1 py-[4px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div
            className="font-bold leading-none text-white mb-[8px]"
            style={{ fontSize: '52px', fontFamily: '"Lora", serif' }}
          >
            <CountUp target={6} duration={1.5} suffix="+" />
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#888] font-semibold">
            Projects Built
          </div>
        </motion.div>

        <div className="hidden md:block w-[1px] h-[60px] bg-[#555]" />

        {/* Stat 3 */}
        <motion.div
          className="dark-banner-stat flex flex-col items-center flex-1 py-[4px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div
            className="font-bold leading-none text-white mb-[8px]"
            style={{ fontSize: '52px', fontFamily: '"Lora", serif' }}
          >
            <CountUp target={10} duration={1.8} suffix="+" />
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#888] font-semibold">
            Programming Languages
          </div>
        </motion.div>

      </div>
    </section>
  );
}