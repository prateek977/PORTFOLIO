import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial Navbar with Compact 3-Line Hamburger on Desktop & Mobile
 * 
 * - Desktop & Mobile: Logo on left, compact 3-line hamburger menu toggle on right
 * - Opens a polished full-screen editorial navigation overlay with staggered GSAP reveals
 * - Morphing hamburger-to-close animation
 * - Accessible, keyboard navigation (Escape to close), body scroll lock
 * - Scroll-aware sticky styling and progress bar
 */
export const Navbar = ({ visible = true, onBrandClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const headerRef = useRef(null);
  const overlayRef = useRef(null);
  const menuLinksRef = useRef([]);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Header entrance animation on page load
  useEffect(() => {
    if (!headerRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      headerRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.05 }
    );
  }, []);

  // Scroll listener for sticky styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'about', 'experience', 'skills', 'projects', 'achievements', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-25% 0px -45% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  // GSAP animation for overlay menu items
  useEffect(() => {
    if (!menuOpen || !overlayRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const links = menuLinksRef.current.filter(Boolean);
    gsap.fromTo(
      links,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.12 }
    );
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    if (menuOpen) setMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ─── Standalone 3-Line Hamburger Menu Toggle Button ─── */}
      <button
        ref={headerRef}
        type="button"
        className={`nav-hamburger-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <span className="hamburger-line line-1" />
        <span className="hamburger-line line-2" />
        <span className="hamburger-line line-3" />
      </button>

      {/* ─── Polished Full-Screen Editorial Navigation Overlay (Desktop & Mobile) ─── */}
      <div
        ref={overlayRef}
        className={`editorial-overlay-menu ${menuOpen ? 'visible' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="overlay-header-bar">
          <a
            href="#home"
            onClick={(e) => {
              setMenuOpen(false);
              if (onBrandClick) onBrandClick(e);
            }}
            className="navbar-brand-link"
          >
            <div className="brand-pj-box">PJ</div>
            <div className="brand-text-wrap">
              <span className="brand-name">PRATEEK JAISWAL</span>
              <span className="brand-subtitle">SOFTWARE &amp; AUTOMATION</span>
            </div>
          </a>

          {/* Close Button inside Overlay */}
          <button
            type="button"
            className="overlay-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="close-line line-close-1" />
            <span className="close-line line-close-2" />
          </button>
        </div>

        {/* Overlay Navigation Links */}
        <nav className="overlay-nav-body" aria-label="Expanded Navigation">
          <ul className="overlay-nav-list">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <li
                  key={link.name}
                  ref={(el) => (menuLinksRef.current[idx] = el)}
                  className="editorial-menu-item"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`editorial-menu-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="menu-item-index">0{idx + 1}</span>
                    <span className="menu-item-name">{link.name}</span>
                    <ArrowUpRight size={24} className="menu-item-arrow" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Overlay Footer CTA & Metadata */}
        <div className="overlay-footer-bar">
          <div className="overlay-footer-cta-wrap">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="overlay-contact-cta"
            >
              <span>Initiate Contact</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="overlay-footer-meta">
            <div className="footer-meta-item">
              <span className="meta-dot" />
              <span>PUNE, INDIA (GMT+5:30)</span>
            </div>
            <div className="footer-meta-item">
              <span className="meta-status-text">AVAILABLE FOR SELECTIVE COMMISSIONS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Inlined Scoped Editorial Styles ─── */}
      <style>{`
        .editorial-header {
          padding: 1.15rem 0;
          box-sizing: border-box;
        }

        .editorial-header.scrolled {
          padding: 0.75rem 0;
        }

        .navbar-inner-container {
          width: 100%;
          max-width: 1560px;
          margin: 0 auto;
          padding: 0 clamp(1.8rem, 4vw, 4.5rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }

        /* Brand Styling */
        .navbar-brand-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--ink, #111114);
          text-decoration: none;
          user-select: none;
        }

        .brand-pj-box {
          width: 32px;
          height: 32px;
          background-color: var(--ink, #111114);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading, sans-serif);
          font-weight: 900;
          font-size: 11px;
          letter-spacing: 1px;
          color: var(--accent-lime, #D4FF28);
          border-radius: 1px;
          transition: transform 0.25s var(--ease-out-quint, ease);
        }

        .navbar-brand-link:hover .brand-pj-box {
          transform: scale(1.06);
        }

        .brand-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading, sans-serif);
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: -0.03em;
          color: var(--ink, #111114);
          line-height: 1.15;
        }

        .brand-subtitle {
          font-family: var(--font-mono, monospace);
          font-size: 9.5px;
          color: var(--ink-secondary, #4A4843);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          line-height: 1.3;
        }

        /* Clean 3-Line Hamburger Menu Toggle Floating Fixed at Top-Right */
        .nav-hamburger-toggle {
          position: fixed;
          top: clamp(1.2rem, 2.8vh, 2rem);
          right: clamp(1.5rem, 4vw, 3.5rem);
          z-index: 1060;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5.5px;
          width: 44px;
          height: 44px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: transform 0.25s var(--ease-out-quint, ease);
        }

        .nav-hamburger-toggle:hover {
          transform: scale(1.08);
        }

        .hamburger-line {
          width: 25px;
          height: 1.8px;
          background-color: var(--ink, #111114);
          border-radius: 1px;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease;
        }

        .nav-hamburger-toggle.open .line-1 {
          transform: translateY(7.3px) rotate(45deg);
        }

        .nav-hamburger-toggle.open .line-2 {
          opacity: 0;
          transform: scaleX(0);
        }

        .nav-hamburger-toggle.open .line-3 {
          transform: translateY(-7.3px) rotate(-45deg);
        }

        /* Full-Screen Editorial Overlay Menu */
        .editorial-overlay-menu {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100dvh;
          background-color: rgba(244, 240, 234, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1050;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(1.4rem, 3.5vh, 2.5rem) clamp(1.8rem, 5vw, 4.5rem);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.35s ease, visibility 0.35s ease;
          box-sizing: border-box;
          overflow-y: auto;
        }

        .editorial-overlay-menu.visible {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .overlay-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1560px;
          margin: 0 auto;
          padding-bottom: 1.2rem;
          border-bottom: none;
        }

        .overlay-close-btn {
          width: 44px;
          height: 44px;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s var(--ease-out-quint, ease);
        }

        .overlay-close-btn:hover {
          transform: rotate(90deg);
        }

        .close-line {
          position: absolute;
          width: 24px;
          height: 1.6px;
          background-color: var(--ink, #111114);
          border-radius: 1px;
        }

        .line-close-1 {
          transform: rotate(45deg);
        }

        .line-close-2 {
          transform: rotate(-45deg);
        }

        .overlay-nav-body {
          width: 100%;
          max-width: 1560px;
          margin: auto auto;
          padding: 2.5rem 0;
        }

        .overlay-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 2.2vh, 1.8rem);
        }

        .editorial-menu-item {
          border-bottom: 1px solid rgba(17, 17, 20, 0.08);
          padding-bottom: clamp(0.6rem, 1.4vh, 1rem);
        }

        .editorial-menu-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          color: var(--ink, #111114);
          transition: transform 0.25s var(--ease-out-quint, ease), color 0.2s ease;
        }

        .editorial-menu-link:hover,
        .editorial-menu-link.active {
          transform: translateX(12px);
          color: #000;
        }

        .menu-item-index {
          font-family: var(--font-mono, monospace);
          font-size: clamp(11px, 1vw, 13px);
          color: var(--ink-muted, #7A766E);
          letter-spacing: 2px;
          font-weight: 600;
          margin-right: clamp(1rem, 2.5vw, 2.5rem);
          transition: color 0.2s ease;
        }

        .editorial-menu-link:hover .menu-item-index,
        .editorial-menu-link.active .menu-item-index {
          color: var(--ink, #111114);
        }

        .menu-item-name {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(2rem, 5.5vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          flex-grow: 1;
        }

        .menu-item-arrow {
          color: var(--ink-muted, #7A766E);
          transition: transform 0.25s var(--ease-out-quint, ease), color 0.2s ease;
        }

        .editorial-menu-link:hover .menu-item-arrow,
        .editorial-menu-link.active .menu-item-arrow {
          color: var(--ink, #111114);
          transform: translate(4px, -4px);
        }

        /* Overlay Footer */
        .overlay-footer-bar {
          width: 100%;
          max-width: 1560px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(17, 17, 20, 0.1);
          flex-wrap: wrap;
          gap: 1.2rem;
        }

        .overlay-contact-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background-color: var(--ink, #111114);
          color: var(--bg-cream, #F4F0EA);
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 1px;
          border: 1px solid var(--ink, #111114);
          transition: background-color 0.25s ease, transform 0.25s var(--ease-out-quint, ease);
        }

        .overlay-contact-cta:hover {
          background-color: #000;
          transform: translateY(-2px);
        }

        .overlay-footer-meta {
          display: flex;
          align-items: center;
          gap: 1.6rem;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          color: var(--ink-secondary, #4A4843);
          letter-spacing: 1px;
        }

        .footer-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meta-dot {
          width: 6px;
          height: 6px;
          background-color: var(--accent-lime, #D4FF28);
          border-radius: 50%;
        }

        .meta-status-text {
          color: var(--ink-muted, #7A766E);
        }

        @media (max-width: 768px) {
          .overlay-footer-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .overlay-contact-cta {
            width: 100%;
            justify-content: center;
          }
          .overlay-footer-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
