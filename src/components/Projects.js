// src/components/Projects.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component

export default function Projects() {
  const projects = [
    {
      title: 'EXO GLOVE',
      href: '/exoglove',
      imageSrc: '/exoglove.jpeg', // Ensure this matches your actual file extension
    },
    {
      title: 'BIOMORPHUS',
      href: '/biomorphus',
      imageSrc: '/biomorphus.jpeg', // Ensure this matches your actual file extension
    },
    {
      title: 'INNOVICE',
      href: '/innovice',
      imageSrc: '/innovice.jpeg', // Ensure this matches your actual file extension
    },
  ];

  return (
    <div className="project-container">
      {projects.map((project) => (
        <Link href={project.href} key={project.title} className="project-card">
          {/* Next.js Image component for optimized images */}
          <Image
            src={project.imageSrc}
            alt={project.title}
            layout="fill" // Makes the image fill the parent container
            objectFit="cover" // Ensures the image covers the entire area without distortion
            className="project-image" // Optional: Add a class for additional styling
          />
          <div className="project-info">
            <h3>{project.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
