// src/pages/index.js

import Hero from '../components/Hero';
import Header from '../components/Header';
import Projects from '../components/Projects';

export default function Home() {
  return (
    <div>
      <Header />

      <Hero />

      {/* Main Content */}
      <main id="main-content">
        {/* Section 2: About Me */}
        <section id="about" className="section">
          {/* Your About Me content */}
        </section>

        {/* Section 3: Projects */}
        <section id="projects" className="section">
          <Projects />
        </section>

        {/* Section 4: Contact */}
        <section id="contact" className="section">
          {/* Your Contact Me content */}
        </section>
      </main>

      {/* Email in Bottom Right Corner */}
      <div className="email-vertical">
        <a href="mailto:anastasia.cattaneo@gmail.com" className="email-link">
          anastasia.cattaneo@gmail.com
        </a>
        <div className="vertical-line"></div>
      </div>
    </div>
  );
}
