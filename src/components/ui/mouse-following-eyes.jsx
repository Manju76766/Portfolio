"use client";

import React, { useState, useRef, useEffect } from "react";

const MouseFollowingEyes = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const eye1Ref = useRef(null);
  const eye2Ref = useRef(null);

  useEffect(() => {
    // Set initial position to center of screen so they look forward before mouse moves
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
    };
  }, []);

  return (
    <div className="flex items-center justify-center bg-[#111111] rounded-full px-2.5 h-[28px] md:h-[34px] gap-1.5 shrink-0 shadow-sm">
      <Eye
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        selfRef={eye1Ref}
        otherRef={eye2Ref}
      />
      <Eye
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        selfRef={eye2Ref}
        otherRef={eye1Ref}
      />
    </div>
  );
};

const Eye = ({ mouseX, mouseY, selfRef, otherRef }) => {
  const pupilRef = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  const updateCenter = () => {
    if (!selfRef.current) return;
    const rect = selfRef.current.getBoundingClientRect();
    setCenter({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  useEffect(() => {
    updateCenter();
    window.addEventListener("resize", updateCenter);
    window.addEventListener("scroll", updateCenter, { passive: true });
    return () => {
      window.removeEventListener("resize", updateCenter);
      window.removeEventListener("scroll", updateCenter);
    };
  }, []);

  useEffect(() => {
    if (center.x === 0 && center.y === 0) {
      updateCenter();
    }

    const isInside = (ref) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return false;
      return (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
      );
    };

    if (isInside(selfRef) || isInside(otherRef)) return;

    const dx = mouseX - center.x;
    const dy = mouseY - center.y;
    const angle = Math.atan2(dy, dx);

    // Reduced max move to fit beautifully in the small navbar space
    const maxMove = 3;
    const pupilX = Math.cos(angle) * maxMove;
    const pupilY = Math.sin(angle) * maxMove;

    if (pupilRef.current) {
      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }
  }, [mouseX, mouseY, center]);

  return (
    <div
      ref={selfRef}
      className="relative bg-white rounded-full h-[16px] w-[16px] md:h-[18px] md:w-[18px] flex items-center justify-center overflow-hidden"
    >
      <div
        ref={pupilRef}
        className="absolute bg-[#111111] rounded-full h-[9px] w-[9px] md:h-[10px] md:w-[10px]"
        style={{ transition: "transform 0.05s linear", willChange: "transform" }}
      >
        <div className="w-[3px] h-[3px] bg-white rounded-full absolute top-[1.5px] right-[1.5px] opacity-80"></div>
      </div>
    </div>
  );
};

export { MouseFollowingEyes };
