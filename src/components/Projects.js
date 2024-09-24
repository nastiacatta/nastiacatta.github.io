// src/components/Projects.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

export default function Projects() {
  const projects = [
    {
      title: 'EXO GLOVE',
      href: '/exoglove',
      imageSrc: '/exoglove.jpeg',
    },
    {
      title: 'BIOMORPHUS',
      href: '/biomorphus',
      imageSrc: '/biomorphus.jpeg',
    },
    {
      title: 'INNOVICE',
      href: '/innovice',
      imageSrc: '/innovice.jpeg',
    },
    {
      title: 'PROJECT 4',
      href: '/project4',
      imageSrc: '/project4.jpeg',
    },
    {
      title: 'PROJECT 5',
      href: '/project5',
      imageSrc: '/project5.jpeg',
    },
    {
      title: 'PROJECT 6',
      href: '/project6',
      imageSrc: '/project6.jpeg',
    },
  ];

  return (
    <div className="py-10 px-6">
      {/* Removed the Projects title as per request */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href={project.href} key={project.title}>
            <a className="relative group">
              <Tilt
                glareEnable={false}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                transitionSpeed={700}
                className="rounded-lg shadow-lg"
              >
                <div className="relative w-full h-64 overflow-hidden rounded-lg">
                  <Image
                    src={project.imageSrc}
                    alt={`${project.title} Image`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 transform group-hover:scale-105"
                  />
                  {/* Pink filter overlay */}
                  <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
              </Tilt>
              {/* Project Title */}
              <h3 className="mt-4 text-center text-lg font-semibold text-white dark:text-dark-grey">
                {project.title}
              </h3>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
