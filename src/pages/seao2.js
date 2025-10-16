import Header from '../components/Header';

export default function SeaO2() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl mb-4 neon">SeaO₂</h1>
          <p className="text-lg mb-6 max-w-4xl mx-auto">
            Concept and prototypes around ocean CO₂ capture and monitoring.
          </p>
          <img src="/seao2.png" alt="SeaO2" className="mx-auto rounded-lg shadow-lg max-w-3xl w-full" />
        </div>
      </section>
    </div>
  );
}
