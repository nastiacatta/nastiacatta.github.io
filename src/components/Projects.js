// src/components/Projects.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      title: 'EXO GLOVE',
      href: '/exoglove',
      imageSrc: '/images/exoglove.jpeg',
    },
    {
      title: 'BIOMORPHUS',
      href: '/biomorphus',
      imageSrc: '/images/biomorphus.jpeg',
    },
    {
      title: 'INNOVICE',
      href: '/innovice',
      imageSrc: '/images/innovice.jpeg',
    },
    {
      title: 'PROJECT 4',
      href: '/project4',
      imageSrc: '/images/project4.jpeg',
    },
    {
      title: 'PROJECT 5',
      href: '/project5',
      imageSrc: '/images/project5.jpeg',
    },
    {
      title: 'PROJECT 6',
      href: '/project6',
      imageSrc: '/images/project6.jpeg',
    },
  ];

  return (
    <div className="py-10 px-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href={project.href} key={project.title}>
            <a className="relative group">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="transition-transform duration-300 transform group-hover:scale-105 group-hover:brightness-75"
                />
                {/* Pink filter overlay */}
                <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
