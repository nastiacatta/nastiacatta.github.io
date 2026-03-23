import Header from '../components/Header';

export default function Innovice() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="project-page-inner">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 neon leading-tight">Innovice</h1>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            The Innovice project addresses the significant wastefulness in the furniture industry by targeting the inefficient management of discarded furniture.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            In the UK alone, only 17% of disposed furniture is recycled, with 22 million pieces discarded annually. This project focuses on large corporations where most furniture disposal occurs.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            The solution involves developing an AI-powered platform to facilitate furniture repair, including a concept for a damage scanner that can streamline and expedite the fixing process.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            By integrating this technology into existing systems, such as handheld computers used in large furniture companies, the project aims to reduce manual errors in the repair process and enhance the skill set of employees.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            The project also proposes creating a wearable AI-powered mobile computer equipped with a 3D scanner, camera, and CAD software, assisting furniture repair workers by providing style, color, and pattern suggestions.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            This innovative solution aims to reduce waste and foster a circular economy by revolutionising the furniture repair industry.
          </p>

          {/* Embed the PDF */}
          <iframe
            src="/innovice.pdf"
            title="Innovice PDF"
            className="pdf-embed-frame rounded-lg border border-current/10 mt-4"
          />
        </div>
      </section>
    </div>
  );
}
