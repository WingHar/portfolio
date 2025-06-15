
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
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
  featured_image_url: string | null;
  general_images: string[] | null;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  featured?: boolean;
}

interface ProjectShowcaseProps {
  isHeroHovered: boolean;
}

const ProjectShowcase = ({ isHeroHovered }: ProjectShowcaseProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api]);

  // Determine if arrows should be shown
  const shouldShowArrows = featuredProjects.length > 3;
  const showLeftArrow = shouldShowArrows && canScrollPrev;
  const showRightArrow = shouldShowArrows && canScrollNext;

  if (isLoading) {
    return (
      <section id="projects-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-gradient">Featured Projects and Experiences</span>
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
      <>
        <section id="projects-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary-dark">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="text-gradient">Featured Projects and Experiences</span>
              </h2>
              <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto">
                A showcase of engineering excellence and marketing innovation
              </p>
            </div>
          </div>
        </section>
        {/* Full-width banner */}
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
      </>
    );
  }

  return (
    <>
      <section id="projects-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-gradient">Featured Projects and Experiences</span>
            </h2>
            <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto">
              A showcase of engineering excellence and marketing innovation
            </p>
          </div>

          <div className="relative px-12">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredProjects.map((project, index) => (
                  <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Link 
                      to={`/projects/${project.id}`}
                      className="block group"
                    >
                      <Card 
                        className="holographic-card bg-portfolio-primary border-portfolio-secondary overflow-hidden cursor-pointer h-full"
                      >
                        <div className="relative overflow-hidden h-full">
                          <img 
                            src={project.featured_image_url || project.image_url} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                          
                          {/* Category badge - always visible */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-portfolio-tertiary text-white px-3 py-1 rounded-full text-sm font-medium">
                              {project.category}
                            </span>
                          </div>
                          
                          {/* Centered overlay on hover */}
                          <div className="absolute inset-0 bg-portfolio-primary-dark/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <div className="text-center p-6">
                              <h3 className="text-white font-bold text-xl mb-4">{project.title}</h3>
                              <p className="text-portfolio-primary-light text-sm mb-6 line-clamp-4 leading-relaxed">
                                {project.description}
                              </p>
                              <div className="flex gap-2 justify-center flex-wrap mb-6">
                                {project.technologies.map((tech) => (
                                  <span 
                                    key={tech}
                                    className="bg-portfolio-tertiary/20 text-portfolio-tertiary px-2 py-1 rounded text-xs"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <div className="text-portfolio-tertiary text-sm font-medium">
                                Click to view details →
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {showLeftArrow && (
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-portfolio-secondary/20 border-portfolio-tertiary/30 text-portfolio-tertiary hover:bg-portfolio-tertiary hover:text-white" />
              )}
              {showRightArrow && (
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-portfolio-secondary/20 border-portfolio-tertiary/30 text-portfolio-tertiary hover:bg-portfolio-tertiary hover:text-white" />
              )}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Full-width banner for "View All Projects" */}
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
    </>
  );
};

export default ProjectShowcase;
