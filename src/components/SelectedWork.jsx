import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { CaseStudyModal } from './CaseStudyModal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Sparkles, Layers } from 'lucide-react';

export const SelectedWork = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useScrollReveal({ threshold: 0.05 });

  // Dynamically derive categories from current real project data
  const categories = ['All', ...Array.from(new Set(PROJECTS_DATA.map((p) => p.category)))];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-wrapper projects-section" aria-label="Selected Work and Case Studies">
      <div className="container" ref={sectionRef}>
        {/* Section Header */}
        <div className="projects-header-block">
          <div className="section-meta reveal-init delay-50">
            <span className="section-meta-num">02</span>
            <span className="section-meta-line" aria-hidden="true"></span>
            <span>PROVEN WORKS & CLIENT RESULTS</span>
          </div>

          <div className="projects-title-row">
            <h2 className="section-title reveal-init delay-100">
              SELECTED WORK — <span className="highlight-lime">2025/26</span>
            </h2>
            <p className="section-subtitle reveal-init delay-150">
              Real-world execution combining full custom web development engineered to client specifications,
              high-ROI Meta advertising for retail boutiques, and B2B client acquisition engines for software startups.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="filter-pills-row reveal-init delay-200" role="tablist">
            {categories.map((cat) => {
              const count = cat === 'All'
                ? PROJECTS_DATA.length
                : PROJECTS_DATA.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`filter-pill ${activeCategory === cat ? 'filter-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="filter-count">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="editorial-notice-bar reveal-init delay-250">
            <Sparkles size={14} className="text-lime flex-shrink-0" />
            <span>
              I develop full custom websites built strictly to your business requirements AND run high-converting ad campaigns
              (Meta, Google, LinkedIn) that drive real leads, foot traffic, and paying customers. Click any card for the full case study.
            </span>
          </div>
        </div>

        {/* Symmetrical High-Impact Editorial Grid */}
        <div className="projects-editorial-grid reveal-stagger">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="grid-cell reveal-init" style={{ transitionDelay: `${idx * 120 + 200}ms` }}>
              <ProjectCard
                project={project}
                onSelect={(p) => setSelectedProject(p)}
                index={idx}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style>{`
        .projects-section {
          background-color: var(--bg-primary);
          position: relative;
        }

        .projects-header-block {
          margin-bottom: 2rem;
        }

        .projects-title-row {
          margin-bottom: 1.25rem;
        }

        /* Filter Pills */
        .filter-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-bottom: 1.25rem;
        }

        @media (max-width: 680px) {
          .projects-header-block {
            margin-bottom: 1.35rem;
          }
          .projects-editorial-grid {
            gap: 1.25rem;
          }
          .filter-pills-row {
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.35rem;
            margin-bottom: 0.85rem;
            scrollbar-width: none;
          }
          .filter-pills-row::-webkit-scrollbar {
            display: none;
          }
          .filter-pill {
            flex-shrink: 0;
            white-space: nowrap;
            padding: 0.38rem 0.75rem;
            font-size: 0.74rem;
          }
          .editorial-notice-bar {
            padding: 0.5rem 0.75rem;
            font-size: 0.73rem;
            line-height: 1.45;
          }
        }

        .filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-xs);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .filter-pill:hover {
          border-color: var(--border-medium);
          color: var(--text-primary);
        }

        .filter-active {
          background: var(--accent-lime-dim);
          border-color: var(--accent-lime);
          color: var(--accent-lime);
        }

        .filter-count {
          font-size: 0.72rem;
          opacity: 0.75;
          font-variant-numeric: tabular-nums;
        }

        .editorial-notice-bar {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.6rem 1rem;
          background: rgba(245, 243, 235, 0.025);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          font-size: 0.78rem;
          color: var(--text-dim);
          line-height: 1.5;
        }

        /* Symmetrical Multi-Column Responsive Grid */
        .projects-editorial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }

        @media (min-width: 680px) {
          .projects-editorial-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1080px) {
          .projects-editorial-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.75rem;
          }
        }

        .grid-cell {
          display: flex;
        }

        .grid-cell > * {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </section>
  );
};
