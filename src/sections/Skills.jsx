import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextScramble from '../components/TextScramble';
import DriftWall from '../components/DriftWall';

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      code: 'FE-01',
      category: 'FRONTEND ENGINEERING',
      description: 'Modern component architectures, fluid motion choreography, and high-DPI responsive design.',
      skills: ['React 19', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Vite', 'Framer Motion'],
    },
    {
      code: 'BE-02',
      category: 'BACKEND & SYSTEMS',
      description: 'Server logic, robust data interchange protocols, and clean application programming interfaces.',
      skills: ['Python', 'Node.js', 'C++', 'PostgreSQL', 'REST APIs', 'JSON Schema', 'Webhooks'],
    },
    {
      code: 'AU-03',
      category: 'AUTOMATION & DEVOPS',
      description: 'Autonomous multi-step pipelines, webhook dispatchers, and continuous deployment workflows.',
      skills: ['n8n Workflows', 'Git / GitHub', 'Docker', 'Netlify Edge', 'CI/CD Pipelines'],
    },
    {
      code: 'AI-04',
      category: 'AI & NEXT-GEN TECH',
      description: 'Leveraging generative AI models, prompt architecture, and conversational interfaces in software.',
      skills: ['AI Model Integration', 'Chatbot Architectures', 'LLM Automation', 'Prompt Engineering'],
    },
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section || prefersReduced) return;

    const ctx = gsap.context(() => {
      // Clean header fade-up on scroll entry
      gsap.from('.skills-editorial-header', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-editorial-header', start: 'top 85%', once: true },
      });

      // Eyebrow divider reveal
      gsap.from('.skills-eyebrow .section-divider', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-eyebrow', start: 'top 88%', once: true },
      });

      // Showcase wrap fade-up
      gsap.from('.drift-wall-showcase-wrap', {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.drift-wall-showcase-wrap', start: 'top 85%', once: true },
      });

      // Categories strip fade-up
      gsap.from('.skills-catalog-grid', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-catalog-grid', start: 'top 88%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="cinematic-skills-section" ref={sectionRef}>
      <div className="container">
        {/* Section Eyebrow */}
        <div className="section-header-tag skills-eyebrow">
          <span className="section-number">04</span>
          <span className="section-divider" />
          <TextScramble text="TECHNOLOGIES & CAPABILITIES" className="section-label" />
        </div>

        {/* Section Header with Refined Editorial Split */}
        <div className="skills-editorial-header">
          <div className="skills-header-main">
            <div className="skills-heading-kicker">
              <span className="kicker-badge">PRODUCTION STACK</span>
              <span className="kicker-dot" />
              <span className="kicker-sub">3D PERSPECTIVE STREAM</span>
            </div>
            <h2 className="skills-headline">TECH STACK</h2>
          </div>
          <div className="skills-header-aside">
            <p className="skills-intro">
              A continuous perspective stream of languages, frameworks, runtime engines, and autonomous automation pipelines engineered in production. Hover or focus any tile to inspect specification details.
            </p>
            <div className="skills-telemetry-tags">
              <span className="tel-chip">16 VERIFIED ENGINES</span>
              <span className="tel-chip">GPU ACCELERATED</span>
              <span className="tel-chip">HOVER TO ELEVATE</span>
            </div>
          </div>
        </div>

        {/* Interactive 3D DriftWall Showcase — Seamlessly integrated with portfolio */}
        <div className="drift-wall-showcase-wrap">
          <DriftWall
            columns={4}
            tileWidth={285}
            tileHeight={160}
            gap={22}
            radius={14}
            tilt={6}
            turn={-5}
            roll={0}
            depth={0}
            perspective={1400}
            speed={36}
            direction="up"
            variance={0.35}
            lift={32}
            parallax={0.2}
          />

          <div className="drift-wall-legend">
            <div className="legend-left">
              <span className="legend-star">✦</span>
              <span className="legend-text">
                INTERACTIVE 3D PERSPECTIVE STREAM • HOVER OR FOCUS TILE TO ELEVATE &amp; INSPECT
              </span>
            </div>
            <div className="legend-right">
              <span className="legend-meta">16 PRODUCTION ENGINES</span>
            </div>
          </div>
        </div>

        {/* Structured Technical Competencies Breakdown */}
        <div className="skills-catalog-grid">
          {skillCategories.map((cat) => (
            <div key={cat.code} className="skills-catalog-col">
              <div className="cat-col-head">
                <span className="cat-code">{cat.code}</span>
                <span className="cat-line" />
              </div>

              <h3 className="cat-title">{cat.category}</h3>
              <p className="cat-desc">{cat.description}</p>

              <div className="skills-tags-cluster">
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cinematic-skills-section {
          padding: 140px 0 120px;
          border-top: 1px solid var(--line-dark);
          background: var(--bg-cream);
          position: relative;
        }

        /* ─── Editorial Header Split ─── */
        .skills-editorial-header {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: flex-end;
          margin-bottom: 2.4rem;
        }

        .skills-header-main {
          display: flex;
          flex-direction: column;
        }

        .skills-heading-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 0.8rem;
        }

        .kicker-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--ink);
          background: var(--accent-lime);
          padding: 2px 7px;
          border-radius: 2px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .kicker-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--line-dark-strong);
        }

        .kicker-sub {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--ink-secondary);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .skills-headline {
          font-size: clamp(2.8rem, 5.2vw, 4.4rem);
          font-family: 'Cabinet Grotesk', 'Syne', sans-serif;
          margin: 0;
          letter-spacing: -0.035em;
          color: var(--ink);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.95;
        }

        .skills-header-aside {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skills-intro {
          font-size: 1.05rem;
          color: var(--ink-secondary);
          line-height: 1.7;
          margin: 0;
          text-wrap: pretty;
        }

        .skills-telemetry-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tel-chip {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--ink);
          background: var(--bg-cream-tint, rgba(17, 17, 20, 0.05));
          border: 1px solid var(--line-dark, rgba(17, 17, 20, 0.15));
          padding: 3px 8px;
          border-radius: 3px;
          letter-spacing: 1px;
        }

        /* ─── 3D DriftWall Showcase Wrap ─── */
        .drift-wall-showcase-wrap {
          margin: 1.8rem 0 4.5rem;
          position: relative;
          width: 100%;
          border-radius: 16px;
          /* Subtle architectural hairline grid texture blending seamlessly with warm ivory background */
          background-image:
            linear-gradient(rgba(17, 17, 20, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17, 17, 20, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
          padding: 10px 0 16px;
        }

        /* Refined Editorial Legend */
        .drift-wall-legend {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 0.5rem 0;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--ink-secondary);
          letter-spacing: 0.8px;
          flex-wrap: wrap;
          gap: 10px;
          border-top: 1px dashed var(--line-dark);
          margin-top: 12px;
        }

        .legend-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-star {
          font-size: 11px;
          color: var(--accent-lime);
        }

        .legend-text {
          text-transform: uppercase;
        }

        .legend-meta {
          color: var(--ink);
          font-weight: 700;
          letter-spacing: 1px;
        }

        .legend-text {
          text-transform: uppercase;
        }

        .legend-meta {
          color: var(--ink);
          font-weight: 700;
          letter-spacing: 1px;
        }

        /* ─── Technical Competencies Breakdown ─── */
        .skills-catalog-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.8rem;
          padding-top: 2.5rem;
          border-top: 1px solid var(--line-dark);
        }

        .skills-catalog-col {
          display: flex;
          flex-direction: column;
        }

        .cat-col-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.2rem;
        }

        .cat-code {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: 1.5px;
        }

        .cat-line {
          flex: 1;
          height: 1px;
          background: var(--line-dark);
        }

        .cat-title {
          font-family: var(--font-heading);
          font-size: 1.08rem;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .cat-desc {
          font-size: 0.86rem;
          color: var(--ink-secondary);
          line-height: 1.6;
          margin-bottom: 1.4rem;
          min-height: 48px;
        }

        .skills-tags-cluster {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .skill-chip {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 4px;
          background: var(--bg-cream-tint);
          border: 1px solid var(--line-dark-strong);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--ink);
          letter-spacing: 0.3px;
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .skill-chip:hover {
          background: var(--ink);
          border-color: var(--ink);
          color: #ffffff;
          transform: translateY(-1px);
        }

        @media (max-width: 1100px) {
          .skills-editorial-header {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .skills-catalog-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (max-width: 650px) {
          .cinematic-skills-section {
            padding: 90px 0 80px;
          }
          .drift-wall-showcase-wrap {
            margin: 1rem 0 3rem;
            background-image: none;
            padding: 0;
          }
          .skills-catalog-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .drift-wall-legend {
            justify-content: center;
            text-align: center;
          }
          .legend-right {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
