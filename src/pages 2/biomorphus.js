import Header from '../components/Header';

export default function Biomorphus() {
  return (
    <div>
      <Header />
      <section className="section bg-dark-grey text-light-pink">
        <div className="container mx-auto py-16 px-6">
          <h1 className="text-5xl mb-4 neon">Biomorphus</h1>
          <p className="text-lg mb-6 max-w-4xl mx-auto">
            This innovative project unveils a conceptual, biomimicry-inspired dress that blends fashion with technology, reacting to environmental changes like natural organisms.
          </p>
          <p className="text-lg mb-6 max-w-4xl mx-auto">
            Equipped with sensors for distance, light, and sound, the dress transforms with fabric flowers, Electroluminescent Wire, and reactive movements, mimicking nature’s intricate behaviors.
          </p>
          <p className="text-lg mb-6 max-w-4xl mx-auto">
            The dress, crafted from a transparent, pearl-like fabric, incorporates sensors that enable it to respond uniquely to environmental stimuli, blurring the lines between the animate and inanimate.
          </p>
          <p className="text-lg mb-6 max-w-4xl mx-auto">
            As the light dims, the dress transforms with an Electroluminescent Wire, reminiscent of bioluminescent algae, adding a mystical glow to the garment.
          </p>
          <p className="text-lg mb-6 max-w-4xl mx-auto">
            This project challenges and expands our understanding of how we can harmoniously integrate technology into our daily lives.
          </p>
          <p className="text-lg mb-6 max-w-4xl mx-auto">
            Through this creation, the dress becomes an extension of the wearer, responding and adapting organically to environmental stimuli.
          </p>
          <div className="text-lg mb-6 max-w-4xl mx-auto">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/kuVLW63gYhk?start=25"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="text-lg mb-6 max-w-4xl mx-auto">
            <iframe
              src="/gizmo.pdf"
              width="100%"
              height="600"
              title="Gizmo PDF"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
