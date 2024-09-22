// components/Projects.js
import Link from 'next/link';

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white text-greyBlack">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-greyBlack text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">EXO GLOVE</h3>
            <p className="text-gray-400 mb-4">Wearable technology to enhance grip strength for women DIY enthusiasts...</p>
            <Link href="/projects/exo-glove">
              <a className="text-accentPink hover:underline">View Project</a>
            </Link>
          </div>
          <div className="bg-greyBlack text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">BIOMORPHUS</h3>
            <p className="text-gray-400 mb-4">Biomimicry-inspired dress that reacts to environmental stimuli...</p>
            <Link href="/projects/biomorphus">
              <a className="text-accentPink hover:underline">View Project</a>
            </Link>
          </div>
          <div className="bg-greyBlack text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">INNOVICE</h3>
            <p className="text-gray-400 mb-4">AI-powered platform for sustainable furniture repair...</p>
            <Link href="/projects/innovice">
              <a className="text-accentPink hover:underline">View Project</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
