import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export const Achievements = () => {
  const sectionRef = useRef(null);

  const achievements = [
    {
      metric: '08+',
      title: 'FULL-STACK WEB DEPLOYMENTS',
      category: 'SOFTWARE ENGINEERING',
      description:
        'Engineered and deployed responsive, production-ready web applications with zero-downtime hosting on Netlify Edge CDN and modern continuous integration pipelines.',
    },
    {
      metric: '10+',
      title: 'HETEROGENEOUS APIS INTEGRATED',
      category: 'SYSTEMS ARCHITECTURE',
      description:
        'Connected real-time third-party streaming APIs, complex JSON schema serialization endpoints, and webhook triggers with resilient client-side caching and sub-18ms latency.',
    },
    {
      metric: '05+',
      title: 'AUTONOMOUS N8N WORKFLOWS',
      category: 'WORKFLOW AUTOMATION',
      description:
        'Architected multi-step automation pipelines handling scheduled data extraction, automated webhook response dispatchers, and autonomous developer notification workflows.',
    },
    {
      metric: '100%',
      title: 'COMMITMENT TO PRODUCTION CRAFT',
      category: 'CODE QUALITY & ACCESSIBILITY',
      description:
        'Delivering accessible, semantic, and performant web code adhering strictly to WCAG AA guidelines, clean modular component boundaries, and high-DPI visual excellence.',
    },
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section || prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.from('.achievements-editorial-header', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.achievements-editorial-header', start: 'top 85%', once: true },
      });

      // Eyebrow divider reveal
      gsap.from('.achievements-eyebrow .section-divider', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.achievements-eyebrow', start: 'top 88%', once: true },
      });

      // Grid cols — each big metric number reveals while visible
      const cols = gsap.utils.toArray('.achievement-catalog-col');
      cols.forEach((col, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: col, start: 'top 85%', once: true },
        });

        tl.from(col, {
          opacity: 0,
          y: 32,
          duration: 0.65,
          delay: i * 0.1,
          ease: 'power3.out',
        })
        .from(
          col.querySelector('.achievement-huge-number'),
          {
            clipPath: 'inset(100% 0 0 0)',
            duration: 0.6,
            ease: 'power4.out',
          },
          `-=${0.4}`
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" className="cinematic-achievements-section" ref={sectionRef}>
      <div className="container">
        {/* Section Eyebrow */}
        <div className="section-header-tag achievements-eyebrow">
          <span className="section-number">06</span>
          <span className="section-divider" />
          <TextScramble text="MILESTONES & IMPACT" className="section-label" />
        </div>

        {/* Section Header */}
        <div className="achievements-editorial-header">
          <h2 className="achievements-headline">Proven Track Record</h2>
          <p className="achievements-intro">
            Key engineering accomplishments, verified deployment metrics, and architectural outcomes delivered across client solutions.
          </p>
        </div>

        {/* Typographic Metrics Grid */}
        <div className="achievements-catalog-grid">
          {achievements.map((item, index) => (
            <div key={index} className="achievement-catalog-col">
              <div className="metric-header-row">
                <span className="achievement-huge-number">{item.metric}</span>
                <span className="achievement-corner-dash" />
              </div>

              <span className="achievement-cat-label">{item.category}</span>
              <h3 className="achievement-item-title">{item.title}</h3>
              <p className="achievement-item-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cinematic-achievements-section {
          padding: 140px 0 120px;
          border-top: 1px solid var(--line-dark);
          background: var(--bg-cream);
          position: relative;
        }
        .achievements-editorial-header {
          max-width: 680px;
          margin-bottom: 4.5rem;
        }
        .achievements-headline {
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          margin-bottom: 1rem;
          letter-spacing: -0.035em;
          color: var(--ink);
          font-weight: 800;
        }
        .achievements-intro {
          font-size: 1.05rem;
          color: var(--ink-secondary);
          line-height: 1.7;
        }
        .achievements-catalog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4.5rem 5.5rem;
          border-top: 1px solid var(--line-dark);
          padding-top: 3.5rem;
        }
        .achievement-catalog-col {
          display: flex;
          flex-direction: column;
          will-change: opacity, transform;
        }
        .metric-header-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--line-dark);
          margin-bottom: 1.4rem;
        }
        .achievement-huge-number {
          font-family: var(--font-heading);
          font-size: clamp(3.2rem, 5.5vw, 4.8rem);
          font-weight: 900;
          color: var(--ink);
          line-height: 0.9;
          letter-spacing: -0.04em;
        }
        .achievement-corner-dash {
          width: 10px;
          height: 10px;
          background: var(--accent-lime);
        }
        .achievement-cat-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--ink-secondary);
          letter-spacing: 1.5px;
          margin-bottom: 0.6rem;
        }
        .achievement-item-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: 0.5px;
          margin-bottom: 0.8rem;
        }
        .achievement-item-desc {
          font-size: 0.98rem;
          color: var(--ink-secondary);
          line-height: 1.7;
        }

        @media (max-width: 900px) {
          .achievements-catalog-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Achievements;
