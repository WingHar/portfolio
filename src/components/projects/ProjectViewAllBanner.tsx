
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProjectViewAllBanner = () => {
  return (
    <div className="w-full bg-portfolio-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-white text-xl font-medium">
              Take a look at the other projects I've done that are public
            </p>
          </div>
          <Button 
            size="lg"
            variant="outline"
            className="bg-white text-portfolio-primary border-white hover:bg-gray-100 px-8 py-4 text-lg font-semibold flex-shrink-0"
            asChild
          >
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewAllBanner;
