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

  const displayCount = isMobile ? 3 : 6;
  const displaySkills = selectedSkills.slice(0, displayCount);

  return (
    <>
      {displaySkills.map((skill, index) => {
        const pos = tagPositions[index % tagPositions.length];
        
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
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--accent-glow)', borderColor: 'var(--accent-color)' }}
            style={{
              position: 'absolute',
              ...pos,
              zIndex: 2,
              padding: '0.6rem 1.2rem',
              borderRadius: '50px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
              cursor: 'default',
              transition: 'border-color 0.3s ease',
            }}
          >
            {skill === 'JS' ? 'JavaScript' : skill}
          </motion.div>
        );
      })}
    </>
  );
};

export default FloatingSkillTags;
