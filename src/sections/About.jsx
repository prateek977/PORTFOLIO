import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Workflow, Cpu, Layers } from 'lucide-react';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef(null);

  const pillars = [
    {
      num: '01',
      icon: <Code2 size={18} color="#111114" />,
      title: 'FRONTEND ARCHITECTURE',
      desc: 'Crafting responsive, high-performance interfaces in React 19 with fluid micro-interactions and rigorous state management.',
    },
    {
      num: '02',
      icon: <Workflow size={18} color="#111114" />,
      title: 'WORKFLOW AUTOMATION',
      desc: 'Orchestrating autonomous n8n pipelines, webhook triggers, and third-party API syncing to eliminate operational friction.',
    },
    {
      num: '03',
      icon: <Layers size={18} color="#111114" />,
      title: 'SYSTEMS & APIS',
      desc: 'Designing resilient RESTful integrations, structured data contracts, and client-side caching for seamless data delivery.',
    },
    {
      num: '04',
      icon: <Cpu size={18} color="#111114" />,
      title: 'AI INTEGRATION',
      desc: 'Incorporating generative models, vector search, and conversational intelligence into production web applications.',
    },
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section || prefersReduced) return;

    const ctx = gsap.context(() => {
      // Section eyebrow reveal
      gsap.from('.about-section-eyebrow', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-section-eyebrow', start: 'top 88%', once: true },
      });

      gsap.from('.about-statement-headline', {
        opacity: 0,
        y: 32,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-statement-headline', start: 'top 85%', once: true },
      });

      // Body paragraphs staggered
      gsap.from('.about-body-text p', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-body-text', start: 'top 82%', once: true },
      });

      // Pillars stagger from right column
      gsap.from('.catalog-item-row', {
        opacity: 0,
        x: 28,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.catalog-items-list', start: 'top 80%', once: true },
      });

      // Subtle desktop-only scroll parallax for pillars catalog
      if (window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: '.about-editorial-spread',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
          animation: gsap.to('.about-pillars-catalog', {
            y: -35,
            ease: 'none',
          }),
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="cinematic-about-section" ref={sectionRef}>
      <div className="container">
        {/* Section Eyebrow */}
        <div className="section-header-tag about-section-eyebrow">
          <span className="section-number">02</span>
          <span className="section-divider" />
          <TextScramble text="IDENTITY & PHILOSOPHY" className="section-label" />
        </div>

        {/* Editorial Narrative Spread */}
        <div className="about-editorial-spread">
          <div className="about-lead-column">
            <h2 className="about-statement-headline">
              Turning complex technical architectures into <span className="text-black">clear, premium</span> &amp; <span className="text-accent">high-converting</span> digital experiences.
            </h2>

            <div className="about-body-text">
              <p>
                I am a <strong>Web Developer &amp; Automation Architect</strong> dedicated to building high-performance, visually articulate applications. With a foundation spanning modern React ecosystems and backend services, I transform complex ideas into reliable, scalable digital products.
              </p>
              <p>
                My focus centers on <strong>clean architecture and strategic automation</strong>. I believe software should not only look refined, but should also execute with speed, accessibility, and architectural resilience.
              </p>
              <p>
                Beyond standard development, I specialize in <strong>workflow orchestration with n8n</strong> and AI tooling—automating repetitive processes, integrating heterogeneous APIs, and enabling data to flow seamlessly across client stacks.
              </p>
            </div>
          </div>

          {/* Architectural Pillars Index */}
          <div className="about-pillars-catalog">
            <div className="catalog-header">
              <span className="catalog-eyebrow">CORE DISCIPLINES</span>
              <span className="catalog-count">[04 PILLARS]</span>
            </div>

            <div className="catalog-items-list">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="catalog-item-row">
                  <div className="catalog-item-meta">
                    <span className="catalog-item-num">{pillar.num}</span>
                    <span className="catalog-item-icon">{pillar.icon}</span>
                  </div>
                  <div className="catalog-item-content">
                    <h3 className="catalog-item-title">{pillar.title}</h3>
                    <p className="catalog-item-desc">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-about-section {
          padding: 140px 0 120px;
          border-top: 1px solid var(--line-dark);
          background: var(--bg-cream);
          position: relative;
        }
        .about-editorial-spread {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 5.5rem;
          align-items: start;
        }
        .about-statement-headline {
          font-size: clamp(2.2rem, 4vw, 3.8rem);
          line-height: 1.08;
          margin-bottom: 2.5rem;
          color: var(--ink-secondary);
          letter-spacing: -0.035em;
          font-weight: 800;
        }
        .text-black { color: var(--ink); }
        .text-accent {
          color: var(--ink);
          background: linear-gradient(180deg, transparent 65%, var(--accent-lime) 65%);
          padding: 0 4px;
        }
        .about-body-text {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--ink-secondary);
          max-width: 620px;
        }
        .about-body-text strong {
          color: var(--ink);
          font-weight: 700;
        }
        .about-pillars-catalog {
          display: flex;
          flex-direction: column;
          padding-top: 0.5rem;
        }
        .catalog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid var(--line-dark-strong);
          margin-bottom: 1.5rem;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--ink-secondary);
          letter-spacing: 1.5px;
        }
        .catalog-count {
          color: var(--ink);
          background: var(--accent-lime);
          padding: 2px 6px;
          border-radius: 2px;
          font-weight: 700;
        }
        .catalog-items-list {
          display: flex;
          flex-direction: column;
        }
        .catalog-item-row {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 1.5rem;
          padding: 1.8rem 1.2rem;
          border-bottom: 1px solid var(--line-dark);
          position: relative;
          border-left: 2px solid transparent;
          border-radius: 0 4px 4px 0;
          transition: border-color 0.35s ease, border-left-color 0.35s ease, background-color 0.35s ease, transform 0.35s var(--ease-out-quint);
          will-change: transform;
        }
        .catalog-item-row:hover {
          border-bottom-color: var(--line-dark-strong);
          border-left-color: var(--ink);
          background-color: var(--bg-cream-tint);
          transform: translateX(8px);
        }
        .catalog-item-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .catalog-item-num {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: 1px;
        }
        .catalog-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          background: var(--bg-cream-dark);
        }
        .catalog-item-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }
        .catalog-item-desc {
          font-size: 0.92rem;
          color: var(--ink-secondary);
          line-height: 1.65;
        }

        @media (max-width: 1024px) {
          .about-editorial-spread {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
