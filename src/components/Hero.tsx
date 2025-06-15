
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
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
      setMousePosition(newPosition);
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isCurrentlyAtTop = scrollTop < 100; // Consider "at top" if within 100px of top
      setIsAtTop(isCurrentlyAtTop);
      onHoverChange(isCurrentlyAtTop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onHoverChange]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-none"
    >
      <HeroBackground isHovered={isAtTop} mousePosition={mousePosition} />
      <HeroParticles isHovered={isAtTop} mousePosition={mousePosition} />
      <HeroFloatingElements mousePosition={mousePosition} />
      <HeroCustomCursor isHovered={isAtTop} />
      <HeroContent isHovered={isAtTop} mousePosition={mousePosition} />
      <HeroScrollIndicator isHovered={isAtTop} mousePosition={mousePosition} />
    </section>
  );
};

export default Hero;
