import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillsGroups } from '../data/skillsData';

// Flatten the skills to a single array
const allSkills = skillsGroups.flatMap(group => group.skills);

// Define fixed relative positions around the image for the floating tags
const tagPositions = [
  { top: '15%', left: '0%' },
  { top: '25%', right: '5%' },
  { bottom: '20%', left: '-5%' },
  { bottom: '25%', right: '0%' },
  { top: '8%', right: '20%' },
  { top: '50%', left: '-10%' },
];

const FloatingSkillTags = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pick up to 6 interesting skills dynamically from the shared data structure
  const selectedSkills = [
    allSkills.find(s => s === 'React') || allSkills[0],
    allSkills.find(s => s === 'JS') || allSkills[1],
    allSkills.find(s => s === 'n8n') || allSkills[2],
    allSkills.find(s => s === 'Python') || allSkills[3],
    allSkills.find(s => s === 'HTML') || allSkills[4],
    allSkills.find(s => s === 'CSS') || allSkills[5],
  ];

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

  // Standard fallback slugs for SkillIcons.dev (which sometimes differ)
  const fallbackMap = {
    'css3': 'css',
    'javascript': 'js',
    'html5': 'html',
    'python': 'py',
    'openjdk': 'java',
  };

  const displayCount = isMobile ? 3 : 6;
  const displaySkills = selectedSkills.slice(0, displayCount);

  return (
    <>
      {displaySkills.map((skill, index) => {
        const pos = tagPositions[index % tagPositions.length];
        const iconSlug = skillIconMap[skill] || skill.toLowerCase();

        // Deterministic random-like values based on index to avoid 
        // excessive re-renders while keeping the natural drift feel
        const randomY = 15 + (index * 5 % 15);
        const randomX = 10 + (index * 7 % 15);
        const randomDuration = 4 + (index % 3);
        const randomDelay = index * 0.3;

        return (
          <motion.div
            key={skill + index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -randomY, 0],
              x: [0, randomX, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.8 + index * 0.1 },
              scale: { duration: 0.8, delay: 0.8 + index * 0.1, type: 'spring', bounce: 0.4 },
              y: { duration: randomDuration, repeat: Infinity, ease: "easeInOut", delay: randomDelay },
              x: { duration: randomDuration + 1, repeat: Infinity, ease: "easeInOut", delay: randomDelay }
            }}
            whileHover={{ scale: 1.2, boxShadow: '0 0 25px var(--accent-glow)', borderColor: 'var(--accent-color)' }}
            style={{
              position: 'absolute',
              ...pos,
              zIndex: 2,
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '12px'
            }}
            title={skill === 'JS' ? 'JavaScript' : skill}
          >
            <img
              src={`https://cdn.simpleicons.org/${iconSlug}`}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.1))'
              }}
              onError={(e) => {
                const fallbackSlug = fallbackMap[iconSlug] || iconSlug;
                e.target.src = `https://skillicons.dev/icons?i=${fallbackSlug}`;
              }}
            />
          </motion.div>
        );
      })}
    </>
  );
};

export default FloatingSkillTags;
