// src/components/Header.js

import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-dark-grey bg-opacity-90 text-light-pink p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Anastasia's Portfolio</h1>
        <nav>
          <ul className="flex space-x-6">
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
    </header>
  );
}
