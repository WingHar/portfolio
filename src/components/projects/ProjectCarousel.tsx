
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
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

  return (
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
  );
};

export default ProjectCarousel;
