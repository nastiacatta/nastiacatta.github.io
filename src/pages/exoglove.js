import Header from '../components/Header';

export default function ExoGlove() {
  return (
    <div className="bg-dark-grey text-light-pink dark:bg-white dark:text-dark-grey min-h-screen">
      <Header />
      <section className="section">
        <div className="container mx-auto py-16 px-6">
          {/* Title and First Image + Text Section */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h1 className="text-5xl mb-4 neon">Exo Glove</h1> {/* Removed bold and capitalized style, added neon effect */}
              <p className="text-lg mb-6 max-w-4xl mx-auto">
                The Exo Glove is a wearable technology designed to boost grip strength and reduce strain for women DIY enthusiasts and homeowners.
              </p>
              <p className="text-lg mb-6 max-w-4xl mx-auto">
                By focusing on ergonomic comfort and minimizing fatigue, the Exo Glove enables users to perform tasks requiring manual dexterity more effectively.
              </p>
              <p className="text-lg mb-6 max-w-4xl mx-auto">
                Addressing the gap in grip and upper body strength between men and women, the Exo Glove aims to empower women to handle home improvement tasks efficiently.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/exoglove_1.png" alt="Exo Glove Image 1" className="rounded-lg shadow-lg w-full h-auto max-w-md md:max-w-lg" />
            </div>
          </div>

          {/* Embedded YouTube Video */}
          <div className="my-12 flex justify-center">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/9K6wcKrc9YI" 
              title="Exo Glove Video"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="rounded-lg shadow-lg w-full h-auto max-w-3xl"
            ></iframe>
          </div>

          {/* Additional Text Section */}
          <div className="mb-12">
            <p className="text-lg mb-6 max-w-4xl mx-auto">
              This innovative glove enhances grip strength using air pumps and soft robotics that curl the fingers upon contact with an object, providing a secure hold and deflating once the object is released.
            </p>
            <p className="text-lg mb-6 max-w-4xl mx-auto">
              Developed using advanced soft robotics and ergonomic design principles, the Exo Glove integrates force-sensitive resistors (FSRs) in the fingertips to detect grip pressure accurately.
            </p>
            <p className="text-lg mb-6 max-w-4xl mx-auto">
              Powered by rechargeable lithium-ion batteries, the glove provides up to eight hours of continuous use, making power tools universally accessible and challenging gender biases in the industry.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
