
import React from 'react';

const ExperienceSummary = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-portfolio-primary/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-gradient">Career Highlights</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-portfolio-tertiary mb-2">6+ Years</div>
            <div className="text-portfolio-primary-light">Professional Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-portfolio-tertiary mb-2">6</div>
            <div className="text-portfolio-primary-light">Different Roles</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-portfolio-tertiary mb-2">12+</div>
            <div className="text-portfolio-primary-light">Technologies Mastered</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSummary;
