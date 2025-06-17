
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProjectsEmptyStateProps {
  isAdmin: boolean;
  onCreateProject: () => void;
}

const ProjectsEmptyState = ({ isAdmin, onCreateProject }: ProjectsEmptyStateProps) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl text-portfolio-primary-light mb-8">
          No projects and experiences have been created yet.
        </p>
        {isAdmin && (
          <Button
            onClick={onCreateProject}
            className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Project
          </Button>
        )}
      </div>
    </section>
  );
};

export default ProjectsEmptyState;
