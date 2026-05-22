import { motion, useInView } from 'framer-motion';
import React from 'react';

/**
 * TimelineContent — converted from TypeScript/Next.js to plain React JSX.
 * Animates children with blur + fade + slide-up when the section enters view.
 *
 * Props:
 *   as            — HTML tag to render ("div", "h1", "p", etc.) default "div"
 *   animationNum  — stagger index (0, 1, 2, …) passed as framer `custom` value
 *   timelineRef   — ref of the parent section (used by useInView)
 *   customVariants — optional override for default hidden/visible variants
 *   once          — whether animation only fires once (default false)
 */
export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  className = '',
  as,
  customVariants,
  once = false,
  style,
  ...props
}) {
  const defaultVariants = {
    visible: (i) => ({
      filter: 'blur(0px)',
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.5,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: 'blur(20px)',
      y: 0,
      opacity: 0,
    },
  };

  const variants = customVariants || defaultVariants;

  const isInView = useInView(timelineRef, { once });

  const Tag = as || 'div';
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={animationNum}
      variants={variants}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionTag>
  );
}