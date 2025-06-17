import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProjectsHeroProps {
  isAdmin: boolean;
  onCreateProject: () => void;
}

const ProjectsHero = ({ isAdmin, onCreateProject }: ProjectsHeroProps) => {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-fade-in">
          <span className="text-gradient">My Projects and Experiences</span>
        </h1>
        <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto animate-fade-in">
          Demonstrating technical acumen and marketing foresight through a portfolio of full-stack development projects and digital strategy execution.
        </p>
        
        {isAdmin && (
          <div className="mt-8">
            <Button
              onClick={onCreateProject}
              className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Project
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsHero;
