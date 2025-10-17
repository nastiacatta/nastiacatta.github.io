// src/components/Header.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="header flex items-center justify-between p-4 bg-transparent fixed w-full top-0 z-50">
      <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>

      <div className="logo flex items-center">
        <Link href="/">
          <a className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2 hover:scale-110 transition-transform" />
            <span className="text-white dark:text-gray-800 font-semibold text-2xl hover:text-lilac transition-colors">
              Anastasia&apos;s Portfolio
            </span>
          </a>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/#hero">
          <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">Home</a>
        </Link>
        <Link href="/#about">
          <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">About</a>
        </Link>
        <Link href="/#projects">
          <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">Projects</a>
        </Link>
        <Link href="/#contact">
          <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">Contact</a>
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 focus:outline-none focus:ring-2 focus:ring-lilac rounded-full p-1"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-200" />}
        </button>
      </nav>

      {/* Mobile toggles */}
      <div className="flex items-center md:hidden">
        <button
          onClick={toggleDarkMode}
          className="mr-2 focus:outline-none focus:ring-2 focus:ring-lilac rounded-full p-1"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-200" />}
        </button>
        <button onClick={toggleMobileMenu} className="focus:outline-none" aria-label="Toggle Mobile Menu">
          {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6 text-gray-200" /> : <Bars3Icon className="w-6 h-6 text-gray-200" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="absolute top-16 right-4 bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg md:hidden">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/#hero">
                <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac" onClick={toggleMobileMenu}>
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#about">
                <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac" onClick={toggleMobileMenu}>
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#projects">
                <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac" onClick={toggleMobileMenu}>
                  Projects
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#contact">
                <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac" onClick={toggleMobileMenu}>
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
