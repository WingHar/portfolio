
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

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

interface ProjectCarouselProps {
  projects: Project[];
}

const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
  const shouldShowArrows = projects.length > 3;
  const showLeftArrow = shouldShowArrows && canScrollPrev;
  const showRightArrow = shouldShowArrows && canScrollNext;

  // Mobile: show arrow indicator if there are more than 1 projects
  const showMobileArrow = projects.length > 1;

  return (
    <div className="relative">
      {/* Desktop view with standard carousel */}
      <div className="hidden md:block px-12">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {projects.map((project) => (
              <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <ProjectCard project={project} />
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

      {/* Mobile view with horizontal scroll */}
      <div className="md:hidden px-4">
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {projects.map((project, index) => (
              <div key={project.id} className="flex-none w-80 snap-start relative">
                <ProjectCard project={project} />
                {/* Show arrow on first item if there are more items */}
                {index === 0 && showMobileArrow && (
                  <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                    <div className="bg-portfolio-tertiary/90 rounded-full p-2 shadow-lg animate-pulse">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
