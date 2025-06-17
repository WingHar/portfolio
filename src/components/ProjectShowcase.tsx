
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import ProjectShowcaseHeader from './projects/ProjectShowcaseHeader';
import ProjectCarousel from './projects/ProjectCarousel';
import ProjectViewAllBanner from './projects/ProjectViewAllBanner';

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
          <ProjectShowcaseHeader />
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
            <ProjectShowcaseHeader />
          </div>
        </section>
        <ProjectViewAllBanner />
      </>
    );
  }

  return (
    <>
      <section id="projects-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary-dark">
        <div className="max-w-7xl mx-auto">
          <ProjectShowcaseHeader />
          <ProjectCarousel projects={featuredProjects} />
        </div>
      </section>
      <ProjectViewAllBanner />
    </>
  );
};

export default ProjectShowcase;
