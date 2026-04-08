import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ title, skills, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -6, borderColor: 'var(--accent-color)', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.1)' }}
    style={{
      backgroundColor: 'var(--card-bg)',
      padding: '2rem',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'var(--transition-smooth)',
    }}
  >
    <h3 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', color: '#fff' }}>{title}</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
      {skills.map((skill, idx) => (
        <motion.span
          key={idx}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-color)' }}
          style={{
            fontSize: '0.8rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '50px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            color: 'var(--text-secondary)',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const skillsGroups = [
    { title: 'Frontend', skills: ['HTML', 'CSS', 'JS', 'React'], delay: 0.1 },
    { title: 'Backend', skills: ['Python', 'Java', 'REST APIs'], delay: 0.2 },
    { title: 'Automation', skills: ['n8n', 'API Integration', 'Git', 'Netlify', 'CI/CD', 'Docker'], delay: 0.3 },
    { title: 'AI', skills: ['AI Integration', 'Chatbots', 'Image Gen APIs'], delay: 0.4 }
  ];

  return (
    <section id="skills" style={{ padding: '100px 0', backgroundColor: '#070707' }}>
      <div className="container reveal">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Skills</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            A comprehensive list of the tools and technologies I use to bring digital solutions to life.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillsGroups.map((group, idx) => (
            <SkillCard key={idx} {...group} />
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
