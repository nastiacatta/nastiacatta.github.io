// src/pages/innovice.js

import Header from '../components/Header';

export default function Innovice() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl font-bold mb-4">INNOVICE</h1>
          <p className="text-lg mb-6">
            The Innovice project addresses the significant wastefulness in the furniture industry by targeting the inefficient management of discarded furniture.
          </p>
          <p className="text-lg mb-6">
            In the UK alone, only 17% of disposed furniture is recycled, with 22 million pieces discarded annually. This project focuses on large corporations where most furniture disposal occurs.
          </p>
          <p className="text-lg mb-6">
            The solution involves developing an AI-powered platform to facilitate furniture repair, including a concept for a damage scanner that can streamline and expedite the fixing process.
          </p>
          <p className="text-lg mb-6">
            By integrating this technology into existing systems, such as handheld computers used in large furniture companies, the project aims to reduce manual errors in the repair process and enhance the skill set of employees.
          </p>
          <p className="text-lg mb-6">
            The project also proposes creating a wearable AI-powered mobile computer equipped with a 3D scanner, camera, and CAD software, assisting furniture repair workers by providing style, color, and pattern suggestions.
          </p>
          <p className="text-lg mb-6">
            This innovative solution aims to reduce waste and foster a circular economy by revolutionizing the furniture repair industry.
          </p>
        </div>
      </section>
    </div>
  );
}
