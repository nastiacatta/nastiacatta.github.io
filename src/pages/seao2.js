// src/pages/seao2.js
import Header from '../components/Header';

export default function SeaO2() {
  return (
    <div className="bg-dark-grey text-light-pink dark:bg-white dark:text-dark-grey min-h-screen">
      <Header />

      <section className="section">
        <div className="container mx-auto py-16 px-6">
          {/* Title + Intro */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2">
              <h1 className="text-5xl mb-4 neon">SEA-O₂</h1>

              <p className="text-lg mb-4 max-w-3xl">
                In the future, a growing number of abandoned oil rigs will be converted into carbon storage facilities, injecting
                captured CO₂ to mitigate emissions. This approach is viewed as a transitional tool within a broader climate
                strategy rather than a permanent solution. These rigs, repurposed as carbon storage sites, also serve as
                artificial reefs that enhance marine biodiversity and attract fish, thereby supporting local fisheries.
              </p>

              <p className="text-lg mb-4 max-w-3xl">
                To address fishermen’s concerns regarding data transparency, technological and long term monitoring
                uncertainties, the SEA-O₂ program was introduced. This initiative unites fishermen, carbon storage operators,
                and other stakeholders in a collaborative effort to monitor and manage carbon storage. Fishermen use sensors
                mounted on their own vessels to detect potential leaks, and they share co-ownership of the collected data,
                empowering them to track storage status and maintain confidence in the system. In return, they receive
                targeted incentives, including financial rewards and "Blue Certifications" for CCS-compliant catches, which
                command premium market prices.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src="/seao2.png"
                alt="SEA-O₂ cover"
                className="rounded-lg shadow-lg w-full h-auto max-w-lg"
              />
            </div>
          </div>

          {/* PDF */}
          <div className="mt-12">
            <h2 className="text-2xl mb-4 font-semibold">Project PDF</h2>
            <div className="rounded-lg shadow-lg overflow-hidden border border-current/10">
              <iframe
                src="/seao2.pdf"
                title="SEA-O₂ PDF"
                className="w-full"
                style={{ minHeight: '900px' }}
              />
            </div>
            <p className="mt-3 text-sm opacity-80">
              If the preview doesn’t load, <a href="/seao2.pdf" className="underline">download the PDF</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
