import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';
import { VISIONE_DASHBOARD_URL } from '../constants/visioneDashboard';
import { VISIONE_INFO_PARAGRAPHS } from '../constants/visioneInfo';
import { SEO2_COVER_SRC, REORBIT_COVER_SRC } from '../constants/projectCovers';

const projects = [
  { title: 'ROBOTICS',      href: '/robotics',    imageSrc: '/robotics.png' },
  { title: 'SEAO2',         href: '/seao2',        imageSrc: SEO2_COVER_SRC, coverPngOnly: true },
  { title: 'REORBIT',       href: '/reorbit',      imageSrc: REORBIT_COVER_SRC, coverPngOnly: true },
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
  const [visioneInfoOpen, setVisioneInfoOpen] = useState(false);
  const [mastersOpen, setMastersOpen] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  const [imageAttempts, setImageAttempts] = useState({});
  const [tiltEnabled, setTiltEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px) and (hover: hover) and (pointer: fine)');
    const update = () => setTiltEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const buildImageCandidates = (project) => {
    const src = project.imageSrc;
    if (!src || typeof src !== 'string') return [];
    // SEAO2 / ReOrbit: only ever use the canonical PNG (+ query string), never .jpg fallbacks
    if (project.coverPngOnly) return [src];
    const dot = src.lastIndexOf('.');
    if (dot === -1) return [src];
    const q = src.indexOf('?');
    const pathOnly = q === -1 ? src : src.slice(0, q);
    const base = pathOnly.slice(0, pathOnly.lastIndexOf('.'));
    const ext = pathOnly.slice(pathOnly.lastIndexOf('.') + 1).toLowerCase();
    const suffix = q === -1 ? '' : src.slice(q);
    const variants = new Set([src]);
    if (ext === 'jpeg' || ext === 'jpg') {
      variants.add(`${base}.jpg${suffix}`);
      variants.add(`${base}.jpeg${suffix}`);
    }
    if (ext === 'png') {
      variants.add(`${base}.jpg${suffix}`);
      variants.add(`${base}.jpeg${suffix}`);
    }
    return [...variants];
  };

  const getCurrentImageSrc = (project) => {
    const candidates = buildImageCandidates(project);
    const attempt = imageAttempts[project.title] || 0;
    return candidates[Math.min(attempt, candidates.length - 1)];
  };

  const handleProjectImageError = (project) => {
    const candidates = buildImageCandidates(project);
    const attempt = imageAttempts[project.title] || 0;
    if (attempt < candidates.length - 1) {
      setImageAttempts((prev) => ({ ...prev, [project.title]: attempt + 1 }));
      return;
    }
    setFailedImages((prev) => ({ ...prev, [project.title]: true }));
  };

  return (
    <div>
      {/* ── Featured: Vega Financial ───────────────────────────── */}
      <div className="mb-6" data-animate>
        <div className="featured-project-card featured-project-card-hover rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* Left: copy */}
            <div className="lg:w-1/2 p-5 sm:p-7 md:p-10 flex flex-col justify-between">
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
                  {['Startup', 'Algorithmic Trading', 'Web Development'].map(tag => (
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
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-pink-500 hover:bg-pink-400 text-white text-sm font-medium transition-all duration-300 hover:shadow-[0_8px_28px_rgba(240,96,180,0.45)] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_18px_rgba(240,96,180,0.35)] touch-manipulation"
                >
                  Visit Website
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: VEGA.png — panel matches asset black so no grey/pink halo */}
            <div className="featured-vega-visual lg:w-1/2 border-t lg:border-t-0 lg:border-l border-pink-400/20 bg-black flex items-center justify-center overflow-hidden p-5 md:p-8 min-h-[min(280px,40vh)]">
              {!vegaImgError ? (
                <div className="vega-featured-image-wrap w-full flex justify-center">
                  <img
                    src="/VEGA.png?v=11"
                    alt="Vega Financial product screenshot"
                    width={1200}
                    height={800}
                    loading="eager"
                    decoding="async"
                    className="vega-featured-image w-full h-auto object-contain object-center max-h-[min(360px,52vh)] sm:max-h-[360px] mx-auto"
                    onError={() => setVegaImgError(true)}
                  />
                </div>
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

      {/* ── Featured: Political Violence Forecasting (Visione) ─── */}
      <div className="mb-10" data-animate data-delay="2">
        <div className="featured-project-card rounded-2xl overflow-hidden">
          <div className="p-7 md:p-10 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <p className="section-label mb-2">Featured Data Product</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Political Violence Forecasting
                </h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Visione', 'ACLED', 'R Shiny', 'Forecasting'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 text-xs rounded-full border border-pink-400/25 text-pink-200 dark:text-pink-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-row flex-wrap items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setVisioneInfoOpen((o) => !o)}
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border border-pink-400/35 text-pink-200 dark:text-pink-700 hover:bg-pink-500/10 dark:hover:bg-pink-400/15 transition-colors touch-manipulation"
                  aria-expanded={visioneInfoOpen}
                  aria-label={visioneInfoOpen ? 'Hide Visione details' : 'Show Visione details'}
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300"
                    style={{ transform: visioneInfoOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <a
                  href={VISIONE_DASHBOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-400 text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_8px_28px_rgba(240,96,180,0.45)] hover:-translate-y-0.5 shadow-[0_4px_18px_rgba(240,96,180,0.35)] touch-manipulation w-full sm:w-auto"
                >
                  Open Visione
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>

            <div
              className="overflow-hidden transition-all duration-300 ease-out border-t border-pink-400/15"
              style={{ maxHeight: visioneInfoOpen ? '320px' : '0', opacity: visioneInfoOpen ? 1 : 0 }}
            >
              <div className="pt-5 space-y-3">
                {VISIONE_INFO_PARAGRAPHS.map((para, i) => (
                  <p key={i} className="text-sm md:text-base text-white/70 dark:text-zinc-600 leading-relaxed max-w-3xl">
                    {para}
                  </p>
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
                  tiltEnable={tiltEnabled}
                  glareEnable={false}
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  transitionSpeed={700}
                  className="card-frame rounded-xl overflow-hidden"
                >
                  <div className="relative w-full h-52">
                    {!failedImages[project.title] ? (
                      <img
                        src={getCurrentImageSrc(project)}
                        alt={project.title}
                        loading="eager"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => handleProjectImageError(project)}
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
