import React from 'react';
import { ArrowUp, ArrowUpRight, MessageSquare, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS, getWhatsAppUrl } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getSocialIcon = (name) => {
    switch (name) {
      case 'GitHub':
        return <Github size={16} />;
      case 'LinkedIn':
        return <Linkedin size={16} />;
      case 'Instagram':
        return <Instagram size={16} />;
      case 'Email':
      default:
        return <Mail size={16} />;
    }
  };

  return (
    <footer className="editorial-footer" role="contentinfo">
      {/* Background Subtle Grid */}
      <div className="editorial-grid-bg" aria-hidden="true" />

      <div className="container footer-container" ref={sectionRef}>
        {/* Top Massive Typographic Closing Banner */}
        <div className="footer-closing-hero reveal-init delay-100">
          <span className="closing-kicker">START A CONVERSATION</span>
          <h2 className="closing-headline">
            HAVE AN IDEA? <br />
            <span className="highlight-lime">LET'S MAKE IT REAL.</span>
          </h2>

          <div className="footer-cta-row">
            <a
              href={getWhatsAppUrl("Hi Ascend Tech! I'd like to talk about collaborating on a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary footer-cta-btn"
            >
              <MessageSquare size={17} />
              <span>Let's Talk On WhatsApp</span>
              <ArrowUpRight size={17} />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn-secondary footer-cta-btn"
            >
              <Mail size={17} />
              <span>Send An Email</span>
            </a>
          </div>
        </div>

        {/* Middle Navigation & Social Grid */}
        <div className="footer-middle-grid reveal-init delay-200">
          <div className="footer-col brand-col">
            <div className="brand-lockup">
              <span className="brand-monogram">{PERSONAL_INFO.monogram}</span>
              <span className="brand-full">{PERSONAL_INFO.brandName}</span>
            </div>
            <p className="footer-tagline">
              Crafting distinct, high-impact digital products and creative marketing systems.
            </p>
            <div className="footer-location-tag">
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          <div className="footer-col social-col">
            <h4 className="footer-col-title">DIRECT NETWORKS</h4>
            <ul className="social-links-list">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-nav-link"
                    aria-label={`Visit ${link.name} Profile`}
                  >
                    <span className="social-icon">{getSocialIcon(link.name)}</span>
                    <span className="social-label">{link.name}</span>
                    <ArrowUpRight size={14} className="social-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col ethos-col">
            <h4 className="footer-col-title">CREATIVE DISCIPLINE</h4>
            <p className="ethos-text">
              Zero bloat. Semantic accessibility. Typography-first architecture. Designed and engineered
              with genuine respect for the human on the other side of the screen.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top Button */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            <span>© {currentYear} {PERSONAL_INFO.name}. All rights reserved.</span>
            <span className="collab-tag">Crafted with React, Vite & Modern CSS</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Back to top of the page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .editorial-footer {
          position: relative;
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-subtle);
          padding-top: clamp(2.75rem, 5vw, 4rem);
          padding-bottom: 2rem;
          overflow: hidden;
        }

        .footer-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        /* Closing Hero */
        .footer-closing-hero {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-bottom: 2.25rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .closing-kicker {
          font-family: var(--font-heading);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.16em;
          color: var(--accent-lime);
        }

        .closing-headline {
          font-size: var(--text-4xl);
          line-height: 1.02;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }

        .footer-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          margin-top: 0.5rem;
        }

        .footer-cta-btn {
          padding: 0.95rem 1.65rem;
        }

        /* Middle Grid */
        .footer-middle-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        @media (min-width: 768px) {
          .footer-middle-grid {
            grid-template-columns: 1.25fr 1fr 1fr;
            gap: 2.5rem;
          }
        }

        .footer-col-title {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          color: var(--accent-lime);
          margin-bottom: 1.25rem;
        }

        .brand-lockup {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.75rem;
        }

        .brand-monogram {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .brand-full {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--text-dim);
        }

        .footer-tagline {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .footer-location-tag {
          font-size: 0.78rem;
          color: var(--text-dim);
        }

        .social-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .social-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.88rem;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .social-nav-link:hover {
          color: var(--accent-lime);
        }

        .social-arrow {
          opacity: 0.4;
          transition: transform var(--transition-fast), opacity var(--transition-fast);
        }

        .social-nav-link:hover .social-arrow {
          opacity: 1;
          transform: translate(2px, -2px);
        }

        .ethos-text {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.65;
        }

        /* Bottom Bar */
        .footer-bottom-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          font-size: 0.78rem;
          color: var(--text-dim);
        }

        .footer-copyright {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.25rem;
        }

        .collab-tag {
          color: var(--text-dim);
          border-left: 1px solid var(--border-subtle);
          padding-left: 1.25rem;
        }

        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-subtle);
          background: rgba(245, 243, 235, 0.03);
          transition: all var(--transition-fast);
        }

        .back-to-top-btn:hover {
          background: rgba(215, 255, 100, 0.1);
          border-color: var(--accent-lime);
          color: var(--accent-lime);
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .footer-closing-hero {
            gap: 0.85rem;
            padding-bottom: 1.75rem;
          }
          .closing-headline {
            font-size: clamp(1.45rem, 6.5vw, 2.1rem);
          }
          .footer-cta-row {
            flex-direction: column;
            width: 100%;
          }
          .footer-cta-btn {
            width: 100%;
            justify-content: center;
            padding: 0.75rem 1.15rem;
            font-size: 0.82rem;
          }
          .footer-middle-grid {
            gap: 1.5rem;
            padding-bottom: 1.5rem;
          }
          .collab-tag {
            border-left: none;
            padding-left: 0;
            width: 100%;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .back-to-top-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};
