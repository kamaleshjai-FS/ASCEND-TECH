import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, Layers, Cpu, Compass } from 'lucide-react';
import { getWhatsAppUrl } from '../config';

export const CaseStudyModal = ({ project, onClose }) => {
  // Lock background scroll when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-meta">
            <span className="editorial-badge">{project.typeLabel}</span>
            <span className="modal-category">{project.category}</span>
            <span className="modal-year">{project.year}</span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Case Study Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-hero">
            <h2 id="modal-title" className="modal-title">{project.title}</h2>
            <p className="modal-tagline">{caseStudy.tagline}</p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="modal-metrics-grid">
            {project.metrics.map((metric, i) => (
              <div key={i} className="metric-box">
                <span className="metric-label">{metric.label}</span>
                <span className="metric-val">{metric.value}</span>
              </div>
            ))}
          </div>

          {/* Editorial Grid: Overview & Challenge */}
          <div className="modal-two-col">
            <div className="modal-col">
              <h3 className="col-heading">
                <Compass size={16} className="text-lime" />
                <span>The Brief & Intent</span>
              </h3>
              <p className="col-text">{caseStudy.overview}</p>
            </div>

            <div className="modal-col">
              <h3 className="col-heading">
                <Layers size={16} className="text-lime" />
                <span>The Core Challenge</span>
              </h3>
              <p className="col-text">{caseStudy.challenge}</p>
            </div>
          </div>

          {/* Strategic Solution */}
          <div className="solution-callout">
            <h3 className="col-heading">
              <Cpu size={16} className="text-lime" />
              <span>Strategic Implementation</span>
            </h3>
            <p className="col-text">{caseStudy.solution}</p>
          </div>

          {/* Deliverables List */}
          <div className="deliverables-block">
            <h3 className="col-heading">Key Concept Deliverables</h3>
            <ul className="deliverables-list">
              {caseStudy.deliverables.map((item, idx) => (
                <li key={idx} className="deliverable-item">
                  <CheckCircle2 size={16} className="deliverable-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech & Tooling Tags */}
          <div className="modal-tech-stack">
            <h4 className="tech-heading">METHODOLOGY & TOOLS</h4>
            <div className="tech-tag-row">
              {caseStudy.technologies.map((t, idx) => (
                <span key={idx} className="category-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <p className="modal-disclaimer">
            * Featured case study & client architecture. Direct inquiries via WhatsApp.
          </p>
          <a
            href={getWhatsAppUrl(`Hi Alex! I'm interested in discussing a project similar to ${project.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary modal-action-btn"
          >
            <span>Inquire About Similar Work</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(16, 17, 15, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.25s ease-out;
        }

        .modal-sheet {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-elevated);
          display: flex;
          flex-direction: column;
          animation: slideUp 0.35s var(--ease-out-expo);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          background-color: var(--bg-surface);
          z-index: 10;
        }

        .modal-meta {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--font-heading);
          font-size: 0.8rem;
        }

        .modal-category {
          color: var(--text-muted);
        }

        .modal-year {
          color: var(--text-dim);
        }

        .modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(245, 243, 235, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          background: rgba(215, 255, 100, 0.15);
          border-color: var(--accent-lime);
          color: var(--accent-lime);
        }

        .modal-body {
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .modal-hero {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .modal-title {
          font-size: var(--text-2xl);
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }

        .modal-tagline {
          font-size: var(--text-base);
          color: var(--accent-lime);
          font-family: var(--font-heading);
          font-weight: 500;
        }

        .modal-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          background: rgba(245, 243, 235, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          padding: 1.25rem;
        }

        .metric-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .metric-label {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .metric-val {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .modal-two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }

        @media (min-width: 680px) {
          .modal-two-col {
            grid-template-columns: 1fr 1fr;
          }
        }

        .col-heading {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.05rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .col-text {
          font-size: 0.92rem;
          line-height: 1.65;
          color: var(--text-muted);
        }

        .solution-callout {
          background: rgba(215, 255, 100, 0.04);
          border-left: 3px solid var(--accent-lime);
          padding: 1.5rem;
          border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
        }

        .deliverables-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-top: 0.85rem;
        }

        .deliverable-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .deliverable-check {
          color: var(--accent-lime);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .modal-tech-stack {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }

        .tech-heading {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: var(--text-dim);
        }

        .tech-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .modal-footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.5rem 2rem;
          border-top: 1px solid var(--border-subtle);
          background-color: var(--bg-surface-elevated);
        }

        .modal-disclaimer {
          font-size: 0.75rem;
          color: var(--text-dim);
          max-width: 420px;
        }

        @media (max-width: 640px) {
          .modal-backdrop {
            padding: 0.4rem;
          }
          .modal-sheet {
            max-height: 94dvh;
            border-radius: var(--radius-sm);
          }
          .modal-header {
            padding: 1rem 1.15rem;
          }
          .modal-body {
            padding: 1.25rem 1.15rem;
            gap: 1.35rem;
          }
          .modal-footer {
            padding: 1.15rem;
            flex-direction: column;
            align-items: stretch;
          }
          .modal-action-btn {
            width: 100%;
            justify-content: center;
          }
          .modal-metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
