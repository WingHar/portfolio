
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  body: string;
  image_url: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  featured?: boolean;
}

interface ProjectShowcaseProps {
  isHeroHovered: boolean;
}

const ProjectShowcase = ({ isHeroHovered }: ProjectShowcaseProps) => {
  const { data: featuredProjects = [], isLoading } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Project[];
    }
  });

  if (isLoading) {
    return (
      <section id="projects-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-gradient">Available Projects and Experience</span>
            </h2>
            <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto">
              A showcase of engineering excellence and marketing innovation
            </p>
          </div>
          <div className="text-center text-portfolio-primary-light">
            Loading featured projects...
          </div>
        </div>
      </section>
    );
  }

  if (featuredProjects.length === 0) {
    return (
      <section id="projects-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-gradient">Available Projects and Experience</span>
            </h2>
            <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto">
              A showcase of engineering excellence and marketing innovation
            </p>
          </div>
          <div className="text-center">
            <p className="text-portfolio-primary-light mb-8">
              No featured projects available at the moment.
            </p>
            <Button 
              size="lg"
              variant="outline"
              className="border-portfolio-tertiary text-portfolio-tertiary hover:bg-portfolio-tertiary hover:text-white px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gradient">Available Projects and Experience</span>
          </h2>
          <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto">
            A showcase of engineering excellence and marketing innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <Link 
              key={project.id} 
              to={`/projects/${project.id}`}
              className="block group"
            >
              <Card 
                className="bg-portfolio-primary border-portfolio-secondary overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-portfolio-tertiary/20 animate-bounce"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '0.6s',
                  animationFillMode: 'both'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.animation = 'none';
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-portfolio-tertiary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Netflix-style overlay on hover */}
                  <div className="absolute inset-0 bg-portfolio-primary-dark/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                      <p className="text-portfolio-primary-light text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex gap-2 justify-center">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span 
                            key={tech}
                            className="bg-portfolio-tertiary/20 text-portfolio-tertiary px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-portfolio-tertiary transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-portfolio-primary-light text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-portfolio-tertiary text-portfolio-tertiary hover:bg-portfolio-tertiary hover:text-white px-8 py-4 text-lg font-semibold"
            asChild
          >
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
