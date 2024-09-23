import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Anastasia Cattaneo</h1>
        <ul className="flex space-x-8">
          <li><a href="#home" className="hover:text-pink-500">Home</a></li>
          <li><a href="#about" className="hover:text-pink-500">About</a></li>
          <li><a href="#projects" className="hover:text-pink-500">Projects</a></li>
          <li><a href="#contact" className="hover:text-pink-500">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
