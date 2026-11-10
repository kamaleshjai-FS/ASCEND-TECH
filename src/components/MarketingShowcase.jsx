import React, { useState } from 'react';
import { MARKETING_SHOWCASE_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Instagram, Eye, Target, Sparkles, ArrowUpRight, BarChart3, AlertCircle, Calendar, PieChart, CheckCircle2 } from 'lucide-react';

export const MarketingShowcase = () => {
  const [activeTab, setActiveTab] = useState('social');
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  const { socialMedia, brandAwareness, conversionFunnel, disclaimer } = MARKETING_SHOWCASE_DATA;

  return (
    <section id="showcase" className="section-wrapper showcase-section" aria-label="Digital Marketing Showcase">
      <div className="container" ref={sectionRef}>
        {/* Section Header */}
        <div className="section-meta reveal-init">
          <span className="section-meta-num">06</span>
          <span className="section-meta-line" aria-hidden="true"></span>
          <span>STRATEGIC MARKETING LAB</span>
        </div>

        <div className="showcase-header-row reveal-init delay-100">
          <h2 className="section-title">
            CREATIVE THAT CONNECTS. <span className="highlight-lime">CAMPAIGNS THAT COMMUNICATE.</span>
          </h2>
          <p className="section-subtitle">
            An in-depth showcase of speculative campaign architecture, content systems,
            and conversion-focused funnel frameworks.
          </p>
        </div>

        {/* Ethical Transparency Disclaimer */}
        <div className="showcase-disclaimer-pill reveal-init delay-150">
          <AlertCircle size={15} className="text-lime" />
          <span>{disclaimer}</span>
        </div>

        {/* Module Switcher Tabs */}
        <div className="module-tabs-nav reveal-init delay-200" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'social'}
            className={`tab-btn ${activeTab === 'social' ? 'tab-btn-active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <Instagram size={16} />
            <span>A. Social Media Omnichannel Engine</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'brand'}
            className={`tab-btn ${activeTab === 'brand' ? 'tab-btn-active' : ''}`}
            onClick={() => setActiveTab('brand')}
          >
            <Eye size={16} />
            <span>B. Brand Awareness Campaign</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'funnel'}
            className={`tab-btn ${activeTab === 'funnel' ? 'tab-btn-active' : ''}`}
            onClick={() => setActiveTab('funnel')}
          >
            <Target size={16} />
            <span>C. Conversion-Focused Funnel</span>
          </button>
        </div>

        {/* Module A: Social Media Campaign */}
        {activeTab === 'social' && (
          <div className="showcase-module-pane fade-in" role="tabpanel">
            <div className="module-brief-card">
              <div className="brief-item">
                <span className="brief-label">CAMPAIGN TITLE</span>
                <span className="brief-val">{socialMedia.campaignName}</span>
              </div>
              <div className="brief-item">
                <span className="brief-label">TARGET AUDIENCE</span>
                <span className="brief-val">{socialMedia.targetAudience}</span>
              </div>
              <div className="brief-item">
                <span className="brief-label">OBJECTIVE</span>
                <span className="brief-val">{socialMedia.objective}</span>
              </div>
              <div className="brief-item">
                <span className="brief-label">CREATIVE DIRECTION</span>
                <span className="brief-val">{socialMedia.creativeDirection}</span>
              </div>
            </div>

            {/* Social Post Mockups Grid */}
            <div className="social-posts-grid">
              {socialMedia.posts.map((post, i) => (
                <div key={i} className="instagram-card-mockup">
                  <div className="ig-header">
                    <div className="ig-avatar"></div>
                    <div className="ig-user-info">
                      <span className="ig-handle">@kinetic.minds</span>
                      <span className="ig-sponsor">Original Creative Concept</span>
                    </div>
                    <span className="ig-tag">{post.tag}</span>
                  </div>

                  <div className="ig-canvas" style={{ borderColor: post.accent }}>
                    <div className="ig-inner-content">
                      <span className="ig-kicker">{post.format}</span>
                      <h4 className="ig-headline" style={{ color: post.accent }}>
                        {post.headline}
                      </h4>
                      <p className="ig-subtext">{post.subtext}</p>
                    </div>
                  </div>

                  <div className="ig-body-caption">
                    <p className="ig-caption-text">{post.captionPreview}</p>
                  </div>

                  <div className="ig-footer">
                    <div className="ig-actions">
                      <span className="ig-stat">♥ {post.simulatedLikes}</span>
                      <span className="ig-stat">💬 {post.simulatedComments}</span>
                    </div>
                    <span className="ig-hypothetical">Speculative Creative</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Calendar Weekly Cadence */}
            <div className="calendar-cadence-box">
              <h4 className="calendar-heading">
                <Calendar size={16} className="text-lime" />
                <span>WEEKLY EDITORIAL PUBLISHING CADENCE & HOOK MATRIX</span>
              </h4>
              <div className="schedule-table-wrapper">
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>DAY</th>
                      <th>CONTENT PILLAR</th>
                      <th>ASSET FORMAT</th>
                      <th>CORE EDITORIAL HOOK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {socialMedia.weeklySchedule.map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="day-cell">{row.day}</td>
                        <td className="pillar-cell"><span className="category-tag">{row.pillar}</span></td>
                        <td className="format-cell">{row.format}</td>
                        <td className="hook-cell">{row.hook}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Content Pillars Distribution */}
            <div className="content-calendar-box">
              <h4 className="calendar-heading">
                <BarChart3 size={16} className="text-lime" />
                <span>4-PILLAR CONTENT DISTRIBUTION RATIO</span>
              </h4>
              <div className="pillars-grid">
                {socialMedia.contentPillars.map((pillar, i) => (
                  <div key={i} className="pillar-card">
                    <div className="pillar-header">
                      <span className="pillar-name">{pillar.name}</span>
                      <span className="pillar-share">{pillar.share}</span>
                    </div>
                    <p className="pillar-note">{pillar.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Module B: Brand Awareness Campaign */}
        {activeTab === 'brand' && (
          <div className="showcase-module-pane fade-in" role="tabpanel">
            <div className="module-brief-card">
              <div className="brief-item">
                <span className="brief-label">CAMPAIGN TITLE</span>
                <span className="brief-val">{brandAwareness.campaignName}</span>
              </div>
              <div className="brief-item">
                <span className="brief-label">TARGET AUDIENCE</span>
                <span className="brief-val">{brandAwareness.targetAudience}</span>
              </div>
              <div className="brief-item">
                <span className="brief-label">OBJECTIVE</span>
                <span className="brief-val">{brandAwareness.objective}</span>
              </div>
              <div className="brief-item">
                <span className="brief-label">MESSAGING STRATEGY</span>
                <span className="brief-val">{brandAwareness.messagingStrategy}</span>
              </div>
            </div>

            {/* Media Mix Strip */}
            <div className="media-mix-box">
              <h4 className="calendar-heading">
                <PieChart size={16} className="text-lime" />
                <span>OMNICHANNEL MEDIA BUDGET & CHANNEL ALLOCATION SPEC</span>
              </h4>
              <div className="media-mix-grid">
                {brandAwareness.mediaMix.map((mix, idx) => (
                  <div key={idx} className="mix-card">
                    <div className="mix-top">
                      <span className="mix-channel">{mix.channel}</span>
                      <span className="mix-share">{mix.share}</span>
                    </div>
                    <p className="mix-purpose">{mix.purpose}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Variations Grid */}
            <div className="brand-ads-grid">
              {brandAwareness.adVariations.map((ad, i) => (
                <div key={i} className="ad-variant-card">
                  <div className="ad-variant-badge">
                    <Sparkles size={12} className="text-lime" />
                    <span>{ad.variant}</span>
                  </div>
                  <h3 className="ad-headline">"{ad.headline}"</h3>
                  <p className="ad-copy">{ad.copy}</p>
                  
                  <div className="ad-visual-direction">
                    <span className="visual-kicker">ART DIRECTION:</span>
                    <p className="visual-note">{ad.visualDirection}</p>
                  </div>

                  <div className="ad-footer-bar">
                    <span className="ad-tone">Tone: {ad.tone}</span>
                    <span className="ad-cta-pill">{ad.cta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module C: Conversion-Focused Funnel */}
        {activeTab === 'funnel' && (
          <div className="showcase-module-pane fade-in" role="tabpanel">
            <div className="module-brief-card">
              <div className="brief-item">
                <span className="brief-label">CAMPAIGN TITLE</span>
                <span className="brief-val">{conversionFunnel.campaignName}</span>
              </div>
              <div className="brief-item">
                <span className="brief-label">TARGET AUDIENCE</span>
                <span className="brief-val">{conversionFunnel.targetAudience}</span>
              </div>
              <div className="brief-item">
                <span className="brief-label">OBJECTIVE</span>
                <span className="brief-val">{conversionFunnel.objective}</span>
              </div>
            </div>

            {/* Projected Benchmark KPI Grid */}
            <div className="funnel-metrics-strip">
              {conversionFunnel.projectedMetrics.map((item, idx) => (
                <div key={idx} className="kpi-card">
                  <span className="kpi-value">{item.value}</span>
                  <span className="kpi-metric">{item.metric}</span>
                  <span className="kpi-note">{item.note}</span>
                </div>
              ))}
            </div>

            {/* 3-Stage Funnel Flow */}
            <div className="funnel-flow-container">
              <h4 className="funnel-title">THREE-STAGE CONVERSION JOURNEY SPECIFICATION</h4>
              <div className="funnel-stages-grid">
                {conversionFunnel.funnelStages.map((stage, i) => (
                  <div key={i} className="funnel-stage-card">
                    <span className="stage-num-tag">{stage.stage}</span>
                    <p className="stage-hook">{stage.hook}</p>
                    <div className="strategy-note-box">
                      <span className="note-kicker">STRATEGY:</span>
                      <p className="note-text">{stage.strategyNote}</p>
                    </div>
                    <div className="stage-meta-row">
                      <span className="stage-format">Format: {stage.format}</span>
                      <span className="stage-metric">{stage.simulatedMetric}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Landing Page Creative Blueprint */}
            <div className="landing-blueprint-box">
              <h4 className="blueprint-title">SUGGESTED HIGH-CONVERTING LANDING PAGE BLOCKS</h4>
              <div className="blueprint-grid">
                {conversionFunnel.landingPageElements.map((elem, i) => (
                  <div key={i} className="blueprint-item">
                    <span className="blueprint-num">0{i + 1}</span>
                    <h5 className="blueprint-name">{elem.title}</h5>
                    <p className="blueprint-detail">{elem.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .showcase-section {
          background-color: var(--bg-primary);
          position: relative;
        }

        .showcase-header-row {
          margin-bottom: 2rem;
        }

        .showcase-disclaimer-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1.15rem;
          background: rgba(215, 255, 100, 0.05);
          border: 1px solid var(--accent-lime-border);
          border-radius: var(--radius-xs);
          font-size: 0.8rem;
          color: var(--accent-lime);
          margin-bottom: 2.5rem;
          line-height: 1.5;
        }

        /* Module Switcher Tabs */
        .module-tabs-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1rem;
        }

        .tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.35rem;
          border-radius: var(--radius-xs);
          background: rgba(245, 243, 235, 0.03);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 0.84rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .tab-btn:hover {
          border-color: var(--border-medium);
          color: var(--text-primary);
        }

        .tab-btn-active {
          background: var(--accent-lime-dim);
          border-color: var(--accent-lime);
          color: var(--accent-lime);
        }

        /* Brief Card */
        .module-brief-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        @media (min-width: 680px) {
          .module-brief-card {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .brief-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .brief-label {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .brief-val {
          font-size: 0.92rem;
          color: var(--text-primary);
          line-height: 1.5;
        }

        /* Social Mockups Grid */
        .social-posts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
          margin-bottom: 2.5rem;
        }

        @media (min-width: 768px) {
          .social-posts-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .instagram-card-mockup {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .ig-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .ig-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--accent-lime);
          flex-shrink: 0;
        }

        .ig-user-info {
          display: flex;
          flex-direction: column;
        }

        .ig-handle {
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .ig-sponsor {
          font-size: 0.64rem;
          color: var(--text-dim);
        }

        .ig-tag {
          margin-left: auto;
          font-size: 0.65rem;
          color: var(--accent-lime);
          font-family: var(--font-heading);
          font-weight: 600;
        }

        .ig-canvas {
          padding: 2rem 1.25rem;
          background: #0C0D0B;
          border-left: 3px solid;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ig-kicker {
          font-family: var(--font-heading);
          font-size: 0.62rem;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .ig-headline {
          font-size: 1.15rem;
          letter-spacing: -0.02em;
          margin: 0.5rem 0;
          line-height: 1.25;
        }

        .ig-subtext {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .ig-body-caption {
          padding: 0.85rem 1rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.45;
          background: var(--bg-surface);
          border-top: 1px solid var(--border-subtle);
        }

        .ig-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.72rem;
        }

        .ig-actions {
          display: flex;
          gap: 0.85rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .ig-hypothetical {
          color: var(--text-dim);
          font-size: 0.68rem;
        }

        /* Calendar Schedule Table */
        .calendar-cadence-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          margin-bottom: 2rem;
        }

        .schedule-table-wrapper {
          overflow-x: auto;
          margin-top: 1rem;
        }

        .schedule-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
          text-align: left;
        }

        .schedule-table th {
          font-family: var(--font-heading);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border-medium);
        }

        .schedule-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-primary);
        }

        .day-cell {
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--accent-lime) !important;
        }

        .format-cell {
          color: var(--text-muted) !important;
        }

        .hook-cell {
          color: var(--text-primary);
          font-weight: 500;
        }

        /* Pillars Grid */
        .content-calendar-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.75rem;
        }

        .calendar-heading {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .pillars-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .pillar-card {
          background: rgba(245, 243, 235, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          padding: 1rem;
        }

        .pillar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }

        .pillar-name {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .pillar-share {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          color: var(--accent-lime);
          font-weight: 600;
        }

        .pillar-note {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Media Mix */
        .media-mix-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          margin-bottom: 2rem;
        }

        .media-mix-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .media-mix-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .media-mix-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .mix-card {
          background: rgba(245, 243, 235, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          padding: 1rem;
        }

        .mix-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }

        .mix-channel {
          font-family: var(--font-heading);
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .mix-share {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          color: var(--accent-lime);
          font-weight: 600;
        }

        .mix-purpose {
          font-size: 0.76rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        /* Brand Ads Grid */
        .brand-ads-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }

        @media (min-width: 768px) {
          .brand-ads-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .ad-variant-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform var(--transition-normal), border-color var(--transition-normal);
        }

        .ad-variant-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-lime-border);
        }

        .ad-variant-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-heading);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: var(--accent-lime);
          text-transform: uppercase;
        }

        .ad-headline {
          font-size: 1.25rem;
          line-height: 1.25;
          letter-spacing: -0.02em;
        }

        .ad-copy {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .ad-visual-direction {
          background: rgba(245, 243, 235, 0.02);
          border-left: 2px solid var(--border-medium);
          padding: 0.65rem 0.85rem;
          border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
        }

        .visual-kicker {
          font-family: var(--font-heading);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: var(--accent-lime);
        }

        .visual-note {
          font-size: 0.76rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin-top: 0.2rem;
        }

        .ad-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }

        .ad-tone {
          font-size: 0.72rem;
          color: var(--text-dim);
        }

        .ad-cta-pill {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          color: var(--accent-lime);
          font-weight: 600;
        }

        /* Funnel KPI Strip */
        .funnel-metrics-strip {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 900px) {
          .funnel-metrics-strip {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .kpi-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .kpi-value {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--accent-lime);
        }

        .kpi-metric {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .kpi-note {
          font-size: 0.72rem;
          color: var(--text-dim);
        }

        /* Funnel Flow */
        .funnel-flow-container {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .funnel-title {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          color: var(--accent-lime);
          margin-bottom: 1.5rem;
        }

        .funnel-stages-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 768px) {
          .funnel-stages-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .funnel-stage-card {
          background: rgba(245, 243, 235, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .stage-num-tag {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .stage-hook {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
        }

        .strategy-note-box {
          background: rgba(215, 255, 100, 0.04);
          border-left: 2px solid var(--accent-lime);
          padding: 0.5rem 0.75rem;
          border-radius: 0 4px 4px 0;
        }

        .note-kicker {
          font-family: var(--font-heading);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: var(--accent-lime);
        }

        .note-text {
          font-size: 0.76rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-top: 0.15rem;
        }

        .stage-meta-row {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }

        .stage-format {
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        .stage-metric {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          color: var(--accent-lime);
          font-weight: 600;
        }

        /* Blueprint */
        .landing-blueprint-box {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 2rem;
        }

        .blueprint-title {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .blueprint-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .blueprint-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .blueprint-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .blueprint-num {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent-lime);
        }

        .blueprint-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .blueprint-detail {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};
