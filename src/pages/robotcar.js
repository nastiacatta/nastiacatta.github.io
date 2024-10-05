// src/pages/robotcar.js
import Header from '../components/Header';

export default function RobotCar() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl mb-4 neon">Robot Car</h1>
          <div className="flex justify-center mb-8">
            <img
              src="/robotcar.png"
              alt="Robotic Car Project"
              className="rounded-lg shadow-lg w-full h-auto max-w-md md:max-w-lg" // Image is centered and responsive
            />
          </div>
          <p className="text-lg mb-6 max-w-4xl mx-auto">
            Collaborated within a team to design and develop a robotic vehicle controlled via Bluetooth using an ESP32 microcontroller and programmed with MicroPython. The vehicle’s body was designed using Fusion360 software and fabricated through laser cutting from thin acrylic sheets, ensuring precision and efficiency.
          </p>
        </div>
      </section>
    </div>
  );
}
