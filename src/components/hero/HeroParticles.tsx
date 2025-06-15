
import React from 'react';

interface HeroParticlesProps {
  isHovered: boolean;
  mousePosition: { x: number; y: number };
}

const HeroParticles = ({ isHovered, mousePosition }: HeroParticlesProps) => {
  return (
    <div className="absolute inset-0 z-15">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-portfolio-primary rounded-full opacity-40 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            transform: isHovered 
              ? `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)` 
              : 'translate(0, 0)',
            transition: 'transform 1200ms ease-out',
          }}
        />
      ))}
    </div>
  );
};

export default HeroParticles;
