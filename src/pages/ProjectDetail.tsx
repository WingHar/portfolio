import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

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
  created_at: string;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch project",
          variant: "destructive",
        });
        navigate('/projects');
      } else if (!data) {
        toast({
          title: "Not Found",
          description: "Project not found",
          variant: "destructive",
        });
        navigate('/projects');
      } else {
        setProject(data);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-portfolio-primary-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const displayImages = project.general_images && project.general_images.length > 0 
    ? project.general_images 
    : project.image_url ? [project.image_url] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-portfolio-primary-dark flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-6xl mx-auto px-4 py-16 mt-16">
        <Button
          onClick={() => navigate('/projects')}
          variant="outline"
          className="mb-8 border-portfolio-tertiary/30 text-portfolio-primary-light hover:bg-portfolio-tertiary/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          More Projects and Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Project Images */}
          <div className="relative overflow-hidden rounded-lg">
            {displayImages.length > 0 ? (
              <div className="relative">
                <img
                  src={displayImages[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-auto object-cover"
                />
                {displayImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-portfolio-primary-dark/80 hover:bg-portfolio-primary-dark text-white p-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-portfolio-primary-dark/80 hover:bg-portfolio-primary-dark text-white p-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {displayImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex 
                              ? 'bg-portfolio-tertiary' 
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-portfolio-tertiary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video bg-portfolio-secondary/20 border border-portfolio-tertiary/20 rounded-lg flex items-center justify-center">
                <span className="text-portfolio-primary-light">No image available</span>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <div className="flex items-center text-portfolio-tertiary mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {new Date(project.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-portfolio-primary-light mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="bg-portfolio-secondary/20 text-portfolio-primary-light px-3 py-1 rounded-full text-sm border border-portfolio-secondary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              {project.live_url && (
                <Button 
                  size="lg" 
                  className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white"
                  asChild
                >
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white"
                  asChild
                >
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mt-16 bg-portfolio-secondary/20 border border-portfolio-tertiary/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Project Details</h2>
          <div className="prose prose-invert max-w-none">
            <div className="text-portfolio-primary-light leading-relaxed whitespace-pre-wrap">
              {project.body}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
