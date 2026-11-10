import React, { useState } from 'react';
import { Download, ArrowUpRight, Sparkles, Briefcase, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, getWhatsAppUrl } from '../config';
import { CAREER_TIMELINE, CORE_SUPERPOWERS, EDUCATION_CREDENTIALS, STUDIO_METRICS } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const About = () => {
  const sectionRef = useScrollReveal({ threshold: 0.05 });
  const [activeTab, setActiveTab] = useState('story'); // 'story' | 'timeline' | 'credentials'

  return (
    <section id="about" className="section-wrapper about-section" aria-label="About Me and Professional Background">
      <div className="container" ref={sectionRef}>
        {/* Section Header Meta */}
        <div className="section-meta reveal-init delay-50">
          <span className="section-meta-num">03</span>
          <span className="section-meta-line" aria-hidden="true"></span>
          <span>THE PHILOSOPHY & BACKGROUND</span>
        </div>

        <h2 className="section-title reveal-init delay-100">
          PART DESIGNER'S MIND. <span className="highlight-lime">PART DEVELOPER'S LOGIC.</span>
        </h2>

        {/* Studio Metrics Counter Strip */}
        <div className="about-metrics-strip reveal-init delay-150">
          {STUDIO_METRICS.map((stat, i) => (
            <div key={i} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-detail">{stat.detail}</span>
            </div>
          ))}
        </div>

        {/* Editorial Sub-Navigation */}
        <div className="about-subnav-row reveal-init delay-200" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'story'}
            className={`subnav-pill ${activeTab === 'story' ? 'subnav-active' : ''}`}
            onClick={() => setActiveTab('story')}
          >
            <span>01. Core Story & Philosophy</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'timeline'}
            className={`subnav-pill ${activeTab === 'timeline' ? 'subnav-active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <Briefcase size={14} />
            <span>02. Career Journey & Experience</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'credentials'}
            className={`subnav-pill ${activeTab === 'credentials' ? 'subnav-active' : ''}`}
            onClick={() => setActiveTab('credentials')}
          >
            <GraduationCap size={14} />
            <span>03. Education & Certifications</span>
          </button>
        </div>

        {/* Tab 1: Core Story & Layout */}
        {activeTab === 'story' && (
          <div className="about-editorial-grid fade-in">
            {/* Left Column: Sticky Portrait Frame & Typographic Statement */}
            <div className="about-left-col">
              <div className="portrait-frame">
                <div className="portrait-inner">
                  <div className="monogram-grid-lines" aria-hidden="true"></div>
                  <span className="monogram-large">{PERSONAL_INFO.monogram}</span>
                  <div className="portrait-corner-tag">
                    <span>ASCEND TECH  // VERIFIED</span>
                  </div>
                </div>
                <div className="frame-caption">
                  <span className="caption-dot"></span>
                  <span>{PERSONAL_INFO.name} — {PERSONAL_INFO.role}</span>
                </div>
              </div>

              <blockquote className="editorial-statement">
                "Code is poetry when design gives it rhythm, and marketing gives it purpose."
              </blockquote>

              <div className="signature-block">
                <svg className="signature-svg" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 40C30 15 45 48 70 25C95 5 110 50 140 28C160 12 185 35 190 32"
                    stroke="var(--accent-lime)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="195" cy="32" r="3" fill="var(--accent-lime)" />
                </svg>
                <span className="signature-caption">Digital Verification & Signature</span>
              </div>
            </div>

            {/* Right Column: Narrative, Superpowers & Actions */}
            <div className="about-right-col">
              <div className="narrative-body">
                <p className="narrative-lead">
                  Hello. I’m <strong className="text-primary">{PERSONAL_INFO.name}</strong>, a{' '}
                  <span className="highlight-lime">{PERSONAL_INFO.role}</span> based in {PERSONAL_INFO.location}.
                  I bridge custom code with direct-response customer acquisition.
                </p>

                <p>
                  Most businesses face a frustrating dilemma: they hire a web developer who builds pretty code but has zero
                  clue about digital marketing or lead conversion — or they hire a marketing agency that cannot customize code or
                  build custom features. <strong>I solve both sides under one roof.</strong>
                </p>

                <p>
                  On the <strong>engineering side</strong>, I develop full-stack custom websites and web applications tailored strictly
                  to your client requirements, business logic, and branding (zero template compromises, 100/100 Core Web Vitals).
                  On the <strong>growth marketing side</strong>, I engineer and manage high-converting Meta (Facebook & Instagram) and
                  Google ad campaigns that make your products visible and deliver qualified leads, store visits, and paying customers directly to your pipeline.
                </p>

                <div className="superpowers-grid">
                  {CORE_SUPERPOWERS.map((power) => (
                    <div key={power.number} className="power-card">
                      <span className="power-num">{power.number}</span>
                      <h4 className="power-title">{power.title}</h4>
                      <p className="power-desc">{power.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Details Table */}
              <div className="personal-details-box">
                <h4 className="details-heading">[DEVELOPER PROFILE & CREDENTIALS]</h4>
                <dl className="details-list">
                  <div className="detail-item">
                    <dt className="detail-term">NAME</dt>
                    <dd className="detail-def">{PERSONAL_INFO.name}</dd>
                  </div>
                  <div className="detail-item">
                    <dt className="detail-term">PRIMARY ROLE</dt>
                    <dd className="detail-def">{PERSONAL_INFO.role}</dd>
                  </div>
                  <div className="detail-item">
                    <dt className="detail-term">STUDIO LOCATION</dt>
                    <dd className="detail-def">{PERSONAL_INFO.location}</dd>
                  </div>
                  <div className="detail-item">
                    <dt className="detail-term">DIRECT EMAIL</dt>
                    <dd className="detail-def">
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="detail-link">
                        {PERSONAL_INFO.email}
                      </a>
                    </dd>
                  </div>
                  <div className="detail-item">
                    <dt className="detail-term">EXPERIENCE</dt>
                    <dd className="detail-def">{PERSONAL_INFO.experience}</dd>
                  </div>
                  <div className="detail-item">
                    <dt className="detail-term">STUDIO STATUS</dt>
                    <dd className="detail-def highlight-lime">{PERSONAL_INFO.availability}</dd>
                  </div>
                </dl>
              </div>

              {/* Actions */}
              <div className="about-actions-row">
                {/* <a
                  href={PERSONAL_INFO.resumePath}
                  download="Ascend_Tech_Resume.pdf"
                  className="btn-primary"
                  aria-label="Download Ascend Tech's Resume PDF"
                >
                  <Download size={16} strokeWidth={2.2} />
                  <span>Download Complete Resume</span>
                </a> */}

                <a
                  href={getWhatsAppUrl("Hi Ascend Tech! I reviewed your background and would like to talk.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <span>Direct Inquiry ↗</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Career Journey & Experience */}
        {activeTab === 'timeline' && (
          <div className="career-timeline-container fade-in">
            <div className="timeline-lead">
              <h3 className="timeline-heading">PROFESSIONAL WORK HISTORY & MILESTONES</h3>
              <p className="timeline-sub">
                A track record of shipping production code and driving quantifiable growth for digital agencies,
                SaaS products, and independent creators.
              </p>
            </div>

            <div className="timeline-stack">
              {CAREER_TIMELINE.map((item, idx) => (
                <div key={idx} className="timeline-block">
                  <div className="timeline-time-col">
                    <span className="timeline-period-badge">{item.period}</span>
                    <span className="timeline-company">{item.company}</span>
                  </div>

                  <div className="timeline-content-col">
                    <h4 className="timeline-role-title">{item.role}</h4>
                    <p className="timeline-desc">{item.description}</p>
                    
                    <ul className="timeline-highlights">
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="highlight-item">
                          <CheckCircle2 size={14} className="text-lime flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Education & Certifications */}
        {activeTab === 'credentials' && (
          <div className="credentials-container fade-in">
            <div className="credentials-grid">
              {EDUCATION_CREDENTIALS.map((item, idx) => (
                <div key={idx} className="credential-card">
                  <div className="credential-header">
                    <Award size={22} className="text-lime" />
                    <span className="credential-year">{item.year}</span>
                  </div>
                  <h4 className="credential-degree">{item.degree}</h4>
                  <p className="credential-inst">{item.institution}</p>
                  <p className="credential-note">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        /* Metrics Strip */
        .about-metrics-strip {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1.75rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 440px) {
          .about-metrics-strip {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 900px) {
          .about-metrics-strip {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 1.25rem 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          transition: border-color var(--transition-fast), transform var(--transition-fast);
        }

        .stat-card:hover {
          border-color: var(--accent-lime-border);
          transform: translateY(-2px);
        }

        .stat-number {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--accent-lime);
          line-height: 1;
        }

        .stat-label {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .stat-detail {
          font-size: 0.72rem;
          color: var(--text-dim);
        }

        /* Sub-Navigation */
        .about-subnav-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1rem;
        }

        @media (max-width: 680px) {
          .about-subnav-row {
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 0.5rem;
          }
          .about-subnav-row::-webkit-scrollbar {
            display: none;
          }
          .subnav-pill {
            flex-shrink: 0;
            white-space: nowrap;
          }
        }

        .subnav-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1.15rem;
          border-radius: var(--radius-xs);
          background: rgba(245, 243, 235, 0.03);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .subnav-pill:hover {
          border-color: var(--border-medium);
          color: var(--text-primary);
        }

        .subnav-active {
          background: var(--accent-lime-dim);
          border-color: var(--accent-lime);
          color: var(--accent-lime);
        }

        /* Two-Column Grid Aligned at Top */
        .about-editorial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: flex-start;
        }

        @media (min-width: 992px) {
          .about-editorial-grid {
            grid-template-columns: 0.85fr 1.15fr;
            gap: 3.5rem;
          }
          .about-left-col {
            position: sticky;
            top: 92px;
          }
        }

        .about-left-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        @media (max-width: 991px) {
          .about-left-col {
            max-width: 440px;
            margin: 0 auto;
          }
        }

        .portrait-frame {
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--bg-surface);
        }

        .portrait-inner {
          aspect-ratio: 4 / 3;
          background: linear-gradient(135deg, #171813 0%, #1f221a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .monogram-grid-lines {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(215, 255, 100, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(215, 255, 100, 0.05) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .monogram-large {
          font-family: var(--font-heading);
          font-size: 4.75rem;
          font-weight: 700;
          letter-spacing: -0.06em;
          color: rgba(245, 243, 235, 0.12);
          position: relative;
          z-index: 1;
          user-select: none;
        }

        .portrait-corner-tag {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          font-family: var(--font-heading);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: var(--accent-lime);
          background: rgba(16, 17, 15, 0.7);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-xs);
          border: 1px solid var(--accent-lime-border);
        }

        .frame-caption {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.15rem;
          border-top: 1px solid var(--border-subtle);
          font-family: var(--font-heading);
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .caption-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-lime);
        }

        .editorial-statement {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          line-height: 1.4;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          border-left: 2px solid var(--accent-lime);
          padding-left: 1.25rem;
          font-style: italic;
        }

        .signature-block {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding-top: 0.25rem;
        }

        .signature-svg {
          width: 140px;
          height: 42px;
        }

        .signature-caption {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        /* Right Column */
        .about-right-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .narrative-body {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          font-size: 0.98rem;
          line-height: 1.7;
        }

        .narrative-lead {
          font-size: 1.1rem;
          color: var(--text-primary);
          line-height: 1.55;
        }

        .text-primary {
          color: var(--text-primary);
        }

        .superpowers-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.85rem;
          margin: 0.75rem 0;
        }

        @media (min-width: 600px) {
          .superpowers-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .power-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          height: 100%;
        }

        .power-num {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          color: var(--accent-lime);
          font-weight: 700;
        }

        .power-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .power-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        /* Personal Details Box */
        .personal-details-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 1.35rem;
        }

        .details-heading {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: var(--accent-lime);
          margin-bottom: 1.15rem;
        }

        .details-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.8rem;
        }

        @media (min-width: 540px) {
          .details-list {
            grid-template-columns: 1fr 1fr;
          }
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .detail-term {
          font-family: var(--font-heading);
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .detail-def {
          font-size: 0.86rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .detail-link {
          color: var(--accent-lime);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .about-actions-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem;
          margin-top: 0.25rem;
        }

        /* Career Timeline Styles */
        .career-timeline-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .timeline-lead {
          max-width: 700px;
        }

        .timeline-heading {
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          margin-bottom: 0.45rem;
        }

        .timeline-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .timeline-stack {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .timeline-block {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          transition: border-color var(--transition-fast);
        }

        @media (min-width: 768px) {
          .timeline-block {
            grid-template-columns: 220px 1fr;
            gap: 2rem;
          }
        }

        .timeline-block:hover {
          border-color: var(--accent-lime-border);
        }

        .timeline-time-col {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .timeline-period-badge {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--accent-lime);
          letter-spacing: 0.08em;
        }

        .timeline-company {
          font-size: 0.82rem;
          color: var(--text-dim);
          line-height: 1.4;
        }

        .timeline-content-col {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .timeline-role-title {
          font-size: 1.15rem;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .timeline-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .timeline-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 0.35rem;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-size: 0.82rem;
          color: var(--text-primary);
        }

        /* Credentials Styles */
        .credentials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .credentials-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .credential-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 0.75rem;
          transition: border-color var(--transition-fast);
        }

        .credential-card:hover {
          border-color: var(--accent-lime-border);
        }

        .credential-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .credential-year {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          color: var(--accent-lime);
          font-weight: 600;
        }

        .credential-degree {
          font-size: 1.1rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .credential-inst {
          font-size: 0.84rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .credential-note {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin-top: auto;
        }

        @media (max-width: 640px) {
          .portrait-inner {
            aspect-ratio: 16 / 9;
            height: 175px;
          }
          .monogram-large {
            font-size: 2.85rem;
          }
          .about-editorial-grid {
            gap: 1.75rem;
          }
          .stat-card {
            padding: 0.75rem 0.65rem;
          }
          .stat-number {
            font-size: 1.35rem;
          }
          .stat-label {
            font-size: 0.74rem;
          }
          .stat-detail {
            font-size: 0.64rem;
          }
          .editorial-statement {
            font-size: 0.94rem;
            line-height: 1.45;
            padding-left: 0.85rem;
          }
          .signature-svg {
            width: 110px;
            height: 32px;
          }
          .narrative-lead {
            font-size: 0.92rem;
            line-height: 1.5;
          }
          .narrative-body {
            font-size: 0.82rem;
            line-height: 1.55;
            gap: 0.75rem;
          }
          .superpowers-grid {
            gap: 0.55rem;
            margin: 0.45rem 0;
          }
          .power-card {
            padding: 0.75rem;
          }
          .power-title {
            font-size: 0.82rem;
          }
          .power-desc {
            font-size: 0.72rem;
            line-height: 1.4;
          }
          .personal-details-box {
            padding: 0.95rem;
          }
          .details-heading {
            font-size: 0.64rem;
            margin-bottom: 0.65rem;
          }
          .detail-term {
            font-size: 0.58rem;
          }
          .detail-def {
            font-size: 0.8rem;
          }
          .about-actions-row {
            flex-direction: column;
            width: 100%;
          }
          .about-actions-row .btn-primary,
          .about-actions-row .btn-secondary {
            width: 100%;
            justify-content: center;
          }
          .timeline-block {
            padding: 1.15rem 1rem;
            gap: 0.85rem;
          }
          .timeline-role-title {
            font-size: 1rem;
          }
          .timeline-desc {
            font-size: 0.82rem;
            line-height: 1.5;
          }
          .highlight-item {
            font-size: 0.76rem;
          }
          .credential-card {
            padding: 1.15rem 1rem;
            gap: 0.55rem;
          }
          .credential-degree {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
};
