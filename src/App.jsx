import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

const StructuralOverlays = () => (
  <>
    <div className="noise" />
    <div className="scanlines" />
  </>
);

function App() {
  useEffect(() => {
    // Reveal Animation Logic
    const observerOptions = {
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <StructuralOverlays />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center', 
        color: 'var(--text-secondary)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: '#0a0a0c'
      }}>
        <div className="container">
          <p style={{ fontSize: '0.9rem', fontWeight: '500', opacity: 0.8 }}>
            &copy; {new Date().getFullYear()} Prateek Jaiswal. Crafted with precision.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
