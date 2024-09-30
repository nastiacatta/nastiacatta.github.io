// src/pages/index.js

import Hero from '../components/Hero';
import Header from '../components/Header';
import Projects from '../components/Projects';

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Main Content */}
      <main id="main-content">
        {/* Introduction Section */}
        <section id="introduction" className="section text-center">
          <h1 className="text-5xl font-bold">Hello!</h1>
          <p className="text-xl mt-4">
            I'm Anastasia, a Design Engineering student with a passion for wearables, AI, and fashion.
          </p>
          <div className="mt-8">
            <a
              href="#projects"
              className="px-6 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-200"
            >
              View My Work
            </a>
          </div>
        </section>

        {/* Section 2: About Me */}
        <section id="about" className="section">
          <h2 className="text-4xl font-normal mb-6 hover:text-lilac transition-colors">
            About Me
          </h2>
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
          <h2 className="text-4xl font-normal mb-6 hover:text-lilac transition-colors">
            Contact Me
          </h2>
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
      <div className="email-vertical">
        <a href="mailto:anastasia.cattaneo@gmail.com" className="email-link">
          anastasia.cattaneo@gmail.com
        </a>
        <div className="vertical-line"></div>
      </div>
    </div>
  );
}
