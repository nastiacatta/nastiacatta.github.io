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
          This project unveils a conceptual, biomimicry-inspired dress that blends fashion with technology, reacting to environmental changes like natural organisms...
        </p>
      </div>
    </div>
  );
}
