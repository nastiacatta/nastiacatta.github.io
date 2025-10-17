// src/pages/reorbit.js
import Header from '../components/Header';

export default function Reorbit() {
  return (
    <div className="bg-dark-grey text-light-pink dark:bg-white dark:text-dark-grey min-h-screen">
      <Header />

      <section className="section">
        <div className="container mx-auto py-16 px-6">
          {/* Title + Intro */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2">
              <h1 className="text-5xl mb-4 neon">ReOrbit</h1>
              <p className="text-lg mb-4 max-w-3xl">
                Space systems concept work: autonomy, comms links, and visualisations.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base opacity-90">
                <li>Autonomous tasking & on-board decision support prototypes.</li>
                <li>Comms link budgeting and pass visualisation (LEO → ground).</li>
                <li>Mission design dashboards and 3D orbit visualisers.</li>
              </ul>

              {/* Concept blurb */}
              <div className="mt-6 rounded-lg border border-current/10 p-4 text-base leading-relaxed">
                ReOrbit tackles space junk by using two kinds of satellites: laser “brooms” that gently nudge debris onto safe, predictable paths, and robotic “dustpans” that capture those pieces and deliver them to customers in orbit. This cuts collision risk for working satellites, helps operators meet debris rules, and turns waste into a resource by paying owners for defunct hardware and reselling the recovered materials to in-orbit manufacturing firms. In short, it’s a scalable, pay-as-you-go service that cleans up Low Earth Orbit while seeding a circular space economy.
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src="/reorbit.png"
                alt="ReOrbit cover"
                className="rounded-lg shadow-lg w-full h-auto max-w-lg"
              />
            </div>
          </div>

          {/* PDF */}
          <div className="mt-12">
            <h2 className="text-2xl mb-4 font-semibold">Project PDF</h2>
            <div className="rounded-lg shadow-lg overflow-hidden border border-current/10">
              <iframe
                src="/reorbit.pdf"
                title="ReOrbit PDF"
                className="w-full"
                style={{ minHeight: '900px' }}
              />
            </div>
            <p className="mt-3 text-sm opacity-80">
              If the preview doesn’t load, <a href="/reorbit.pdf" className="underline">download the PDF</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
