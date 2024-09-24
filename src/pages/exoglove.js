// src/pages/exoglove.js

import Header from '../components/Header';

export default function ExoGlove() {
  return (
    <div className="bg-dark-grey text-light-pink min-h-screen">
      <Header />
      <section className="section">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl font-bold mb-4">EXO GLOVE</h1>
          <p className="text-lg mb-6">
            The Exo Glove is a wearable technology designed to boost grip strength and reduce strain for women DIY enthusiasts and homeowners.
          </p>
          <p className="text-lg mb-6">
            By focusing on ergonomic comfort and minimizing fatigue, the Exo Glove enables users to perform tasks requiring manual dexterity more effectively.
          </p>
          <p className="text-lg mb-6">
            Addressing the gap in grip and upper body strength between men and women, the Exo Glove aims to empower women to handle home improvement tasks efficiently.
          </p>
          <p className="text-lg mb-6">
            This innovative glove enhances grip strength using air pumps and soft robotics that curl the fingers upon contact with an object, providing a secure hold and deflating once the object is released.
          </p>
          <p className="text-lg mb-6">
            Developed using advanced soft robotics and ergonomic design principles, the Exo Glove integrates force-sensitive resistors (FSRs) in the fingertips to detect grip pressure accurately.
          </p>
          <p className="text-lg mb-6">
            Powered by rechargeable lithium-ion batteries, the glove provides up to eight hours of continuous use, making power tools universally accessible and challenging gender biases in the industry.
          </p>
          <p className="text-lg mb-6">
            This sophisticated, user-centric solution enhances grip strength and reduces strain for women DIY enthusiasts, embodying the perfect blend of design and engineering.
          </p>
        </div>
      </section>
    </div>
  );
}
