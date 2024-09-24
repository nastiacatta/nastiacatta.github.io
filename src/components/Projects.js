// src/components/Projects.jsx

import React from 'react';
import Link from 'next/link';

export default function Projects() {
  const projects = [
    {
      title: 'EXO GLOVE',
      href: '/exoglove',
      imageSrc: '/images/exoglove.jpg', // Path relative to the public folder
    },
    {
      title: 'BIOMORPHUS',
      href: '/biomorphus',
      imageSrc: '/images/biomorphus.jpg', // Path relative to the public folder
    },
    {
      title: 'INNOVICE',
      href: '/innovice',
      imageSrc: '/images/innovice.jpg', // Path relative to the public folder
    },
  ];

  return (
    <div className="py-10 px-6">
      <h2 className="text-4xl font-bold mb-6">Projects</h2>
      <div className="project-container">
        {projects.map((project) => (
          <Link href={project.href} key={project.title}>
            <a className="project-card">
              <img src={project.imageSrc} alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
