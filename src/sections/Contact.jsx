import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const email = 'jaiswalprateek682@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const socials = [
    {
      name: 'GitHub',
      handle: '@prateek977',
      url: 'https://github.com/prateek977',
      desc: 'Open-source codebases, repositories & automation scripts',
      icon: <GithubIcon size={18} color="currentColor" />,
    },
    {
      name: 'LinkedIn',
      handle: 'prateek-jaiswal',
      url: 'https://www.linkedin.com/in/prateek-jaiswal-44b580377/',
      desc: 'Professional network, client relations & engineering career',
      icon: <LinkedinIcon size={18} color="currentColor" />,
    },
    {
      name: 'Direct Email',
      handle: 'jaiswalprateek682@gmail.com',
      url: `mailto:${email}`,
      desc: 'Full-time roles, engineering contracts & technical architecture',
      icon: <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '15px' }}>@</span>,
    },
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section || prefersReduced) return;

    const ctx = gsap.context(() => {
      // Eyebrow divider reveal
      gsap.from('.contact-eyebrow .section-divider', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-eyebrow', start: 'top 88%', once: true },
      });

      // Headline masked reveal
      gsap.fromTo(
        '.contact-main-headline',
        { opacity: 0, y: 38, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.85,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.contact-main-headline', start: 'top 85%', once: true },
        }
      );

      // Subtext + email group
      gsap.from(['.contact-subtext', '.contact-email-trigger-group', '.contact-availability-meta'], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-narrative-col', start: 'top 80%', once: true },
      });

      // Channel rows stagger
      gsap.from('.channel-row-link', {
        opacity: 0,
        x: 24,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.channels-list', start: 'top 82%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="cinematic-contact-section" ref={sectionRef}>
      <div className="container">
        {/* Section Eyebrow */}
        <div className="section-header-tag contact-eyebrow">
          <span className="section-number">07</span>
          <span className="section-divider" />
          <TextScramble text="INITIATE COLLABORATION" className="section-label" />
        </div>

        {/* Editorial Contact Spread */}
        <div className="contact-editorial-spread">
          {/* Left Column: Direct Call to Action */}
          <div className="contact-narrative-col">
            <h2 className="contact-main-headline">
              Let&apos;s build something <span className="text-black">exceptional</span> together.
            </h2>
            <p className="contact-subtext">
              Whether you need a high-performance web application, custom workflow automation with n8n, or robust API integration, I am available for contract and full-time engineering roles worldwide.
            </p>

            {/* Direct Email Interaction */}
            <div className="contact-email-trigger-group">
              <div className="email-meta-header">
                <span className="email-status-dot" />
                <span className="email-status-text">DIRECT INBOX // 24-HOUR RESPONSE</span>
              </div>

              <div className="email-display-row">
                <a href={`mailto:${email}`} className="email-link-text">
                  {email}
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="copy-trigger-btn"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={14} color="#10B981" />
                      <span style={{ color: '#10B981' }}>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>COPY ADDRESS</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Availability Note */}
            <div className="contact-availability-meta">
              <span className="avail-label">BASE:</span>
              <span className="avail-val">PUNE, INDIA (GMT+5:30) // REMOTE WORLDWIDE</span>
              <span className="avail-sep">/</span>
              <span className="avail-label">STATUS:</span>
              <span className="avail-status-tag">ACCEPTING NEW PROJECTS</span>
            </div>
          </div>

          {/* Right Column: Channels Index */}
          <div className="contact-channels-col">
            <span className="channels-eyebrow">VERIFIED NETWORKS</span>

            <div className="channels-list">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-row-link"
                >
                  <div className="channel-icon-box">{s.icon}</div>
                  <div className="channel-text-group">
                    <span className="channel-name">{s.name}</span>
                    <span className="channel-handle">{s.handle}</span>
                    <span className="channel-desc">{s.desc}</span>
                  </div>
                  <div className="channel-arrow-box">
                    <ArrowUpRight size={18} className="channel-arrow" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-contact-section {
          padding: 140px 0 120px;
          border-top: 1px solid var(--line-dark);
          background: var(--bg-cream);
          position: relative;
        }
        .contact-editorial-spread {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 5.5rem;
          align-items: start;
        }
        .contact-main-headline {
          font-size: clamp(2.4rem, 4.5vw, 4.2rem);
          line-height: 1.05;
          margin-bottom: 1.8rem;
          color: var(--ink-secondary);
          letter-spacing: -0.035em;
          font-weight: 800;
          will-change: opacity, transform;
        }
        .text-black {
          color: var(--ink);
          background: linear-gradient(180deg, transparent 65%, var(--accent-lime) 65%);
          padding: 0 4px;
        }
        .contact-subtext {
          font-size: 1.05rem;
          color: var(--ink-secondary);
          line-height: 1.75;
          margin-bottom: 3.2rem;
          max-width: 600px;
        }
        .contact-email-trigger-group {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          padding-bottom: 2.2rem;
          border-bottom: 1px solid var(--line-dark);
          margin-bottom: 2rem;
          max-width: 620px;
        }
        .email-meta-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--ink-secondary);
          letter-spacing: 1px;
        }
        .email-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }
        .email-display-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .email-link-text {
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 2.2vw, 1.7rem);
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.02em;
          transition: color 0.2s ease;
        }
        .email-link-text:hover {
          color: var(--ink);
          text-decoration: underline;
          text-decoration-color: var(--accent-lime);
          text-decoration-thickness: 3px;
        }
        .copy-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: var(--bg-cream-tint);
          border: 1px solid var(--line-dark-strong);
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--ink);
          cursor: pointer;
          transition: background-color 0.25s ease, border-color 0.25s ease;
        }
        .copy-trigger-btn:hover {
          background: var(--ink);
          color: #ffffff;
          border-color: var(--ink);
        }
        .contact-availability-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--ink-muted);
          flex-wrap: wrap;
        }
        .avail-label {
          color: var(--ink);
          font-weight: 700;
        }
        .avail-val {
          color: var(--ink-secondary);
        }
        .avail-sep {
          color: var(--line-dark-strong);
        }
        .avail-status-tag {
          color: var(--ink);
          background: var(--accent-lime);
          padding: 2px 6px;
          border-radius: 2px;
          font-weight: 700;
        }
        .contact-channels-col {
          display: flex;
          flex-direction: column;
        }
        .channels-eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: 1.5px;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid var(--line-dark);
          margin-bottom: 0.5rem;
        }
        .channels-list {
          display: flex;
          flex-direction: column;
        }
        .channel-row-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.8rem 0;
          border-bottom: 1px solid var(--line-dark);
          text-decoration: none;
          color: var(--ink);
          transition: border-color 0.3s ease, transform 0.3s var(--ease-out-quint);
          will-change: opacity, transform;
        }
        .channel-row-link:hover {
          border-bottom-color: var(--ink);
          transform: translateX(4px);
        }
        .channel-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-cream-dark);
          border: 1px solid var(--line-dark);
          display: grid;
          place-items: center;
          flex-shrink: 0;
          margin-right: 1.2rem;
          color: var(--ink);
          transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }
        .channel-row-link:hover .channel-icon-box {
          background: var(--ink);
          color: var(--accent-lime);
          border-color: var(--ink);
        }
        .channel-text-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }
        .channel-name {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: 0.2px;
        }
        .channel-handle {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--ink-secondary);
        }
        .channel-desc {
          font-size: 0.85rem;
          color: var(--ink-muted);
          margin-top: 2px;
        }
        .channel-arrow-box {
          color: var(--ink-muted);
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .channel-row-link:hover .channel-arrow-box {
          transform: translate(3px, -3px);
          color: var(--ink);
        }

        @media (max-width: 1024px) {
          .contact-editorial-spread {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
