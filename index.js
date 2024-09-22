import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>[Your Name] - Portfolio</title>
        <meta name="description" content="Portfolio of Anastasia, an aspiring Designer Engineer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}
