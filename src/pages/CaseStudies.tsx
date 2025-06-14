
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CaseStudyForm from '@/components/CaseStudyForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface CaseStudy {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  created_at: string;
}

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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

  const handleCaseStudyClick = (id: string) => {
    navigate(`/case-studies/${id}`);
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
      
      <div className="flex-1 max-w-7xl mx-auto px-4 py-16 mt-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Case Studies</h1>
            <p className="text-portfolio-primary-light">
              Explore our featured projects and success stories
            </p>
          </div>
          
          {isAdmin && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Case Study
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-8">
            <CaseStudyForm
              onSuccess={handleCaseStudyCreated}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((caseStudy) => (
            <Card 
              key={caseStudy.id} 
              className="bg-portfolio-secondary/20 border-portfolio-tertiary/20 overflow-hidden project-card-hover cursor-pointer"
              onClick={() => handleCaseStudyClick(caseStudy.id)}
            >
              {caseStudy.image_url && (
                <div className="aspect-video bg-portfolio-primary-dark/50">
                  <img
                    src={caseStudy.image_url}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {caseStudy.title}
                </h3>
                <p className="text-portfolio-primary-light line-clamp-3">
                  {caseStudy.body}
                </p>
                <div className="mt-4 text-sm text-portfolio-tertiary">
                  {new Date(caseStudy.created_at).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>

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

      <Footer />
    </div>
  );
};

export default CaseStudies;
