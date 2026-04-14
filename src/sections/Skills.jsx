import React from 'react';
import { motion } from 'framer-motion';
import { skillsGroups } from '../data/skillsData';

// Mapping for skill icons (Simple Icons slugs)
const skillIconMap = {
  'HTML': 'html5',
  'CSS': 'css3',
  'JS': 'javascript',
  'React': 'react',
  'Python': 'python',
  'Java': 'openjdk',
  'REST APIs': 'postman',
  'n8n': 'n8n',
  'API Integration': 'amazonservices',
  'Git': 'git',
  'Netlify': 'netlify',
  'CI/CD': 'githubactions',
  'Docker': 'docker',
  'AI Integration': 'openai',
  'Chatbots': 'botpress',
  'Image Gen APIs': 'pinnacle',
};

const fallbackMap = {
  'css3': 'css',
  'javascript': 'js',
  'html5': 'html',
  'python': 'py',
  'openjdk': 'java',
};

const SkillCard = ({ title, skills, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -6, borderColor: 'var(--accent-color)', boxShadow: '0 10px 30px var(--accent-glow)' }}
    style={{
      backgroundColor: 'var(--card-bg)',
      padding: '2rem',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'var(--transition-smooth)',
    }}
  >
    <h3 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', color: '#fff' }}>{title}</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
      {skills.map((skill, idx) => {
        const iconSlug = skillIconMap[skill] || skill.toLowerCase().replace(/ /g, '');
        return (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'var(--accent-color)' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.85rem',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'all 0.3s ease'
            }}
          >
            <img 
              src={`https://cdn.simpleicons.org/${iconSlug}`} 
              alt=""
              style={{ width: '28px', height: '28px', objectFit: 'contain', opacity: 0.9 }}
              onError={(e) => { 
                const fallbackSlug = fallbackMap[iconSlug] || iconSlug;
                e.target.src = `https://skillicons.dev/icons?i=${fallbackSlug}`; 
              }}
            />
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

const Skills = () => {

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
