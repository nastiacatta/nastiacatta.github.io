import Header from '../components/Header';

export default function ConceptCar() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl font-bold mb-4">CONCEPT CAR</h1>
          <div className="mb-8">
            <img
              src="/conceptcar.jpg"  // Assuming the image is saved as 'conceptcar.jpg' in the public folder
              alt="Concept Car"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <p className="text-lg mb-6">
            The Cuore SUV, inspired by the BMW X5, was designed with expanded dimensions for comfort and a streamlined profile for reduced drag. CFD simulations assessed airflow, pressure, and velocity, identifying drag issues at the front and rear due to airflow separation.
          </p>
          <p className="text-lg mb-6">
            The model exhibited a higher-than-expected drag coefficient, indicating the need for design improvements. Wind tunnel tests confirmed these findings, leading to recommendations for optimising the front bumper, side skirts, and rear contour to enhance aerodynamic performance.
          </p>
        </div>
      </section>
    </div>
  );
}
