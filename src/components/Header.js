import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const navItems = [
  { href: '/#hero',     label: 'Home' },
  { href: '/#about',    label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact',  label: 'Contact' },
];

export default function Header() {
  const [darkMode,     setDarkMode]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [bannerHidden, setBannerHidden] = useState(false);
  const [isScrolled,   setIsScrolled]   = useState(false);
  const [mounted,      setMounted]      = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [indicator,    setIndicator]    = useState({ left: 0, width: 0, opacity: 0 });

  const navContainerRef = useRef(null);
  const navItemRefs     = useRef([]);
  const mobileMenuRef   = useRef(null);

  // Mount fade-in
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Restore theme
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setDarkMode(next);
  };

  // Scroll hide/show
  useEffect(() => {
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0;
    let downAccum = 0, upAccum = 0, hidden = false, ticking = false;
    const HIDE = 80, SHOW = 16, TOP = 8;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y   = window.scrollY;
        const dy  = y - lastY;
        setIsScrolled(y > 24);

        if (y <= TOP) {
          downAccum = 0; upAccum = 0;
          if (hidden) { setBannerHidden(false); hidden = false; }
        } else if (dy > 0) {
          downAccum += dy; upAccum = 0;
          if (y > 100 && downAccum >= HIDE && !hidden) {
            setBannerHidden(true); hidden = true; downAccum = 0;
          }
        } else if (dy < 0) {
          upAccum += -dy; downAccum = 0;
          if (upAccum >= SHOW && hidden) {
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
    const item      = navItemRefs.current[hoveredIndex].getBoundingClientRect();
    setIndicator({ left: item.left - container.left, width: item.width, opacity: 1 });
  }, [hoveredIndex]);

  useEffect(() => { updateIndicator(); }, [updateIndicator]);

  // Close mobile on resize / Escape
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // Pill classes
  const pillBase = [
    'nav-pill w-full flex items-center justify-between rounded-full border',
    'transition-all duration-500',
    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 scale-[0.98]',
  ].join(' ');

  const pillScrolled = isScrolled
    ? 'h-14 bg-zinc-950/85 dark:bg-pink-100/85 backdrop-blur-2xl border-pink-500/25 dark:border-pink-400/30 shadow-[0_8px_40px_rgba(0,0,0,0.4)]'
    : 'h-16 bg-zinc-950/60 dark:bg-pink-50/65 backdrop-blur-xl border-pink-500/18 dark:border-pink-400/18';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-pink-500 focus:text-white focus:px-3 focus:py-2 focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Fixed banner */}
      <div
        className={`site-banner fixed left-0 right-0 top-0 z-[1000] pt-[max(1rem,env(safe-area-inset-top))] ${bannerHidden ? 'is-hidden' : ''}`}
      >
        <div className="flex justify-center px-4 md:px-6">
          <div className={`${pillBase} ${pillScrolled} px-5 md:px-7 max-w-7xl w-full`}>

            {/* Logo */}
            <Link href="/">
              <a className="logo-link-motion flex items-center justify-center min-h-[44px] min-w-[44px] shrink-0 group focus-visible:outline focus-visible:ring-2 focus-visible:ring-pink-400 rounded-md touch-manipulation -ml-1">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-9 h-9 object-contain"
                />
              </a>
            </Link>

            <div className="ml-auto flex items-center gap-3">
              {/* Desktop nav */}
              <nav
                ref={navContainerRef}
                className="hidden md:flex relative items-center gap-1"
                aria-label="Main navigation"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Sliding indicator */}
                <span
                  aria-hidden
                  className="absolute top-0 h-full rounded-full pointer-events-none bg-pink-500/15 dark:bg-pink-400/15"
                  style={{
                    left:    indicator.left,
                    width:   indicator.width,
                    opacity: indicator.opacity,
                    transition:
                      'left 0.38s cubic-bezier(0.34, 1.25, 0.64, 1), width 0.38s cubic-bezier(0.34, 1.25, 0.64, 1), opacity 0.22s ease',
                  }}
                />
                {navItems.map((item, i) => (
                  <div
                    key={item.href}
                    ref={(el) => { navItemRefs.current[i] = el; }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    style={{
                      transitionDelay: mounted ? `${i * 55}ms` : '0ms',
                      transition:
                        'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.34, 1.15, 0.64, 1)',
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
                    }}
                  >
                    <Link href={item.href}>
                      <a className="nav-link-motion relative z-10 block px-4 py-2.5 text-sm font-medium text-gray-300/90 dark:text-zinc-600 hover:text-white dark:hover:text-zinc-900 transition-colors duration-300 focus-visible:outline focus-visible:ring-2 focus-visible:ring-pink-400 rounded-full whitespace-nowrap">
                        <span className="nav-link-label">{item.label}</span>
                      </a>
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Right: theme + burger */}
              <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                type="button"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-pink-500/15 dark:hover:bg-pink-400/15 transition-colors focus-visible:ring-2 focus-visible:ring-pink-400 touch-manipulation"
                aria-label="Toggle light/dark mode"
              >
                {darkMode
                  ? <SunIcon  className="w-4 h-4 text-yellow-300" />
                  : <MoonIcon className="w-4 h-4 text-gray-300" />}
              </button>

              <button
                type="button"
                className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-pink-500/15 dark:hover:bg-pink-400/15 transition-colors focus-visible:ring-2 focus-visible:ring-pink-400 touch-manipulation"
                onClick={() => setMobileOpen(o => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-panel"
              >
                {mobileOpen
                  ? <XMarkIcon  className="w-5 h-5 text-gray-200 dark:text-zinc-800" />
                  : <Bars3Icon  className="w-5 h-5 text-gray-200 dark:text-zinc-800" />}
              </button>
              </div>
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
        className={`fixed left-4 right-4 z-[1001] md:hidden rounded-2xl border border-white/10 dark:border-pink-400/20 shadow-2xl bg-zinc-950/95 dark:bg-pink-50/95 backdrop-blur-xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen
            ? 'mobile-nav-panel-open opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'mobile-nav-panel-closed opacity-0 -translate-y-3 scale-[0.97] pointer-events-none'
        }`}
        style={{
          top: 'max(calc(4.5rem + 0.75rem), calc(4rem + env(safe-area-inset-top, 0px)))',
        }}
        role="dialog"
        aria-modal
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <nav className="py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]" aria-label="Mobile navigation links">
          {navItems.map((item, i) => (
            <Link href={item.href} key={item.href}>
              <a
                className="mobile-nav-row flex items-center min-h-[48px] px-6 py-3 text-base font-medium text-white/90 dark:text-zinc-800 hover:bg-pink-500/10 dark:hover:bg-pink-400/10 hover:text-pink-200 dark:hover:text-pink-700 transition-colors active:scale-[0.98]"
                style={{ transitionDelay: mobileOpen ? `${60 + i * 50}ms` : '0ms' }}
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
