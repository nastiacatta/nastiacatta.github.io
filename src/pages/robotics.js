// src/pages/robotics.js
import Header from '../components/Header';

export default function Robotics() {
  return (
    <div className="bg-dark-grey text-light-pink dark:bg-white dark:text-dark-grey min-h-screen">
      <Header />

      <section className="section">
        <div className="container mx-auto py-16 px-6">
          {/* Title + Intro */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2">
              <h1 className="text-5xl mb-4 neon">Robotics</h1>
              <p className="text-lg mb-4 max-w-3xl">
                Selected robotics work: mechanisms, control, and perception demos.
              </p>

              {/* Short paragraph */}
              <div className="mt-4 rounded-lg border border-current/10 p-4 text-base leading-relaxed">
                This project shows how the 7-DoF DE NIRO robot can manipulate and interact with objects using three control modes.
                With <strong>position control</strong>, we computed end-effector orientations (Euler → quaternion) and executed smooth
                pick-and-place and two-arm hand-over while avoiding collisions. With <strong>velocity control</strong>, Jacobians and the
                pseudo-inverse produced joint speeds and used null-space redundancy for obstacle avoidance. With <strong>torque/force control</strong>
                and a PD scheme, the robot demolished a wall and swept a table, tuning for stable, safe contact.
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src="/robotics.png"
                alt="Robotics cover"
                className="rounded-lg shadow-lg w-full h-auto max-w-lg"
              />
            </div>
          </div>

          {/* 3-image gallery */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <img
              src="/robotics_1.png"
              alt="Manipulator task execution"
              className="rounded-lg shadow-md w-full h-auto"
            />
            <img
              src="/robotics_2.png"
              alt="Velocity control & obstacle avoidance"
              className="rounded-lg shadow-md w-full h-auto"
            />
            <img
              src="/robotics_3.png"
              alt="Force interaction demo"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
