import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

interface EngineeringProject {
  id: string;
  title: string;
  description: string;
  image_url: string;
  live_url?: string;
  github_url?: string;
}

const Engineering = () => {
  // Dummy engineering projects with graphics and links
  const engineeringProjects: EngineeringProject[] = [
    {
      id: '1',
      title: 'Dijkstra\'s Algorithm Visualization',
      description: 'An interactive visualization of Dijkstra\'s shortest path algorithm, demonstrating fundamental graph theory concepts and algorithm design principles. Features step-by-step execution, customizable graph, and real-time pathfinding visualization.',
      image_url: '/lovable-uploads/Dijkstra\'s Algorithm.png',
      live_url: '/engineering/dijkstra',
      github_url: undefined // Optional: add GitHub link if you have one
    },
    {
      id: '2',
      title: 'Neural Network Playground',
      description: 'An interactive machine learning visualization showcasing how neural networks learn through backpropagation. Add your own data points, adjust network parameters, and watch the decision boundary evolve in real-time as the network trains.',
      image_url: '/lovable-uploads/Neural Network.png',
      live_url: '/engineering/neural-network',
      github_url: undefined
    },
    {
      id: '3',
      title: 'Sorting Algorithm Visualizer',
      description: 'Compare Bubble Sort and Merge Sort algorithms side by side. Visualize how different sorting strategies work with real-time step-by-step execution, performance metrics, and interactive controls to understand time and space complexity differences.',
      image_url: '/lovable-uploads/Sorting Algorithm.png',
      live_url: '/engineering/sorting',
      github_url: undefined
    }
  ];

  return (
    <div className="min-h-screen bg-portfolio-primary-dark flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">Engineering Projects</span>
          </h1>
          <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto animate-fade-in">
            Explore innovative engineering solutions and technical implementations that showcase expertise in system design, infrastructure, and scalable architectures.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="flex-1 max-w-7xl mx-auto px-4 pb-16">
        {/* Engineering Projects Grid */}
        <section className="py-16 px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringProjects.map((project) => (
              <Card 
                key={project.id} 
                className="holographic-card bg-portfolio-primary border-portfolio-secondary overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  {/* Engineering badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-portfolio-tertiary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Engineering
                    </span>
                  </div>
                  
                  {/* Content overlay on hover */}
                  <div className="absolute inset-0 bg-portfolio-primary-dark/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <div className="text-center p-6">
                      <h3 className="text-white font-bold text-xl mb-4">{project.title}</h3>
                      <p className="text-portfolio-primary-light text-sm mb-6 line-clamp-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex gap-2 flex-wrap justify-center pointer-events-auto">
                        {project.live_url && (
                          <Button 
                            size="sm" 
                            className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white text-xs"
                            asChild
                          >
                            {project.live_url.startsWith('/') ? (
                              <Link to={project.live_url}>
                                <ExternalLink className="w-3 h-3 mr-1" />
                                View Project
                              </Link>
                            ) : (
                              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Demo
                              </a>
                            )}
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
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Interested in Working Together?
          </h2>
          <p className="text-xl text-portfolio-primary-light mb-8">
            Let's discuss how I can help bring your next engineering project to life with innovative solutions and technical expertise.
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

export default Engineering;
