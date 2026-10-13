import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import TextScramble from '../components/TextScramble';
import CircularGallery from '../components/CircularGallery';

import vibeTunesImg from '../assets/projects/vibe-tunes.jpg';
import apiPlaygroundImg from '../assets/projects/api-playground.jpg';
import leetCompareImg from '../assets/projects/leet-compare.jpg';
import n8nMeshImg from '../assets/projects/n8n-mesh.jpg';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const sectionRef = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const projects = [
    {
      number: '01',
      title: 'VIBE TUNES',
      tagline: 'Real-Time Interactive Audio Streaming Platform',
      category: 'AUDIO ARCHITECTURE // STREAMING',
      description:
        'A full-spectrum streaming platform engineered with React 19 and the Spotify API. Features low-latency audio state coordination, interactive waveform cues, playlist curation, and seamless dynamic page choreography.',
      metrics: [
        { label: 'Latency', value: '18ms' },
        { label: 'Uptime', value: '99.9%' },
        { label: 'Cloud', value: 'Netlify Edge' },
      ],
      tags: ['React 19', 'Spotify API', 'Framer Motion', 'Audio Engine', 'Netlify'],
      link: 'https://vibe-tunes.netlify.app/',
      github: 'https://github.com/prateek977/Vibe-Tunes-',
      image: vibeTunesImg,
    },
    {
      number: '02',
      title: 'PUBLIC API PLAYGROUND',
      tagline: 'Dynamic API Explorer, Dashboard & Telemetry Mesh',
      category: 'DEVELOPER TOOLING // API HUB',
      description:
        'A versatile developer dashboard aggregating 10+ public REST APIs into a unified explorer. Features dynamic query parameter building, live JSON payload parsing, and error-recovery telemetry.',
      metrics: [
        { label: 'Endpoints', value: '10+ APIs' },
        { label: 'Filter Speed', value: '<5ms' },
        { label: 'Build', value: 'Vite Native' },
      ],
      tags: ['React', 'REST APIs', 'Async State', 'Vite', 'Telemetry'],
      link: 'https://shimmering-concha-667417.netlify.app/',
      github: 'https://github.com/prateek977/Public-API-Playground-',
      image: apiPlaygroundImg,
    },
    {
      number: '03',
      title: 'LEET COMPARE',
      tagline: 'Head-to-Head Competitive Programming Analytics',
      category: 'DATA COMPARISON // TELEMETRY',
      description:
        'A head-to-head developer comparison engine evaluating algorithmic problem-solving velocities, submission streaks, and difficulty tiers parsed directly from competitive programming endpoints.',
      metrics: [
        { label: 'Sync Rate', value: 'Live Feed' },
        { label: 'Tiers', value: 'Hard / Med / Easy' },
        { label: 'Latency', value: 'Instant' },
      ],
      tags: ['React', 'LeetCode API', 'Data Visualization', 'Netlify'],
      link: 'https://leet-compare.netlify.app/',
      github: 'https://github.com/prateek977/Leet-Compare-',
      image: leetCompareImg,
    },
    {
      number: '04',
      title: 'n8n AUTOMATION MESH',
      tagline: 'Autonomous Workflow & Webhook Pipeline Mesh',
      category: 'ENTERPRISE AUTOMATION // DEVOPS',
      description:
        'Multi-step autonomous automation infrastructure orchestrating webhook triggers, API synchronizations, payload transformations, and notifications with zero downtime.',
      metrics: [
        { label: 'Pipelines', value: '05+ Live' },
        { label: 'Efficiency', value: '+85%' },
        { label: 'Execution', value: '<200ms' },
      ],
      tags: ['n8n', 'Webhook Mesh', 'API Automation', 'Docker', 'CI/CD'],
      link: 'https://github.com/prateek977',
      github: 'https://github.com/prateek977',
      image: n8nMeshImg,
    },
  ];

  // CircularGallery items format
  const galleryItems = projects.map((p) => ({
    image: p.image,
    text: p.title,
    description: p.description,
    href: p.link,
    number: p.number,
    category: p.category,
    tagline: p.tagline,
  }));

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section || prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.projects-editorial-header', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-editorial-header', start: 'top 85%', once: true },
      });

      // Eyebrow divider reveal
      gsap.from('.projects-eyebrow .section-divider', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.projects-eyebrow', start: 'top 88%', once: true },
      });

      // Gallery frame fade-in with fromTo (never remains at opacity: 0)
      gsap.fromTo('.projects-gallery-stage', {
        opacity: 0,
        y: 35,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-gallery-stage', start: 'top 90%', once: true },
      });

      // Quick links strip
      gsap.from('.projects-quick-strip', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-quick-strip', start: 'top 88%', once: true },
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
    }, section);

    return () => ctx.revert();
  }, []);

  const currentProject = projects[activeProjectIndex] || projects[0];

  return (
    <section id="projects" className="cinematic-projects-section" ref={sectionRef}>
      <div className="container">
        {/* Section Eyebrow */}
        <div className="section-header-tag projects-eyebrow">
          <span className="section-number">05</span>
          <span className="section-divider" />
          <TextScramble text="SELECTED WORK" className="section-label" />
        </div>

        {/* Section Header */}
        <div className="projects-editorial-header">
          <div className="projects-header-kicker">
            <span className="kicker-tag">CURVED 3D GALLERY</span>
            <span className="kicker-dot" />
            <span className="kicker-meta">DRAG HORIZONTALLY • CLICK TO LAUNCH</span>
          </div>
          <h2 className="projects-headline">SELECTED WORK</h2>
          <p className="projects-intro">
            Interactive streaming architectures, multi-endpoint developer tooling, and autonomous automation pipelines. Navigate the 3D gallery below or launch live deployments directly.
          </p>
        </div>

        {/* React Bits 3D CircularGallery Component */}
        <div className="projects-gallery-stage">
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#09090b"
            itemSize={0.9}
            itemAspect={0.85}
            gap={0.3}
            scrollEase={0.06}
            scrollSpeed={1.5}
            wave={0.7}
            fadeEdges={0.12}
            grayscale={false}
            intro={true}
            openOnClick={false}
            activeIndex={activeProjectIndex}
            onActiveChange={(idx) => {
              setActiveProjectIndex(idx);
            }}
            onItemClick={(item, index) => {
              setActiveProjectIndex(index);
            }}
          />
        </div>

        {/* Interactive Active Project Telemetry Drawer */}
        <div className="projects-quick-strip">
          <div className="active-proj-overview">
            <div className="proj-badge-col">
              <span className="proj-big-num">{currentProject.number}</span>
              <span className="proj-cat-badge">{currentProject.category}</span>
            </div>

            <div className="proj-info-col">
              <h3 className="proj-headline-title">{currentProject.title}</h3>
              <p className="proj-headline-tagline">{currentProject.tagline}</p>
              <p className="proj-body-copy">{currentProject.description}</p>

              <div className="proj-tags-row">
                {currentProject.tags.map((t, i) => (
                  <span key={i} className="proj-pill-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="proj-actions-col">
              <div className="proj-metrics-box">
                {currentProject.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-metric-cell">
                    <span className="p-metric-val">{m.value}</span>
                    <span className="p-metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="proj-btn-group">
                <a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary proj-launch-btn"
                >
                  Launch Live App <ArrowUpRight size={15} />
                </a>
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary proj-git-btn"
                  aria-label={`View ${currentProject.title} source code on GitHub`}
                >
                  <GithubIcon size={14} /> Source
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* All Projects Quick Jump Bar */}
        <div className="projects-nav-selector">
          <span className="nav-selector-lbl">PROJECT INDEX:</span>
          <div className="nav-selector-pills">
            {projects.map((p, idx) => (
              <button
                key={p.number}
                type="button"
                onClick={() => setActiveProjectIndex(idx)}
                className={`proj-select-pill ${idx === activeProjectIndex ? 'is-active' : ''}`}
              >
                <span className="select-num">{p.number}</span>
                <span className="select-title">{p.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-projects-section {
          padding: 140px 0 120px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          background: #FFFFFF;
          position: relative;
        }
        .projects-eyebrow {
          background: #F4F4F5;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .projects-eyebrow .section-number {
          color: #09090B;
        }
        .projects-eyebrow .section-label {
          color: #52525B;
        }
        .projects-editorial-header {
          max-width: 720px;
          margin-bottom: 3.5rem;
        }
        .projects-header-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
        }
        .kicker-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: #000000;
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
          background: rgba(0, 0, 0, 0.25);
        }
        .kicker-meta {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #71717A;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .projects-headline {
          font-size: clamp(2.6rem, 4.5vw, 4.2rem);
          margin-bottom: 1.2rem;
          letter-spacing: -0.04em;
          color: #09090B;
          font-weight: 900;
          text-transform: uppercase;
        }
        .projects-intro {
          font-size: 1.05rem;
          color: #52525B;
          line-height: 1.7;
        }

        /* 3D Gallery Stage */
        .projects-gallery-stage {
          width: 100%;
          margin-bottom: 2rem;
          position: relative;
          background: transparent;
          border: none;
          box-shadow: none;
        }

        /* Active Project Telemetry Drawer — Seamless White */
        .projects-quick-strip {
          background: #FFFFFF;
          border: none;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding: 3rem 0;
          margin-bottom: 2rem;
          box-shadow: none;
        }
        .active-proj-overview {
          display: grid;
          grid-template-columns: 140px 1.4fr 1fr;
          gap: 2.8rem;
          align-items: center;
        }
        .proj-badge-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .proj-big-num {
          font-family: var(--font-heading);
          font-size: 4rem;
          font-weight: 900;
          line-height: 0.9;
          color: #09090B;
          letter-spacing: -0.03em;
        }
        .proj-cat-badge {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          color: #71717A;
          letter-spacing: 1px;
          text-transform: uppercase;
          line-height: 1.4;
        }
        .proj-info-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .proj-headline-title {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 900;
          letter-spacing: -0.025em;
          color: #09090B;
        }
        .proj-headline-tagline {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          color: #18181B;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .proj-body-copy {
          font-size: 0.95rem;
          color: #52525B;
          line-height: 1.7;
          margin-bottom: 14px;
        }
        .proj-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .proj-pill-tag {
          padding: 4px 10px;
          border-radius: 4px;
          background: #F4F4F5;
          border: 1px solid #E4E4E7;
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #18181B;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .proj-pill-tag:hover {
          background: #E4E4E7;
          border-color: #D4D4D8;
        }

        .proj-actions-col {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          justify-content: center;
        }
        .proj-metrics-box {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 16px;
          border-radius: 8px;
          background: #F8F9FA;
          border: 1px solid #E4E4E7;
        }
        .p-metric-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .p-metric-val {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: #09090B;
        }
        .p-metric-lbl {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #71717A;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .proj-btn-group {
          display: flex;
          gap: 10px;
        }
        .proj-launch-btn {
          flex: 1;
          padding: 11px 18px;
          font-size: 12px;
          font-weight: 700;
          background-color: var(--accent-lime);
          color: #000000;
          border: 1px solid #000000;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .proj-launch-btn:hover {
          background-color: #000000;
          border-color: #000000;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        }
        .proj-git-btn {
          padding: 11px 16px;
          font-size: 12px;
          font-weight: 600;
          color: #09090B;
          background-color: #ffffff;
          border: 1px solid #D4D4D8;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .proj-git-btn:hover {
          background-color: #F4F4F5;
          border-color: #09090B;
          color: #000000;
        }

        /* Project Selector Pills */
        .projects-nav-selector {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
        .nav-selector-lbl {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: #71717A;
          letter-spacing: 1px;
        }
        .nav-selector-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .proj-select-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 6px;
          background: #F4F4F5;
          border: 1px solid #E4E4E7;
          cursor: pointer;
          color: #52525B;
          font-family: var(--font-mono);
          font-size: 11px;
          transition: all 0.2s ease;
        }
        .proj-select-pill:hover {
          color: #09090B;
          border-color: #A1A1AA;
          background: #E4E4E7;
        }
        .proj-select-pill.is-active {
          color: #ffffff;
          border-color: #09090B;
          background: #09090B;
          font-weight: 700;
        }
        .proj-select-pill.is-active .select-num {
          color: var(--accent-lime);
        }
        .select-num {
          color: #71717A;
          font-weight: 700;
        }

        @media (max-width: 1050px) {
          .active-proj-overview {
            grid-template-columns: 1fr;
            gap: 1.8rem;
          }
          .proj-badge-col {
            flex-direction: row;
            align-items: baseline;
            gap: 16px;
          }
          .proj-big-num {
            font-size: 3rem;
          }
        }
        @media (max-width: 650px) {
          .cinematic-projects-section {
            padding: 90px 0 80px;
          }
          .projects-quick-strip {
            padding: 2rem 0;
          }
          .proj-metrics-box {
            grid-template-columns: 1fr;
          }
          .proj-btn-group {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
