import React from 'react';
import { ArrowUpRight, Sparkles, TrendingUp, Compass, MessageCircle, Code2, Globe, CheckCircle2 } from 'lucide-react';

export const ProjectCard = ({ project, onSelect, index }) => {
  // Render custom art-directed visual based on project visualType
  const renderVisual = () => {
    switch (project.visualType) {
      case 'dress-meta-ads':
        return (
          <div className="card-mockup mockup-dress-meta">
            <div className="meta-ad-header">
              <div className="meta-sponsor-pill">
                <span className="meta-ad-dot"></span>
                <span>SPONSORED • META ADS (FB & IG)</span>
              </div>
              <span className="meta-platform-tag">FEED & REELS</span>
            </div>

            <div className="dress-ad-center">
              <div className="dress-silhouette-frame">
                <div className="silhouette-rings"></div>
                <div className="dress-title-group">
                  <span className="dress-kicker">BRIDAL & FESTIVE COUTURE</span>
                  <span className="dress-headline">AURA ATELIER COLLECTION</span>
                </div>
                <div className="dress-swatch-row">
                  <span className="dress-swatch s-rose"></span>
                  <span className="dress-swatch s-gold"></span>
                  <span className="dress-swatch s-emerald"></span>
                  <span className="swatch-text">Handcrafted Silks</span>
                </div>
              </div>
            </div>

            <div className="dress-ad-footer">
              <div className="meta-wa-cta">
                <MessageCircle size={12} className="text-lime" />
                <span>Book Fitting on WhatsApp</span>
              </div>
              <div className="ad-kpi-badge">
                <span className="kpi-num">4.8x</span>
                <span className="kpi-txt">ROAS</span>
              </div>
            </div>
          </div>
        );

      case 'software-startup-ads':
        return (
          <div className="card-mockup mockup-software-ads">
            <div className="b2b-ad-header">
              <div className="b2b-sponsor-pill">
                <span className="b2b-dot"></span>
                <span>GOOGLE SEARCH & LINKEDIN ADS</span>
              </div>
              <span className="b2b-pipeline-tag">$180K PIPELINE</span>
            </div>

            <div className="software-ad-center">
              <div className="terminal-ad-box">
                <div className="target-badge-row">
                  <span className="target-pill">Target: CTOs & Founders</span>
                  <span className="intent-pill">High-Intent Inbound</span>
                </div>
                <h4 className="ad-main-pitch">"Ship Custom SaaS Products In 4 Weeks With Zero Friction"</h4>
                <div className="pipeline-bars">
                  <div className="pipe-stage p-done">1. Search Ad Click</div>
                  <div className="pipe-stage p-active">2. Scope Estimator</div>
                  <div className="pipe-stage p-call">3. 48+ Calls Booked</div>
                </div>
              </div>
            </div>

            <div className="software-ad-footer">
              <div className="demo-cta-pill">
                <span>Book Technical Discovery Call ↗</span>
              </div>
              <span className="cvr-stat">5.2% Lead CVR</span>
            </div>
          </div>
        );

      case 'custom-web-platform':
      default:
        return (
          <div className="card-mockup mockup-custom-platform">
            <div className="mockup-chrome">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
              <span className="mockup-url">client-brand.com // custom-web-build</span>
            </div>

            <div className="custom-platform-body">
              <div className="spec-badge-row">
                <span className="spec-badge">100% BESPOKE ARCHITECTURE</span>
                <span className="vitals-badge">⚡ 100/100 SPEED</span>
              </div>

              <div className="code-editor-preview">
                <p className="code-line"><span className="c-blue">const</span> <span className="c-green">ClientWebsite</span> = () =&gt; &#123;</p>
                <p className="code-line indent"><span className="c-purple">return</span> &lt;<span className="c-yellow">TailoredBusinessSolution</span></p>
                <p className="code-line indent-2"><span className="c-cyan">requirements</span>=<span className="c-orange">"100% Client-Specific"</span></p>
                <p className="code-line indent-2"><span className="c-cyan">leadConversion</span>=<span className="c-orange">"Active WhatsApp & Forms"</span></p>
                <p className="code-line indent">/&gt;;</p>
                <p className="code-line">&#125;;</p>
              </div>

              <div className="feature-tags-strip">
                <span className="feat-pill">React 18</span>
                <span className="feat-pill">Vite</span>
                <span className="feat-pill">Zero Template Bloat</span>
                <span className="feat-pill">SEO Ready</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <article
      className="project-card"
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      aria-label={`View case study for ${project.title}`}
    >
      {/* Cover Visual Mockup */}
      <div className="project-cover-wrapper">
        {renderVisual()}
        <div className="cover-overlay">
          <span className="overlay-btn">
            <span>View Full Case Study</span>
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>

      {/* Project Meta Details */}
      <div className="project-content">
        <div className="project-top-row">
          <div className="project-badge-group">
            <span className="editorial-badge">{project.typeLabel}</span>
            <span className="project-category">{project.category}</span>
          </div>
          <span className="project-year">{project.year}</span>
        </div>

        <h3 className="project-title">
          <span>{project.title}</span>
          <ArrowUpRight size={18} className="title-arrow" />
        </h3>

        <p className="project-description">{project.shortDescription}</p>

        {/* Live Metrics Row */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="project-quick-metrics">
            {project.metrics.map((m, mIdx) => (
              <div key={mIdx} className="metric-chip">
                <span className="metric-chip-label">{m.label}:</span>
                <span className="metric-chip-val">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Technologies / Services Tags */}
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="category-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .project-card {
          position: relative;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
        }

        .project-card:hover,
        .project-card:focus-visible {
          transform: translateY(-5px);
          border-color: var(--accent-lime-border);
          box-shadow: var(--shadow-elevated);
        }

        /* Cover Visual */
        .project-cover-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background-color: #0b0c0a;
          overflow: hidden;
          border-bottom: 1px solid var(--border-subtle);
        }

        .cover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(16, 17, 15, 0.45);
          opacity: 0;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity var(--transition-fast);
        }

        .project-card:hover .cover-overlay,
        .project-card:focus-visible .cover-overlay {
          opacity: 1;
        }

        .overlay-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.4rem;
          background: var(--accent-lime);
          color: var(--bg-primary);
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: var(--radius-xs);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
          transform: translateY(8px);
          transition: transform var(--transition-fast);
        }

        .project-card:hover .overlay-btn {
          transform: translateY(0);
        }

        /* Generic Mockup Base */
        .card-mockup {
          width: 100%;
          height: 100%;
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform var(--transition-normal);
        }

        .project-card:hover .card-mockup {
          transform: scale(1.02);
        }

        .mockup-chrome {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-heading);
          font-size: 0.65rem;
          color: var(--text-dim);
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .dot-red { background: #EF4444; }
        .dot-yellow { background: #F59E0B; }
        .dot-green { background: #10B981; }

        .mockup-url {
          margin-left: 0.5rem;
        }

        /* 1. Dress Boutique Meta Ads Mockup */
        .mockup-dress-meta {
          background: linear-gradient(135deg, #1A0B14 0%, #290E1F 60%, #160A12 100%);
          border: 1px solid rgba(244, 63, 94, 0.25);
        }

        .meta-ad-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-heading);
          font-size: 0.65rem;
        }

        .meta-sponsor-pill {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: #FB7185;
          letter-spacing: 0.06em;
          font-weight: 600;
        }

        .meta-ad-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .meta-platform-tag {
          color: rgba(244, 63, 94, 0.7);
          font-size: 0.6rem;
          letter-spacing: 0.08em;
        }

        .dress-ad-center {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(244, 63, 94, 0.2);
          border-radius: var(--radius-xs);
          padding: 0.85rem;
          position: relative;
          overflow: hidden;
        }

        .dress-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .dress-kicker {
          font-family: var(--font-heading);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: #FDA4AF;
        }

        .dress-headline {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFF;
          letter-spacing: -0.01em;
        }

        .dress-swatch-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.6rem;
        }

        .dress-swatch {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .s-rose { background: #E11D48; }
        .s-gold { background: #F59E0B; }
        .s-emerald { background: #059669; }

        .swatch-text {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.6);
          margin-left: 0.35rem;
        }

        .dress-ad-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
        }

        .meta-wa-cta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-heading);
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--accent-lime);
          background: rgba(215, 255, 100, 0.08);
          border: 1px solid var(--accent-lime-border);
          padding: 0.3rem 0.65rem;
          border-radius: 3px;
        }

        .ad-kpi-badge {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          font-family: var(--font-heading);
        }

        .kpi-num {
          font-size: 1.05rem;
          font-weight: 700;
          color: #FB7185;
        }

        .kpi-txt {
          font-size: 0.65rem;
          color: var(--text-dim);
        }

        /* 2. Software Startup B2B Ads Mockup */
        .mockup-software-ads {
          background: linear-gradient(135deg, #071524 0%, #0A223B 60%, #05101A 100%);
          border: 1px solid rgba(56, 189, 248, 0.25);
        }

        .b2b-ad-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-heading);
          font-size: 0.65rem;
        }

        .b2b-sponsor-pill {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: #38BDF8;
          font-weight: 600;
        }

        .b2b-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38BDF8;
          box-shadow: 0 0 8px #38BDF8;
        }

        .b2b-pipeline-tag {
          color: #7DD3FC;
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          background: rgba(56, 189, 248, 0.1);
          padding: 0.15rem 0.45rem;
          border-radius: 3px;
        }

        .software-ad-center {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: var(--radius-xs);
          padding: 0.85rem;
        }

        .target-badge-row {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 0.4rem;
        }

        .target-pill, .intent-pill {
          font-family: var(--font-heading);
          font-size: 0.58rem;
          padding: 0.1rem 0.4rem;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.7);
        }

        .intent-pill {
          color: #38BDF8;
          background: rgba(56, 189, 248, 0.12);
        }

        .ad-main-pitch {
          font-size: 0.82rem;
          font-weight: 600;
          color: #F8FAFC;
          line-height: 1.35;
          margin-bottom: 0.6rem;
        }

        .pipeline-bars {
          display: flex;
          gap: 0.35rem;
        }

        .pipe-stage {
          font-size: 0.58rem;
          font-family: var(--font-heading);
          padding: 0.2rem 0.35rem;
          border-radius: 2px;
          flex: 1;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .p-done { background: rgba(56, 189, 248, 0.15); color: #BAE6FD; }
        .p-active { background: rgba(56, 189, 248, 0.3); color: #FFF; font-weight: 600; }
        .p-call { background: rgba(16, 185, 129, 0.2); color: #A7F3D0; font-weight: 700; }

        .software-ad-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
        }

        .demo-cta-pill {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          color: #38BDF8;
          font-weight: 600;
        }

        .cvr-stat {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          color: #10B981;
        }

        /* 3. Bespoke Custom Web Platform Mockup */
        .mockup-custom-platform {
          background: linear-gradient(135deg, #0F140A 0%, #151D0E 60%, #0B0E07 100%);
          border: 1px solid rgba(215, 255, 100, 0.25);
        }

        .custom-platform-body {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-top: 0.35rem;
        }

        .spec-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-heading);
          font-size: 0.6rem;
        }

        .spec-badge {
          color: var(--accent-lime);
          letter-spacing: 0.08em;
          font-weight: 600;
        }

        .vitals-badge {
          color: #10B981;
          background: rgba(16, 185, 129, 0.12);
          padding: 0.15rem 0.45rem;
          border-radius: 3px;
          font-weight: 700;
        }

        .code-editor-preview {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(215, 255, 100, 0.15);
          border-radius: var(--radius-xs);
          padding: 0.65rem 0.8rem;
          font-family: monospace;
          font-size: 0.64rem;
          line-height: 1.45;
        }

        .code-line { margin: 0; }
        .indent { padding-left: 0.75rem; }
        .indent-2 { padding-left: 1.5rem; }

        .c-blue { color: #60A5FA; }
        .c-green { color: #34D399; }
        .c-purple { color: #C084FC; }
        .c-yellow { color: #FCD34D; }
        .c-cyan { color: #38BDF8; }
        .c-orange { color: #FB923C; }

        .feature-tags-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .feat-pill {
          font-family: var(--font-heading);
          font-size: 0.58rem;
          padding: 0.15rem 0.45rem;
          background: rgba(215, 255, 100, 0.06);
          border: 1px solid rgba(215, 255, 100, 0.18);
          color: var(--text-primary);
          border-radius: 2px;
        }

        /* Card Content Area */
        .project-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .project-badge-group {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.45rem;
        }

        .editorial-badge {
          font-family: var(--font-heading);
          font-size: 0.64rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--accent-lime-dim);
          color: var(--accent-lime);
          border: 1px solid var(--accent-lime-border);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-xs);
          font-weight: 600;
        }

        .project-category {
          font-size: 0.76rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .project-year {
          font-family: var(--font-heading);
          font-size: 0.74rem;
          color: var(--text-dim);
          font-variant-numeric: tabular-nums;
        }

        .project-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          transition: color var(--transition-fast);
        }

        .project-card:hover .project-title {
          color: var(--accent-lime);
        }

        .title-arrow {
          color: var(--text-dim);
          transition: transform var(--transition-fast), color var(--transition-fast);
          flex-shrink: 0;
        }

        .project-card:hover .title-arrow {
          transform: translate(3px, -3px);
          color: var(--accent-lime);
        }

        .project-description {
          font-size: 0.86rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 1.15rem;
        }

        /* Quick Metrics Chips */
        .project-quick-metrics {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.4rem;
          margin-bottom: 1.15rem;
          padding: 0.65rem 0.85rem;
          background: rgba(245, 243, 235, 0.025);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
        }

        .metric-chip {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
        }

        .metric-chip-label {
          color: var(--text-dim);
        }

        .metric-chip-val {
          font-family: var(--font-heading);
          font-weight: 600;
          color: var(--accent-lime);
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
        }

        .category-tag {
          font-size: 0.72rem;
          color: var(--text-dim);
          background: rgba(245, 243, 235, 0.03);
          border: 1px solid var(--border-subtle);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-xs);
          transition: border-color var(--transition-fast);
        }

        .project-card:hover .category-tag {
          border-color: var(--border-medium);
        }

        @media (max-width: 640px) {
          .project-content {
            padding: 1rem 0.95rem;
          }
          .card-mockup {
            padding: 0.75rem;
          }
          .project-title {
            font-size: 1.05rem;
            margin-bottom: 0.45rem;
          }
          .project-description {
            font-size: 0.8rem;
            line-height: 1.5;
            margin-bottom: 0.75rem;
          }
          .project-quick-metrics {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.35rem;
            padding: 0.5rem 0.65rem;
            margin-bottom: 0.85rem;
          }
          .metric-chip {
            font-size: 0.7rem;
            flex-direction: column;
            gap: 0.1rem;
          }
          .metric-chip-val {
            font-size: 0.78rem;
          }
          .dress-headline {
            font-size: 0.82rem;
          }
          .ad-main-pitch {
            font-size: 0.74rem;
            line-height: 1.3;
          }
          .pipeline-bars {
            gap: 0.2rem;
          }
          .pipe-stage {
            font-size: 0.52rem;
            padding: 0.15rem 0.25rem;
          }
          .code-editor-preview {
            font-size: 0.56rem;
            padding: 0.45rem;
            line-height: 1.35;
          }
          .project-tags {
            gap: 0.3rem;
          }
          .category-tag {
            font-size: 0.66rem;
            padding: 0.15rem 0.45rem;
          }
        }

        @media (max-width: 400px) {
          .project-content {
            padding: 0.85rem 0.75rem;
          }
          .project-quick-metrics {
            grid-template-columns: 1fr;
          }
          .metric-chip {
            flex-direction: row;
          }
        }
      `}</style>
    </article>
  );
};
