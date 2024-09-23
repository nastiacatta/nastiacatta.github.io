import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="h-screen bg-indigo-600 flex items-center justify-center text-center text-white">
      <div>
        <h1 className="text-5xl font-bold">Hi, I'm Anastasia</h1>
        <p className="text-xl mt-4">Aspiring Designer Engineer</p>
        <div className="mt-8">
          <a href="#projects" className="px-6 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-200">View My Work</a>
        </div>
      </div>
    </section>
  );
}
