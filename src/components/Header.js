// src/components/Header.js

import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 h-full bg-dark-grey bg-opacity-90 text-light-pink p-4 z-50 w-48">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">Anastasia's Portfolio</h1>
          <nav>
            <ul className="flex flex-col space-y-6">
              <li>
                <a href="#introduction" className="hover:text-lilac">01. Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-lilac">02. About Me</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-lilac">03. Projects</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-lilac">04. Contact</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mb-4">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <img src="/icons/resume-icon.svg" alt="Resume" className="w-8 h-8 hover:text-lilac" />
          </a>
        </div>
      </div>
    </header>
  );
}
