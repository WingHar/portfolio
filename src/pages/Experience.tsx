
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ExperienceHero from '@/components/experience/ExperienceHero';
import ExperienceTimeline from '@/components/experience/ExperienceTimeline';
import ExperienceSummary from '@/components/experience/ExperienceSummary';

const Experience = () => {
  return (
    <div className="min-h-screen bg-portfolio-primary-dark flex flex-col">
      <Navigation />
      
      <div className="flex-1 pt-20">
        <ExperienceHero />
        <ExperienceTimeline />
        <ExperienceSummary />
      </div>

      <Footer />
    </div>
  );
};

export default Experience;
