import React from 'react';
import Header from '../components/Header'; // Assuming Header is a shared component

export default function Biomorphus() {
  return (
    <div>
      <Header />
      <div className="py-10 px-6">
        <h1 className="text-4xl font-bold mb-4">BIOMORPHUS</h1>
        <img src="/images/biomorphus.png" alt="Biomorphus" className="w-full mb-4" />
        <p className="text-lg">
          This project unveils a conceptual, biomimicry-inspired dress that blends fashion with technology, reacting to environmental changes like natural organisms. 
          Equipped with sensors for distance, light, and sound, the dress transforms with fabric flowers, Electroluminescent Wire, and reactive movements, mimicking nature’s intricate behaviors.
          The dress, crafted from a transparent, pearl-like fabric, incorporates three sensors that enable it to respond uniquely to environmental stimuli in ways akin to certain living organisms.
          The project explores how technology can be harmoniously integrated into daily life, creating a dynamic relationship between humans and the machines they interact with.
        </p>
        <p className="text-lg mt-4">
          The distance sensor, connected to a DC motor, animates fabric structures resembling flowers, mimicking the reactive behavior of plants like the Mimosa Pudica through a thread pull system. 
          As the light dims, the dress transforms with an Electroluminescent Wire, reminiscent of bioluminescent algae, integrated and regulated by a light sensor coupled with a MOSFET circuit, adding a mystical glow to the garment. 
          The dress features a servo motor that reacts to sound and sudden air movements, creating an interaction that blurs the line between the animate and inanimate.
        </p>
      </div>
    </div>
  );
}
