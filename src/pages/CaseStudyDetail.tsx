
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchCaseStudy(id);
    }
  }, [id]);

  const fetchCaseStudy = async (caseStudyId: string) => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', caseStudyId)
        .maybeSingle();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch case study",
          variant: "destructive",
        });
        navigate('/case-studies');
      } else if (!data) {
        toast({
          title: "Not Found",
          description: "Case study not found",
          variant: "destructive",
        });
        navigate('/case-studies');
      } else {
        setCaseStudy(data);
      }
    } catch (error) {
      console.error('Error fetching case study:', error);
      navigate('/case-studies');
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

  if (!caseStudy) {
    return null;
  }

  return (
    <div className="min-h-screen bg-portfolio-primary-dark flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-4xl mx-auto px-4 py-16 mt-16">
        <Button
          onClick={() => navigate('/case-studies')}
          variant="outline"
          className="mb-8 border-portfolio-tertiary/30 text-portfolio-primary-light hover:bg-portfolio-tertiary/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Case Studies
        </Button>

        <article className="bg-portfolio-secondary/20 border border-portfolio-tertiary/20 rounded-lg overflow-hidden">
          {caseStudy.image_url && (
            <div className="aspect-video bg-portfolio-primary-dark/50">
              <img
                src={caseStudy.image_url}
                alt={caseStudy.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex items-center text-portfolio-tertiary mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {new Date(caseStudy.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6">
              {caseStudy.title}
            </h1>
            
            <div className="prose prose-invert max-w-none">
              <div className="text-portfolio-primary-light leading-relaxed whitespace-pre-wrap">
                {caseStudy.body}
              </div>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
