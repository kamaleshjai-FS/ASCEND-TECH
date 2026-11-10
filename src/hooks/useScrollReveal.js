import { useEffect, useRef } from 'react';

/**
 * Custom hook to trigger fluid scroll entrance animations via IntersectionObserver.
 * Elements animate into view when scrolled, with safe fallbacks and safety timeouts.
 * 
 * @param {Object} options - IntersectionObserver options
 * @returns {React.RefObject} - Attach to the container element
 */
export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      currentRef.classList.add('reveal-visible');
      currentRef.querySelectorAll('.reveal-init, .reveal-scale-init, .reveal-child').forEach((el) => {
        el.classList.add('reveal-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            const children = entry.target.querySelectorAll('.reveal-init, .reveal-scale-init, .reveal-child');
            children.forEach((child, index) => {
              // Add slight staggered delay if inside a stagger container
              if (child.closest('.reveal-stagger') && !child.style.transitionDelay) {
                child.style.transitionDelay = `${index * 80}ms`;
              }
              child.classList.add('reveal-visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.08,
        rootMargin: options.rootMargin ?? '0px 0px -30px 0px',
      }
    );

    observer.observe(currentRef);

    // Safety fallback: Ensure all content is revealed after 1.8s regardless of scroll,
    // guaranteeing zero blank content under any viewport condition.
    const safetyTimer = setTimeout(() => {
      if (currentRef) {
        currentRef.classList.add('reveal-visible');
        currentRef.querySelectorAll('.reveal-init, .reveal-scale-init, .reveal-child').forEach((el) => {
          el.classList.add('reveal-visible');
        });
      }
    }, 1800);

    return () => {
      clearTimeout(safetyTimer);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options.threshold, options.rootMargin]);

  return elementRef;
};
