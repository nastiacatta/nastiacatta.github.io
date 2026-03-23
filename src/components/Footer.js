import React from 'react';
import Link from 'next/link';

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

const footerLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
  { href: 'https://vegafinancial.uk/', label: 'Vega Financial', external: true },
];

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Left: logo + tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <Link href="/">
              <a className="flex items-center gap-2.5 shrink-0 group">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
                <span
                  className="font-semibold text-white dark:text-zinc-900 text-base"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Anastasia Cattaneo
                </span>
              </a>
            </Link>
            <p className="text-sm text-white/55 dark:text-zinc-500 max-w-[260px] leading-relaxed">
              MEng Design Engineering · Imperial College London
            </p>
          </div>

          {/* Right: links + socials */}
          <nav className="flex flex-wrap items-center gap-5 md:gap-7" aria-label="Footer navigation">
            {footerLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 dark:text-zinc-700 hover:text-pink-300 dark:hover:text-pink-600 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} key={link.label}>
                  <a className="text-sm text-white/80 dark:text-zinc-700 hover:text-pink-300 dark:hover:text-pink-600 transition-colors">
                    {link.label}
                  </a>
                </Link>
              )
            )}

            <a
              href="https://www.linkedin.com/in/anastasia-cattaneo-794673277/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 dark:text-zinc-600 hover:text-pink-300 dark:hover:text-pink-600 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>

            <a
              href="https://github.com/nastiacatta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 dark:text-zinc-600 hover:text-pink-300 dark:hover:text-pink-600 transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-5 h-5" />
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
