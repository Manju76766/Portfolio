import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import DarkBanner from '../components/DarkBanner';
import Services from '../components/Services';
import WhyChooseMe from '../components/WhyChooseMe';
import Portfolio from '../components/Portfolio';
import CreativeEdge from '../components/CreativeEdge';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="home-container">
      <Hero />
      <Marquee />
      <About />
      <DarkBanner />
      <Services />
      <WhyChooseMe />
      <Portfolio />
      <CreativeEdge />
      <Testimonial />
      <Footer />
    </div>
  );
}
