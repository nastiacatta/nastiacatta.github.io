import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />

      <main id="main-content">
        <About />

        <section id="projects" className="section">
          <div className="max-w-6xl mx-auto">
            <p className="section-label">Work</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white dark:text-zinc-900">
              Projects
            </h2>
            <Projects />
          </div>
        </section>

        <section id="contact" className="section" style={{ minHeight: 'auto', paddingBottom: '100px' }}>
          <div className="max-w-6xl mx-auto">
            <p className="section-label">Get in touch</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white dark:text-zinc-900">
              Contact
            </h2>
            <div className="contact-card max-w-xl p-7 md:p-9">
              <p className="text-xl font-semibold mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
                <a
                  href="mailto:anastasia.cattaneo@gmail.com"
                  className="text-pink-300 dark:text-pink-700 hover:text-pink-200 dark:hover:text-pink-600 underline underline-offset-4 decoration-pink-400/40 transition-colors"
                >
                  anastasia.cattaneo@gmail.com
                </a>
              </p>
              <div className="flex items-center gap-5">
                <a
                  href="https://www.linkedin.com/in/anastasia-cattaneo-794673277/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 dark:text-zinc-500 hover:text-pink-300 dark:hover:text-pink-600 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
