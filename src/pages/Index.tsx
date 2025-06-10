
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProjectShowcase from '@/components/ProjectShowcase';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-primary-dark">
      <Navigation />
      <Hero />
      <ProjectShowcase />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
