import React, { useEffect, useState } from 'react';

/**
 * Top Scroll Progress Bar
 * Clean, high-performance scroll indicator line fixed at the top of the viewport
 * showing reading/navigation progress through the portfolio.
 */
export const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const progress = (currentScroll / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div 
      className="scroll-progress-container"
      role="progressbar" 
      aria-valuenow={Math.round(scrollProgress)} 
      aria-valuemin="0" 
      aria-valuemax="100"
      aria-label="Page scroll progress"
    >
      <div 
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      <style>{`
        .scroll-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(245, 243, 235, 0.04);
          z-index: 1001;
          pointer-events: none;
        }

        .scroll-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #93C5FD 0%, var(--accent-lime) 60%, #E3FF8A 100%);
          box-shadow: 0 0 10px rgba(215, 255, 100, 0.8), 0 0 4px var(--accent-lime);
          transition: width 0.08s ease-out;
        }
      `}</style>
    </div>
  );
};
