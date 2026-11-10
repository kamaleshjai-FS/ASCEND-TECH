import React, { useState } from 'react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { getWhatsAppUrl, PERSONAL_INFO } from '../config';

export const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside className="whatsapp-floating-widget" aria-label="WhatsApp Quick Contact">
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Direct WhatsApp Message to Alex Rivera"
      >
        <span className="pulse-indicator float-pulse" aria-hidden="true"></span>
        <div className="wa-icon-wrapper">
          <MessageSquare size={20} className="wa-icon" />
        </div>

        <div className={`wa-expand-pill ${isHovered ? 'pill-expanded' : ''}`}>
          <span className="wa-text-label">Chat with Me</span>
          <ArrowUpRight size={14} className="wa-arrow" />
        </div>
      </a>

      <style>{`
        .whatsapp-floating-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 990;
        }

        .whatsapp-float-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: #182315;
          border: 1px solid var(--accent-lime-border);
          padding: 0.65rem 0.95rem;
          border-radius: var(--radius-full);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
          color: var(--accent-lime);
          transition: transform var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);
        }

        .whatsapp-float-btn:hover {
          transform: translateY(-3px) scale(1.02);
          background: #21321d;
          border-color: var(--accent-lime);
          box-shadow: 0 10px 35px rgba(215, 255, 100, 0.25);
        }

        .float-pulse {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 9px;
          height: 9px;
        }

        .wa-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wa-icon {
          color: var(--accent-lime);
        }

        .wa-expand-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .wa-arrow {
          transition: transform var(--transition-fast);
        }

        .whatsapp-float-btn:hover .wa-arrow {
          transform: translate(2px, -2px);
        }

        @media (max-width: 600px) {
          .whatsapp-floating-widget {
            bottom: 18px;
            right: 18px;
          }
          .wa-text-label {
            display: none;
          }
          .whatsapp-float-btn {
            padding: 0.8rem;
            border-radius: 50%;
          }
          .wa-expand-pill {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
};
