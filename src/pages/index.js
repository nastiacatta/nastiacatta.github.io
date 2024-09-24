// src/pages/index.js

import Header from '../components/Header';
import Projects from '../components/Projects';

export default function Home() {
  return (
    <div>
      <Header />

      {/* Section 1: Introduction */}
      <section id="introduction" className="section">
        <h1 className="text-5xl font-bold mb-4">Hello!</h1>
        <p className="text-xl mb-6">
          I'm Anastasia, a Design Engineering student with a passion for wearables, AI, and fashion.
        </p>
      </section>

      {/* Section 2: About Me */}
      <section id="about" className="section">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p className="text-lg">
          I am a third-year MEng Design Engineering student at Imperial College London. My passion lies in the fusion of electronics, AI, and fashion. I am driven by a commitment to integrating elegant design with robust engineering to develop solutions that are both functional and aesthetically pleasing. Beyond my core focus, I have a deep interest in the arts, literature, and architecture, which continually inspire my work.
        </p>
      </section>

      {/* Section 3: Projects */}
      <section id="projects" className="section">
        <Projects />
      </section>

      {/* Section 4: Contact */}
      <section id="contact" className="section">
        <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
        <p className="text-lg mb-4">
          Feel free to reach out to me at:
        </p>
        <p className="text-lg">
          <a href="mailto:anastasia.cattaneo@gmail.com" className="underline hover:text-pink-400">anastasia.cattaneo@gmail.com</a>
        </p>
      </section>

      {/* Email in Bottom Right Corner */}
      <div className="email-vertical">
        <a href="mailto:anastasia.cattaneo@gmail.com" className="email-link">anastasia.cattaneo@gmail.com</a>
        <div className="vertical-line"></div>
      </div>
    </div>
  );
}
