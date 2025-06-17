
import React from 'react';

const ContactHero = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-portfolio-primary-dark via-portfolio-primary to-portfolio-primary-dark">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Let's <span className="text-portfolio-tertiary">Connect</span>
        </h1>
        <p className="text-xl md:text-2xl text-portfolio-primary-light mb-8 leading-relaxed">
          Ready to discuss your next project or my next career move? I'd love to hear from you and explore how I can make an impact for you!
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
