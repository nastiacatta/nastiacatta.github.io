// src/components/Header.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Persist theme preference using localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-900 fixed w-full top-0 z-50">
      <div className="logo flex items-center">
        <Link href="/">
          <a className="flex items-center">
            {/* Replace with your actual logo if available */}
            <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
            <span className="text-white dark:text-gray-200 font-semibold text-lg">Anastasia's Portfolio</span>
          </a>
        </Link>
      </div>
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex space-x-4">
          <li>
            <Link href="/#introduction">
              <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/#about">
              <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">About</a>
            </Link>
          </li>
          <li>
            <Link href="/#projects">
              <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">Projects</a>
            </Link>
          </li>
          <li>
            <Link href="/#contact">
              <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">Contact</a>
            </Link>
          </li>
          <li className="relative group">
            <Link href="/resume">
              <a className="text-gray-200 hover:text-lilac transition-colors flex items-center px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac">
                Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </Link>
            {/* Pop-up Box Shadow on Hover */}
            <div className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </li>
        </ul>
      </nav>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleDarkMode} className="mr-2 focus:outline-none" aria-label="Toggle Dark Mode">
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-400" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-200" />
          )}
        </button>
        <button onClick={toggleMobileMenu} className="focus:outline-none" aria-label="Toggle Mobile Menu">
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-200" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-200" />
          )}
        </button>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="absolute top-16 right-4 bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg md:hidden">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/#introduction">
                <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac" onClick={toggleMobileMenu}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/#about">
                <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac" onClick={toggleMobileMenu}>About</a>
              </Link>
            </li>
            <li>
              <Link href="/#projects">
                <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac" onClick={toggleMobileMenu}>Projects</a>
              </Link>
            </li>
            <li>
              <Link href="/#contact">
                <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac" onClick={toggleMobileMenu}>Contact</a>
              </Link>
            </li>
            <li className="relative group">
              <Link href="/resume">
                <a className="text-gray-200 hover:text-lilac transition-colors flex items-center px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac" onClick={toggleMobileMenu}>
                  Resume
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </Link>
              {/* Pop-up Box Shadow on Hover */}
              <div className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
