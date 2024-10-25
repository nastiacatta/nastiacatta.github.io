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
    <header className="header flex items-center justify-between p-4 bg-transparent fixed w-full top-0 z-50">
      {/* Skip Navigation Link for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      {/* Logo and Title */}
      <div className="logo flex items-center">
        <Link href="/">
          <a className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 mr-2 hover:scale-110 transition-transform"
            />
            <span className="text-white dark:text-gray-800 font-semibold text-2xl hover:text-lilac transition-colors">
              Anastasia's Portfolio
            </span>
          </a>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/#hero">
          <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">
            Home
          </a>
        </Link>
        <Link href="/#about">
          <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">
            About
          </a>
        </Link>
        <Link href="/#projects">
          <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">
            Projects
          </a>
        </Link>
        <Link href="/#contact">
          <a className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac">
            Contact
          </a>
        </Link>
        {/* Resume Link with Hover Effect */}
        <div className="relative group">
          <Link href="/resume">
            <a className="text-gray-200 hover:text-lilac transition-colors flex items-center px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac">
              Resume
            </a>
          </Link>
          {/* Hover Effect: Rounded Box with Shadow Moving to Top Left */}
          <div className="absolute inset-0 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1 -translate-y-1 pointer-events-none bg-gray-700 dark:bg-gray-200"></div>
        </div>
        {/* Dark/Light Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 focus:outline-none focus:ring-2 focus:ring-lilac rounded-full p-1"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-400" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-200" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Toggle and Dark/Light Mode Button */}
      <div className="flex items-center md:hidden">
        {/* Dark/Light Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="mr-2 focus:outline-none focus:ring-2 focus:ring-lilac rounded-full p-1"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-400" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-200" />
          )}
        </button>
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="focus:outline-none"
          aria-label="Toggle Mobile Menu"
        >
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
              <Link href="/#hero">
                <a
                  className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac"
                  onClick={toggleMobileMenu}
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#about">
                <a
                  className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac"
                  onClick={toggleMobileMenu}
                >
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#projects">
                <a
                  className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac"
                  onClick={toggleMobileMenu}
                >
                  Projects
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#contact">
                <a
                  className="text-gray-200 hover:text-lilac transition-colors focus:outline-none focus:ring-2 focus:ring-lilac"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </a>
              </Link>
            </li>
            {/* Resume Link with Hover Effect */}
            <li className="relative group">
              <Link href="/resume">
                <a
                  className="text-gray-200 hover:text-lilac transition-colors flex items-center px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilac"
                  onClick={toggleMobileMenu}
                >
                  Resume
                </a>
              </Link>
              {/* Hover Effect: Rounded Box with Shadow Moving to Top Left */}
              <div className="absolute inset-0 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1 -translate-y-1 pointer-events-none bg-gray-700 dark:bg-gray-200"></div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
