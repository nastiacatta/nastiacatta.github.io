import Header from '../components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Header />
      
      {/* First Section: About Me */}
      <section id="about" className="min-h-screen flex flex-col justify-center items-center bg-light-pink text-center">
        <h1 className="text-5xl font-bold mb-4 text-dark-blue">Anastasia Cattaneo</h1>
        <p className="text-xl mb-6 text-dark-blue">Imperial College London</p>
        <p className="text-lg max-w-xl text-dark-blue">
          London, UK<br />
          anastasia.cattaneo@gmail.com
        </p>
        <p className="text-lg max-w-xl text-dark-blue">
          I am a third-year MEng Design Engineering student at Imperial College London, with a keen
          interest in the innovative field of wearables. My passion lies in the fusion of electronics,
          AI, and fashion. I am driven by a commitment to integrating elegant design with robust
          engineering to develop solutions that are both functional and aesthetically pleasing.
          Beyond my core focus, I have a deep interest in the arts, literature, and architecture,
          which continually inspire my work.
        </p>
      </section>

      {/* Second Section: Projects */}
      <section id="projects" className="min-h-screen py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 text-dark-blue">My Projects</h2>
          <div className="flex justify-center space-x-4">
            <div className="project-card">
              <Link href="/exoglove">
                <a>
                  <img src="/path-to-your-image1.jpg" alt="EXO GLOVE" className="project-image" />
                  <div className="project-info">
                    <h3 className="text-2xl text-white">EXO GLOVE</h3>
                  </div>
                </a>
              </Link>
            </div>
            <div className="project-card">
              <Link href="/biomorphus">
                <a>
                  <img src="/path-to-your-image2.jpg" alt="BIOMORPHUS" className="project-image" />
                  <div className="project-info">
                    <h3 className="text-2xl text-white">BIOMORPHUS</h3>
                  </div>
                </a>
              </Link>
            </div>
            <div className="project-card">
              <Link href="/innovice">
                <a>
                  <img src="/path-to-your-image3.jpg" alt="INNOVICE" className="project-image" />
                  <div className="project-info">
                    <h3 className="text-2xl text-white">INNOVICE</h3>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
