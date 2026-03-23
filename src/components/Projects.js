import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

export default function Projects() {
  const [vegaImgError, setVegaImgError] = useState(false);

  return (
    <div>
      {/* ── Featured: Vega Financial ───────────────────────────── */}
      <div className="mb-14">
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
                  {['Next.js', 'TypeScript', 'Prisma', 'Tailwind'].map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full border border-pink-400/25 text-pink-200 dark:text-pink-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
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
                <a
                  href="#project-grid"
                  className="inline-flex items-center px-5 py-2.5 rounded-full border border-pink-400/30 text-pink-200 dark:text-pink-700 text-sm font-medium hover:bg-pink-500/10 transition-colors"
                >
                  Browse all projects
                </a>
              </div>
            </div>

            {/* Right: image — fixed height, image cropped to fit */}
            <div className="lg:w-1/2 relative h-64 lg:h-auto min-h-[260px] border-t lg:border-t-0 lg:border-l border-pink-400/15 bg-zinc-900/50 dark:bg-pink-100/50 overflow-hidden">
              {!vegaImgError ? (
                <img
                  src="/VEGA.png"
                  alt="Vega Financial screenshot"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={() => setVegaImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div
                    className="text-5xl font-black mb-3 text-transparent bg-clip-text"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      backgroundImage: 'linear-gradient(135deg, #f060b4, #ff99d1)',
                    }}
                  >
                    VEGA
                  </div>
                  <p className="text-sm text-white/50 dark:text-zinc-500 mb-4 max-w-xs">
                    Algorithmic trading, finally for you.
                  </p>
                  <a
                    href="https://vegafinancial.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-pink-300 dark:text-pink-600 underline hover:text-pink-200 transition-colors"
                  >
                    Open vegafinancial.uk →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Project Grid ─────────────────────────────────────────── */}
      <div id="project-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link href={project.href} key={project.title}>
            <a className="group block focus-visible:outline focus-visible:ring-2 focus-visible:ring-pink-400 rounded-xl">
              <Tilt
                glareEnable={false}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                transitionSpeed={700}
                className="card-frame rounded-xl overflow-hidden"
              >
                {/* Use fixed-height container with Next.js fill image */}
                <div className="relative w-full h-60">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
                  <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/20 transition-colors duration-300" />

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3
                      className="text-xs tracking-[0.18em] font-semibold text-white/90 group-hover:text-pink-200 transition-colors"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Arrow on hover */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                    <svg className="w-3 h-3 text-pink-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Tilt>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
