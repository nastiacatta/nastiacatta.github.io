import Header from '../components/Header';

export default function Robotics() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl mb-4 neon">Robotics</h1>
          <p className="text-lg mb-6 max-w-4xl mx-auto">
            Selected robotics work: mechanisms, control, and perception demos.
          </p>
          <img src="/robotics.png" alt="Robotics" className="mx-auto rounded-lg shadow-lg max-w-3xl w-full" />
        </div>
      </section>
    </div>
  );
}
