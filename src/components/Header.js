// src/components/Header.js

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-dark-grey bg-opacity-90 text-light-pink p-4 z-50 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <a className="flex items-center">
            <div className="logo w-8 h-8 mr-2">
              {/* Replace with your logo image or SVG */}
              <img src="/icons/logo.svg" alt="Logo" className="w-full h-full" />
            </div>
            <span className="text-2xl font-bold">Anastasia's Portfolio</span>
          </a>
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-6 items-center">
          <li>
            <a href="#introduction" className="hover:text-lilac">Home</a>
          </li>
          <li>
            <a href="#about" className="hover:text-lilac">About Me</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-lilac">Projects</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-lilac">Contact</a>
          </li>
          <li>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link px-4 py-2 bg-transparent border border-light-pink rounded hover:bg-light-pink hover:text-dark-grey transition-all">
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
