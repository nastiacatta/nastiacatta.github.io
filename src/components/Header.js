import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const navItems = [
  { href: '/#hero', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerHidden, setBannerHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const navContainerRef = useRef(null);
  const navItemRefs = useRef([]);
  const mobileMenuRef = useRef(null);

  // Restore theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setDarkMode(next);
  };

  // Scroll hide/show + isScrolled (inspired by Vega PillNav)
  useEffect(() => {
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0;
    let downAccum = 0;
    let upAccum = 0;
    let hidden = false;
    let ticking = false;
    const HIDE_THRESH = 80;
    const SHOW_THRESH = 16;
    const TOP_THRESH = 8;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY;
        setIsScrolled(y > 24);

        if (y <= TOP_THRESH) {
          downAccum = 0; upAccum = 0;
          if (hidden) { setBannerHidden(false); hidden = false; }
        } else if (dy > 0) {
          downAccum += dy; upAccum = 0;
          if (y > 100 && downAccum >= HIDE_THRESH && !hidden) {
            setBannerHidden(true); hidden = true; downAccum = 0;
          }
        } else if (dy < 0) {
          upAccum += -dy; downAccum = 0;
          if (upAccum >= SHOW_THRESH && hidden) {
            setBannerHidden(false); hidden = false; upAccum = 0;
          }
        }
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sliding hover indicator
  const updateIndicator = useCallback(() => {
    if (hoveredIndex === null || !navItemRefs.current[hoveredIndex] || !navContainerRef.current) {
      setIndicator(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    const container = navContainerRef.current.getBoundingClientRect();
    const item = navItemRefs.current[hoveredIndex].getBoundingClientRect();
    setIndicator({
      left: item.left - container.left,
      width: item.width,
      opacity: 1,
    });
  }, [hoveredIndex]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  // Close mobile on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Escape closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // Pill style
  const pillBase = `nav-pill w-full max-w-5xl flex items-center justify-between rounded-full border transition-all duration-300`;
  const pillScrolled = isScrolled
    ? 'h-12 bg-zinc-950/80 dark:bg-pink-100/80 backdrop-blur-xl border-pink-500/20 dark:border-pink-400/25 shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
    : 'h-14 bg-zinc-950/55 dark:bg-pink-50/60 backdrop-blur-xl border-pink-500/15 dark:border-pink-400/15';

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-pink-500 focus:text-white focus:px-3 focus:py-2 focus:rounded-md">
        Skip to main content
      </a>

      {/* Fixed banner wrapper */}
      <div
        className={`site-banner fixed left-0 right-0 top-0 z-[1000] pt-3 ${bannerHidden ? 'is-hidden' : ''}`}
      >
        <div className="flex justify-center px-4">
          <div className={`${pillBase} ${pillScrolled} px-4 md:px-5`}>

            {/* Logo */}
            <Link href="/">
              <a className="flex items-center gap-2.5 shrink-0 group focus-visible:outline focus-visible:ring-2 focus-visible:ring-pink-400 rounded-md">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-200"
                />
                <span className="font-semibold text-white dark:text-zinc-900 text-[0.95rem] tracking-tight group-hover:text-pink-300 dark:group-hover:text-pink-700 transition-colors hidden sm:inline"
                  style={{ fontFamily: 'Syne, sans-serif' }}>
                  Anastasia Cattaneo
                </span>
              </a>
            </Link>

            {/* Desktop nav */}
            <nav
              ref={navContainerRef}
              className="hidden md:flex relative items-center gap-0.5"
              aria-label="Main navigation"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Sliding background indicator */}
              <span
                aria-hidden
                className="absolute top-0 h-full rounded-full pointer-events-none transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] bg-pink-500/15 dark:bg-pink-400/15"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
              />
              {navItems.map((item, i) => (
                <div
                  key={item.href}
                  ref={(el) => { navItemRefs.current[i] = el; }}
                  onMouseEnter={() => setHoveredIndex(i)}
                >
                  <Link href={item.href}>
                    <a className="relative z-10 block px-4 py-2 text-sm text-gray-300 dark:text-zinc-700 hover:text-white dark:hover:text-zinc-900 transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-pink-400 rounded-full whitespace-nowrap">
                      {item.label}
                    </a>
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right: theme toggle + mobile burger */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-pink-500/15 dark:hover:bg-pink-400/15 transition-colors focus-visible:ring-2 focus-visible:ring-pink-400"
                aria-label="Toggle light/dark mode"
              >
                {darkMode
                  ? <SunIcon className="w-4 h-4 text-yellow-400" />
                  : <MoonIcon className="w-4 h-4 text-gray-300" />}
              </button>

              <button
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-pink-500/15 dark:hover:bg-pink-400/15 transition-colors focus-visible:ring-2 focus-visible:ring-pink-400"
                onClick={() => setMobileOpen(o => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-panel"
              >
                {mobileOpen
                  ? <XMarkIcon className="w-5 h-5 text-gray-200 dark:text-zinc-800" />
                  : <Bars3Icon className="w-5 h-5 text-gray-200 dark:text-zinc-800" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/50 md:hidden"
          aria-hidden
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile nav panel */}
      <div
        id="mobile-nav-panel"
        ref={mobileMenuRef}
        className={`fixed left-4 right-4 z-[1001] md:hidden rounded-2xl border border-white/10 dark:border-pink-400/20 shadow-2xl bg-zinc-950/95 dark:bg-pink-50/95 backdrop-blur-xl overflow-hidden transition-all duration-200 ease-out ${
          mobileOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 -translate-y-2 scale-[0.98] pointer-events-none'
        }`}
        style={{ top: 'calc(4.5rem + 0.5rem)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <nav className="py-2" aria-label="Mobile navigation links">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <a
                className="flex items-center min-h-[48px] px-6 py-3 text-base font-medium text-white/90 dark:text-zinc-800 hover:bg-pink-500/10 dark:hover:bg-pink-400/10 hover:text-pink-200 dark:hover:text-pink-700 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            </Link>
          ))}
          <div className="px-6 py-3 border-t border-white/10 dark:border-pink-400/10">
            <a
              href="mailto:anastasia.cattaneo@gmail.com"
              className="text-sm text-gray-400 dark:text-zinc-500 hover:text-pink-300 dark:hover:text-pink-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              anastasia.cattaneo@gmail.com
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
