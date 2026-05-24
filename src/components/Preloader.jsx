import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "Hello",
  "Olà",
  "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ",
  "Namaste"
];

const opacity = {
  initial: {
    opacity: 0,
    y: 10
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15, ease: "easeIn" }
  }
};

const slideUp = {
  initial: {
    top: 0
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      const timer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
    
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 800 : 400);
    
    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  // Curve path logic
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 350 0 0 L0 0`;

  const curve = {
    initial: {
      d: initialPath
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  };

  return (
    <motion.div 
      variants={slideUp} 
      initial="initial" 
      exit="exit" 
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-white"
    >
      {dimension.width > 0 && (
        <svg 
          className="absolute top-[100%] left-0 w-full"
          style={{ height: '350px' }}
        >
          <motion.path 
            variants={curve} 
            initial="initial" 
            exit="exit" 
            fill="#ffffff" 
          />
        </svg>
      )}
      <div className="relative flex items-center justify-center w-full h-full z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            variants={opacity}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute text-[42px] font-medium text-[#1c1c1c]"
            style={{ fontFamily: 'sans-serif' }}
          >
            {words[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
