
import React from 'react';

interface HeroFloatingElementsProps {
  mousePosition: { x: number; y: number };
}

const HeroFloatingElements = ({ mousePosition }: HeroFloatingElementsProps) => {
  return (
    <div className="absolute inset-0 z-15 pointer-events-none">
      <div 
        className="absolute top-20 left-10 w-8 h-8 bg-portfolio-primary/30 rounded-full transition-all duration-[1000ms] hover:scale-150"
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px) rotate(${mousePosition.x * 0.5}deg)`,
        }}
      />
      <div 
        className="absolute top-40 right-20 w-6 h-6 bg-portfolio-secondary/40 rounded-full transition-all duration-[1400ms]"
        style={{
          transform: `translate(${-mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px) rotate(${-mousePosition.y * 0.3}deg)`,
        }}
      />
      <div 
        className="absolute bottom-40 left-20 w-10 h-10 bg-portfolio-primary-light/30 rounded-full transition-all duration-[1200ms]"
        style={{
          transform: `translate(${mousePosition.x * 0.04}px, ${-mousePosition.y * 0.04}px) rotate(${mousePosition.x * 0.2}deg)`,
        }}
      />
    </div>
  );
};

export default HeroFloatingElements;
