import Header from '../components/Header';
import { useState, useEffect } from 'react';

export default function ExoGlove() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to update state based on window size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-dark-grey text-light-pink dark:bg-white dark:text-dark-grey min-h-screen">
      <Header />
      <section className="section">
        <div className="container mx-auto py-16 px-6">
          {/* Title and First Image + Text Section */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h1 className="text-5xl mb-4 neon">Exo Glove</h1>
              {/* Existing paragraphs... */}
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/exoglove_1.png"
                alt="Exo Glove Image 1"
                className="rounded-lg shadow-lg w-full h-auto max-w-md md:max-w-lg"
              />
            </div>
          </div>

          {/* YouTube Video and Additional Text Section */}
          <div className="flex flex-col md:flex-row gap-8 items-start my-12">
            {/* Existing content... */}
          </div>

          {/* PDF Display Section */}
          <div className="flex flex-col items-center mt-12">
            <h2 className="text-3xl mb-4">Exo Glove Details</h2>
            {isMobile ? (
              <div className="text-center">
                <p className="mb-4">
                  Tap the button below to view the Exo Glove PDF. It will open in a new tab or your device's PDF viewer.
                </p>
                <a
                  href="/exoglove.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                  Open PDF
                </a>
              </div>
            ) : (
              <iframe
                src="/exoglove.pdf"
                title="Exo Glove PDF"
                className="w-full"
                style={{ minHeight: '800px' }}
              ></iframe>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
