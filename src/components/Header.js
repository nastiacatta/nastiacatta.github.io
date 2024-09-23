// src/components/Header.js

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          <a className="flex items-center">
            {/* Logo - Star with "ac" inside */}
            <img src="/icons/logo-star-ac.svg" alt="AC Logo" />
            <span className="text-2xl font-bold">Anastasia's Portfolio</span>
          </a>
        </Link>
      </div>
      <nav>
        <ul className="flex items-center">
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
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link ml-4">
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
