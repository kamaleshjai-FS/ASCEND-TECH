import React from 'react';
import { TRUST_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';

export const TrustSection = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="trust" className="section-wrapper trust-section" aria-label="Trust and Collaboration Ethics">
      <div className="container" ref={sectionRef}>
        {/* Section Header */}
        <div className="section-meta reveal-init delay-50">
          <span className="section-meta-num">07</span>
          <span className="section-meta-line" aria-hidden="true"></span>
          <span>WORKING ETHOS</span>
        </div>

        <div className="trust-header-row reveal-init delay-100">
          <h2 className="section-title">
            GOOD WORK STARTS WITH <span className="highlight-lime">GOOD COLLABORATION.</span>
          </h2>
          <p className="section-subtitle">
            {TRUST_DATA.subheading}
          </p>
        </div>

        {/* 4 Guiding Principles Grid */}
        <div className="trust-grid reveal-init delay-200">
          {TRUST_DATA.principles.map((item, idx) => (
            <div key={item.number} className="trust-card">
              <div className="trust-card-top">
                <span className="trust-number">{item.number}</span>
                <ShieldCheck size={18} className="text-lime" />
              </div>

              <h3 className="trust-title">{item.title}</h3>
              <p className="trust-text">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Minimal Collaboration Banner */}
        <div className="collaboration-statement-banner reveal-init delay-300">
          <HeartHandshake size={20} className="text-lime" />
          <div className="banner-text">
            <strong>Genuine Partnership Pledge:</strong> When we work together, you deal directly with the builder
            and designer. No middle management, no outsourced handoffs, and no hidden surprises.
          </div>
        </div>
      </div>

      <style>{`
        .trust-section {
          background-color: var(--bg-primary);
          position: relative;
        }

        .trust-header-row {
          margin-bottom: 2.25rem;
        }

        .trust-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 1.75rem;
        }

        @media (min-width: 640px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .trust-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .trust-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.75rem 1.4rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 0.75rem;
          transition: border-color var(--transition-fast), transform var(--transition-fast);
        }

        .trust-card:hover {
          border-color: var(--accent-lime-border);
          transform: translateY(-3px);
        }

        .trust-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .trust-number {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent-lime);
        }

        .trust-title {
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .trust-text {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .collaboration-statement-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(215, 255, 100, 0.04);
          border: 1px solid var(--accent-lime-border);
          border-radius: var(--radius-sm);
          padding: 1.25rem 1.75rem;
        }

        .banner-text {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
        }

        .banner-text strong {
          color: var(--text-primary);
        }

        @media (max-width: 640px) {
          .trust-card {
            padding: 1.15rem 1rem;
            gap: 0.45rem;
          }
          .trust-title {
            font-size: 0.95rem;
          }
          .trust-text {
            font-size: 0.8rem;
            line-height: 1.5;
          }
          .collaboration-statement-banner {
            padding: 1rem;
            gap: 0.65rem;
            flex-direction: column;
            align-items: flex-start;
          }
          .banner-text {
            font-size: 0.8rem;
            line-height: 1.5;
          }
        }
      `}</style>
    </section>
  );
};
