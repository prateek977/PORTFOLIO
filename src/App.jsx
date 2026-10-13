import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * App — Editorial Portfolio for Prateek Jaiswal
 * 
 * Inspired by matteolucien.framer.website & visual direction reference
 */
export function App() {
  useEffect(() => {
    // Ensure document body has natural scrolling
    document.body.style.overflow = 'auto';
  }, []);

  // CTA Smooth Navigation
  const handleExploreClick = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReturnToHero = (e) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="portfolio-app-root">
      {/* Fixed Navbar with GSAP scroll progress indicator */}
      <Navbar onBrandClick={handleReturnToHero} />

      {/* Hero Section */}
      <Hero
        onExploreClick={handleExploreClick}
        onContactClick={handleContactClick}
      />

      {/* Main Editorial Portfolio */}
      <main id="portfolio-world" className="cinematic-content-layer">
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />

        {/* Editorial Footer */}
        <footer className="junca-editorial-footer">
          <div className="container footer-content-wrap">
            <div className="footer-left">
              <span className="footer-brand">PRATEEK JAISWAL</span>
              <span className="footer-tagline">
                Web Developer &amp; Automation Architect • India // Worldwide Remote
              </span>
            </div>
            <div className="footer-right">
              <div className="footer-status-indicator">
                <span className="footer-pulse-dot" />
                <span>All Systems Operational</span>
              </div>
              <button
                type="button"
                onClick={handleReturnToHero}
                className="footer-top-btn"
                aria-label="Scroll back to top"
              >
                Back to Top <ArrowUp size={13} />
              </button>
            </div>
          </div>
          <div className="container footer-copyright-bar">
            <p>
              &copy; {new Date().getFullYear()} Prateek Jaiswal. Designed &amp; engineered with high-DPI craft.
            </p>
            <span className="footer-meta-tag">INDIA // GLOBAL CLIENT BASE</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
