import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const sectionRef = useRef(null);

  const experiences = [
    {
      period: '2025 — PRESENT',
      role: 'Full-Stack Developer & Automation Architect',
      organization: 'Independent & Client Solutions',
      badge: 'PRODUCTION SYSTEMS',
      description:
        'Architecting modern web applications, scalable client dashboards, and automated business workflows. Leading end-to-end frontend engineering using React 19 and integrating complex third-party API backbones with sub-millisecond data transformation.',
      deliverables: [
        'Production web apps engineered with React 19, Vite, and high-performance state architectures',
        'Multi-step autonomous n8n workflows orchestrating automated webhook responses and scheduled syncs',
        'Low-latency client-side caching strategies and robust error recovery layers',
      ],
      tags: ['React 19', 'n8n Automation', 'REST APIs', 'Vite', 'Framer Motion'],
    },
    {
      period: '2025 — 2026',
      role: 'Streaming Audio Architecture & Frontend Engineering',
      organization: 'Vibe Audio Core Platform',
      badge: 'INTERACTIVE MEDIA',
      description:
        'Engineered an interactive music streaming interface utilizing the Spotify API platform. Implemented low-latency audio state coordination, interactive waveform progress bars, dynamic playlist management, and responsive choreographed page transitions.',
      deliverables: [
        'Real-time streaming integration with OAuth authorization flow',
        'Stateful audio queue management with sub-millisecond UI updates',
        'Zero-flicker dynamic view transitions built with Framer Motion',
      ],
      tags: ['Audio API', 'Spotify API', 'React', 'Framer Motion', 'State Machines'],
    },
    {
      period: '2024 — 2025',
      role: 'API Engineering & Developer Tooling Lead',
      organization: 'Public API Playground & Analytics Hub',
      badge: 'DEVELOPER INFRASTRUCTURE',
      description:
        'Designed a versatile developer dashboard aggregating 10+ public APIs into a unified exploration mesh. Built query-building parameters, JSON payload inspection tools, and latency telemetry graphs for developer speed.',
      deliverables: [
        'Unified multi-endpoint explorer with modular component design',
        'Real-time response time telemetry and live payload formatting',
        'Automated CI/CD build actions and Netlify edge deployment',
      ],
      tags: ['API Integration', 'Data Visualization', 'Netlify Edge', 'JavaScript'],
    },
    {
      period: '2024 — 2025',
      role: 'Competitive Algorithmic Telemetry Engineer',
      organization: 'Leet Compare Project',
      badge: 'DATA COMPARISON',
      description:
        'Built a head-to-head developer comparison engine evaluating algorithmic problem-solving velocities, submission streaks, and difficulty tiers parsed directly from competitive programming endpoints.',
      deliverables: [
        'Direct comparative analytics engine parsing historical streaks',
        'Automated metrics synchronization with sub-5ms query response',
        'Mobile-first responsive comparative visual charts',
      ],
      tags: ['LeetCode API', 'Analytics', 'Responsive UI', 'Netlify'],
    },
  ];

  const spineTrackRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section || prefersReduced) return;

    const ctx = gsap.context(() => {
      // Intro column reveal
      gsap.from('.experience-intro-col', {
        opacity: 0,
        x: -28,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.experience-intro-col', start: 'top 82%', once: true },
      });

      // Eyebrow divider reveal
      gsap.from('.experience-eyebrow .section-divider', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.experience-eyebrow', start: 'top 88%', once: true },
      });

      // Animated vertical spine line drawing on scroll
      if (spineTrackRef.current) {
        gsap.fromTo(
          '.timeline-spine-fill',
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.experience-timeline-catalog',
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.4,
            },
          }
        );
      }

      // Timeline rows stagger
      gsap.from('.timeline-entry-row', {
        opacity: 0,
        y: 35,
        duration: 0.65,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.experience-timeline-catalog', start: 'top 82%', once: true },
      });

      // Nodes pulse and light up as scrolled past
      gsap.utils.toArray('.timeline-node-marker').forEach((marker) => {
        gsap.fromTo(
          marker,
          { scale: 0.7, borderColor: 'var(--line-dark-strong)', backgroundColor: 'var(--bg-cream)' },
          {
            scale: 1,
            borderColor: 'var(--ink)',
            backgroundColor: 'var(--accent-lime)',
            duration: 0.45,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: marker,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Deliverable items stagger per row
      gsap.utils.toArray('.entry-deliverables-list').forEach((list) => {
        gsap.from(list.querySelectorAll('.deliverable-item'), {
          opacity: 0,
          x: 16,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: list, start: 'top 85%', once: true },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="cinematic-experience-section" ref={sectionRef}>
      <div className="container">
        {/* Section Eyebrow */}
        <div className="section-header-tag experience-eyebrow">
          <span className="section-number">03</span>
          <span className="section-divider" />
          <TextScramble text="TRAJECTORY & SYSTEMS" className="section-label" />
        </div>

        {/* Editorial Split Spread */}
        <div className="experience-editorial-spread">
          {/* Left Column: Sticky Title & Summary */}
          <div className="experience-intro-col">
            <h2 className="experience-headline">Engineering Trajectory</h2>
            <p className="experience-intro-text">
              Production web applications, automated business backbones, and low-latency API orchestrations delivered with architectural precision.
            </p>
            <div className="experience-metric-summary">
              <span className="metric-tag">[PRODUCTION TRACK RECORD]</span>
              <span className="metric-count">04 MILESTONES // ACTIVE</span>
            </div>
          </div>

          {/* Right Column: Typographic Connected Timeline Entries */}
          <div className="experience-timeline-catalog" ref={spineTrackRef}>
            {/* Continuous Vertical Spine Track */}
            <div className="timeline-continuous-spine" aria-hidden="true">
              <div className="timeline-spine-track">
                <div className="timeline-spine-fill" />
              </div>
            </div>

            {experiences.map((exp, idx) => (
              <article key={idx} className="timeline-entry-row">
                <div className="entry-header-meta">
                  <span className="entry-period">{exp.period}</span>
                  <span className="entry-badge">{exp.badge}</span>
                </div>

                <div className="entry-node-col" aria-hidden="true">
                  <div className="timeline-node-marker">
                    <span className="node-marker-glow" />
                  </div>
                </div>

                <div className="entry-body">
                  <h3 className="entry-role-title">{exp.role}</h3>
                  <h4 className="entry-org-name">{exp.organization}</h4>
                  <p className="entry-description">{exp.description}</p>

                  <ul className="entry-deliverables-list">
                    {exp.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="deliverable-item">
                        <span className="deliverable-arrow">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="entry-tags-row">
                    {exp.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="entry-tag-chip">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-experience-section {
          padding: 140px 0 120px;
          border-top: 1px solid var(--line-dark);
          background: var(--bg-cream);
          position: relative;
        }
        .experience-editorial-spread {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 5.5rem;
          align-items: start;
        }
        .experience-intro-col {
          position: sticky;
          top: 120px;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .experience-headline {
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: var(--ink);
          font-weight: 800;
        }
        .experience-intro-text {
          font-size: 1.05rem;
          color: var(--ink-secondary);
          line-height: 1.7;
        }
        .experience-metric-summary {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 1.5rem;
          border-top: 1px solid var(--line-dark);
          font-family: var(--font-mono);
          font-size: 11px;
        }
        .metric-tag {
          color: var(--ink);
          font-weight: 700;
        }
        .metric-count {
          color: var(--ink-muted);
        }
        .experience-timeline-catalog {
          display: flex;
          flex-direction: column;
          position: relative;
        }
        /* Continuous Vertical Timeline Spine */
        .timeline-continuous-spine {
          position: absolute;
          left: 179px;
          top: 15px;
          bottom: 40px;
          width: 2px;
          pointer-events: none;
          z-index: 1;
        }
        .timeline-spine-track {
          width: 100%;
          height: 100%;
          background: var(--line-dark);
          position: relative;
          overflow: hidden;
        }
        .timeline-spine-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--ink);
          transform-origin: top center;
        }
        .timeline-entry-row {
          display: grid;
          grid-template-columns: 160px 40px 1fr;
          gap: 1.5rem;
          padding: 3rem 0;
          border-bottom: 1px solid var(--line-dark);
          transition: border-color 0.35s ease;
          position: relative;
          z-index: 2;
          will-change: opacity, transform;
        }
        .timeline-entry-row:first-child { padding-top: 0; }
        .timeline-entry-row:hover { border-bottom-color: var(--line-dark-strong); }
        .entry-header-meta {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .entry-period {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: 0.5px;
        }
        .entry-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--ink);
          background: var(--accent-lime);
          padding: 2px 6px;
          border-radius: 2px;
          width: fit-content;
          letter-spacing: 0.8px;
        }
        /* Interactive Node Marker */
        .entry-node-col {
          display: flex;
          justify-content: center;
          padding-top: 4px;
        }
        .timeline-node-marker {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid var(--line-dark-strong);
          background: var(--bg-cream);
          position: relative;
          transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
        }
        .entry-body {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .entry-role-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.02em;
        }
        .entry-org-name {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          color: var(--ink-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .entry-description {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--ink-secondary);
          margin-top: 0.2rem;
        }
        .entry-deliverables-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin: 0.6rem 0;
        }
        .deliverable-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.92rem;
          color: var(--ink-secondary);
          line-height: 1.6;
        }
        .deliverable-arrow {
          color: var(--ink);
          font-weight: 700;
        }
        .entry-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 0.6rem;
        }
        .entry-tag-chip {
          padding: 4px 10px;
          border-radius: 3px;
          background: var(--bg-cream-tint);
          border: 1px solid var(--line-dark);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--ink);
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        @media (max-width: 1024px) {
          .experience-editorial-spread {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .experience-intro-col {
            position: relative;
            top: 0;
          }
          .timeline-continuous-spine { display: none; }
          .timeline-entry-row {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 2.2rem 0;
          }
          .entry-node-col { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
