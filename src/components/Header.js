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
                <a className="hover:text-pink-500">01. About Me</a>
              </Link>
            </li>
            <li>
              <Link href="#projects">
                <a className="hover:text-pink-500">02. Projects</a>
              </Link>
            </li>
            <li>
              <Link href="#contact">
                <a className="hover:text-pink-500">03. Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
