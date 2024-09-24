// src/pages/index.js

import { useEffect } from 'react';
import Header from '../components/Header';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    }

    // Project card 3D hover effect
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
      const rotateX = (-y / 20).toFixed(2);
      const rotateY = (x / 20).toFixed(2);
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function handleMouseLeave(e) {
      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }

    // Cleanup event listeners on unmount
    return () => {
      for (const link of links) {
        link.removeEventListener('click', () => {});
      }
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

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
        <h2 className="text-4xl font-bold mb-6 text-center">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Card 1 */}
          <div className="project-card">
            <Link href="/exoglove">
              <a className="block relative">
                <img
                  src="/images/exoglove.jpg"
                  alt="EXO GLOVE"
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 filter hover:brightness-75 hover:sepia hover:saturate-150"
                />
                <div className="project-info absolute bottom-4 left-4 bg-pink-500 bg-opacity-50 p-2 rounded">
                  <h3 className="text-white text-xl font-semibold">EXO GLOVE</h3>
                </div>
              </a>
            </Link>
          </div>

          {/* Project Card 2 */}
          <div className="project-card">
            <Link href="/biomorphus">
              <a className="block relative">
                <img
                  src="/images/biomorphus.jpg"
                  alt="BIOMORPHUS"
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 filter hover:brightness-75 hover:sepia hover:saturate-150"
                />
                <div className="project-info absolute bottom-4 left-4 bg-pink-500 bg-opacity-50 p-2 rounded">
                  <h3 className="text-white text-xl font-semibold">BIOMORPHUS</h3>
                </div>
              </a>
            </Link>
          </div>

          {/* Project Card 3 */}
          <div className="project-card">
            <Link href="/innovice">
              <a className="block relative">
                <img
                  src="/images/innovice.jpg"
                  alt="INNOVICE"
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 filter hover:brightness-75 hover:sepia hover:saturate-150"
                />
                <div className="project-info absolute bottom-4 left-4 bg-pink-500 bg-opacity-50 p-2 rounded">
                  <h3 className="text-white text-xl font-semibold">INNOVICE</h3>
                </div>
              </a>
            </Link>
          </div>

          {/* Project Card 4 */}
          <div className="project-card">
            <Link href="/project4">
              <a className="block relative">
                <img
                  src="/images/project4.jpg"
                  alt="PROJECT 4"
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 filter hover:brightness-75 hover:sepia hover:saturate-150"
                />
                <div className="project-info absolute bottom-4 left-4 bg-pink-500 bg-opacity-50 p-2 rounded">
                  <h3 className="text-white text-xl font-semibold">PROJECT 4</h3>
                </div>
              </a>
            </Link>
          </div>

          {/* Project Card 5 */}
          <div className="project-card">
            <Link href="/project5">
              <a className="block relative">
                <img
                  src="/images/project5.jpg"
                  alt="PROJECT 5"
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 filter hover:brightness-75 hover:sepia hover:saturate-150"
                />
                <div className="project-info absolute bottom-4 left-4 bg-pink-500 bg-opacity-50 p-2 rounded">
                  <h3 className="text-white text-xl font-semibold">PROJECT 5</h3>
                </div>
              </a>
            </Link>
          </div>

          {/* Project Card 6 */}
          <div className="project-card">
            <Link href="/project6">
              <a className="block relative">
                <img
                  src="/images/project6.jpg"
                  alt="PROJECT 6"
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 filter hover:brightness-75 hover:sepia hover:saturate-150"
                />
                <div className="project-info absolute bottom-4 left-4 bg-pink-500 bg-opacity-50 p-2 rounded">
                  <h3 className="text-white text-xl font-semibold">PROJECT 6</h3>
                </div>
              </a>
            </Link>
          </div>
        </div>
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
