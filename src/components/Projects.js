// src/components/Projects.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

export default function Projects() {
  const projects = [
    {
        title: 'ROBOTICS',
        href: '/robotics',
        imageSrc: '/robotics.png',
      },
      {
        title: 'SEAO2',
        href: '/seao2',
        imageSrc: '/seao2.png',
      },
      {
        title: 'REORBIT',
        href: '/reorbit',
        imageSrc: '/reorbit.png',
      },
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
      title: 'ROBOT CAR',
      href: '/robotcar',
      imageSrc: '/robot_car.png',
    },
    {
      title: 'CONCEPT CAR',
      href: '/conceptcar',
      imageSrc: '/concept_car.png',
    },
    {
      title: 'KEEPING WARM',
      href: '/keepingwarm',
      imageSrc: '/keeping_warm.png',
    }   
  ];
  

  return (
    <div className="py-10 px-6">
      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => (
          <Link href={project.href} key={project.title}>
            <a className="relative group block">
              <Tilt
                glareEnable={false}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                transitionSpeed={700}
                className="rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={project.imageSrc}
                    alt={`${project.title} Image`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 transform group-hover:scale-105"
                  />
                  {/* Pink filter overlay */}
                  <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  {/* Project Title Inside the Card at the Top */}
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black via-transparent to-transparent p-4">
                    <h3 className="text-center text-sm text-white dark:text-gray-800 group-hover:text-lilac transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Tilt>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
