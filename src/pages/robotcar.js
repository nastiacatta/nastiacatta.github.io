import Header from '../components/Header';

export default function RobotCar() {
  return (
    <div className="bg-dark-grey text-light-pink dark:bg-white dark:text-dark-grey min-h-screen">
      <Header />
      <section className="section">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl font-bold mb-4">Robot Car Project</h1>
          <p className="text-lg mb-6">
            Collaborated within a team to design and develop a robotic vehicle controlled via Bluetooth using an ESP32 microcontroller and programmed with MicroPython.
          </p>
          <p className="text-lg mb-6">
            The vehicle’s body was designed using Fusion360 software and fabricated through laser cutting from thin acrylic sheets, ensuring precision and efficiency.
          </p>
          <img src="/robotcar.png" alt="Robot Car Image" className="rounded-lg shadow-lg w-full h-auto mt-6" />
        </div>
      </section>
    </div>
  );
}
