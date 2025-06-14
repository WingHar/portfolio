import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    category: 'Full Stack Development',
    description: 'Built a scalable e-commerce platform with React, Node.js, and PostgreSQL. Handles 10K+ daily users.',
    longDescription: 'A comprehensive e-commerce solution featuring real-time inventory management, secure payment processing with Stripe, advanced search and filtering, order tracking, and admin dashboard. Built with performance in mind to handle high traffic loads.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=6000&auto=format&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: '2',
    title: 'CTV Campaign Management',
    category: 'Digital Marketing',
    description: 'Managed $500K+ CTV advertising budget across multiple platforms with 300% ROAS improvement.',
    longDescription: 'Strategic management of Connected TV advertising campaigns across major DSPs including The Trade Desk and Samsung DSP. Implemented advanced audience targeting, cross-platform attribution, and real-time optimization strategies.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3543&auto=format&fit=crop',
    technologies: ['The Trade Desk', 'Samsung DSP', 'Google Analytics', 'Attribution Modeling'],
    featured: true
  },
  {
    id: '3',
    title: 'Real-Time Analytics Dashboard',
    category: 'Full Stack Development',
    description: 'Developed real-time analytics dashboard processing millions of data points with sub-second latency.',
    longDescription: 'High-performance analytics platform built with React and WebSocket connections for real-time data visualization. Features custom charting components, data aggregation pipelines, and interactive filtering capabilities.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=7952&auto=format&fit=crop',
    technologies: ['React', 'WebSocket', 'Redis', 'Chart.js', 'D3.js', 'Node.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: '4',
    title: 'Multi-Platform Ad Strategy',
    category: 'Digital Marketing',
    description: 'Orchestrated integrated campaigns across Google, Facebook, TikTok, and billboards for 500% growth.',
    longDescription: 'Comprehensive digital marketing strategy spanning multiple channels with unified messaging and cross-platform attribution. Managed substantial budgets while maintaining efficient ROAS across all platforms.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=5760&auto=format&fit=crop',
    technologies: ['Google Ads', 'Facebook Ads', 'TikTok Ads', 'Programmatic Advertising'],
    featured: true
  },
  {
    id: '5',
    title: 'Task Management Application',
    category: 'Full Stack Development',
    description: 'Built a collaborative task management app with real-time updates and team collaboration features.',
    longDescription: 'Feature-rich task management application with drag-and-drop interfaces, real-time collaboration, file attachments, and advanced project tracking capabilities.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=4846&auto=format&fit=crop',
    technologies: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  }
];

const Projects = () => {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-portfolio-primary-dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">My Projects</span>
          </h1>
          <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto animate-fade-in">
            A collection of engineering excellence and strategic marketing innovations that showcase my expertise in full-stack development and digital marketing.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="bg-portfolio-primary border-portfolio-secondary project-card-hover group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
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
                    {project.longDescription}
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
        </div>
      </section>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-portfolio-primary/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              More Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="bg-portfolio-primary border-portfolio-secondary hover:border-portfolio-tertiary/50 transition-colors group"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-portfolio-tertiary/90 text-white px-2 py-1 rounded text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-portfolio-tertiary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-portfolio-primary-light text-sm mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="bg-portfolio-secondary/20 text-portfolio-primary-light px-2 py-1 rounded text-xs border border-portfolio-secondary/30"
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

                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button 
                          size="sm" 
                          className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white flex-1 text-xs"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white flex-1 text-xs"
                        >
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
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

      <Footer />
    </div>
  );
};

export default Projects;
