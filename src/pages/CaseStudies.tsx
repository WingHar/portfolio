
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Star, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import CaseStudyForm from '@/components/CaseStudyForm';
import CaseStudyEditForm from '@/components/CaseStudyEditForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
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

interface CaseStudy {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  featured_image_url: string | null;
  general_images: string[] | null;
  featured: boolean | null;
  created_at: string;
}

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch case studies",
          variant: "destructive",
        });
      } else {
        setCaseStudies(data || []);
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCaseStudyCreated = () => {
    setShowForm(false);
    fetchCaseStudies();
    toast({
      title: "Success",
      description: "Case study created successfully!",
    });
  };

  const handleCaseStudyUpdated = () => {
    setEditingCaseStudy(null);
    fetchCaseStudies();
    toast({
      title: "Success",
      description: "Case study updated successfully!",
    });
  };

  const handleDeleteCaseStudy = async (caseStudyId: string) => {
    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', caseStudyId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete case study",
          variant: "destructive",
        });
      } else {
        fetchCaseStudies();
        toast({
          title: "Success",
          description: "Case study deleted successfully!",
        });
      }
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleCaseStudyClick = (id: string) => {
    if (!editingCaseStudy) {
      navigate(`/case-studies/${id}`);
    }
  };

  const handleEditClick = (e: React.MouseEvent, caseStudy: CaseStudy) => {
    e.stopPropagation();
    setEditingCaseStudy(caseStudy);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-portfolio-primary-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-portfolio-primary-dark flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">My Case Studies</span>
          </h1>
          <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto animate-fade-in">
            Explore detailed analyses of successful projects and strategic implementations that demonstrate expertise in full-stack development and digital marketing solutions.
          </p>
          
          {isAdmin && (
            <div className="mt-8">
              <Button
                onClick={() => {
                  setShowForm(true);
                  setEditingCaseStudy(null);
                }}
                className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Case Study
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <div className="flex-1 max-w-7xl mx-auto px-4 pb-16">
        {showForm && (
          <div className="mb-8">
            <CaseStudyForm
              onSuccess={() => {
                setShowForm(false);
                fetchCaseStudies();
                toast({
                  title: "Success",
                  description: "Case study created successfully!",
                });
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {editingCaseStudy && (
          <div className="mb-8">
            <CaseStudyEditForm
              caseStudy={editingCaseStudy}
              onSuccess={() => {
                setEditingCaseStudy(null);
                fetchCaseStudies();
                toast({
                  title: "Success",
                  description: "Case study updated successfully!",
                });
              }}
              onCancel={() => setEditingCaseStudy(null)}
            />
          </div>
        )}

        {/* Case Studies Grid */}
        {caseStudies.length > 0 && (
          <section className="py-16 px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((caseStudy) => (
                <Card 
                  key={caseStudy.id} 
                  className="holographic-card bg-portfolio-primary border-portfolio-secondary overflow-hidden group h-[400px] flex flex-col"
                >
                  {caseStudy.featured && (
                    <div className="absolute top-3 right-3 z-10">
                      <Star className="w-5 h-5 text-portfolio-tertiary fill-current" />
                    </div>
                  )}
                  {isAdmin && (
                    <div className="absolute top-3 left-3 z-10 flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCaseStudy(caseStudy);
                          setShowForm(false);
                        }}
                        className="bg-portfolio-primary-dark/80 hover:bg-portfolio-primary-dark text-portfolio-tertiary hover:text-white p-1 h-auto"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-red-600/80 hover:bg-red-600 text-white p-1 h-auto"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-portfolio-primary border-portfolio-secondary">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Delete Case Study</AlertDialogTitle>
                            <AlertDialogDescription className="text-portfolio-primary-light">
                              Are you sure you want to delete "{caseStudy.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                try {
                                  const { error } = await supabase
                                    .from('case_studies')
                                    .delete()
                                    .eq('id', caseStudy.id);

                                  if (error) {
                                    toast({
                                      title: "Error",
                                      description: "Failed to delete case study",
                                      variant: "destructive",
                                    });
                                  } else {
                                    fetchCaseStudies();
                                    toast({
                                      title: "Success",
                                      description: "Case study deleted successfully!",
                                    });
                                  }
                                } catch (error) {
                                  console.error('Error deleting case study:', error);
                                  toast({
                                    title: "Error",
                                    description: "An unexpected error occurred",
                                    variant: "destructive",
                                  });
                                }
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                  
                  <div className="relative overflow-hidden flex-shrink-0 h-48">
                    {(caseStudy.featured_image_url || caseStudy.image_url) && (
                      <img
                        src={caseStudy.featured_image_url || caseStudy.image_url || ''}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-portfolio-tertiary transition-colors line-clamp-2">
                      {caseStudy.title}
                    </h3>
                    <p className="text-portfolio-primary-light text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                      {caseStudy.body}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="text-xs text-portfolio-tertiary">
                        {new Date(caseStudy.created_at).toLocaleDateString()}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-portfolio-tertiary text-portfolio-tertiary hover:bg-portfolio-tertiary hover:text-white text-xs"
                        asChild
                      >
                        <Link to={`/case-studies/${caseStudy.id}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {caseStudies.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-portfolio-primary-light mb-2">
              No case studies yet
            </h3>
            <p className="text-portfolio-primary-light/70">
              {isAdmin ? "Click the 'Add Case Study' button to create your first case study." : "Check back soon for exciting case studies!"}
            </p>
          </div>
        )}
      </div>

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

export default CaseStudies;
