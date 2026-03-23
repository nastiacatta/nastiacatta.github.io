import Header from '../components/Header';
import Link from 'next/link';
import { VISIONE_DASHBOARD_URL } from '../constants/visioneDashboard';

const dashboardUrl = VISIONE_DASHBOARD_URL;

export default function Data2ProductDashboard() {
  return (
    <div className="bg-dark-grey text-light-pink dark:bg-white dark:text-dark-grey min-h-screen">
      <Header />

      <section className="section pb-24 md:pb-16">
        <div className="container mx-auto py-12 sm:py-16 px-4 sm:px-6 max-w-3xl">

          <div className="mb-8">
            <p className="section-label mb-2">Data Product</p>
            <h1 className="text-4xl md:text-5xl font-bold neon mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
              Visione
            </h1>
            <p className="text-base text-white/60 dark:text-zinc-500 font-medium tracking-wide">
              Political Violence Forecasting Dashboard
            </p>
          </div>

          {/* Primary: always new tab — no iframe embed */}
          <div className="rounded-2xl border border-pink-400/25 p-6 md:p-8 mb-10 bg-black/25 dark:bg-pink-50/70 text-center">
            <p className="text-sm text-white/75 dark:text-zinc-600 mb-5 leading-relaxed">
              Visione runs as a full interactive app on{' '}
              <span className="text-pink-200 dark:text-pink-700 font-medium">shinyapps.io</span>.
              Open it in a <strong className="text-white dark:text-zinc-800">new browser tab</strong> for the best experience (maps, scrolling, and performance).
            </p>
            <a
              href={dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-400 text-white text-base font-semibold shadow-[0_6px_28px_rgba(240,96,180,0.45)] transition-all touch-manipulation w-full sm:w-auto"
            >
              Open Visione in new tab
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-2xl border border-pink-400/15 p-6 bg-black/20 dark:bg-pink-50/60">
              <h2 className="text-lg font-semibold mb-3 text-white dark:text-zinc-800" style={{ fontFamily: 'Syne, sans-serif' }}>
                What is Visione?
              </h2>
              <p className="text-sm text-white/75 dark:text-zinc-600 leading-relaxed">
                Modern conflicts unfold both offline and online. Visione combines indicators of digital
                repression with a statistical forecasting model to highlight where political violence risk
                is elevated and which indicators are most strongly associated with that risk in each country.
                It integrates data from ACLED, the Digital Society Project, World Bank, V-Dem, and climate
                vulnerability indices into a single country–month framework.
              </p>
            </div>
            <div className="rounded-2xl border border-pink-400/15 p-6 bg-black/20 dark:bg-pink-50/60">
              <h2 className="text-lg font-semibold mb-3 text-white dark:text-zinc-800" style={{ fontFamily: 'Syne, sans-serif' }}>
                Two views
              </h2>
              <ul className="space-y-2 text-sm text-white/75 dark:text-zinc-600 leading-relaxed">
                <li>
                  <span className="text-pink-300 dark:text-pink-600 font-medium">Global overview —</span>{' '}
                  a world map classifying countries by forecast change: Fewer than 5 events, Decrease, Limited change, or Increase.
                </li>
                <li>
                  <span className="text-pink-300 dark:text-pink-600 font-medium">Country analysis —</span>{' '}
                  historical and forecast political violence timeline, plus an indicator panel ranking drivers by estimated contribution to current risk, with digital repression indicators highlighted.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {['Political Violence', 'Digital Repression', 'ACLED', 'Forecasting', 'R Shiny', 'State Space Model', 'DSP'].map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-full border border-pink-400/25 text-pink-200 dark:text-pink-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-6 border-t border-pink-400/15">
            <Link href="/#projects">
              <a className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 rounded-full border border-pink-400/30 text-pink-200 dark:text-pink-700 text-sm font-medium hover:bg-pink-500/10 transition-colors touch-manipulation">
                Back to Projects
              </a>
            </Link>
            <a
              href={dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-full bg-pink-500/90 hover:bg-pink-500 text-white text-sm font-semibold touch-manipulation"
            >
              Open Visione again
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
