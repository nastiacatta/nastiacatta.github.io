// src/pages/index.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';

export default function Home() {
  const [hideEmail, setHideEmail] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;
      const rect = aboutSection.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
      setHideEmail(isVisible);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Header />

      <Hero />

      <main id="main-content">
        {/* About (has id="about" inside component) */}
        <About />

        {/* Projects (assumes the component handles id="projects"; no duplicate wrapper id) */}
        <div className="section">
          <Projects />
        </div>

        {/* Contact */}
        <section id="contact" className="section">
          <h2 className="text-4xl font-normal mb-6 hover:text-lilac transition-colors">Contact Me</h2>
          <p className="text-lg mb-4">Feel free to reach out to me at:</p>
          <p className="text-lg">
            <a
              href="mailto:anastasia.cattaneo@gmail.com"
              className="underline hover:text-lilac focus:outline-none focus:ring-2 focus:ring-lilac"
            >
              anastasia.cattaneo@gmail.com
            </a>
          </p>
        </section>
      </main>

      {/* Email in Bottom Right Corner */}
      <div className={`email-vertical ${hideEmail ? 'hidden' : ''}`}>
        <a href="mailto:anastasia.cattaneo@gmail.com" className="email-link">
          anastasia.cattaneo@gmail.com
        </a>
        <div className="vertical-line"></div>
      </div>
    </div>
  );
}
