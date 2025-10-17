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

              {/* Added concept blurb */}
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

          {/* Optional gallery (delete if not used) */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <img src="/reorbit_1.png" alt="Orbit visualisation" className="rounded-lg shadow-md w-full h-auto" />
            <img src="/reorbit_2.png" alt="Link budget view" className="rounded-lg shadow-md w-full h-auto" />
            <img src="/reorbit_3.png" alt="Mission dashboard" className="rounded-lg shadow-md w-full h-auto" />
          </div>

          {/* Optional video (replace src or remove block) */}
          <div className="mt-12">
            <div className="w-full rounded-lg shadow-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/XXXXXXXXXXX"
                title="ReOrbit demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
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
