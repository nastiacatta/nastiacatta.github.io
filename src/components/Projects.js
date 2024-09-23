import React from 'react';
import Link from 'next/link';

export default function Projects() {
  return (
    <div className="py-10 px-6">
      <h2 className="text-4xl font-bold mb-6">Projects</h2>
      <div className="project-title mb-4">
        <Link href="/exoglove">
          <a className="text-2xl hover:text-pink-500 transition-colors duration-300">EXO GLOVE</a>
        </Link>
      </div>
      <div className="project-title mb-4">
        <Link href="/biomorphus">
          <a className="text-2xl hover:text-pink-500 transition-colors duration-300">BIOMORPHUS</a>
        </Link>
      </div>
      <div className="project-title mb-4">
        <Link href="/innovice">
          <a className="text-2xl hover:text-pink-500 transition-colors duration-300">INNOVICE</a>
        </Link>
      </div>
    </div>
  );
}
