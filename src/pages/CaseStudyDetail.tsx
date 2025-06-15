
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface CaseStudy {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  featured: boolean | null;
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
      
      <div className="flex-1 max-w-6xl mx-auto px-4 py-16 mt-16">
        <Button
          onClick={() => navigate('/case-studies')}
          variant="outline"
          className="mb-8 border-portfolio-tertiary/30 text-portfolio-primary-light hover:bg-portfolio-tertiary/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Case Studies
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Case Study Image */}
          <div className="relative overflow-hidden rounded-lg">
            {caseStudy.image_url ? (
              <img
                src={caseStudy.image_url}
                alt={caseStudy.title}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full aspect-video bg-portfolio-secondary/20 border border-portfolio-tertiary/20 rounded-lg flex items-center justify-center">
                <span className="text-portfolio-primary-light">No image available</span>
              </div>
            )}
            {caseStudy.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-portfolio-tertiary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Case Study Info */}
          <div className="space-y-6">
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
            
            <div className="text-xl text-portfolio-primary-light mb-6 leading-relaxed">
              {caseStudy.body.substring(0, 200)}...
            </div>

            {/* Tags Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-portfolio-secondary/20 text-portfolio-primary-light px-3 py-1 rounded-full text-sm border border-portfolio-secondary/30">
                  Case Study
                </span>
                {caseStudy.featured && (
                  <span className="bg-portfolio-tertiary/20 text-portfolio-tertiary px-3 py-1 rounded-full text-sm border border-portfolio-tertiary/30">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full Case Study Content */}
        <div className="mt-16 bg-portfolio-secondary/20 border border-portfolio-tertiary/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Case Study Details</h2>
          <div className="prose prose-invert max-w-none">
            <div className="text-portfolio-primary-light leading-relaxed whitespace-pre-wrap">
              {caseStudy.body}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
