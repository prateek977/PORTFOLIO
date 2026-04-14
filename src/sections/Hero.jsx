import React from 'react';
import { motion } from 'framer-motion';
import heroPortrait from '../assets/hero-portrait.png';
import FloatingSkillTags from '../components/FloatingSkillTags';

const Hero = () => {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 0 60px',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        maxWidth: '100%',
        width: '100%',
        padding: '0 5% 0 8%',
        flexWrap: 'wrap',
        marginLeft: 0
      }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '1', minWidth: '300px', maxWidth: '800px' }}
        >
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.5rem 1.2rem',
              borderRadius: '100px',
              backgroundColor: 'var(--accent-glow)',
              border: '1px solid var(--border-color)',
              marginBottom: '2.5rem',
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-color)',
              boxShadow: '0 0 15px var(--accent-color)'
            }} className="pulse-dot" />
            <span style={{
              fontSize: '0.60rem',
              fontWeight: '800',
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontFamily: 'var(--font-heading)'
            }}>
              Available for new projects
            </span>
          </motion.div>

          {/* Name Header */}
          <div style={{ marginBottom: '2rem', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="hero-name" style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: '800',
                lineHeight: '0.85',
                margin: 0,
                color: '#fff',
                letterSpacing: '-0.04em',
                textTransform: 'uppercase'
              }}>
                Prateek
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="hero-name" style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: '900',
                lineHeight: '0.85',
                margin: 0,
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.1)',
                letterSpacing: '-0.04em',
                textTransform: 'uppercase'
              }}>
                Jaiswal
              </h1>
            </motion.div>

            {/* Craft Detail: Corner Marker */}
            <div style={{
              position: 'absolute',
              top: '-1rem',
              left: '-1rem',
              width: '20px',
              height: '20px',
              borderTop: '2px solid var(--accent-color)',
              borderLeft: '2px solid var(--accent-color)',
              opacity: 0.5
            }} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hero-tagline"
            style={{
              maxWidth: '650px',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              marginBottom: '3.5rem',
              fontWeight: '500',
            }}
          >
            I architect <span style={{ color: '#fff', fontWeight: '700' }}>sophisticated digital experiences</span> with precise code and strategic automation — bridging the gap between vision and production.
          </motion.p>

          <div className="hero-buttons" style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            <motion.a
              href="#projects"
              className="btn btn-primary"
              style={{ padding: '0.8rem 1.6rem', fontSize: '0.85rem' }}
            >
              View Work <span>&rarr;</span>
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn-secondary"
              style={{ padding: '0.8rem 1.6rem', fontSize: '0.85rem' }}
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

        {/* Portrait Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flex: '0 0 600px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          className="hero-image-container"
        >
          <FloatingSkillTags />
          <motion.img
            src={heroPortrait}
            alt="Prateek Jaiswal"
            style={{
              width: '100%',
              height: 'auto',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))'
            }}
          />
        </motion.div>
      </div>

      {/* Scroll Indicator
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{
          width: '1px',
          height: '50px',
          background: 'linear-gradient(to bottom, transparent, var(--accent-color), transparent)',
          position: 'relative'
        }}>
          <motion.div
            animate={{ y: [0, 42, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: '-1px',
              width: '3px',
              height: '8px',
              backgroundColor: 'var(--accent-color)',
              borderRadius: '2px',
              boxShadow: '0 0 10px var(--accent-color)'
            }}
          />
        </div>
        <span style={{
          fontSize: '0.65rem',
          fontWeight: '800',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          fontFamily: 'var(--font-heading)'
        }}>
          Scroll
        </span>
      </motion.div> */}

      <style>{`
        @keyframes pulse-dot {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pulse-dot {
          animation: pulse-dot 2s infinite;
        }
        .hero-name {
          font-size: clamp(2.5rem, 9vw, 5.5rem);
        }
        .hero-tagline {
          font-size: clamp(0.9rem, 1.8vw, 1.15rem);
        }
        @media (max-width: 768px) {
          .hero-name {
            font-size: clamp(2.5rem, 12vw, 5rem) !important;
          }
          .hero-tagline {
            font-size: 1rem !important;
          }
          .hero-buttons {
            flex-direction: column !important;
          }
          .hero-buttons a {
            text-align: center;
            justify-content: center;
            width: 100%;
          }
          .scroll-indicator {
            display: none !important;
          }
          .hero-image-container {
            flex: 1 1 300px !important;
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
