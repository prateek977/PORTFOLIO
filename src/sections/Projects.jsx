import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, ArrowUpRight } from 'lucide-react';

const fallbackMap = {
  'css3': 'css',
  'javascript': 'js',
  'html5': 'html',
  'python': 'py',
  'openjdk': 'java',
};

const ProjectTag = ({ tag }) => {
  const iconMap = {
    'React': 'react',
    'JS': 'javascript',
    'Vite': 'vite',
    'n8n': 'n8n',
    'Python': 'python',
    'HTML': 'html5',
    'CSS': 'css3',
    'REST API': 'withoutlogo',
    'Netlify': 'netlify',
    'Framer Motion': 'framer',
    'Music Streaming': 'withoutlogo',
    'LeetCode API': 'leetcode',
  };

  const iconSlug = iconMap[tag] || tag.toLowerCase().replace(/ /g, '');
  const [hasLogo, setHasLogo] = React.useState(iconSlug !== 'withoutlogo');

  return (
    <span style={{
      display: 'flex',
      alignItems: 'center',
      gap: hasLogo ? '0.5rem' : '0',
      fontSize: '0.8rem',
      padding: '0.4rem 1rem',
      borderRadius: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontWeight: '500',
      transition: 'var(--transition-smooth)'
    }}>
      {hasLogo && (
        <img
          src={`https://cdn.simpleicons.org/${iconSlug}`}
          alt=""
          style={{ width: '16px', height: '16px', objectFit: 'contain' }}
          onError={(e) => {
            const fallbackSlug = fallbackMap[iconSlug] || iconSlug;
            const fallbackUrl = `https://skillicons.dev/icons?i=${fallbackSlug}`;
            if (e.target.src === fallbackUrl) {
              setHasLogo(false);
            } else {
              e.target.src = fallbackUrl;
            }
          }}
        />
      )}
      {tag}
    </span>
  );
};

const ProjectCard = ({ title, description, tags, link, github, isFeatured, number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px -20px var(--accent-glow)'
      }}
      className={isFeatured ? 'project-card-featured' : 'project-card'}
      style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        position: 'relative',
        transition: 'var(--transition-smooth)',
      }}
    >
      {/* Number Badge */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        fontSize: '3rem',
        fontWeight: '900',
        color: 'rgba(255, 255, 255, 0.03)',
        fontFamily: 'var(--font-heading)',
        zIndex: 0,
      }}>
        {number}
      </div>

      <div style={{
        padding: isFeatured ? '3rem' : '2rem',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1.5rem' }}>
          {tags.map(tag => (
            <ProjectTag key={tag} tag={tag} />
          ))}
        </div>

        <h3 style={{
          fontSize: isFeatured ? '2rem' : '1.5rem',
          marginBottom: '0.8rem',
          color: '#fff'
        }}>
          {title}
        </h3>

        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          fontSize: '0.95rem',
          lineHeight: '1.6',
        }}>
          {description}
        </p>

        <div style={{
          marginTop: 'auto',
          display: 'flex',
          gap: '1.5rem'
        }}>
          {link && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              Live Demo <ArrowUpRight size={16} />
            </motion.a>
          )}
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              GitHub <Code size={16} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      number: '01',
      title: 'Vibe Tunes',
      description: 'A music streaming platform that allows users to listen to their favorite songs and discover new music. Built with React and optimized for real-time interactions.',
      tags: ['React', 'Music Streaming', 'Framer Motion'],
      link: '#',
      github: 'https://github.com/prateek977/Vibe-Tunes-',
      isFeatured: true
    },
    {
      number: '02',
      title: 'Public API Playground',
      description: 'A versatile dashboard for exploring various public APIs. Features real-time data fetching, advanced filtering, and a modular architecture.',
      tags: ['React', 'REST API', 'Vite'],
      link: 'https://shimmering-concha-667417.netlify.app/',
      github: 'https://github.com/prateek977/Public-API-Playground-'
    },
    {
      number: '03',
      title: 'Leet Compare',
      description: 'A platform to compare your LeetCode stats with your friends. Built with React and LeetCode API.',
      tags: ['React', 'LeetCode API', 'Netlify'],
      link: 'https://leet-compare.netlify.app/',
      github: 'https://github.com/prateek977/Leet-Compare-'
    }
  ];

  return (
    <section id="projects" style={{ padding: '100px 0' }}>
      <div className="container reveal">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Projects</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            A showcase of my expertise in building functional, high-conversion digital products.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .project-card-featured {
          grid-column: 1 / -1;
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .project-card-featured {
            grid-column: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
