
import React from 'react';
import { Button } from '@/components/ui/button';
import { Film, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroContentProps {
  isHovered: boolean;
  mousePosition: { x: number; y: number };
}

const HeroContent = ({ isHovered, mousePosition }: HeroContentProps) => {
  const handleViewWorkClick = () => {
    const projectsSection = document.getElementById('projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="animate-fade-in">
        {/* Header icons with slower transitions */}
        <div className="flex items-center justify-center mb-6 group">
          <Film 
            className="w-8 h-8 text-portfolio-tertiary mr-3 transition-all duration-[800ms] group-hover:rotate-12 group-hover:scale-110" 
            style={{
              transform: isHovered ? `rotate(${mousePosition.x * 0.1}deg)` : 'rotate(0deg)',
            }}
          />
          <span className="text-portfolio-primary-light font-medium tracking-wide transition-all duration-[600ms] group-hover:text-portfolio-tertiary body-font">
            FULL STACK ENGINEER • DIGITAL MARKETER
          </span>
          <Video 
            className="w-8 h-8 text-portfolio-tertiary ml-3 transition-all duration-[800ms] group-hover:-rotate-12 group-hover:scale-110" 
            style={{
              transform: isHovered ? `rotate(${-mousePosition.x * 0.1}deg)` : 'rotate(0deg)',
            }}
          />
        </div>
        
        {/* Main heading with slower 3D transition */}
        <h1 
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-[1000ms] ease-out title-font"
          style={{
            transform: isHovered ? `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.1}deg) rotateY(${(mousePosition.x - 50) * 0.1}deg)` : 'none',
          }}
        >
          <span className="text-gradient">Welcome to my Digital</span>
          <br />
          <span className="text-white">Portfolio</span>
        </h1>
        
        {/* Description with smooth transition */}
        <p 
          className="text-xl sm:text-2xl text-portfolio-primary-light mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-[800ms] ease-out body-font"
          style={{
            transform: isHovered ? `translateY(${(mousePosition.y - 50) * -0.02}px)` : 'translateY(0px)',
          }}
        >
          Where Product Management is connected by Full-Stack Engineering, Strategic Marketing, and Design,
          <br />
          with User-Experience in mind.
        </p>
        
        {/* Buttons with enhanced hover effects */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-[400ms] hover:scale-110 hover:shadow-lg hover:shadow-portfolio-tertiary/30 group body-font"
            onClick={handleViewWorkClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `scale(1.1) rotate(${Math.random() * 4 - 2}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <span className="group-hover:animate-pulse">View My Work</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-portfolio-secondary border-portfolio-secondary text-portfolio-tertiary hover:bg-portfolio-secondary/80 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-[400ms] hover:scale-110 hover:shadow-lg group body-font"
            asChild
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `scale(1.1) rotate(${Math.random() * 4 - 2}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <Link to="/contact">
              <span className="group-hover:animate-pulse">Get In Touch</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
