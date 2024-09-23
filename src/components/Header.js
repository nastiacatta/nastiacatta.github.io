// src/components/Header.js

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Anastasia's Portfolio</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#about" className="hover:text-pink-500">
                About Me
              </Link>
            </li>
            <li>
              <Link href="#projects" className="hover:text-pink-500">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-pink-500">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
