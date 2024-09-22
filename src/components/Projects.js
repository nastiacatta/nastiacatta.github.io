import React from 'react';

const projects = [
  {
    title: 'EXO GLOVE',
    description: 'A wearable technology designed to boost grip strength and reduce strain for women DIY enthusiasts and homeowners.',
    imgSrc: '/images/exoglove.png',
    link: '/exoglove',
    fullDescription: `The Exo Glove is a wearable technology designed to boost grip strength and reduce strain for women DIY enthusiasts and homeowners. 
    By focusing on ergonomic comfort and minimizing fatigue, the Exo Glove enables users to perform tasks requiring manual dexterity more effectively. 
    Addressing the gap in grip and upper body strength between men and women, the Exo Glove aims to empower women to handle home improvement tasks efficiently.
    The glove enhances grip strength using air pumps and soft robotics that curl the fingers upon contact with an object, providing a secure hold and deflating once the object is released. 
    It was developed using advanced soft robotics and ergonomic design principles. The glove is powered by rechargeable lithium-ion batteries providing up to eight hours of continuous use.`
  },
  {
    title: 'BIOMORPHUS',
    description: 'A biomimicry-inspired dress that reacts to environmental changes like natural organisms.',
    imgSrc: '/images/biomorphus.png',
    link: '/biomorphus',
    fullDescription: `This project unveils a conceptual, biomimicry-inspired dress that blends fashion with technology, reacting to environmental changes like natural organisms. 
    Equipped with sensors for distance, light, and sound, the dress transforms with fabric flowers, Electroluminescent Wire, and reactive movements, mimicking nature’s intricate behaviors.
    The dress, crafted from a transparent, pearl-like fabric, incorporates three sensors that enable it to respond uniquely to environmental stimuli in ways akin to certain living organisms.
    The project explores how technology can be harmoniously integrated into daily life, creating a dynamic relationship between humans and the machines they interact with.`
  },
  {
    title: 'INNOVICE',
    description: 'An AI-powered platform to facilitate furniture repair, reducing waste and promoting a circular economy.',
    imgSrc: '/images/innovice.png',
    link: '/innovice',
    fullDescription: `The project aims to address significant wastefulness in the furniture industry by targeting the inefficient management of discarded furniture.
    The proposed solution includes developing an AI-powered platform that facilitates furniture repair, creating a concept for a damage scanner to expedite the fixing process.
    This scanner, integrated into handheld devices, assists furniture repair workers by providing style, color, and pattern suggestions and comparing prices and dimensions of different products.
    Ultimately, the project aims to reduce waste and foster a circular economy by merging manual scanning and application functions into a single efficient device.`
  }
];

export default function Projects() {
  return (
    <section className="py-10 px-6">
      <h2 className="text-3xl font-bold mb-8">My Projects</h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="project-box flex items-center">
            <img src={project.imgSrc} alt={project.title} className="w-16 h-16 mr-4" />
            <div>
              <h3 className="text-2xl font-semibold">
                <a href={project.link}>{project.title}</a>
              </h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
