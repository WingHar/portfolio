
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ExternalLink, Github, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  body: string;
  image_url: string;
  featured_image_url: string | null;
  general_images: string[] | null;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  featured?: boolean;
}

interface ProjectsGridProps {
  projects: Project[];
  isAdmin: boolean;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

const ProjectsGrid = ({ projects, isAdmin, onEditProject, onDeleteProject }: ProjectsGridProps) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className="holographic-card bg-portfolio-primary border-portfolio-secondary overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.featured_image_url || project.image_url} 
                  alt={project.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-portfolio-tertiary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEditProject(project)}
                      className="bg-portfolio-primary-dark/80 border-portfolio-secondary hover:bg-portfolio-secondary p-1 h-auto"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-600/80 hover:bg-red-600 p-1 h-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-portfolio-primary border-portfolio-secondary">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
                          <AlertDialogDescription className="text-portfolio-primary-light">
                            Are you sure you want to delete "{project.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDeleteProject(project.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
                
                {/* Content overlay on hover */}
                <div className="absolute inset-0 bg-portfolio-primary-dark/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-white font-bold text-xl mb-4">{project.title}</h3>
                    <p className="text-portfolio-primary-light text-sm mb-6 line-clamp-4 leading-relaxed">
                      {project.description.length > 200 
                        ? `${project.description.substring(0, 200)}...` 
                        : project.description
                      }
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="bg-portfolio-tertiary/20 text-portfolio-tertiary px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-portfolio-primary-light text-xs px-2 py-1">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 flex-wrap justify-center">
                      {project.live_url && (
                        <Button 
                          size="sm" 
                          className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white text-xs"
                          asChild
                        >
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white text-xs"
                          asChild
                        >
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3 h-3 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-portfolio-tertiary text-portfolio-tertiary hover:bg-portfolio-tertiary hover:text-white text-xs"
                        asChild
                      >
                        <Link to={`/projects/${project.id}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
