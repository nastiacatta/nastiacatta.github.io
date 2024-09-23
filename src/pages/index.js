// src/pages/index.js

import { useEffect } from 'react';
import Header from '../components/Header';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    function handleMouseMove(e) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
    }

    function handleMouseLeave(e) {
      e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  }, []);

  return (
    <div>
      <Header />

      {/* Section 1: Introduction */}
      <section id="introduction" className="section bg-dark-grey text-light-pink">
        <h1 className="text-5xl font-bold mb-4">Hello!</h1>
        <p className="text-xl mb-6">
          I'm Anastasia, a Design Engineering student with a passion for wearables, AI, and fashion.
        </p>
      </section>

      {/* Section 2: About Me */}
      <section id="about" className="section bg-dark-grey text-light-pink">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p className="text-lg">
          I am a third-year MEng Design Engineering student at Imperial College London. My passion lies in the fusion of electronics, AI, and fashion. I am driven by a commitment to integrating elegant design with robust engineering to develop solutions that are both functional and aesthetically pleasing.
        </p>
      </section>

      {/* Section 3: Projects */}
      <section id="projects" className="section bg-dark-grey text-light-pink">
        <h2 className="text-4xl font-bold mb-6">Projects</h2>
        <div className="project-container">
          {/* Project Cards */}
          {/* Card 1 */}
          <div className="project-card">
            <Link href="/exoglove">
              <a>
                <img src="/images/exoglove.jpg" alt="EXO GLOVE" />
                <div className="project-info">
                  <h3>EXO GLOVE</h3>
                </div>
              </a>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="project-card">
            <Link href="/biomorphus">
              <a>
                <img src="/images/biomorphus.jpg" alt="BIOMORPHUS" />
                <div className="project-info">
                  <h3>BIOMORPHUS</h3>
                </div>
              </a>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="project-card">
            <Link href="/innovice">
              <a>
                <img src="/images/innovice.jpg" alt="INNOVICE" />
                <div className="project-info">
                  <h3>INNOVICE</h3>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Contact */}
      <section id="contact" className="section bg-dark-grey text-light-pink">
        <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
        <p className="text-lg mb-4">
          Feel free to reach out to me at:
        </p>
        <p className="text-lg">
          <a href="mailto:anastasia.cattaneo@gmail.com" className="underline hover:text-lilac">anastasia.cattaneo@gmail.com</a>
        </p>
      </section>
    </div>
  );
}
