// src/components/Header.js

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Anastasia's Portfolio</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#about">
                About Me
              </Link>
            </li>
            <li>
              <Link href="#projects">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
