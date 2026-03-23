import Header from '../components/Header';

export default function ExoGlove() {
  return (
    <div className="bg-dark-grey text-light-pink dark:bg-white dark:text-dark-grey min-h-screen">
      <Header />
      <section className="section">
        <div className="project-page-inner">
          {/* Title and First Image + Text Section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="md:w-1/2 w-full min-w-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 neon leading-tight">Exo Glove</h1>
              <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
                The Exo Glove is a wearable technology designed to boost grip strength and reduce strain for DIY enthusiasts and homeowners.
              </p>
              <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
                By focusing on ergonomic comfort and minimizing fatigue, the Exo Glove enables users to perform tasks requiring manual dexterity more effectively.
              </p>
              <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
                The glove is designed as a battery-operated exoskeleton glove with artificial tendons and forearm actuators.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center w-full min-w-0">
              <img
                src="/exoglove_1.png"
                alt="Exo Glove Image 1"
                className="rounded-lg shadow-lg w-full h-auto max-w-md md:max-w-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* YouTube Video and Additional Text Section */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start my-8 md:my-12">
            <div className="md:w-1/2 flex justify-center w-full min-w-0">
              <div className="embed-responsive embed-responsive--16x9 w-full max-w-5xl shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/9K6wcKrc9YI"
                  title="Exo Glove Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="md:w-1/2 w-full min-w-0">
              <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
                This innovative glove enhances grip strength using air pumps and soft robotics that curl the fingers upon contact with an object, providing a secure hold and deflating once the object is released.
              </p>
              <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
                Developed using advanced soft robotics and ergonomic design principles, the Exo Glove integrates force-sensitive resistors (FSRs) in the fingertips to detect grip pressure accurately.
              </p>
              <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
                Inspired by the Robo-Glove, developed by NASA and General Motors to reduce repetitive stress injuries.
              </p>
            </div>
          </div>

          {/* PDF Display Section */}
          <div className="flex justify-center mt-8 md:mt-12 w-full min-w-0">
            <iframe
              src="/exoglove.pdf"
              title="Exo Glove PDF"
              className="pdf-embed-frame rounded-lg border border-current/10"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
