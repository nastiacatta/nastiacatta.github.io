// src/pages/index.js

import Header from '../components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Header />
      {/* First Section: Introduction */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-pink-100 text-center">
        <h1 className="text-5xl font-bold mb-4">Hi, I'm Anastasia</h1>
        <p className="text-xl mb-6">Aspiring Designer Engineer</p>
        <p className="text-lg max-w-xl">
          I am a third-year MEng Design Engineering student at Imperial College London, with a keen
          interest in the innovative field of wearables. My passion lies in the fusion of electronics,
          AI, and fashion. I am driven by a commitment to integrating elegant design with robust
          engineering to develop solutions that are both functional and aesthetically pleasing.
        </p>
        <a href="#projects" className="mt-8 px-6 py-2 bg-pink-500 text-white rounded-full">
          Explore My Projects
        </a>
      </section>

      {/* Second Section: Projects */}
      <section id="projects" className="min-h-screen py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">My Projects</h2>
          <div className="project-container">
            <div className="project-card">
              <img src="project-image1.jpg" alt="Project 1" />
              <div className="project-info">
                <h3>EXO GLOVE</h3>
                <p>Short description of the project.</p>
              </div>
            </div>
            <div className="project-card">
              <img src="project-image2.jpg" alt="Project 2" />
              <div className="project-info">
                <h3>BIOMORPHUS</h3>
                <p>Short description of the project.</p>
              </div>
            </div>
            <div className="project-card">
              <img src="project-image3.jpg" alt="Project 3" />
              <div className="project-info">
                <h3>INNOVICE</h3>
                <p>Short description of the project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
