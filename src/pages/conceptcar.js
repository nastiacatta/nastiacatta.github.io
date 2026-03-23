// src/pages/conceptcar.js
import Header from '../components/Header';

export default function ConceptCar() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="project-page-inner">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 neon leading-tight">Concept Car</h1>
          <div className="flex justify-center mb-8">
            <img
              src="/conceptcar.png"
              alt="Concept Car"
              className="rounded-lg shadow-lg w-full h-auto max-w-md md:max-w-lg"
              sizes="(max-width: 768px) 100vw, 28rem"
              loading="eager"
              decoding="async"
            />
          </div>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            The Cuore SUV, inspired by the BMW X5, was designed with expanded dimensions for comfort and a streamlined profile for reduced drag. CFD simulations assessed airflow, pressure, and velocity, identifying drag issues at the front and rear due to airflow separation.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            The model exhibited a higher-than-expected drag coefficient, indicating the need for design improvements. Wind tunnel tests confirmed these findings, leading to recommendations for optimising the front bumper, side skirts, and rear contour to enhance aerodynamic performance.
          </p>
        </div>
      </section>
    </div>
  );
}
