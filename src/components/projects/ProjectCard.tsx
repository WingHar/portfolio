
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
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

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isMobileOverlayVisible, setIsMobileOverlayVisible] = useState(false);

  const handleMobileImageClick = () => {
    setIsMobileOverlayVisible(!isMobileOverlayVisible);
  };

  return (
    <Card 
      className="holographic-card bg-portfolio-primary border-portfolio-secondary overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.featured_image_url || project.image_url} 
          alt={project.title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110 md:block cursor-pointer md:cursor-default"
          onClick={handleMobileImageClick}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity md:block hidden" />
        
        {/* Category badge - hidden on mobile */}
        <div className="absolute top-4 left-4 hidden md:block">
          <span className="bg-portfolio-tertiary text-white px-3 py-1 rounded-full text-sm font-medium">
            {project.category}
          </span>
        </div>
        
        {/* Mobile overlay - only visible when clicked */}
        <div className={`absolute inset-0 bg-portfolio-primary-dark/90 flex items-center justify-center md:hidden transition-opacity duration-300 ${
          isMobileOverlayVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="text-center p-4">
            <h3 className="text-white font-bold text-lg mb-4">{project.title}</h3>
            <div className="flex gap-2 justify-center">
              {project.live_url && (
                <Button 
                  size="sm" 
                  className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white text-sm"
                  asChild
                >
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </a>
                </Button>
              )}
              <Button
                size="sm"
                className="bg-portfolio-secondary hover:bg-portfolio-secondary/90 text-white text-sm"
                asChild
              >
                <Link to={`/projects/${project.id}`}>
                  Read More
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Desktop content overlay on hover */}
        <div className="absolute inset-0 bg-portfolio-primary-dark/95 opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center hidden md:flex">
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
  );
};

export default ProjectCard;
