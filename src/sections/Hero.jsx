import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import heroPortrait from '../assets/hero-portrait.png';
import mountainImg from '../assets/mountain-editorial.jpg';
import filmTexture from '../assets/film-texture.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial Hero Section
 * 
 * Recreates the exact composition, proportions, and visual hierarchy from the reference:
 * - Left: Oversized two-line typography (PRATEEK in ultra-bold condensed sans, JAISWAL in high-contrast serif)
 * - Center-Right: Large cinematic cutout portrait of Prateek overlapping the right edge of typography
 * - Background Collage:
 *   1. Tall dark vertical concrete/monolith pillar behind subject
 *   2. Monochrome alpine mountain photograph card with clouds
 *   3. Vibrant acid-lime (#D4FF28) rectangular accents
 *   4. Crinkled dark cellophane/film texture swatch with hairline rule
 *   5. Thin oversized circular outline with crosshair geometry
 *   6. Rotating circular badge stamp on upper-right
 *   7. Expressive handwritten ink signature flourish
 * - Left content: Introduction pitch and underlined "EXPLORE MY WORK ↗" CTA
 * - Top & Bottom metadata: Clean clearance below fixed navbar, coordinates and scroll cue
 */
export const Hero = ({ onExploreClick, onContactClick }) => {
  const sectionRef = useRef(null);
  const metaTopLeftRef = useRef(null);
  const metaTopRightRef = useRef(null);
  const nameTopRef = useRef(null);
  const nameBottomRef = useRef(null);
  const leadRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollCueRef = useRef(null);
  const coordsRef = useRef(null);

  // Collage and subject layer references
  const stageRef = useRef(null);
  const circleArcRef = useRef(null);
  const monolithRef = useRef(null);
  const mountainCardRef = useRef(null);
  const limeTopRef = useRef(null);
  const limeBottomRef = useRef(null);
  const limeWaistRef = useRef(null);
  const filmStripRef = useRef(null);
  const stampBadgeRef = useRef(null);
  const signatureRef = useRef(null);
  const portraitWrapRef = useRef(null);
  const portraitImgRef = useRef(null);
  const mountainImgRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // ─── Initial Hidden States (transforms only, zero layout shifts) ───
      gsap.set([metaTopLeftRef.current, metaTopRightRef.current], { opacity: 0, y: -14 });
      
      // 1 & 2: Typographic masked initial states (complementary opposing directions)
      // PRATEEK rises from below mask
      gsap.set(nameTopRef.current, { yPercent: 120 });
      // JAISWAL descends gracefully from above mask
      gsap.set(nameBottomRef.current, { yPercent: -120 });

      // Paragraph & CTA initial states
      gsap.set(leadRef.current, { opacity: 0, y: 22 });
      gsap.set(ctaRef.current, { opacity: 0, y: 16 });

      // Bottom telemetry initial states
      gsap.set([scrollCueRef.current, coordsRef.current], { opacity: 0, y: 14 });

      // Background collage initial states
      gsap.set(circleArcRef.current, { opacity: 0, scale: 0.92 });
      gsap.set(monolithRef.current, { opacity: 0, scaleY: 0.85, transformOrigin: 'bottom center' });
      gsap.set(mountainCardRef.current, { opacity: 0, x: 28, scale: 0.96 });
      gsap.set([limeTopRef.current, limeBottomRef.current, limeWaistRef.current], {
        opacity: 0,
        scale: 0.82,
      });
      gsap.set(filmStripRef.current, { opacity: 0, x: -25 });
      gsap.set(stampBadgeRef.current, { opacity: 0, rotate: -35, scale: 0.82 });
      gsap.set(signatureRef.current, { opacity: 0, scale: 0.88 });

      // 3: Portrait initial state (opacity-and-scale with bottom anchor & subtle clip reveal)
      gsap.set(portraitWrapRef.current, {
        opacity: 0,
        scale: 1.05,
        transformOrigin: 'bottom center',
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      });

      // ─── Coordinated Entrance Choreography ───
      tl
        // 1. Top metadata fades in smoothly
        .to([metaTopLeftRef.current, metaTopRightRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
        }, 0.06)

        // 2. Geometry circle outline reveals
        .to(circleArcRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.95,
          ease: 'power2.out',
        }, 0.12)

        // 3. Dark monolith pillar anchors up from bottom
        .to(monolithRef.current, {
          opacity: 1,
          scaleY: 1,
          duration: 0.85,
          ease: 'power3.out',
        }, 0.18)

        // 4. Acid-lime accent blocks expand
        .to([limeTopRef.current, limeBottomRef.current, limeWaistRef.current], {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
        }, 0.24)

        // 5. Alpine mountain photo card glides into place
        .to(mountainCardRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
        }, 0.28)

        // 6. Crinkled dark cellophane texture swatch
        .to(filmStripRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
        }, 0.32)

        // 7. Reveal PRATEEK using masked text animation (rising from below)
        .to(nameTopRef.current, {
          yPercent: 0,
          duration: 1.05,
          ease: 'power4.out',
        }, 0.28)

        // 8. Reveal JAISWAL with complementary timing and direction (descending from above)
        .to(nameBottomRef.current, {
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
        }, 0.40)

        // 9. Reveal the portrait using subtle clip-path and opacity-and-scale transition
        .to(portraitWrapRef.current, {
          opacity: 1,
          scale: 1.0,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.2,
          ease: 'power3.out',
        }, 0.44)

        // 10. Stamp badge and signature flourish
        .to(stampBadgeRef.current, {
          opacity: 1,
          rotate: 0,
          scale: 1,
          duration: 0.75,
          ease: 'back.out(1.4)',
        }, 0.62)
        .to(signatureRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: 'power2.out',
        }, 0.68)

        // 11. Stagger supporting paragraph, CTA, and telemetry
        .to(leadRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, 0.72)
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
        }, 0.84)
        .to([scrollCueRef.current, coordsRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        }, 0.94);

      // ─── Subtle Scroll-Driven Parallax and Section Transition ───
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        animation: gsap.timeline()
          .to('.hero-content-left', { y: -50, opacity: 0.35, ease: 'none' }, 0)
          .to(portraitWrapRef.current, { y: -30, scale: 0.985, ease: 'none' }, 0)
          .to(mountainCardRef.current, { y: -65, ease: 'none' }, 0)
          .to(monolithRef.current, { y: -35, ease: 'none' }, 0)
          .to(circleArcRef.current, { y: -20, ease: 'none' }, 0),
      });

      // Quick scroll cue fade out as soon as user begins scrolling
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '80px top',
        scrub: true,
        animation: gsap.to(scrollCueRef.current, { opacity: 0, y: -8, ease: 'none' }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Desktop Pointer Parallax Effect (Fine pointers only, decoupled from scroll parallax)
  useEffect(() => {
    // Only on desktop screens with a mouse / fine pointer
    if (window.innerWidth < 1024) return;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const portraitImg = portraitImgRef.current;
    const mountainImgEl = mountainImgRef.current;
    const monolith = monolithRef.current;
    if (!portraitImg || !mountainImgEl) return;

    // Use quickTo on inner elements or horizontal axis to avoid conflicting with ScrollTrigger on 'y'
    const movePortraitX = gsap.quickTo(portraitImg, 'x', { duration: 0.8, ease: 'power2.out' });
    const moveMountainX = gsap.quickTo(mountainImgEl, 'x', { duration: 0.9, ease: 'power2.out' });
    const moveMonolithX = monolith ? gsap.quickTo(monolith, 'x', { duration: 1.0, ease: 'power2.out' }) : null;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;

      movePortraitX(nx * 10);
      moveMountainX(nx * -12);
      if (moveMonolithX) moveMonolithX(nx * -6);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="hero-editorial-section" ref={sectionRef}>
      {/* ─── Top Editorial Metadata Bar ─── */}
      <div className="hero-meta-topbar">
        <div className="hero-meta-left" ref={metaTopLeftRef}>
          <div className="hero-meta-roles">
            <span className="hero-meta-title">SOFTWARE ENGINEER</span>
            <span className="hero-meta-title">&amp; AUTOMATION ENTHUSIAST</span>
          </div>
          <div className="hero-meta-badge-wrap">
            <span className="hero-meta-index">( 01 )</span>
            <span className="hero-meta-rule" aria-hidden="true" />
          </div>
        </div>

        <div className="hero-meta-right" ref={metaTopRightRef}>
          <span className="hero-meta-location">PUNE, INDIA</span>
          <span className="hero-meta-tz">( GMT+5:30 )</span>
        </div>
      </div>

      {/* ─── Main Hero Editorial Canvas Stage ─── */}
      <div className="hero-stage-container" ref={stageRef}>

        {/* ── LAYER A: BACKGROUND COLLAGE (Strictly behind portrait & typography) ── */}
        <div className="hero-collage-underlay" aria-hidden="true">

          {/* 1. Thin Oversized Circular Outline + Architectural Crosshair */}
          <div className="collage-circle-wrap" ref={circleArcRef}>
            <svg viewBox="0 0 680 680" className="collage-circle-svg">
              <circle
                cx="340"
                cy="340"
                r="310"
                fill="none"
                stroke="rgba(17, 17, 20, 0.16)"
                strokeWidth="1"
              />
              <circle
                cx="340"
                cy="340"
                r="220"
                fill="none"
                stroke="rgba(17, 17, 20, 0.04)"
                strokeWidth="0.8"
              />
              {/* Vertical Guide Line on the Right */}
              <line
                x1="520"
                y1="30"
                x2="520"
                y2="650"
                stroke="rgba(17, 17, 20, 0.22)"
                strokeWidth="0.8"
              />
              {/* Architectural Axis Ticks */}
              <line x1="340" y1="20" x2="340" y2="40" stroke="rgba(17, 17, 20, 0.3)" strokeWidth="1" />
              <line x1="340" y1="640" x2="340" y2="660" stroke="rgba(17, 17, 20, 0.3)" strokeWidth="1" />
              <line x1="20" y1="340" x2="40" y2="340" stroke="rgba(17, 17, 20, 0.25)" strokeWidth="1" />
              {/* Star Sparkle on Vertical Axis */}
              <path
                d="M 520 156 L 521.8 162 L 527.8 163.8 L 521.8 165.6 L 520 171.6 L 518.2 165.6 L 512.2 163.8 L 518.2 162 Z"
                fill="rgba(17, 17, 20, 0.55)"
              />
            </svg>
          </div>

          {/* 2. Tall Dark Concrete / Monolith Column (Positioned directly behind subject's center) */}
          <div className="collage-monolith-pillar" ref={monolithRef} />

          {/* 3. Small Acid-Lime Rectangular Accents (#D4FF28) */}
          {/* Upper-Left Accent behind mountain */}
          <div className="collage-lime-accent lime-mountain-top" ref={limeTopRef} />
          {/* Lower-Right Accent behind mountain */}
          <div className="collage-lime-accent lime-mountain-bottom" ref={limeBottomRef} />
          {/* Subtle Accent behind left waist */}
          <div className="collage-lime-accent lime-waist-soft" ref={limeWaistRef} />

          {/* 4. Large Monochrome Alpine Mountain Photographic Card */}
          <div className="collage-mountain-card" ref={mountainCardRef}>
            <img
              ref={mountainImgRef}
              src={mountainImg}
              alt="Monochrome Alpine Mountain Peak"
              className="collage-mountain-img"
              loading="eager"
            />
            <div className="mountain-card-overlay" />
          </div>

          {/* 5. Horizontal Dark Crinkled Film / Cellophane Texture Swatch (Bottom-Left) */}
          <div className="collage-film-strip" ref={filmStripRef}>
            <div className="film-strip-inner">
              <img
                src={filmTexture}
                alt="Crinkled Film Texture"
                className="collage-film-img"
                loading="eager"
              />
            </div>
            <div className="film-strip-hairline" />
          </div>

          {/* 6. Rotating Circular Badge Stamp (Upper-Right) */}
          <div className="collage-stamp-badge" ref={stampBadgeRef}>
            <svg viewBox="0 0 160 160" className="stamp-svg">
              <defs>
                <path
                  id="stamp-circle-track"
                  d="M 80, 80 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
                />
              </defs>
              <text className="stamp-text">
                <textPath href="#stamp-circle-track" startOffset="0%">
                  AUTOMATE · BUILD · AUTOMATE · REPEAT ·
                </textPath>
              </text>
              {/* Delicate 4-Point Star Motif in Center */}
              <path
                d="M 80 62 Q 80 80 62 80 Q 80 80 80 98 Q 80 80 98 80 Q 80 80 80 62 Z"
                fill="var(--ink)"
              />
            </svg>
          </div>

          {/* 7. Expressive Handwritten Signature Flourish (Across mountain card) */}
          <div className="collage-signature-wrap" ref={signatureRef}>
            <svg viewBox="0 0 220 180" className="signature-svg">
              <path
                d="M 20 115 C 45 60, 65 30, 85 70 C 105 110, 115 50, 135 30 C 150 15, 170 80, 185 45 M 75 72 L 195 140 M 135 110 Q 170 135 195 95"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

        </div>

        {/* ── LAYER B: MONOLITHIC HEADLINE & EDITORIAL CONTENT (Left Column) ── */}
        <div className="hero-content-left">
          {/* Oversized Typographic Statement */}
          <div className="hero-typography-block">
            {/* "PRATEEK" (Oversized, Bold Condensed Sans) */}
            <div className="hero-text-mask">
              <h1 className="hero-name-prateek" ref={nameTopRef}>
                PRATEEK
              </h1>
            </div>

            {/* "JAISWAL" (Contrasting Elegant Serif) */}
            <div className="hero-text-mask">
              <h2 className="hero-name-jaiswal" ref={nameBottomRef}>
                JAISWAL
              </h2>
            </div>
          </div>

          {/* Lead Intro Pitch */}
          <p className="hero-intro-pitch" ref={leadRef}>
            I architect <strong>digital experiences</strong> with precise code and strategic automation — bridging creative design vision and robust production engineering.
          </p>

          {/* Underlined Editorial CTA */}
          <div className="hero-cta-wrapper" ref={ctaRef}>
            <a
              href="#projects"
              onClick={onExploreClick}
              className="hero-editorial-cta"
            >
              <span className="cta-label">EXPLORE MY WORK</span>
              <span className="cta-arrow-icon">
                <ArrowUpRight size={17} />
              </span>
            </a>
          </div>
        </div>

        {/* ── LAYER C: LARGE CINEMATIC FOREGROUND PORTRAIT (Center-Right) ── */}
        <div className="hero-portrait-foreground" ref={portraitWrapRef}>
          <img
            ref={portraitImgRef}
            src={heroPortrait}
            alt="Prateek Jaiswal — Software Engineer & Automation Enthusiast"
            className="hero-portrait-img"
            loading="eager"
          />
        </div>

      </div>

      {/* ─── Bottom Editorial Telemetry Bar ─── */}
      <div className="hero-meta-bottombar">
        {/* Scroll Cue Indicator */}
        <div className="hero-scroll-indicator" ref={scrollCueRef}>
          <span className="scroll-tag">SCROLL</span>
          <div className="scroll-hairline-track">
            <span className="scroll-dot" />
          </div>
        </div>

        {/* Coordinates with Delicate Star Tick */}
        <div className="hero-coordinates" ref={coordsRef}>
          <span className="coords-sparkle">✦</span>
          <div className="coords-text">
            <span>18.5204° N</span>
            <span>73.8567° E</span>
          </div>
        </div>
      </div>

      {/* ─── Inlined Scoped Editorial Styles ─── */}
      <style>{`
        .hero-editorial-section {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background-color: var(--bg-cream, #F4F0EA);
          padding: clamp(84px, 10.5vh, 104px) clamp(1.8rem, 4vw, 4.5rem) 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        /* ─── Top Metadata Bar ─── */
        .hero-meta-topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          max-width: 1560px;
          margin: 0 auto clamp(0.8rem, 1.8vh, 1.6rem);
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: var(--ink-secondary, #4A4843);
          letter-spacing: 1.2px;
          text-transform: uppercase;
          z-index: 20;
          position: relative;
        }

        .hero-meta-left {
          display: flex;
          align-items: flex-start;
          gap: clamp(1rem, 2.5vw, 2.5rem);
        }

        .hero-meta-roles {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .hero-meta-title {
          font-weight: 700;
          line-height: 1.35;
          color: var(--ink, #111114);
        }

        .hero-meta-badge-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 2px;
        }

        .hero-meta-index {
          font-size: 10.5px;
          color: var(--ink-secondary, #4A4843);
          letter-spacing: 1.8px;
          font-weight: 600;
        }

        .hero-meta-rule {
          display: inline-block;
          width: clamp(24px, 4vw, 60px);
          height: 1px;
          background: rgba(17, 17, 20, 0.25);
        }

        .hero-meta-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          text-align: right;
        }

        .hero-meta-location {
          font-weight: 700;
          color: var(--ink, #111114);
        }

        .hero-meta-tz {
          font-size: 10px;
          color: var(--ink-muted, #7A766E);
        }

        /* ─── Main Hero Canvas Stage ─── */
        .hero-stage-container {
          position: relative;
          width: 100%;
          max-width: 1560px;
          margin: 0 auto;
          min-height: clamp(560px, 72vh, 800px);
          display: flex;
          align-items: center;
          flex-grow: 1;
        }

        /* ─── LAYER A: BACKGROUND COLLAGE UNDERLAY ─── */
        .hero-collage-underlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        /* 1. Thin Oversized Circular Outline */
        .collage-circle-wrap {
          position: absolute;
          left: clamp(48%, 52vw, 56%);
          top: 48%;
          transform: translate(-50%, -50%);
          width: clamp(560px, 56vw, 820px);
          height: clamp(560px, 56vw, 820px);
          z-index: 1;
        }

        .collage-circle-svg {
          width: 100%;
          height: 100%;
        }

        /* 2. Tall Dark Concrete / Monolith Column (Positioned directly behind subject's head & torso) */
        .collage-monolith-pillar {
          position: absolute;
          left: clamp(52%, 55.5vw, 59%);
          top: -45px;
          bottom: 0;
          width: clamp(125px, 11.5vw, 165px);
          background: #111114;
          z-index: 2;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14);
        }

        /* 3. Acid-Lime Rectangular Accents (#D4FF28) */
        .collage-lime-accent {
          position: absolute;
          background-color: var(--accent-lime, #D4FF28);
          z-index: 2;
        }

        /* Lime accent block 1: Peeking top-left of mountain card */
        .lime-mountain-top {
          left: clamp(64%, 66.5vw, 71%);
          top: clamp(18%, 23vh, 29%);
          width: clamp(75px, 7.5vw, 110px);
          height: clamp(100px, 14vh, 160px);
        }

        /* Lime accent block 2: Peeking bottom-right of mountain card */
        .lime-mountain-bottom {
          left: clamp(73%, 76vw, 82%);
          top: clamp(59%, 64vh, 72%);
          width: clamp(130px, 13vw, 190px);
          height: clamp(65px, 8vh, 100px);
        }

        /* Lime accent block 3: Soft vertical accent behind right arm/waist */
        .lime-waist-soft {
          left: clamp(39%, 43vw, 47%);
          bottom: clamp(60px, 14vh, 140px);
          width: clamp(45px, 4.5vw, 70px);
          height: clamp(110px, 15vh, 180px);
          opacity: 0.85;
        }

        /* 4. Large Monochrome Mountain Photo Card */
        .collage-mountain-card {
          position: absolute;
          left: clamp(67%, 69.5vw, 75%);
          top: clamp(25%, 30vh, 37%);
          width: clamp(230px, 22.5vw, 330px);
          height: clamp(280px, 27vw, 390px);
          z-index: 3;
          overflow: hidden;
          border: 1px solid rgba(17, 17, 20, 0.16);
          background-color: #1a1a1d;
          box-shadow: 0 18px 40px rgba(17, 17, 20, 0.14);
        }

        .collage-mountain-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(128%) brightness(0.94);
          display: block;
        }

        .mountain-card-overlay {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255, 255, 255, 0.08);
          pointer-events: none;
        }

        /* 5. Horizontal Dark Crinkled Film Swatch */
        .collage-film-strip {
          position: absolute;
          left: clamp(27%, 30.5vw, 36%);
          bottom: clamp(38px, 8vh, 80px);
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 4;
        }

        .film-strip-inner {
          width: clamp(180px, 18vw, 260px);
          height: clamp(70px, 7vh, 95px);
          overflow: hidden;
          border: 1px solid rgba(17, 17, 20, 0.22);
          background-color: #111;
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);
        }

        .collage-film-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(118%);
          display: block;
          opacity: 0.96;
        }

        .film-strip-hairline {
          width: 36px;
          height: 1px;
          background: rgba(17, 17, 20, 0.4);
        }

        /* 6. Rotating Circular Badge Stamp (Upper-Right) */
        .collage-stamp-badge {
          position: absolute;
          right: clamp(4%, 7vw, 11%);
          top: clamp(6%, 8.5vh, 13%);
          width: clamp(100px, 9vw, 135px);
          height: clamp(100px, 9vw, 135px);
          z-index: 4;
        }

        .stamp-svg {
          width: 100%;
          height: 100%;
          animation: heroStampSpin 32s linear infinite;
        }

        .stamp-text {
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 2.5px;
          fill: var(--ink, #111114);
          text-transform: uppercase;
        }

        @keyframes heroStampSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* 7. Expressive Handwritten Signature Flourish */
        .collage-signature-wrap {
          position: absolute;
          right: clamp(1%, 3.5vw, 7%);
          top: clamp(42%, 46vh, 52%);
          width: clamp(160px, 15vw, 220px);
          height: clamp(115px, 11vw, 160px);
          z-index: 5;
        }

        .signature-svg {
          width: 100%;
          height: 100%;
        }

        /* ─── LAYER B: HEADLINE & EDITORIAL CONTENT (Left Column) ─── */
        .hero-content-left {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          max-width: 860px;
          z-index: 5;
        }

        .hero-typography-block {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: clamp(1.4rem, 2.6vh, 2.2rem);
          width: 100%;
        }

        .hero-text-mask {
          overflow: hidden;
          padding: 0.04em 0.06em 0.16em 0;
          display: block;
        }

        .hero-name-prateek {
          font-family: 'Cabinet Grotesk', 'Syne', sans-serif;
          font-size: clamp(5.2rem, 10.4vw, 10.6rem);
          font-weight: 900;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          color: var(--ink, #111114);
          margin: 0;
          line-height: 0.88;
          display: block;
          white-space: nowrap;
        }

        .hero-name-jaiswal {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: clamp(5.6rem, 11.2vw, 11.2rem);
          font-weight: 500;
          letter-spacing: -0.015em;
          text-transform: uppercase;
          color: var(--ink, #111114);
          margin: -0.07em 0 0 0;
          line-height: 0.88;
          display: block;
          white-space: nowrap;
        }

        .hero-intro-pitch {
          font-family: var(--font-body, sans-serif);
          font-size: clamp(0.96rem, 1.05vw, 1.08rem);
          line-height: 1.75;
          letter-spacing: -0.01em;
          color: var(--ink-secondary, #4A4843);
          margin-bottom: clamp(1.6rem, 2.8vh, 2.5rem);
          max-width: 420px;
          text-align: left;
          text-wrap: pretty;
        }

        .hero-intro-pitch strong {
          color: var(--ink, #111114);
          font-weight: 700;
        }

        /* Underlined Editorial CTA */
        .hero-cta-wrapper {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
        }

        .hero-editorial-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 6px;
          border-bottom: 2px solid var(--ink, #111114);
          text-decoration: none;
          color: var(--ink, #111114);
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: border-color 0.25s ease, transform 0.25s var(--ease-out-quint, ease);
          position: relative;
        }

        .cta-label {
          color: var(--ink, #111114);
        }

        .cta-arrow-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink, #111114);
          transition: transform 0.3s var(--ease-out-quint, ease);
        }

        .hero-editorial-cta:hover {
          border-bottom-color: var(--accent-lime, #D4FF28);
          transform: translateY(-2px);
        }

        .hero-editorial-cta:hover .cta-arrow-icon {
          transform: translate(3px, -3px);
        }

        /* ─── LAYER C: LARGE CINEMATIC FOREGROUND PORTRAIT (Center-Right) ─── */
        .hero-portrait-foreground {
          position: absolute;
          left: clamp(38%, 43vw, 48%);
          bottom: 0;
          height: clamp(580px, 86vh, 860px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 10;
          pointer-events: none;
          line-height: 0;
        }

        .hero-portrait-img {
          height: 100%;
          max-height: 100%;
          width: auto;
          aspect-ratio: 682 / 1024;
          object-fit: contain;
          object-position: bottom center;
          vertical-align: bottom;
          filter: drop-shadow(0 20px 36px rgba(17, 17, 20, 0.24));
          display: block;
          user-select: none;
          pointer-events: auto;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* ─── Bottom Editorial Telemetry Bar ─── */
        .hero-meta-bottombar {
          position: absolute;
          bottom: clamp(16px, 2.5vh, 28px);
          left: clamp(1.8rem, 4vw, 4.5rem);
          right: clamp(1.8rem, 4vw, 4.5rem);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: auto;
          max-width: 1560px;
          margin: 0 auto;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: var(--ink-secondary, #4A4843);
          letter-spacing: 1px;
          z-index: 20;
          pointer-events: none;
        }

        .hero-meta-bottombar > * {
          pointer-events: auto;
        }

        .hero-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }

        .scroll-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.6px;
          color: var(--ink, #111114);
        }

        .scroll-hairline-track {
          width: 1px;
          height: 36px;
          background: rgba(17, 17, 20, 0.22);
          position: relative;
        }

        .scroll-dot {
          position: absolute;
          bottom: 0;
          left: -2px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ink, #111114);
        }

        .hero-coordinates {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 10.5px;
          color: var(--ink-secondary, #4A4843);
          letter-spacing: 1px;
          line-height: 1.4;
        }

        .coords-sparkle {
          font-size: 11px;
          color: var(--ink, #111114);
        }

        .coords-text {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
        }

        /* ─── Responsive Breakpoints ─── */
        @media (max-width: 1180px) {
          .hero-portrait-foreground {
            left: clamp(40%, 45vw, 49%);
            height: clamp(480px, 70vh, 680px);
          }
          .hero-name-prateek {
            font-size: clamp(3.6rem, 7vw, 6.2rem);
          }
          .hero-name-jaiswal {
            font-size: clamp(3.9rem, 7.6vw, 6.8rem);
          }
          .collage-mountain-card {
            width: clamp(180px, 18vw, 240px);
            height: clamp(230px, 23vw, 300px);
          }
        }

        @media (max-width: 960px) {
          .hero-editorial-section {
            padding: calc(65px + 1.6rem) 5vw 2rem;
            min-height: auto;
            justify-content: flex-start;
            gap: 2rem;
          }

          .hero-meta-topbar {
            margin-bottom: 1rem;
          }

          .hero-stage-container {
            flex-direction: column;
            align-items: flex-start;
            min-height: auto;
            gap: 2.4rem;
          }

          .hero-content-left {
            max-width: 100%;
            padding-right: 0;
            z-index: 10;
          }

          .hero-name-prateek {
            font-size: clamp(3.2rem, 9.5vw, 4.8rem);
            line-height: 0.92;
          }

          .hero-name-jaiswal {
            font-size: clamp(3.4rem, 10.2vw, 5.2rem);
            line-height: 0.92;
            margin-top: -0.04em;
          }

          .hero-intro-pitch {
            max-width: 100%;
            margin-bottom: 2rem;
            font-size: 0.98rem;
          }

          /* On tablet/mobile, portrait sits in its own frame */
          .hero-portrait-foreground {
            position: relative;
            left: auto;
            bottom: auto;
            width: 100%;
            max-width: 440px;
            height: clamp(380px, 50vh, 480px);
            margin: 0 auto;
            z-index: 6;
          }

          .hero-portrait-img {
            max-height: 100%;
          }

          .hero-collage-underlay {
            position: absolute;
            height: 100%;
            pointer-events: none;
          }

          .collage-monolith-pillar {
            left: 50%;
            top: auto;
            bottom: 0;
            width: 80px;
            height: clamp(380px, 50vh, 480px);
            transform: translateX(-50%);
          }

          .collage-circle-wrap {
            width: 340px;
            height: 340px;
            left: 50%;
            top: auto;
            bottom: 40px;
            transform: translateX(-50%);
          }

          .collage-mountain-card {
            right: 6%;
            left: auto;
            width: 140px;
            height: 180px;
            top: auto;
            bottom: 30px;
          }

          .lime-mountain-top {
            right: 12%;
            left: auto;
            width: 50px;
            height: 70px;
            top: auto;
            bottom: 180px;
          }

          .lime-mountain-bottom {
            right: 2%;
            left: auto;
            width: 70px;
            height: 40px;
            top: auto;
            bottom: 10px;
          }

          .lime-waist-soft {
            display: none;
          }

          .collage-film-strip {
            display: none;
          }

          .collage-stamp-badge {
            right: 5%;
            top: auto;
            bottom: 240px;
            width: 78px;
            height: 78px;
          }

          .collage-signature-wrap {
            right: 2%;
            top: auto;
            bottom: 50px;
            width: 120px;
            height: 90px;
          }

          .hero-meta-bottombar {
            position: relative;
            left: auto;
            right: auto;
            bottom: auto;
            width: 100%;
            margin-top: 1.5rem;
            pointer-events: auto;
          }
        }

        @media (max-width: 600px) {
          .hero-editorial-section {
            padding: calc(54px + 1rem) 4vw 1.5rem;
            gap: 1.5rem;
          }

          .hero-meta-topbar {
            font-size: 9.5px;
            letter-spacing: 0.8px;
            margin-bottom: 0.6rem;
          }

          .hero-meta-left {
            gap: 0.8rem;
          }

          .hero-meta-rule {
            display: none;
          }

          .hero-name-prateek {
            font-size: clamp(2.45rem, 12vw, 3.4rem);
            line-height: 0.94;
          }

          .hero-name-jaiswal {
            font-size: clamp(2.65rem, 13vw, 3.7rem);
            line-height: 0.94;
            margin-top: -0.03em;
          }

          .hero-intro-pitch {
            font-size: 0.92rem;
            line-height: 1.65;
            margin-bottom: 1.5rem;
          }

          .hero-editorial-cta {
            font-size: 10.5px;
            gap: 8px;
            padding-bottom: 4px;
          }

          .hero-portrait-foreground {
            height: 360px;
            max-width: 320px;
          }

          .collage-monolith-pillar {
            height: 360px;
            width: 70px;
          }

          .collage-circle-wrap {
            width: 280px;
            height: 280px;
            bottom: 25px;
          }

          .collage-stamp-badge {
            width: 68px;
            height: 68px;
            bottom: 220px;
            right: 4%;
          }

          .collage-mountain-card {
            width: 110px;
            height: 140px;
            right: 4%;
            bottom: 20px;
          }

          .hero-meta-bottombar {
            margin-top: 1rem;
            font-size: 9px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
