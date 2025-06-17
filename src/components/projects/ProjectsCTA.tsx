
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ProjectsCTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Interested in Working Together?
        </h2>
        <p className="text-xl text-portfolio-primary-light mb-8">
          Let's discuss how I can help bring your next project to life with innovative solutions and strategic expertise.
        </p>
        <Button 
          size="lg"
          className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold px-8 py-4 text-lg"
          asChild
        >
          <a href="mailto:winghar@outlook.com">
            Get In Touch
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </Button>
      </div>
    </section>
  );
};

export default ProjectsCTA;
