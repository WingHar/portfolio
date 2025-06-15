
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProjectShowcase from '@/components/ProjectShowcase';
import FeaturedCaseStudies from '@/components/FeaturedCaseStudies';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  return (
    <div className="min-h-screen bg-portfolio-primary-dark">
      <Navigation />
      <Hero onHoverChange={setIsHeroHovered} />
      <ProjectShowcase isHeroHovered={isHeroHovered} />
      <FeaturedCaseStudies />
      {/* Spacer section with dark blue background */}
      <div className="bg-portfolio-primary-dark py-16"></div>
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
