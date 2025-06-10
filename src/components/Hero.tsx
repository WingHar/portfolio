
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Film, Video } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 netflix-gradient z-10" />
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=5760&auto=format&fit=crop')"
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Film className="w-8 h-8 text-portfolio-tertiary mr-3" />
            <span className="text-portfolio-primary-light font-medium tracking-wide">FULL STACK ENGINEER • DIGITAL MARKETER</span>
            <Video className="w-8 h-8 text-portfolio-tertiary ml-3" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Crafting Digital</span>
            <br />
            <span className="text-white">Experiences</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-portfolio-primary-light mb-8 max-w-3xl mx-auto leading-relaxed">
            Where full-stack engineering meets strategic marketing. I build scalable applications and run high-converting campaigns across digital platforms, CTV, and beyond.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-portfolio-primary-light text-portfolio-primary-light hover:bg-portfolio-primary-light hover:text-portfolio-primary-dark px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-portfolio-primary-light opacity-70" />
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-portfolio-tertiary rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-portfolio-secondary rounded-full opacity-50 animate-pulse delay-1000" />
      <div className="absolute bottom-40 left-20 w-4 h-4 bg-portfolio-primary-light rounded-full opacity-40 animate-pulse delay-2000" />
    </section>
  );
};

export default Hero;
