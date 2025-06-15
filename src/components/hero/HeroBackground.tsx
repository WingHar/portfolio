
import React from 'react';

interface HeroBackgroundProps {
  isHovered: boolean;
  mousePosition: { x: number; y: number };
}

const HeroBackground = ({ isHovered, mousePosition }: HeroBackgroundProps) => {
  return (
    <>
      {/* Background overlay with interactive effects - Added slow fade transition */}
      <div className="absolute inset-0 netflix-gradient z-10 transition-all duration-[1500ms] ease-out" 
           style={{
             background: isHovered 
               ? `linear-gradient(${mousePosition.x}deg, rgba(25, 123, 158, 0.6) 0%, rgba(25, 123, 158, 0.8) 50%, rgba(15, 23, 42, 0.95) 100%)`
               : undefined
           }} />
      
      {/* Interactive background image - Increased transition duration */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[2000ms] ease-out"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=5760&auto=format&fit=crop')",
          opacity: isHovered ? 0.6 : 0.4,
          transform: `scale(${isHovered ? 1.05 : 1}) translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`,
          filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
        }}
      />

      {/* Mouse follower glow effect with fade transition */}
      {isHovered && (
        <div 
          className="absolute pointer-events-none z-30 w-96 h-96 rounded-full transition-all duration-[800ms] ease-out"
          style={{
            left: `${mousePosition.x * window.innerWidth / 100 - 192}px`,
            top: `${mousePosition.y * window.innerHeight / 100 - 192}px`,
            background: `radial-gradient(circle, rgba(25, 123, 158, 0.3) 0%, transparent 70%)`,
            filter: 'blur(40px)',
            opacity: 0.2,
          }}
        />
      )}
    </>
  );
};

export default HeroBackground;
