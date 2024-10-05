import Header from '../components/Header';

export default function ConceptCar() {
  return (
    <div className="bg-dark-grey text-light-pink dark:bg-white dark:text-dark-grey min-h-screen">
      <Header />
      <section className="section">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl font-bold mb-4">Concept Car - Cuore SUV</h1>
          <img src="/conceptcar.png" alt="Concept Car Image" className="rounded-lg shadow-lg w-full h-auto mb-6" />
          <p className="text-lg mb-6">
            The Cuore SUV, inspired by the BMW X5, was designed with expanded dimensions for comfort and a streamlined profile for reduced drag.
          </p>
          <p className="text-lg mb-6">
            CFD simulations assessed airflow, pressure, and velocity, identifying drag issues at the front and rear due to airflow separation. The model exhibited a higher-than-expected drag coefficient, indicating the need for design improvements.
          </p>
          <p className="text-lg mb-6">
            Wind tunnel tests confirmed these findings, leading to recommendations for optimizing the front bumper, side skirts, and rear contour to enhance aerodynamic performance.
          </p>
        </div>
      </section>
    </div>
  );
}
