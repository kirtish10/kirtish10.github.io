import React from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import useScrollReveal from '../hooks/useScrollReveal';

export const Home: React.FC = () => {
  // Activate scroll-reveal animation observer
  useScrollReveal();

  return (
    <div className="space-y-0">
      {/* Sections */}
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default Home;
