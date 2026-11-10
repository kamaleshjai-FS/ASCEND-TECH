import React, { useEffect, useState, useRef } from 'react';

/**
 * Creative Dual-State Cursor Component
 * Features smooth lerp trailing animation, hover expansion, magnetic effects,
 * and text-badge state over interactive elements (e.g. project cards).
 * 
 * Automatically hidden on mobile/touch devices.
 */
export const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  // Real cursor position
  const mousePos = useRef({ x: -100, y: -100 });
  // Trailing ring position (for smooth physics)
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Detect touch / mobile device
    const checkTouch = () => {
      const isTouch = 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Dynamic hover detection for interactive elements
    const handleElementHover = (e) => {
      const target = e.target.closest('a, button, input, select, textarea, .project-card, .service-card, .timeline-step-card, .subnav-pill, .filter-pill, .preset-btn, .category-tag, .stat-card');
      
      if (!target) {
        setIsHovered(false);
        setCursorText('');
        return;
      }

      setIsHovered(true);

      // Special contextual badge for project cards
      if (target.closest('.project-card')) {
        setCursorText('VIEW');
      } else {
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth physics loop for the trailing ring
    const render = () => {
      // Lerp factor
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className={`creative-cursor-wrapper ${isVisible ? 'cursor-visible' : 'cursor-hidden'}`}>
      {/* Precision Inner Dot */}
      <div 
        ref={dotRef} 
        className={`cursor-dot ${isHovered ? 'dot-hover' : ''} ${isClicking ? 'dot-click' : ''}`}
      />

      {/* Smooth Trailing Outer Ring */}
      <div 
        ref={ringRef} 
        className={`cursor-ring ${isHovered ? 'ring-hover' : ''} ${isClicking ? 'ring-click' : ''} ${cursorText ? 'ring-with-text' : ''}`}
      >
        {cursorText && <span className="cursor-badge-text">{cursorText}</span>}
      </div>

      <style>{`
        .creative-cursor-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 99999;
          transition: opacity 0.25s ease;
        }

        .cursor-hidden {
          opacity: 0;
        }

        .cursor-visible {
          opacity: 1;
        }

        /* Inner Dot */
        .cursor-dot {
          position: fixed;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-lime);
          pointer-events: none;
          z-index: 100000;
          transition: transform 0.05s ease-out, opacity 0.2s ease, width 0.2s ease, height 0.2s ease;
          box-shadow: 0 0 10px rgba(215, 255, 100, 0.8);
          will-change: transform;
        }

        .dot-hover {
          opacity: 0.3;
          transform: scale(0.6);
        }

        .dot-click {
          transform: scale(1.6);
          background-color: #FFF;
        }

        /* Trailing Elastic Ring */
        .cursor-ring {
          position: fixed;
          top: -20px;
          left: -20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(215, 255, 100, 0.55);
          background-color: rgba(215, 255, 100, 0.03);
          pointer-events: none;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                      height 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.25s ease, 
                      background-color 0.25s ease,
                      margin 0.25s ease;
          will-change: transform;
        }

        .ring-hover {
          width: 58px;
          height: 58px;
          top: -29px;
          left: -29px;
          border-color: var(--accent-lime);
          background-color: rgba(215, 255, 100, 0.12);
          backdrop-filter: invert(15%);
          box-shadow: 0 0 20px rgba(215, 255, 100, 0.3);
        }

        .ring-click {
          transform: scale(0.85);
          background-color: rgba(215, 255, 100, 0.25);
        }

        .ring-with-text {
          width: 68px;
          height: 68px;
          top: -34px;
          left: -34px;
          background-color: var(--accent-lime);
          border-color: var(--accent-lime);
          box-shadow: 0 0 25px rgba(215, 255, 100, 0.5);
        }

        .cursor-badge-text {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--bg-primary);
          user-select: none;
          text-align: center;
          animation: fadeIn 0.2s ease forwards;
        }

        @media (hover: none) and (pointer: coarse) {
          .creative-cursor-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
