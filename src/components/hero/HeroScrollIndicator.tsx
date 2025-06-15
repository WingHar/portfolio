
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroScrollIndicatorProps {
  isHovered: boolean;
  mousePosition: { x: number; y: number };
}

const HeroScrollIndicator = ({ isHovered, mousePosition }: HeroScrollIndicatorProps) => {
  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group transition-all duration-[600ms] ease-out"
      style={{
        transform: `translateX(-50%) translateY(${isHovered ? (mousePosition.y - 50) * 0.1 : 0}px)`,
      }}
      onClick={handleScrollClick}
    >
      <ChevronDown className="w-8 h-8 text-portfolio-primary-light opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
      <div className="absolute inset-0 bg-portfolio-primary-light/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
    </div>
  );
};

export default HeroScrollIndicator;
