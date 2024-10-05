// src/pages/robotcar.js
import Header from '../components/Header';

export default function RobotCar() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl font-bold mb-4 neon">ROBOT CAR</h1>
          <div className="mb-8">
            <img
              src="/robotcar.png"
              alt="Robotic Car Project"
              className="rounded-lg shadow-lg w-3/4 h-auto mx-auto md:w-1/2" // Adjusted image size
            />
          </div>
          <p className="text-lg mb-6">
            Collaborated within a team to design and develop a robotic vehicle controlled via Bluetooth using an ESP32 microcontroller and programmed with MicroPython. The vehicle’s body was designed using Fusion360 software and fabricated through laser cutting from thin acrylic sheets, ensuring precision and efficiency.
          </p>
        </div>
      </section>
    </div>
  );
}
