"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { useNavigate } from "react-router-dom"

const DRAG_THRESHOLD = 0.7

const ANIMATION_CONFIG = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
}

export function SlideButton({ text = "Slide to Contact", onClick }) {
  const [completed, setCompleted] = useState(false)
  const dragRef = useRef(null)
  const navigate = useNavigate()

  const dragX = useMotionValue(0)
  const springX = useSpring(dragX, ANIMATION_CONFIG.spring)

  const [containerWidth, setContainerWidth] = useState(260)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateWidth = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setContainerWidth(290)
      } else {
        setContainerWidth(260)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const buttonWidth = containerWidth
  const buttonHeight = isMobile ? 50 : 52
  const handleWidth = isMobile ? 42 : 50
  const pad = isMobile ? 4 : 6
  const fontSize = isMobile ? 14 : 15
  const maxDrag = buttonWidth - handleWidth - (pad * 2)

  const dragProgress = useTransform(
    springX,
    [0, maxDrag],
    [0, 1]
  )

  const handleDragEnd = () => {
    if (completed) return

    const progress = dragProgress.get()
    if (progress >= DRAG_THRESHOLD) {
      setCompleted(true)
      if (onClick) onClick()
      setTimeout(() => {
        navigate('/contact')
      }, 600)
    } else {
      dragX.set(0)
    }
  }

  const handleDrag = (_event, info) => {
    if (completed) return
    const newX = Math.max(0, Math.min(info.offset.x, maxDrag))
    dragX.set(newX)
  }

  // Green fill starts from left edge and grows as you drag
  const fillWidth = useTransform(
    springX,
    [0, maxDrag],
    [handleWidth + pad, buttonWidth]
  )

  return (
    <div
      ref={dragRef}
      className="relative rounded-full overflow-hidden"
      style={{
        width: buttonWidth,
        height: buttonHeight,
        marginTop: isMobile ? 32 : 20,
        background: '#E5E7EB',
        border: '1px solid #D1D5DB'
      }}
    >
      {/* Green fill from left */}
      {!completed && (
        <motion.div
          style={{
            width: fillWidth,
            height: '100%',
            background: '#C4F038'
          }}
          className="absolute left-0 top-0 rounded-full"
        />
      )}

      {/* Completed state */}
      {completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: '#C4F038' }}
        >
          <div className="flex items-center gap-2" style={{ color: '#111111', fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: fontSize }}>
            <Check size={isMobile ? 18 : 20} strokeWidth={3} />
            <span>Done!</span>
          </div>
        </motion.div>
      )}

      {/* Draggable handle */}
      {!completed && (
        <motion.div
          drag="x"
          dragConstraints={{ left: pad, right: maxDrag + pad }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          style={{ x: springX, y: '-50%', top: '50%' }}
          className="absolute z-10 cursor-grab active:cursor-grabbing"
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: handleWidth,
              height: handleWidth,
              background: 'white',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}
          >
            <ArrowRight
              size={isMobile ? 18 : 20}
              strokeWidth={3}
              style={{ color: '#111111', marginLeft: 2 }}
            />
          </div>
        </motion.div>
      )}

      {/* Text */}
      {!completed && (
        <span
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            color: '#374151',
            fontSize: fontSize,
            fontWeight: isMobile ? 600 : 600,
            marginLeft: isMobile ? 32 : 28,
            fontFamily: '"Sora", sans-serif',
            letterSpacing: '0.02em'
          }}
        >
          {text}
        </span>
      )}
    </div>
  )
}
