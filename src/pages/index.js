// src/pages/index.js

import React from 'react';
import Header from '../components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Header />

      {/* First Section: Introduction */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center bg-pink-100 text-center"
      >
        {/* ... */}
      </section>

      {/* Second Section: Projects */}
      <section id="projects" className="min-h-screen py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">My Projects</h2>
          <div className="project-container flex justify-center space-x-8">
            <Link href="/exoglove" className="project-card">
              <img src="/images/exoglove.jpg" alt="EXO GLOVE" />
              <div className="project-info">
                <h3>EXO GLOVE</h3>
                <p>A wearable glove for enhancing hand strength.</p>
              </div>
            </Link>
            <Link href="/biomorphus" className="project-card">
              <img src="/images/biomorphus.jpg" alt="BIOMORPHUS" />
              <div className="project-info">
                <h3>BIOMORPHUS</h3>
                <p>Integrating biomorphic design with AI.</p>
              </div>
            </Link>
            <Link href="/innovice" className="project-card">
              <img src="/images/innovice.jpg" alt="INNOVICE" />
              <div className="project-info">
                <h3>INNOVICE</h3>
                <p>Innovative solutions in ice management systems.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section: Contact Info */}
      <footer id="contact" className="bg-gray-900 text-white p-4 text-center">
        {/* ... */}
      </footer>
    </div>
  );
}
