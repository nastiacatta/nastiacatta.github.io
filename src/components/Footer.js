import React from 'react';
import Link from 'next/link';

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

const footerLinks = [
  { href: '/#about',    label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact',  label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Left: logo + tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <Link href="/">
              <a className="flex items-center gap-2.5 shrink-0 group">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
                />
                <span
                  className="font-semibold text-white dark:text-zinc-900 text-base"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Anastasia Cattaneo
                </span>
              </a>
            </Link>
            <p className="text-sm text-white/55 dark:text-zinc-500 max-w-[280px] leading-relaxed">
              MEng Design Engineering · Imperial College London
            </p>
          </div>

          {/* Right: links + LinkedIn */}
          <nav className="flex flex-wrap items-center gap-5 md:gap-7" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                <a className="text-sm text-white/70 dark:text-zinc-600 hover:text-pink-300 dark:hover:text-pink-600 transition-colors">
                  {link.label}
                </a>
              </Link>
            ))}

            <a
              href="https://www.linkedin.com/in/anastasia-cattaneo-794673277/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 dark:text-zinc-600 hover:text-pink-300 dark:hover:text-pink-600 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </nav>
        </div>

        {/* Bottom: copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 dark:border-pink-400/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-white/40 dark:text-zinc-400">
            © {new Date().getFullYear()} Anastasia Cattaneo. All rights reserved.
          </p>
          <a
            href="mailto:anastasia.cattaneo@gmail.com"
            className="text-xs text-white/40 dark:text-zinc-400 hover:text-pink-300 dark:hover:text-pink-600 transition-colors"
          >
            anastasia.cattaneo@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
