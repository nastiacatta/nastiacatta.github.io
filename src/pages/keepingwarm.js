import Header from '../components/Header';

export default function KeepingWarm() {
  return (
    <div className="bg-dark-grey text-light-pink dark:bg-white dark:text-dark-grey min-h-screen">
      <Header />
      <section className="section">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl font-bold mb-4">Keeping Warm - Heated Blanket for Wheelchairs</h1>
          <p className="text-lg mb-6">
            This project presents a heated blanket for wheelchair users, powered by kinetic energy from the wheels' movement.
          </p>
          <p className="text-lg mb-6">
            A dynamo hub generates electricity as the wheels turn, charging a buffer battery that powers the blanket's carbon-fiber heating elements for up to 3 hours.
          </p>
          <p className="text-lg mb-6">
            The system is designed to maintain a temperature between 40-50°C, with the blanket made from durable, hypoallergenic, and waterproof polyester microfiber.
          </p>
          <img src="/keepingwarm.png" alt="Heated Blanket for Wheelchairs" className="rounded-lg shadow-lg w-full h-auto mt-6" />
        </div>
      </section>
    </div>
  );
}
