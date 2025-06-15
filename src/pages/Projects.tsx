
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectForm from '@/components/ProjectForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ExternalLink, Github, ArrowRight, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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

const Projects = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    }
  });

  const handleCreateProject = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project deleted successfully!",
      });

      queryClient.invalidateQueries({ queryKey: ['projects'] });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  };

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-portfolio-primary-dark">
        <Navigation />
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-xl text-portfolio-primary-light">Loading projects...</div>
          </div>
        </div>
      </div>
    );
  }

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
          
          {isAdmin && (
            <div className="mt-8">
              <Button
                onClick={handleCreateProject}
                className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Project
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
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
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/80 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-portfolio-tertiary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                    {isAdmin && (
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProject(project)}
                          className="bg-portfolio-primary-dark/80 border-portfolio-secondary hover:bg-portfolio-secondary"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="bg-red-600/80 hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-portfolio-primary border-portfolio-secondary">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
                              <AlertDialogDescription className="text-portfolio-primary-light">
                                Are you sure you want to delete "{project.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProject(project.id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-portfolio-tertiary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-portfolio-primary-light mb-4 leading-relaxed">
                      {project.body || project.description}
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
                      {project.live_url && (
                        <Button 
                          size="sm" 
                          className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white"
                          asChild
                        >
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white"
                          asChild
                        >
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
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

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-portfolio-primary/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              {featuredProjects.length > 0 ? 'More Projects' : 'All Projects'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="bg-portfolio-primary border-portfolio-secondary hover:border-portfolio-tertiary/50 transition-colors group"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-portfolio-tertiary/90 text-white px-2 py-1 rounded text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                    {isAdmin && (
                      <div className="absolute top-3 right-3 flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProject(project)}
                          className="bg-portfolio-primary-dark/80 border-portfolio-secondary hover:bg-portfolio-secondary p-1 h-auto"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="bg-red-600/80 hover:bg-red-600 p-1 h-auto"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-portfolio-primary border-portfolio-secondary">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
                              <AlertDialogDescription className="text-portfolio-primary-light">
                                Are you sure you want to delete "{project.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProject(project.id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
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
                      {project.live_url && (
                        <Button 
                          size="sm" 
                          className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white flex-1 text-xs"
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
                          className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white flex-1 text-xs"
                          asChild
                        >
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3 h-3 mr-1" />
                            Code
                          </a>
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

      {/* Empty state */}
      {projects.length === 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-portfolio-primary-light mb-8">
              No projects have been created yet.
            </p>
            {isAdmin && (
              <Button
                onClick={handleCreateProject}
                className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Project
              </Button>
            )}
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

      {/* Project Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-portfolio-primary border-portfolio-secondary max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={editingProject}
            onSuccess={handleFormSuccess}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Projects;
