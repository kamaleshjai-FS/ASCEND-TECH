import React from 'react';
import { SERVICES_DATA, ENGAGEMENT_MODELS } from '../data/portfolioData';
import { WHATSAPP_CONFIG, getWhatsAppUrl } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Code2, Layout, Megaphone, Sparkles, ArrowUpRight, CheckCircle2, Clock, Zap } from 'lucide-react';

export const Services = () => {
  const sectionRef = useScrollReveal({ threshold: 0.05 });

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 size={24} className="text-lime" />;
      case 'Layout':
        return <Layout size={24} className="text-lime" />;
      case 'Megaphone':
        return <Megaphone size={24} className="text-lime" />;
      case 'Sparkles':
      default:
        return <Sparkles size={24} className="text-lime" />;
    }
  };

  return (
    <section id="services" className="section-wrapper services-section" aria-label="Services and Offerings">
      <div className="container" ref={sectionRef}>
        {/* Section Header */}
        <div className="section-meta reveal-init delay-50">
          <span className="section-meta-num">05</span>
          <span className="section-meta-line" aria-hidden="true"></span>
          <span>CAPABILITY & ENGAGEMENT SCOPES</span>
        </div>

        <div className="services-header-row reveal-init delay-100">
          <h2 className="section-title">
            WHAT I CAN <span className="highlight-lime">HELP YOU BUILD.</span>
          </h2>
          <p className="section-subtitle">
            Tailored creative engineering and digital marketing engagements designed to solve real business hurdles,
            from high-performance web applications to omnichannel growth strategies.
          </p>
        </div>

        {/* 4 Primary Service Offerings Grid */}
        <div className="services-grid reveal-stagger">
          {SERVICES_DATA.map((service, idx) => {
            const serviceMessage =
              WHATSAPP_CONFIG.serviceMessages[service.serviceKey] ||
              `Hi Ascend Tech! I'd like to discuss ${service.title}.`;

            return (
              <div 
                key={service.number} 
                className="service-card reveal-init"
                style={{ transitionDelay: `${idx * 100 + 150}ms` }}
              >
                <div className="service-card-top">
                  <span className="service-number">{service.number}</span>
                  <div className="service-icon-box">{getIcon(service.icon)}</div>
                </div>

                <div className="service-main-content">
                  <div className="service-timeline-badge">
                    <Clock size={12} className="text-lime" />
                    <span>Typical Cadence: {service.typicalTimeline}</span>
                  </div>

                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-short-desc">{service.shortDescription}</p>
                  <p className="service-details">{service.details}</p>

                  <div className="service-deliverables">
                    <span className="deliverables-kicker">KEY DELIVERABLES:</span>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="service-deliverable-item">
                        <CheckCircle2 size={14} className="text-lime flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Action CTA */}
                <div className="service-action-row">
                  <a
                    href={getWhatsAppUrl(serviceMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-discuss-link"
                    aria-label={`Discuss ${service.title} on WhatsApp`}
                  >
                    <span>Discuss Your Project</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engagement Models & Pricing Tiers */}
        <div className="engagement-models-section reveal-init delay-250">
          <div className="engagement-header">
            <div className="engagement-meta">
              <Zap size={15} className="text-lime" />
              <span>ENGAGEMENT FRAMEWORKS</span>
            </div>
            <h3 className="engagement-title">HOW WE CAN COLLABORATE</h3>
            <p className="engagement-sub">
              Predictable, transparent working arrangements tailored to your project scope and launch urgency.
            </p>
          </div>

          <div className="engagement-grid reveal-stagger">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <div
                key={idx}
                className={`engagement-card ${model.recommended ? 'engagement-recommended' : ''}`}
              >
                {model.recommended && (
                  <span className="recommended-badge">RECOMMENDED MODEL</span>
                )}

                <div className="model-top">
                  <span className="model-tier">{model.tier}</span>
                  <span className="model-duration">{model.duration}</span>
                </div>

                <p className="model-ideal"><strong>Ideal for:</strong> {model.idealFor}</p>
                <p className="model-summary">{model.summary}</p>

                <ul className="model-features">
                  {model.features.map((feat, fIdx) => (
                    <li key={fIdx} className="feature-item">
                      <CheckCircle2 size={14} className="text-lime flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppUrl(`Hi Ascend Tech! I'm interested in the ${model.tier} (${model.duration}) engagement model.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={model.recommended ? 'btn-primary model-btn' : 'btn-secondary model-btn'}
                >
                  <span>Select {model.tier}</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .services-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .services-header-row {
          margin-bottom: 2.25rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
          margin-bottom: 3.5rem;
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .service-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
        }

        .service-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-lime-border);
          box-shadow: var(--shadow-elevated);
        }

        .service-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.15rem;
        }

        .service-number {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-dim);
          letter-spacing: -0.02em;
        }

        .service-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-xs);
          background: rgba(215, 255, 100, 0.08);
          border: 1px solid var(--accent-lime-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-timeline-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          color: var(--text-dim);
          margin-bottom: 0.65rem;
        }

        .service-title {
          font-size: 1.3rem;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
        }

        .service-short-desc {
          font-size: 0.94rem;
          font-weight: 500;
          color: var(--accent-lime);
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .service-details {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .service-deliverables {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }

        .deliverables-kicker {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          margin-bottom: 0.2rem;
        }

        .service-deliverable-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--text-primary);
        }

        .service-action-row {
          padding-top: 1.15rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }

        .service-discuss-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-heading);
          font-size: 0.84rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--accent-lime);
          transition: gap var(--transition-fast);
        }

        .service-discuss-link:hover {
          gap: 0.65rem;
          color: var(--accent-lime-hover);
        }

        /* Engagement Models */
        .engagement-models-section {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 2.25rem 2rem;
        }

        .engagement-header {
          max-width: 650px;
          margin-bottom: 2rem;
        }

        .engagement-meta {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: var(--accent-lime);
          margin-bottom: 0.5rem;
        }

        .engagement-title {
          font-size: 1.4rem;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 0.45rem;
        }

        .engagement-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .engagement-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 680px) and (max-width: 991px) {
          .engagement-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) {
          .engagement-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .engagement-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.85rem 1.6rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          transition: border-color var(--transition-fast), transform var(--transition-fast);
        }

        .engagement-recommended {
          border-color: var(--accent-lime);
          background: radial-gradient(circle at top right, rgba(215, 255, 100, 0.06) 0%, var(--bg-secondary) 80%);
        }

        .recommended-badge {
          position: absolute;
          top: -11px;
          left: 1.5rem;
          background: var(--accent-lime);
          color: var(--bg-primary);
          font-family: var(--font-heading);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-xs);
        }

        .model-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .model-tier {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .model-duration {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          color: var(--accent-lime);
          font-weight: 600;
          background: rgba(215, 255, 100, 0.08);
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-xs);
        }

        .model-ideal {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.65rem;
          line-height: 1.45;
        }

        .model-ideal strong {
          color: var(--text-primary);
        }

        .model-summary {
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.25rem;
        }

        .model-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-bottom: 1.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .model-btn {
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .service-card {
            padding: 1.25rem 1rem;
          }
          .service-number {
            font-size: 1.25rem;
          }
          .service-icon-box {
            width: 38px;
            height: 38px;
          }
          .service-title {
            font-size: 1.1rem;
            margin-bottom: 0.45rem;
          }
          .service-short-desc {
            font-size: 0.84rem;
            line-height: 1.45;
            margin-bottom: 0.55rem;
          }
          .service-details {
            font-size: 0.8rem;
            line-height: 1.5;
            margin-bottom: 0.85rem;
          }
          .service-deliverables {
            gap: 0.35rem;
            margin-bottom: 1rem;
            padding-top: 0.75rem;
          }
          .service-deliverable-item {
            font-size: 0.76rem;
          }
          .service-action-row {
            padding-top: 0.85rem;
          }
          .service-discuss-link {
            font-size: 0.8rem;
          }
          .engagement-models-section {
            padding: 1.35rem 1rem;
            border-radius: var(--radius-md);
          }
          .engagement-title {
            font-size: 1.15rem;
          }
          .engagement-sub {
            font-size: 0.82rem;
          }
          .engagement-card {
            padding: 1.25rem 1rem;
          }
          .model-tier {
            font-size: 1rem;
          }
          .model-ideal {
            font-size: 0.76rem;
          }
          .model-summary {
            font-size: 0.8rem;
            line-height: 1.45;
            margin-bottom: 0.85rem;
          }
          .model-features {
            gap: 0.4rem;
            margin-bottom: 1.15rem;
            padding-top: 0.75rem;
          }
          .feature-item {
            font-size: 0.76rem;
          }
          .model-btn {
            font-size: 0.8rem;
            padding: 0.65rem 1rem;
          }
        }
      `}</style>
    </section>
  );
};
