// src/pages/keepingwarm.js
import Header from '../components/Header';

export default function KeepingWarm() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="project-page-inner">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 neon leading-tight">Keeping Warm</h1>
          <div className="flex justify-center mb-8">
            <img
              src="/keepingwarm.png"
              alt="Heated Blanket for Wheelchair Users"
              className="rounded-lg shadow-lg w-full h-auto max-w-md md:max-w-lg"
              sizes="(max-width: 768px) 100vw, 28rem"
              loading="eager"
              decoding="async"
            />
          </div>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            This project presents a heated blanket for wheelchair users, powered by kinetic energy from the wheels' movement. A dynamo hub generates electricity as the wheels turn, charging a buffer battery that powers the blanket's carbon-fiber heating elements for up to 3 hours.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            The system is designed to maintain a temperature between 40-50°C, with the blanket made from durable, hypoallergenic, and waterproof polyester microfiber.
          </p>
        </div>
      </section>
    </div>
  );
}
