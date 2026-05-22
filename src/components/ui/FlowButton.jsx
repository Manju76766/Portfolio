import React, { useState } from 'react';

/**
 * Arrow icon component (moved OUTSIDE FlowButton to avoid re-creation on render)
 */
const Arrow = () => (
  <svg
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/**
 * FlowButton — exact animation from 21st.dev/r/xubohuah/flow-button
 *
 * Props:
 *   text        — button label
 *   bgColor     — expanding circle color        (default '#111111')
 *   textColor   — idle text + arrow color       (default '#111111')
 *   hoverColor  — text + arrow color on hover   (default '#ffffff')
 *   borderColor — idle border (default auto 40% of textColor)
 *   as          — root element: 'button' | 'a' | Link component
 *   style       — extra styles on root
 *   className   — extra classes
 *   ...rest     — forwarded props (href, to, onClick …)
 */
export function FlowButton({
  text = 'Button',
  bgColor = '#C4F038',
  textColor = '#111111',
  hoverColor = '#ffffff',
  borderColor,
  as: Tag = 'button',
  style = {},
  className = '',
  ...rest
}) {
  const [hovered, setHovered] = useState(false);

  const idleBorder = borderColor || `${textColor}66`; // 40% opacity

  // Timing constants (ms) — matching original exactly
  const T_CIRCLE  = '800ms cubic-bezier(0.19,1,0.22,1)';
  const T_ARROW   = '800ms cubic-bezier(0.34,1.56,0.64,1)';
  const T_TEXT    = '800ms ease-out';
  const T_BUTTON  = '600ms cubic-bezier(0.23,1,0.32,1)';

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        // Layout
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        overflow: 'hidden',
        // Shape
        borderRadius: hovered ? '12px' : '100px',
        border: `1.5px solid ${hovered ? 'transparent' : idleBorder}`,
        padding: '12px 32px',
        // Color
        background: 'transparent',
        color: hovered ? hoverColor : textColor,
        // Type
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: '"Sora", sans-serif',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        // Transition
        transition: `border-color ${T_BUTTON}, border-radius ${T_BUTTON}, color ${T_BUTTON}`,
        transform: 'scale(1)',
        ...style,
      }}
      {...rest}
    >
      {/* Left arrow — slides from -100% to left:16px */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: hovered ? '16px' : '-24px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 9,
          transition: `left ${T_ARROW}`,
          color: hovered ? hoverColor : textColor,
        }}
      >
        <Arrow />
      </span>

      {/* Label — shifts right on hover */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          transform: hovered ? 'translateX(12px)' : 'translateX(-12px)',
          transition: `transform ${T_TEXT}`,
        }}
      >
        {text}
      </span>

      {/* Expanding circle */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: hovered ? '260px' : '16px',
          height: hovered ? '260px' : '16px',
          borderRadius: '50%',
          background: bgColor,
          opacity: hovered ? 1 : 0,
          transition: `width ${T_CIRCLE}, height ${T_CIRCLE}, opacity ${T_CIRCLE}`,
          zIndex: 0,
        }}
      />

      {/* Right arrow — slides from right:16px to right:-100% */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: hovered ? '-24px' : '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 9,
          transition: `right ${T_ARROW}`,
          color: hovered ? hoverColor : textColor,
        }}
      >
        <Arrow />
      </span>
    </Tag>
  );
}