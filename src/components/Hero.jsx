import React from 'react';
import { ArrowDownRight, ArrowUpRight, Sparkles, MapPin, Compass } from 'lucide-react';
import { PERSONAL_INFO, getWhatsAppUrl } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Hero = () => {
  const sectionRef = useScrollReveal({ threshold: 0.05 });

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      const headerOffset = window.innerWidth < 768 ? 64 : 76;
      const offsetTop = projectsEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      if (window.history.pushState) {
        window.history.pushState(null, '', '#projects');
      }
    }
  };

  return (
    <section id="hero" className="hero-section" aria-label="Introduction and Overview">
      <div className="editorial-grid-bg" aria-hidden="true" />

      <div className="container hero-container" ref={sectionRef}>
        {/* Top Editorial Status Row */}
        <div className="hero-status-row reveal-init delay-50">
          <div className="status-badge-item">
            <span className="pulse-indicator" aria-hidden="true"></span>
            <span className="status-badge-text">{PERSONAL_INFO.availability}</span>
          </div>

          <div className="location-badge-item">
            <MapPin size={13} className="text-lime" aria-hidden="true" />
            <span>{PERSONAL_INFO.location}</span>
            <span className="location-coords">({PERSONAL_INFO.coordinates})</span>
          </div>
        </div>

        {/* Main Content Layout (Editorial Asymmetric Split) */}
        <div className="hero-main-layout">
          <div className="hero-text-content">
            {/* Small Introductory Label */}
            <div className="hero-kicker reveal-init delay-100">
              <span className="kicker-line" aria-hidden="true"></span>
              <p className="kicker-text">{PERSONAL_INFO.introLabel}</p>
            </div>

            {/* Oversized Multiline Animated Headline */}
            <h1 className="hero-headline reveal-init delay-150">
             HIGH-ROI ADS  <span className="highlight-lime">& CUSTOM WEB DEVELOPMENT </span> THAT{' '}
              <span className="stroke-text">ACQUIRE CLIENTS.</span>
            </h1>

            {/* Supporting Description */}
            <p className="hero-description reveal-init delay-200">
              I engineer <strong>100% custom websites tailored strictly to your client requirements & business needs</strong> — and
              deploy <strong>targeted Meta & Google ad campaigns</strong> that make your products visible and generate consistent,
              qualified leads and paying customers.
            </p>

            {/* CTAs */}
            <div className="hero-cta-group reveal-init delay-250">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="btn-primary hero-btn-primary"
                aria-label="Explore Selected Work"
              >
                <span>Explore My Work</span>
                <ArrowDownRight size={17} strokeWidth={2.4} className="hero-btn-arrow" />
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary hero-btn-secondary"
                aria-label="Connect via WhatsApp"
              >
                <span>Let's Connect</span>
                <ArrowUpRight size={17} strokeWidth={2.4} className="hero-btn-arrow" />
              </a>
            </div>
          </div>

          {/* Right Column: Custom CSS / SVG Graphic & Editorial Badges */}
          <div className="hero-visual-column reveal-scale-init delay-300">
            <div className="hero-visual-card">
              <div className="orbital-ring anim-orbit" aria-hidden="true">
                <div className="ring-planet"></div>
              </div>

              {/* Central Geometric Badge */}
              <div className="badge-centerpiece">
                <div className="badge-header">
                  <span className="badge-code">[Digital Strategist // 01]</span>
                  <Sparkles size={14} className="text-lime" />
                </div>
                
                <div className="badge-body">
                  <div className="spec-row">
                    <span className="spec-label">CORE CRAFT</span>
                    <span className="spec-value"> Paid Media & Conversion Optimization</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">STRATEGY</span>
                    <span className="spec-value">Data-Driven Growth & Audience Engagement</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">ESTHETICS</span>
                    <span className="spec-value">Visual Branding & Creative Direction</span>
                  </div>
                </div>

                <div className="badge-footer">
                  <Compass size={13} className="text-lime" />
                  <span>PRECISION ARCHITECTURE</span>
                </div>
              </div>

              {/* Floating Mini-Card */}
              <div className="hero-floating-pill anim-float">
                <span className="pill-dot"></span>
                <span className="pill-text">100% Direct Developer Collaboration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Bar: Vertical Scroll Indicator & Working Status */}
        <div className="hero-footer-bar reveal-init delay-300">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="scroll-indicator"
            aria-label="Scroll down to projects"
          >
            <div className="scroll-track">
              <div className="scroll-thumb"></div>
            </div>
            <span className="scroll-text">SCROLL TO DISCOVER</span>
          </a>

          <div className="hero-status-tag">
            <span className="tag-bracket">[</span>
            <span className="tag-content">{PERSONAL_INFO.statusBadge}</span>
            <span className="tag-bracket">]</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: center;
          padding-top: 88px;
          padding-bottom: 2rem;
          overflow: hidden;
          background: radial-gradient(circle at 80% 20%, rgba(215, 255, 100, 0.04) 0%, transparent 60%);
        }

        .hero-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          gap: 1.5rem;
        }

        /* Top Status Row */
        .hero-status-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.85rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          font-family: var(--font-heading);
          font-size: var(--text-xs);
          letter-spacing: 0.05em;
        }

        .status-badge-item {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: rgba(215, 255, 100, 0.08);
          border: 1px solid var(--accent-lime-border);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          color: var(--accent-lime);
          font-weight: 600;
        }

        .location-badge-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--text-muted);
        }

        .location-coords {
          color: var(--text-dim);
          font-variant-numeric: tabular-nums;
        }

        .text-lime {
          color: var(--accent-lime);
        }

        /* Main Asymmetric Layout */
        .hero-main-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          padding: 1.5rem 0;
        }

        @media (min-width: 1024px) {
          .hero-main-layout {
            grid-template-columns: 1.25fr 0.75fr;
            gap: 3.5rem;
          }
        }

        .hero-text-content {
          max-width: 760px;
        }

        .hero-kicker {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1rem;
        }

        .kicker-line {
          width: 28px;
          height: 1px;
          background-color: var(--accent-lime);
        }

        .kicker-text {
          font-family: var(--font-heading);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-lime);
        }

        .hero-headline {
          font-size: var(--text-display);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          margin-bottom: 1.35rem;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .stroke-text {
          -webkit-text-stroke: 1px var(--text-primary);
          color: transparent;
          transition: color 0.3s ease, -webkit-text-stroke-color 0.3s ease;
          display: inline-block;
        }

        .stroke-text:hover {
          color: var(--text-primary);
          -webkit-text-stroke-color: var(--accent-lime);
        }

        .hero-description {
          font-size: var(--text-lg);
          color: var(--text-muted);
          max-width: 580px;
          line-height: 1.6;
          margin-bottom: 1.85rem;
        }

        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
        }

        .hero-btn-primary,
        .hero-btn-secondary {
          padding: 0.95rem 1.85rem;
          font-size: 0.9rem;
        }

        .hero-btn-arrow {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-btn-primary:hover .hero-btn-arrow {
          transform: translate(2px, 3px);
        }

        .hero-btn-secondary:hover .hero-btn-arrow {
          transform: translate(3px, -3px);
        }

        /* Hero Visual Column */
        .hero-visual-column {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-visual-card {
          position: relative;
          width: 100%;
          max-width: 360px;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbital-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px dashed rgba(215, 255, 100, 0.25);
          pointer-events: none;
        }

        .ring-planet {
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent-lime);
          box-shadow: 0 0 12px var(--accent-lime);
        }

        .badge-centerpiece {
          position: relative;
          z-index: 2;
          width: 86%;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          padding: 1.6rem;
          box-shadow: var(--shadow-elevated);
          transition: transform 0.35s var(--ease-out-expo), border-color 0.35s ease;
        }

        .badge-centerpiece:hover {
          transform: scale(1.02);
          border-color: var(--accent-lime-border);
        }

        .badge-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1.15rem;
        }

        .badge-code {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--accent-lime);
        }

        .badge-body {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.15rem;
        }

        .spec-row {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .spec-label {
          font-family: var(--font-heading);
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .spec-value {
          font-size: 0.86rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .badge-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-subtle);
          font-family: var(--font-heading);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .hero-floating-pill {
          position: absolute;
          bottom: -10px;
          right: -5px;
          z-index: 3;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--accent-lime-border);
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: var(--shadow-subtle);
          max-width: 90%;
        }

        .pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-lime);
          flex-shrink: 0;
        }

        .pill-text {
          font-size: 0.74rem;
          font-weight: 500;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Footer Bar */
        .hero-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        .scroll-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .scroll-indicator:hover {
          color: var(--accent-lime);
        }

        .scroll-track {
          width: 14px;
          height: 24px;
          border-radius: 10px;
          border: 1px solid var(--border-medium);
          position: relative;
          display: flex;
          justify-content: center;
          padding-top: 3px;
        }

        .scroll-thumb {
          width: 4px;
          height: 6px;
          border-radius: 2px;
          background-color: var(--accent-lime);
          animation: slideDown 1.8s infinite ease-in-out;
        }

        .scroll-text {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
        }

        .hero-status-tag {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--text-dim);
        }

        .tag-bracket {
          color: var(--accent-lime);
          margin: 0 0.2rem;
        }

        .tag-content {
          color: var(--text-muted);
        }

        /* Responsive Optimization */
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 84px;
            padding-bottom: 2rem;
            min-height: auto;
          }
          .hero-main-layout {
            gap: 2rem;
            padding: 0.75rem 0;
          }
          .hero-description {
            font-size: 0.92rem;
          }
        }

        @media (max-width: 640px) {
          .hero-status-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            padding-bottom: 0.85rem;
          }
          .hero-kicker {
            margin-bottom: 0.65rem;
          }
          .hero-headline {
            font-size: clamp(1.85rem, 8vw, 2.65rem);
            line-height: 1.08;
            margin-bottom: 0.95rem;
          }
          .hero-description {
            font-size: 0.86rem;
            line-height: 1.55;
            margin-bottom: 1.25rem;
          }
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            justify-content: center;
            padding: 0.8rem 1.4rem;
            font-size: 0.85rem;
          }
          .hero-visual-card {
            max-width: 270px;
            margin: 0 auto;
          }
          .badge-centerpiece {
            padding: 1rem;
            width: 92%;
          }
          .hero-floating-pill {
            right: 0;
            bottom: -15px;
          }
          .hero-footer-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
        }

        @media (max-width: 380px) {
          .hero-headline {
            font-size: 1.7rem;
          }
          .hero-floating-pill {
            display: none;
          }
          .hero-visual-card {
            max-width: 240px;
          }
        }
      `}</style>
    </section>
  );
};
