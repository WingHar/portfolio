
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    category: 'Full Stack Development',
    description: 'Built a scalable e-commerce platform with React, Node.js, and PostgreSQL. Handles 10K+ daily users.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=6052&auto=format&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe']
  },
  {
    id: '2',
    title: 'CTV Campaign Management',
    category: 'Digital Marketing',
    description: 'Managed $500K+ CTV advertising budget across multiple platforms with 300% ROAS improvement.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=6052&auto=format&fit=crop',
    technologies: ['The Trade Desk', 'Samsung DSP', 'Analytics', 'Attribution']
  },
  {
    id: '3',
    title: 'Real-Time Analytics Dashboard',
    category: 'Full Stack Development',
    description: 'Developed real-time analytics dashboard processing millions of data points with sub-second latency.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=6052&auto=format&fit=crop',
    technologies: ['React', 'WebSocket', 'Redis', 'Chart.js']
  },
  {
    id: '4',
    title: 'Multi-Platform Ad Strategy',
    category: 'Digital Marketing',
    description: 'Orchestrated integrated campaigns across Google, Facebook, TikTok, and billboards for 500% growth.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=6052&auto=format&fit=crop',
    technologies: ['Google Ads', 'Facebook Ads', 'TikTok Ads', 'Programmatic']
  }
];

const ProjectShowcase = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto">
            A showcase of engineering excellence and marketing innovation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className="bg-portfolio-primary border-portfolio-secondary project-card-hover group overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-portfolio-tertiary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-portfolio-tertiary transition-colors">
                  {project.title}
                </h3>
                <p className="text-portfolio-primary-light mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="bg-portfolio-secondary/20 text-portfolio-primary-light px-3 py-1 rounded-full text-sm border border-portfolio-secondary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button 
                      size="sm" 
                      className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-portfolio-tertiary text-portfolio-tertiary hover:bg-portfolio-tertiary hover:text-white px-8 py-4 text-lg font-semibold"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
