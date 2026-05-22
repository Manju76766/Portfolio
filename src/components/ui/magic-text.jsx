"use client" 

import * as React from "react"
 
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
 
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1]);
 
  return (
    <span className="relative mt-3 mr-1 inline-block text-3xl font-semibold" style={{ color: 'white' }}>
      <span className="absolute opacity-20" style={{ color: 'white' }}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
 
export function MagicText({ text }) {
  const container = useRef(null);
 
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });
 
  const words = text.split(" ");
 
  return (
    <p ref={container} className="flex flex-wrap leading-[0.5] p-4">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
 
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}