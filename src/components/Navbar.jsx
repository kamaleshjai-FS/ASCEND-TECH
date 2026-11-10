import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MessageSquare, MapPin, Mail, Clock, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, NAV_LINKS, getWhatsAppUrl } from '../config';
import { useActiveSection } from '../hooks/useActiveSection';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTimeIST, setCurrentTimeIST] = useState('');
  const activeSection = useActiveSection(['hero', 'projects', 'about', 'skills', 'services', 'process', 'trust', 'contact']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live IST Clock for creative drawer
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const istString = new Intl.DateTimeFormat('en-GB', options).format(new Date());
      setCurrentTimeIST(`${istString} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle URL hash on initial load
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          const headerOffset = window.innerWidth < 768 ? 64 : 76;
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }, 150);
      }
    }
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
    document.body.style.touchAction = 'auto';
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setTimeout(() => {
        const headerOffset = window.innerWidth < 768 ? 64 : 76;
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        if (window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }, 50);
    }
  };

  return (
    <header
      className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''} ${mobileMenuOpen ? 'nav-is-open' : ''}`}
      role="banner"
    >
      <div className="container navbar-container">
        {/* Brand Monogram / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="brand-logo"
          aria-label={`${PERSONAL_INFO.name} Portfolio Home`}
        >
          <span className="brand-monogram">{PERSONAL_INFO.monogram}</span>
          <span className="brand-badge">{PERSONAL_INFO.edition}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.label} className="nav-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  >
                    {link.label}
                    {isActive && <span className="active-dot" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA Button & Creative Mobile Toggle */}
        <div className="nav-actions">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-btn"
            aria-label="Let's Talk via WhatsApp"
          >
            <span className="cta-full-label">Let's Talk</span>
            <span className="cta-short-label">Talk</span>
            <ArrowUpRight size={14} strokeWidth={2.2} />
          </a>

          {/* Creative Morphing Mobile Menu Toggle Button */}
          <button
            type="button"
            className={`creative-menu-toggle ${mobileMenuOpen ? 'toggle-active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            <span className="toggle-label-text">
              {mobileMenuOpen ? 'CLOSE' : 'MENU'}
            </span>
            <div className="burger-icon-box" aria-hidden="true">
              <span className="burger-bar bar-top"></span>
              <span className="burger-bar bar-btm"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Fullscreen Trending Mobile Drawer Navigation */}
      <div
        className={`mobile-creative-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="drawer-noise-overlay" aria-hidden="true"></div>

        <div className="mobile-drawer-inner container">
          {/* Top Status & Availability Bar */}
          <div className="mobile-meta-bar">
            <div className="mobile-status-pill">
              <span className="radar-ping-dot" aria-hidden="true"></span>
              <span className="mobile-status-text">{PERSONAL_INFO.availability}</span>
            </div>
            <span className="studio-clock-tag">
              <Clock size={11} className="text-lime" />
              <span>{currentTimeIST}</span>
            </span>
          </div>

          {/* Navigation Links with Staggered Cascading Animation */}
          <nav className="mobile-nav-container" aria-label="Mobile Main Navigation">
            <ul className="mobile-nav-list">
              {NAV_LINKS.map((link, idx) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li
                    key={link.label}
                    className="mobile-nav-item"
                    style={{ '--item-idx': idx }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`mobile-nav-link ${isActive ? 'mobile-active' : ''}`}
                    >
                      <div className="link-title-group">
                        <span className="mobile-index">0{idx + 1}.</span>
                        <span className="mobile-label">{link.label}</span>
                      </div>

                      <div className="link-action-indicator">
                        {isActive && <span className="active-pill">[CURRENT]</span>}
                        <ArrowUpRight size={20} className="mobile-arrow-icon" />
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Direct Channels & Footer Info */}
          <div className="mobile-drawer-footer">
            <a
              href={getWhatsAppUrl("Hi Ms. Mathavi! I opened your portfolio menu and would like to connect about an inquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-direct-wa-card"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="wa-card-left">
                <div className="wa-icon-glow">
                  <MessageSquare size={18} className="text-lime" />
                </div>
                <div className="wa-card-text">
                  <span className="wa-card-kicker">INSTANT CHAT CHANNEL</span>
                  <span className="wa-card-title">Message on WhatsApp</span>
                </div>
              </div>
              <ArrowUpRight size={18} className="wa-card-arrow" />
            </a>

            <div className="mobile-studio-meta-grid">
              <div className="meta-info-item">
                <span className="meta-info-title">ROLE // CAPABILITY</span>
                <p className="meta-info-val">{PERSONAL_INFO.role}</p>
              </div>
              <div className="meta-info-item">
                <span className="meta-info-title">STUDIO LOCATION</span>
                <p className="meta-info-val">{PERSONAL_INFO.location}</p>
              </div>
              <div className="meta-info-item full-width">
                <span className="meta-info-title">DIRECT INQUIRIES</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="meta-email-link">
                  <Mail size={13} className="text-lime" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background-color: rgba(16, 17, 15, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: background-color var(--transition-normal), backdrop-filter var(--transition-normal), border-color var(--transition-normal);
          border-bottom: 1px solid rgba(245, 243, 235, 0.06);
        }

        .navbar-scrolled {
          background-color: var(--bg-surface-translucent);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
        }

        .nav-is-open {
          background-color: rgba(16, 17, 15, 0.98) !important;
          border-bottom-color: var(--border-subtle) !important;
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          transition: height var(--transition-fast);
        }

        @media (max-width: 768px) {
          .navbar-container {
            height: 60px;
          }
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          position: relative;
          z-index: 1002;
        }

        .brand-monogram {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--text-primary);
        }

        .brand-badge {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 0.15rem 0.45rem;
          background: rgba(215, 255, 100, 0.12);
          border: 1px solid var(--accent-lime-border);
          color: var(--accent-lime);
          border-radius: var(--radius-xs);
        }

        .desktop-nav {
          display: none;
        }

        @media (min-width: 1024px) {
          .desktop-nav {
            display: block;
          }
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 1.85rem;
          list-style: none;
        }

        .nav-link {
          position: relative;
          font-family: var(--font-heading);
          font-size: 0.86rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--text-muted);
          padding: 0.4rem 0;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: color var(--transition-fast);
        }

        .nav-link:hover,
        .nav-link-active {
          color: var(--text-primary);
        }

        .active-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--accent-lime);
          display: inline-block;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
          z-index: 1002;
        }

        .nav-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 0.55rem 1.05rem;
          background-color: var(--accent-lime);
          color: var(--bg-primary);
          border-radius: var(--radius-xs);
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .cta-full-label {
          display: inline;
        }

        .cta-short-label {
          display: none;
        }

        @media (max-width: 540px) {
          .nav-actions {
            gap: 0.45rem;
          }
          .cta-full-label {
            display: none;
          }
          .cta-short-label {
            display: inline;
          }
          .nav-cta-btn {
            padding: 0.38rem 0.65rem;
            font-size: 0.74rem;
            gap: 0.3rem;
          }
          .brand-monogram {
            font-size: 1.15rem;
          }
          .brand-badge {
            font-size: 0.58rem;
            padding: 0.1rem 0.35rem;
          }
        }

        .nav-cta-btn:hover {
          background-color: var(--accent-lime-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(215, 255, 100, 0.25);
        }

        /* Creative Morphing Hamburger Button */
        .creative-menu-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.42rem 0.68rem;
          border-radius: var(--radius-xs);
          background: rgba(245, 243, 235, 0.04);
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
          user-select: none;
        }

        .creative-menu-toggle:hover {
          background: rgba(215, 255, 100, 0.08);
          border-color: var(--accent-lime-border);
          color: var(--accent-lime);
        }

        .toggle-active {
          background: rgba(215, 255, 100, 0.12);
          border-color: var(--accent-lime);
          color: var(--accent-lime);
        }

        .toggle-label-text {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        @media (max-width: 540px) {
          .toggle-label-text {
            display: none;
          }
          .creative-menu-toggle {
            padding: 0.45rem 0.55rem;
          }
          .brand-badge {
            display: none;
          }
        }

        .burger-icon-box {
          width: 20px;
          height: 14px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .burger-bar {
          width: 100%;
          height: 2px;
          background-color: currentColor;
          border-radius: 2px;
          transition: transform 0.3s var(--ease-out-expo), width 0.3s var(--ease-out-expo), opacity 0.2s ease;
          transform-origin: center;
        }

        .bar-btm {
          width: 65%;
          align-self: flex-end;
        }

        .creative-menu-toggle:hover .bar-btm {
          width: 100%;
        }

        .toggle-active .bar-top {
          transform: translateY(6px) rotate(45deg);
        }

        .toggle-active .bar-btm {
          width: 100%;
          transform: translateY(-6px) rotate(-45deg);
        }

        @media (min-width: 1024px) {
          .creative-menu-toggle {
            display: none;
          }
        }

        /* Fullscreen Trending Mobile Drawer */
        .mobile-creative-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          background: radial-gradient(circle at 90% 10%, rgba(215, 255, 100, 0.08) 0%, rgba(14, 15, 12, 0.985) 60%);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          z-index: 999;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding-top: 64px;
          padding-bottom: 1.5rem;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          transition: clip-path 0.45s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.3s ease, visibility 0.3s ease;
        }

        .drawer-open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        @media (min-width: 1024px) {
          .mobile-creative-drawer {
            display: none !important;
          }
        }

        .drawer-noise-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(215, 255, 100, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(215, 255, 100, 0.02) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .mobile-drawer-inner {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: calc(100dvh - 84px);
          position: relative;
          z-index: 1;
          gap: 1rem;
        }

        .mobile-meta-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 0.25rem;
        }

        .mobile-status-pill {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(215, 255, 100, 0.08);
          border: 1px solid var(--accent-lime-border);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
        }

        .radar-ping-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-lime);
          animation: radarPing 2s infinite ease-out;
        }

        .mobile-status-text {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-lime);
          text-transform: uppercase;
        }

        .studio-clock-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-heading);
          font-size: 0.65rem;
          color: var(--text-dim);
          font-variant-numeric: tabular-nums;
        }

        /* Staggered Navigation Links */
        .mobile-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .mobile-nav-item {
          opacity: 0;
          transform: translateY(24px);
        }

        .drawer-open .mobile-nav-item {
          animation: mobileLinkIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(var(--item-idx) * 0.04s + 0.06s);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.45rem 0;
          border-bottom: 1px solid rgba(245, 243, 235, 0.04);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .link-title-group {
          display: flex;
          align-items: baseline;
          gap: 0.65rem;
        }

        .mobile-index {
          font-family: var(--font-heading);
          font-size: 0.76rem;
          color: var(--accent-lime);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        .mobile-label {
          font-family: var(--font-heading);
          font-size: clamp(1.15rem, 4.2vw, 1.45rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          text-transform: uppercase;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .link-action-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .active-pill {
          font-family: var(--font-heading);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-lime);
          background: rgba(215, 255, 100, 0.12);
          border: 1px solid var(--accent-lime-border);
          padding: 0.12rem 0.4rem;
          border-radius: var(--radius-xs);
        }

        .mobile-arrow-icon {
          color: var(--text-dim);
          transition: transform 0.2s ease, color 0.2s ease;
          width: 17px;
          height: 17px;
        }

        .mobile-nav-link:hover .mobile-label,
        .mobile-active .mobile-label {
          color: var(--accent-lime);
          transform: translateX(4px);
        }

        .mobile-nav-link:hover .mobile-arrow-icon,
        .mobile-active .mobile-arrow-icon {
          color: var(--accent-lime);
          transform: translate(3px, -3px);
        }

        /* Drawer Footer */
        .mobile-drawer-footer {
          margin-top: auto;
          padding-top: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mobile-direct-wa-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #172214;
          border: 1px solid var(--accent-lime-border);
          padding: 0.65rem 0.95rem;
          border-radius: var(--radius-xs);
          transition: all 0.2s ease;
        }

        .mobile-direct-wa-card:hover {
          background: #1f301b;
          border-color: var(--accent-lime);
          transform: translateY(-2px);
        }

        .wa-card-left {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .wa-icon-glow {
          width: 30px;
          height: 30px;
          border-radius: var(--radius-xs);
          background: rgba(215, 255, 100, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .wa-card-text {
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
        }

        .wa-card-kicker {
          font-family: var(--font-heading);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          color: var(--accent-lime);
          font-weight: 600;
        }

        .wa-card-title {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: #FFF;
        }

        .wa-card-arrow {
          color: var(--accent-lime);
          transition: transform 0.2s ease;
          width: 16px;
          height: 16px;
        }

        .mobile-direct-wa-card:hover .wa-card-arrow {
          transform: translate(3px, -3px);
        }

        .mobile-studio-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.55rem;
          padding-top: 0.55rem;
          border-top: 1px solid var(--border-subtle);
        }

        .meta-info-item {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .meta-info-item.full-width {
          grid-column: span 2;
        }

        .meta-info-title {
          font-family: var(--font-heading);
          font-size: 0.54rem;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .meta-info-val {
          font-size: 0.72rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        .meta-email-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--accent-lime);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
          gap: 0.15rem;
        }

        .meta-info-item.full-width {
          grid-column: span 2;
        }

        .meta-info-title {
          font-family: var(--font-heading);
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .meta-info-val {
          font-size: 0.76rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .meta-email-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent-lime);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
    </header>
  );
};
