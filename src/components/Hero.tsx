
import React, { useState, useEffect } from 'react';
import HeroBackground from './hero/HeroBackground';
import HeroParticles from './hero/HeroParticles';
import HeroFloatingElements from './hero/HeroFloatingElements';
import HeroCustomCursor from './hero/HeroCustomCursor';
import HeroContent from './hero/HeroContent';
import HeroScrollIndicator from './hero/HeroScrollIndicator';

interface HeroProps {
  onHoverChange: (isHovered: boolean) => void;
}

const Hero = ({ onHoverChange }: HeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
      setMousePosition(newPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange(false);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HeroBackground isHovered={isHovered} mousePosition={mousePosition} />
      <HeroParticles isHovered={isHovered} mousePosition={mousePosition} />
      <HeroFloatingElements mousePosition={mousePosition} />
      <HeroCustomCursor isHovered={isHovered} />
      <HeroContent isHovered={isHovered} mousePosition={mousePosition} />
      <HeroScrollIndicator isHovered={isHovered} mousePosition={mousePosition} />
    </section>
  );
};

export default Hero;
