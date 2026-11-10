import { useState, useEffect } from 'react';

/**
 * Custom hook to detect the currently active section based on scroll position.
 * Checks sections in exact chronological DOM appearance.
 * 
 * @param {string[]} sectionIds - Array of section element IDs in top-to-bottom order
 * @returns {string} - Active section ID
 */
export const useActiveSection = (
  sectionIds = ['hero', 'projects', 'about', 'skills', 'services', 'process', 'trust', 'contact']
) => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // 120px offset accounts for navbar height + top padding
      const scrollPosition = window.scrollY + 130;

      // Scan backwards from deepest section to top section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
};
