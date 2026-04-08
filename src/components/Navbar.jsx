import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import heroPortrait from '../assets/hero-portrait.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      padding: scrolled ? '0.8rem 0' : '1.5rem 0',
      backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
      transition: 'var(--transition-smooth)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '100%',
        padding: '0 4rem',
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid var(--accent-color)',
            boxShadow: '0 0 20px var(--accent-glow)',
            backgroundColor: 'var(--card-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={heroPortrait}
              alt="PJ Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <ul style={{ display: 'flex', gap: '2rem' }}>
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={link.href}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#fff';
                    e.target.style.letterSpacing = '1.5px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--text-secondary)';
                    e.target.style.letterSpacing = '1px';
                  }}
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 25px var(--accent-glow)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: 'var(--accent-color)',
              color: '#fff',
              padding: '0.7rem 1.4rem',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: '800',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'var(--transition-smooth)'
            }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <div className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{
          display: 'none',
          cursor: 'pointer',
          color: '#fff',
          zIndex: 1002,
        }}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="nav-mobile-menu"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: 'rgba(10, 10, 10, 0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
              zIndex: 1001,
            }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  fontFamily: 'var(--font-heading)',
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={handleLinkClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px var(--accent-glow)' }}
              style={{
                backgroundColor: 'var(--accent-color)',
                color: '#fff',
                padding: '1rem 3rem',
                borderRadius: '16px',
                fontSize: '0.9rem',
                fontWeight: '800',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginTop: '1.5rem',
              }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
