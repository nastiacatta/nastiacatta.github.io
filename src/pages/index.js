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
          <div className="max-w-6xl mx-auto w-full min-w-0">
            <p className="section-label" data-animate>Work</p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 text-white dark:text-zinc-900"
              data-animate data-delay="1"
            >
              Projects
            </h2>
            <Projects />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
