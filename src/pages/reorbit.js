import Header from '../components/Header';

export default function Reorbit() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl mb-4 neon">ReOrbit</h1>
          <p className="text-lg mb-6 max-w-4xl mx-auto">
            Space systems concept work: autonomy, comms links, and visualisations.
          </p>
          <img src="/reorbit.png" alt="ReOrbit" className="mx-auto rounded-lg shadow-lg max-w-3xl w-full" />
        </div>
      </section>
    </div>
  );
}
