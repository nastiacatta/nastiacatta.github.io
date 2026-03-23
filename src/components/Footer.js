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
];

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-10">

        {/* Get in touch */}
        <div className="mb-12">
          <p className="section-label mb-2">Get in touch</p>
          <a
            href="mailto:anastasia.cattaneo@gmail.com"
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-pink-400/35 bg-pink-500/10 hover:bg-pink-500/20 hover:border-pink-400/55 transition-all duration-250 shadow-[0_0_30px_rgba(240,96,180,0.1)] hover:shadow-[0_0_40px_rgba(240,96,180,0.2)]"
          >
            <svg className="w-4 h-4 text-pink-300 dark:text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="text-base font-medium text-white dark:text-zinc-900 group-hover:text-pink-200 dark:group-hover:text-pink-700 transition-colors">
              anastasia.cattaneo@gmail.com
            </span>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 dark:border-pink-400/15" />

        {/* Bottom row */}
        <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          {/* Logo + name */}
          <Link href="/">
            <a className="flex items-center gap-2.5 group">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
              />
              <span
                className="font-semibold text-white dark:text-zinc-900 text-sm"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Anastasia Cattaneo
              </span>
            </a>
          </Link>

          {/* Nav links + LinkedIn */}
          <nav className="flex items-center gap-5 md:gap-7" aria-label="Footer navigation">
            {footerLinks.map(link => (
              <Link href={link.href} key={link.label}>
                <a className="text-sm text-white/60 dark:text-zinc-500 hover:text-pink-300 dark:hover:text-pink-600 transition-colors">
                  {link.label}
                </a>
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/in/anastasia-cattaneo-794673277/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 dark:text-zinc-500 hover:text-pink-300 dark:hover:text-pink-600 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </nav>

          <p className="text-xs text-white/35 dark:text-zinc-400">
            © {new Date().getFullYear()} Anastasia Cattaneo
          </p>
        </div>
      </div>
    </footer>
  );
}
