import Header from '../components/Header';

export default function Biomorphus() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="project-page-inner">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 neon leading-tight">Biomorphus</h1>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            This innovative project unveils a conceptual, biomimicry-inspired dress that blends fashion with technology, reacting to environmental changes like natural organisms.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            Equipped with sensors for distance, light, and sound, the dress transforms with fabric flowers, Electroluminescent Wire, and reactive movements, mimicking nature’s intricate behaviors.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            The dress, crafted from a transparent, pearl-like fabric, incorporates sensors that enable it to respond uniquely to environmental stimuli, blurring the lines between the animate and inanimate.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            As the light dims, the dress transforms with an Electroluminescent Wire, reminiscent of bioluminescent algae, adding a mystical glow to the garment.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            This project challenges and expands our understanding of how we can harmoniously integrate technology into our daily lives.
          </p>
          <p className="text-base sm:text-lg mb-6 max-w-4xl mx-auto md:mx-0">
            Through this creation, the dress becomes an extension of the wearer, responding and adapting organically to environmental stimuli.
          </p>
          <div className="mb-6 max-w-4xl mx-auto md:mx-0 w-full min-w-0">
            <div className="embed-responsive embed-responsive--16x9 shadow-lg rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/kuVLW63gYhk?start=25"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="mb-6 max-w-4xl mx-auto md:mx-0 w-full min-w-0">
            <iframe src="/gizmo.pdf" title="Gizmo PDF" className="pdf-embed-frame rounded-lg border border-current/10" />
          </div>
        </div>
      </section>
    </div>
  );
}
