import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, delay }) => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{
      y: -6,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 15px 30px -10px var(--accent-glow)'
    }}
    style={{
      backgroundColor: 'var(--card-bg)',
      padding: '1.8rem',
      borderRadius: '20px',
      border: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      transition: 'var(--transition-smooth)',
    }}
  >
    <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-color)', fontFamily: 'var(--font-heading)' }}>{value}</span>
    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</span>
  </motion.div>
);

const About = () => {
  return (
    <section id="about" style={{ padding: '100px 0' }}>
      <div className="container reveal">
        <div className="about-grid">
          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '3rem', marginBottom: '2.5rem' }}>
              About Me
            </h2>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                I am a passionate <span style={{ color: '#fff', fontWeight: '600' }}>Web Developer</span> dedicated to building high-performance, visually stunning applications. With a focus on modern frontend technologies and seamless user experiences, I turn complex ideas into functional digital products.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                My expertise spans across <span style={{ color: '#fff', fontWeight: '600' }}>React, JavaScript, and API Integration</span>. I specialize in bridging the gap between design and functionality, ensuring every project is not only beautiful but also robust and scalable.
              </p>
              <p>
                Beyond coding, I'm an advocate for <span style={{ color: '#fff', fontWeight: '600' }}>workflow automation</span> using tools like n8n. I believe in the power of technology to simplify processes and enhance productivity, and I'm always looking for innovative ways to integrate AI into my development stack.
              </p>
            </div>
          </motion.div>

          {/* Stat Cards Grid */}
          <div className="stat-cards-grid">
            <StatCard title="Projects Built" value="8+" delay={0.1} />
            <StatCard title="APIs Integrated" value="10+" delay={0.2} />
            <StatCard title="n8n Workflows" value="5+" delay={0.3} />
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .stat-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .stat-card:first-child {
          grid-column: span 2;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .stat-cards-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .stat-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .stat-card:first-child {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
