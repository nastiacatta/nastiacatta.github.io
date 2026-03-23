import React, { useState } from 'react';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';

const projects = [
  { title: 'ROBOTICS',      href: '/robotics',    imageSrc: '/robotics.png' },
  { title: 'SEAO2',         href: '/seao2',        imageSrc: '/seao2.png' },
  { title: 'REORBIT',       href: '/reorbit',      imageSrc: '/reorbit.png' },
  { title: 'EXO GLOVE',    href: '/exoglove',     imageSrc: '/exoglove.jpeg' },
  { title: 'BIOMORPHUS',   href: '/biomorphus',   imageSrc: '/biomorphus.jpeg' },
  { title: 'INNOVICE',     href: '/innovice',     imageSrc: '/innovice.jpeg' },
  { title: 'ROBOT CAR',    href: '/robotcar',     imageSrc: '/robot_car.png' },
  { title: 'CONCEPT CAR',  href: '/conceptcar',   imageSrc: '/concept_car.png' },
  { title: 'KEEPING WARM', href: '/keepingwarm',  imageSrc: '/keeping_warm.png' },
];

const MASTERS_TEXT = `My master's project is to design and prototype a web-based forecasting market where individuals, firms, or public bodies can obtain high-quality predictions without anyone having to share raw data: participants submit probabilistic forecasts and wagers, the platform aggregates them into a single forecast, and then redistributes rewards using strictly proper scoring rules based on realised outcomes.

My main focus is building a repeated, history-aware mechanism that combines each participant's current stake with a dynamically learned measure of forecasting skill, so that influence depends not just on money but also on past performance.

I am also studying how to make the system robust to real-world problems such as intermittent participation, large-stake domination, Sybil attacks, collusion, wash trading, and attempts to manipulate outcomes, while exploring methods such as online learning, reinforcement learning, and Gaussian-process-based aggregation to improve accuracy and adaptability over time.`;

export default function Projects() {
  const [vegaImgError, setVegaImgError] = useState(false);
  const [mastersOpen, setMastersOpen] = useState(false);
  const [failedImages, setFailedImages] = useState({});

  return (
    <div>
      {/* ── Featured: Vega Financial ───────────────────────────── */}
      <div className="mb-6" data-animate>
        <div className="featured-project-card rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* Left: copy */}
            <div className="lg:w-1/2 p-7 md:p-10 flex flex-col justify-between">
              <div>
                <p className="section-label mb-3">Featured</p>
                <h3
                  className="text-3xl md:text-4xl font-bold text-white dark:text-zinc-900 mb-4 leading-tight"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Vega Financial
                </h3>
                <p className="text-sm md:text-base text-white/70 dark:text-zinc-600 leading-relaxed max-w-sm">
                  Algorithmic investing for everyone. A full-stack fintech platform
                  letting retail investors access trading algorithms built by
                  verified developers — the same tools that move 70% of financial markets.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {['Next.js', 'TypeScript', 'Prisma', 'Tailwind', 'Startup', 'Algorithmic Trading', 'Web Development'].map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full border border-pink-400/25 text-pink-200 dark:text-pink-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="https://vegafinancial.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500 hover:bg-pink-400 text-white text-sm font-medium transition-colors shadow-[0_4px_18px_rgba(240,96,180,0.35)]"
                >
                  Visit Website
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: VEGA screenshot — natural aspect ratio, no clipping */}
            <div className="lg:w-1/2 border-t lg:border-t-0 lg:border-l border-pink-400/15 bg-zinc-900/40 dark:bg-pink-100/40 flex items-start justify-center overflow-hidden">
              {!vegaImgError ? (
                <img
                  src="/VEGA.png"
                  alt="Vega Financial screenshot"
                  className="w-full h-auto object-contain object-top max-h-[320px]"
                  onError={() => setVegaImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center min-h-[200px]">
                  <div
                    className="text-5xl font-black mb-3 text-transparent bg-clip-text"
                    style={{ fontFamily: 'Syne, sans-serif', backgroundImage: 'linear-gradient(135deg, #f060b4, #ff99d1)' }}
                  >
                    VEGA
                  </div>
                  <a href="https://vegafinancial.uk/" target="_blank" rel="noopener noreferrer"
                     className="text-sm text-pink-300 dark:text-pink-600 underline hover:text-pink-200 transition-colors">
                    Open vegafinancial.uk →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Master's Project: expandable accordion ────────────── */}
      <div className="mb-14" data-animate data-delay="1">
        <div className="featured-project-card rounded-2xl overflow-hidden">
          <button
            onClick={() => setMastersOpen(o => !o)}
            className="w-full flex items-center justify-between p-7 md:p-8 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            aria-expanded={mastersOpen}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5">
              <p className="section-label !mb-0">Master&apos;s Project</p>
              <h3 className="text-xl md:text-2xl font-bold text-white dark:text-zinc-900 leading-tight">
                Designing and Implementing Prediction Markets
              </h3>
            </div>
            <span
              className="ml-4 shrink-0 w-8 h-8 rounded-full border border-pink-400/30 flex items-center justify-center text-pink-300 dark:text-pink-600 transition-transform duration-300"
              style={{ transform: mastersOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              aria-hidden
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: mastersOpen ? '700px' : '0px' }}
          >
            <div className="px-7 md:px-8 pb-8 border-t border-pink-400/15">
              <div className="pt-6 space-y-4">
                {MASTERS_TEXT.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm md:text-base text-white/75 dark:text-zinc-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Prediction Markets', 'Online Learning', 'Reinforcement Learning', 'Gaussian Processes', 'Mechanism Design'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-xs rounded-full border border-pink-400/25 text-pink-200 dark:text-pink-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Project Grid ─────────────────────────────────────────── */}
      <div id="project-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, idx) => (
          <div key={project.title} data-animate data-delay={String((idx % 3) + 1)}>
            <Link href={project.href}>
              <a className="group block focus-visible:outline focus-visible:ring-2 focus-visible:ring-pink-400 rounded-xl">
                <Tilt
                  glareEnable={false}
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  transitionSpeed={700}
                  className="card-frame rounded-xl overflow-hidden"
                >
                  <div className="relative w-full h-52">
                    {!failedImages[project.title] ? (
                      <img
                        src={project.imageSrc}
                        alt={project.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => setFailedImages(prev => ({ ...prev, [project.title]: true }))}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 dark:bg-pink-100/80">
                        <span className="text-xs tracking-widest text-pink-300 dark:text-pink-600">
                          {project.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/15 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3
                        className="text-xs tracking-[0.18em] font-semibold text-white/90 group-hover:text-pink-200 transition-colors"
                        style={{ fontFamily: 'Syne, sans-serif' }}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                      <svg className="w-3 h-3 text-pink-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </Tilt>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
