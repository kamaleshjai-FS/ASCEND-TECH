import React, { useState } from 'react';
import { PROCESS_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="process" className="section-wrapper process-section" aria-label="Work Methodology and Process">
      <div className="container" ref={sectionRef}>
        {/* Section Header */}
        <div className="section-meta reveal-init delay-50">
          <span className="section-meta-num">06</span>
          <span className="section-meta-line" aria-hidden="true"></span>
          <span>METHODOLOGY</span>
        </div>

        <div className="process-header-row reveal-init delay-100">
          <h2 className="section-title">
            FROM FIRST THOUGHT <span className="highlight-lime">TO FINAL LAUNCH.</span>
          </h2>
          <p className="section-subtitle">
            A battle-tested 4-stage engagement framework ensuring design integrity,
            predictable communication, and on-time delivery.
          </p>
        </div>

        {/* Process Steps: Desktop Horizontal Timeline / Mobile Vertical Cards */}
        <div className="process-timeline-layout reveal-stagger">
          {PROCESS_DATA.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.step}
                className={`timeline-step-card ${isActive ? 'step-active' : ''}`}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStep(idx);
                  }
                }}
                aria-label={`Step ${step.step}: ${step.title}`}
              >
                {/* Step Top Bar */}
                <div className="step-card-header">
                  <span className="step-number">{step.step}</span>
                  <span className="step-duration">{step.duration}</span>
                </div>

                <div className="step-main">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-summary">{step.summary}</p>
                </div>

                {/* Expanded Details */}
                <div className="step-expanded-details">
                  <p className="step-description">{step.description}</p>
                  
                  <div className="step-checklist">
                    <span className="checklist-kicker">STAGE DELIVERABLES:</span>
                    {step.checklist.map((item, cIdx) => (
                      <div key={cIdx} className="checklist-item">
                        <CheckCircle2 size={13} className="text-lime" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="step-progress-indicator">
                  <div className="progress-bar-fill"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .process-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .process-header-row {
          margin-bottom: 2.25rem;
        }

        /* Timeline Layout */
        .process-timeline-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 600px) and (max-width: 991px) {
          .process-timeline-layout {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }

        @media (min-width: 992px) {
          .process-timeline-layout {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.15rem;
          }
        }

        .timeline-step-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.65rem 1.4rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform var(--transition-normal), border-color var(--transition-normal), background var(--transition-normal);
        }

        .timeline-step-card:hover,
        .step-active {
          border-color: var(--accent-lime-border);
          background: var(--bg-surface-elevated);
          transform: translateY(-4px);
        }

        .step-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .step-number {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--text-dim);
          letter-spacing: -0.03em;
          transition: color var(--transition-fast);
        }

        .step-active .step-number,
        .timeline-step-card:hover .step-number {
          color: var(--accent-lime);
        }

        .step-duration {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: var(--accent-lime);
          background: rgba(215, 255, 100, 0.08);
          border: 1px solid var(--accent-lime-border);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-xs);
        }

        .step-title {
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .step-summary {
          font-size: 0.88rem;
          color: var(--text-primary);
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }

        .step-description {
          font-size: 0.84rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .step-checklist {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }

        .checklist-kicker {
          font-family: var(--font-heading);
          font-size: 0.64rem;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          margin-bottom: 0.25rem;
        }

        .checklist-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .step-progress-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(245, 243, 235, 0.05);
        }

        .step-active .progress-bar-fill {
          width: 100%;
          height: 100%;
          background: var(--accent-lime);
          box-shadow: 0 0 10px var(--accent-lime);
        }

        @media (max-width: 640px) {
          .timeline-step-card {
            padding: 1.15rem 1rem;
          }
          .step-card-header {
            margin-bottom: 0.85rem;
          }
          .step-number {
            font-size: 1.45rem;
          }
          .step-title {
            font-size: 1.05rem;
            margin-bottom: 0.35rem;
          }
          .step-summary {
            font-size: 0.82rem;
            margin-bottom: 0.85rem;
          }
          .step-description {
            font-size: 0.78rem;
            line-height: 1.5;
            margin-bottom: 0.85rem;
          }
          .step-checklist {
            gap: 0.35rem;
            padding-top: 0.75rem;
          }
          .checklist-item {
            font-size: 0.74rem;
          }
        }
      `}</style>
    </section>
  );
};
