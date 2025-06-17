
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface CaseStudy {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  featured_image_url: string | null;
  general_images: string[] | null;
  featured?: boolean;
  created_at: string;
}

const FeaturedCaseStudies = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const { data: featuredCaseStudies = [], isLoading } = useQuery({
    queryKey: ['featured-case-studies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as CaseStudy[];
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
  const shouldShowArrows = featuredCaseStudies.length > 3;
  const showLeftArrow = shouldShowArrows && canScrollPrev;
  const showRightArrow = shouldShowArrows && canScrollNext;

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-gradient">Featured Case Studies</span>
            </h2>
            <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto">
              Explore our most impactful success stories and achievements
            </p>
          </div>
          <div className="text-center text-portfolio-primary-light">
            Loading featured case studies...
          </div>
        </div>
      </section>
    );
  }

  if (featuredCaseStudies.length === 0) {
    return null; // Don't show the section if there are no featured case studies
  }

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-portfolio-primary-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-gradient">Featured Case Studies</span>
            </h2>
            <p className="text-xl text-portfolio-primary-light max-w-3xl mx-auto">
              Explore our most impactful success stories and achievements
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
                {featuredCaseStudies.map((caseStudy) => (
                  <CarouselItem key={caseStudy.id} className="pl-2 md:pl-4 basis-4/5 sm:basis-3/5 md:basis-1/2 lg:basis-1/3">
                    <Link 
                      to={`/case-studies/${caseStudy.id}`}
                      className="block group"
                    >
                      <Card 
                        className="holographic-card bg-portfolio-primary border-portfolio-secondary overflow-hidden cursor-pointer h-full"
                      >
                        <div className="relative overflow-hidden h-full">
                          {(caseStudy.featured_image_url || caseStudy.image_url) ? (
                            <img 
                              src={caseStudy.featured_image_url || caseStudy.image_url || ''} 
                              alt={caseStudy.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-portfolio-secondary/50 flex items-center justify-center">
                              <Calendar className="w-12 h-12 text-portfolio-tertiary/50" />
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-portfolio-primary-dark/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                          
                          {/* Case Study badge - always visible */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-portfolio-tertiary text-white px-3 py-1 rounded-full text-sm font-medium">
                              Case Study
                            </span>
                          </div>
                          
                          {/* Centered overlay on hover */}
                          <div className="absolute inset-0 bg-portfolio-primary-dark/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <div className="text-center p-6">
                              <h3 className="text-white font-bold text-xl mb-4">{caseStudy.title}</h3>
                              <p className="text-portfolio-primary-light text-sm mb-6 line-clamp-4 leading-relaxed">
                                {caseStudy.body.length > 200 
                                  ? `${caseStudy.body.substring(0, 200)}...` 
                                  : caseStudy.body
                                }
                              </p>
                              <div className="flex justify-center mb-4">
                                <span className="bg-portfolio-tertiary/20 text-portfolio-tertiary px-3 py-1 rounded text-sm">
                                  Published {new Date(caseStudy.created_at).getFullYear()}
                                </span>
                              </div>
                              <div className="text-portfolio-tertiary text-sm font-medium">
                                Click to read full case study →
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

      {/* Full-width banner for "View All Case Studies" with yellow gold color */}
      <div className="w-full bg-portfolio-tertiary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-portfolio-primary-dark text-xl font-medium">
                Explore all case studies and success stories
              </p>
            </div>
            <Button 
              size="lg"
              variant="outline"
              className="bg-white text-portfolio-tertiary border-white hover:bg-gray-100 px-8 py-4 text-lg font-semibold flex-shrink-0"
              asChild
            >
              <Link to="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedCaseStudies;
