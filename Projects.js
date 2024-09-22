export default function Projects() {
    const projects = [
      { name: 'EXO GLOVE', description: 'A project focused on developing...', link: '#' },
      { name: 'INNOVICE', description: 'An innovative approach to...', link: '#' },
      { name: 'BIOMORPHUS', description: 'Exploring biomorphic design...', link: '#' },
      { name: 'UNO GAME', description: 'A digital version of the classic...', link: '#' },
      { name: 'ROBOT CAR', description: 'Building and programming a...', link: '#' },
    ];
  
    return (
      <section id="projects" className="bg-gray-100 text-gray-900 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Projects</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold">{project.name}</h3>
                <p className="mt-4">{project.description}</p>
                <a href={project.link} className="text-indigo-600 hover:underline mt-4 block">View Project</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  