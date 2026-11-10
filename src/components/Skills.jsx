import React from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Code, Megaphone, Wrench, CheckCircle } from 'lucide-react';

export const Skills = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="skills" className="section-wrapper skills-section" aria-label="Skills and Tools">
      <div className="container" ref={sectionRef}>
        {/* Section Header */}
        <div className="section-meta reveal-init">
          <span className="section-meta-num">04</span>
          <span className="section-meta-line" aria-hidden="true"></span>
          <span>CAPABILITY MATRIX</span>
        </div>

        <div className="skills-header-row reveal-init delay-100">
          <h2 className="section-title">
            TOOLS I USE TO <span className="highlight-lime">MAKE THINGS HAPPEN.</span>
          </h2>
          <p className="section-subtitle">
            A balanced stack combining engineering precision with creative marketing versatility.
            Organized by discipline without arbitrary percentages.
          </p>
        </div>

        {/* Typographic Category Layout */}
        <div className="skills-categories-grid">
          {/* Category 1: Frontend */}
          <div className="skill-category-card reveal-init delay-200">
            <div className="card-top-bar">
              <div className="category-icon-box">
                <Code size={20} className="text-lime" />
              </div>
              <span className="category-num">[01]</span>
            </div>

            <h3 className="category-title">{SKILLS_DATA.frontend.title}</h3>
            <p className="category-desc">{SKILLS_DATA.frontend.description}</p>

            <div className="skills-typographic-list">
              {SKILLS_DATA.frontend.skills.map((skill, idx) => (
                <div key={idx} className="skill-item-pill">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-highlight">{skill.highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category 2: Creative & Marketing */}
          <div className="skill-category-card reveal-init delay-300">
            <div className="card-top-bar">
              <div className="category-icon-box">
                <Megaphone size={20} className="text-lime" />
              </div>
              <span className="category-num">[02]</span>
            </div>

            <h3 className="category-title">{SKILLS_DATA.creativeMarketing.title}</h3>
            <p className="category-desc">{SKILLS_DATA.creativeMarketing.description}</p>

            <div className="skills-typographic-list">
              {SKILLS_DATA.creativeMarketing.skills.map((skill, idx) => (
                <div key={idx} className="skill-item-pill">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-highlight">{skill.highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category 3: Tools & Ecosystem */}
          <div className="skill-category-card reveal-init delay-400">
            <div className="card-top-bar">
              <div className="category-icon-box">
                <Wrench size={20} className="text-lime" />
              </div>
              <span className="category-num">[03]</span>
            </div>

            <h3 className="category-title">{SKILLS_DATA.tools.title}</h3>
            <p className="category-desc">{SKILLS_DATA.tools.description}</p>

            <div className="skills-typographic-list">
              {SKILLS_DATA.tools.skills.map((skill, idx) => (
                <div key={idx} className="skill-item-pill">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-highlight">{skill.highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skills-section {
          background-color: var(--bg-primary);
          position: relative;
        }

        .skills-header-row {
          margin-bottom: 2.25rem;
        }

        .skills-categories-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }

        @media (min-width: 600px) and (max-width: 899px) {
          .skills-categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .skill-category-card:last-child {
            grid-column: span 2;
          }
        }

        @media (min-width: 900px) {
          .skills-categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .skill-category-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 2rem 1.6rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform var(--transition-normal), border-color var(--transition-normal);
        }

        .skill-category-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-lime-border);
        }

        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .category-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-xs);
          background: rgba(215, 255, 100, 0.08);
          border: 1px solid var(--accent-lime-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category-num {
          font-family: var(--font-heading);
          font-size: 0.75rem;
          color: var(--text-dim);
          letter-spacing: 0.1em;
        }

        .category-title {
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
        }

        .category-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.75rem;
        }

        .skills-typographic-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: auto;
        }

        .skill-item-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0.95rem;
          background: rgba(245, 243, 235, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          transition: all var(--transition-fast);
        }

        .skill-item-pill:hover {
          background: rgba(215, 255, 100, 0.06);
          border-color: var(--accent-lime-border);
          transform: translateX(4px);
        }

        .skill-name {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .skill-highlight {
          font-size: 0.72rem;
          color: var(--accent-lime);
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .skill-category-card {
            padding: 1.25rem 1rem;
          }
          .card-top-bar {
            margin-bottom: 1rem;
          }
          .category-title {
            font-size: 1.1rem;
            margin-bottom: 0.45rem;
          }
          .category-desc {
            font-size: 0.8rem;
            margin-bottom: 1.15rem;
            line-height: 1.5;
          }
          .skills-typographic-list {
            gap: 0.45rem;
          }
          .skill-item-pill {
            padding: 0.55rem 0.75rem;
            flex-direction: row;
            justify-content: space-between;
          }
          .skill-name {
            font-size: 0.82rem;
          }
          .skill-highlight {
            font-size: 0.68rem;
          }
        }

        @media (max-width: 380px) {
          .skill-item-pill {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.15rem;
          }
        }
      `}</style>
    </section>
  );
};
