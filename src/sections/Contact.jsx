import React from 'react';
import { motion } from 'framer-motion';

const GmailLogo = () => (
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" 
    alt="Gmail" 
    style={{ width: '40px', height: '40px' }} 
  />
);

const GithubLogo = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFFFFF" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.103.79 2.222v3.293c0 .319.21.694.825.576 4.765-1.589 8.195-6.086 8.195-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinLogo = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <path fill="#0077B5" d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003zM7.12 20.452H3.558V8.995H7.12v11.457zM5.341 7.433c-1.14 0-2.066-.926-2.066-2.066 0-1.141.926-2.067 2.066-2.067 1.14 0 2.066.926 2.066 2.067 0 1.141-.926 2.066-2.066 2.066zM20.452 20.452h-3.553v-5.56c0-1.326-.025-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.658h-3.553V8.995h3.41v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.291z"/>
  </svg>
);

const SocialLink = ({ logo, name, href, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ 
      y: -10, 
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '2rem',
      backgroundColor: 'rgba(20, 20, 20, 0.6)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      color: 'var(--text-secondary)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textDecoration: 'none',
      aspectRatio: '1/1',
      width: '100%',
      maxWidth: '160px',
    }}
  >
    <div style={{ transform: 'scale(1.2)' }}>{logo}</div>
    <span style={{ 
      fontSize: '0.8rem', 
      fontWeight: '700', 
      textTransform: 'uppercase', 
      letterSpacing: '1px',
      opacity: 0.8
    }}>
      {name}
    </span>
  </motion.a>
);

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '120px 0', backgroundColor: '#070707' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginBottom: '5rem' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontWeight: '900' }}>
            Contact
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-links-grid" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <SocialLink logo={<GmailLogo />} name="Email" href="mailto:jaiswalprateek682@gmail.com" delay={0.1} />
          <SocialLink logo={<GithubLogo />} name="GitHub" href="https://github.com/prateek977" delay={0.2} />
          <SocialLink logo={<LinkedinLogo />} name="LinkedIn" href="https://www.linkedin.com/in/prateek-jaiswal-44b580377/" delay={0.3} />
        </div>
      </div>

      <style>{`
        .contact-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .contact-links-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
