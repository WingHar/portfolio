
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Film, Video, Sparkles } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background overlay with interactive effects */}
      <div className="absolute inset-0 netflix-gradient z-10 transition-all duration-700" 
           style={{
             background: isHovered 
               ? `linear-gradient(${mousePosition.x}deg, rgba(47, 75, 38, 0.6) 0%, rgba(45, 51, 25, 0.8) 50%, rgba(18, 26, 15, 0.95) 100%)`
               : undefined
           }} />
      
      {/* Interactive background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=5760&auto=format&fit=crop')",
          opacity: isHovered ? 0.6 : 0.4,
          transform: `scale(${isHovered ? 1.05 : 1}) translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`,
          filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 z-15">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-portfolio-tertiary rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: isHovered 
                ? `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)` 
                : 'translate(0, 0)',
              transition: 'transform 0.3s ease-out',
            }}
          />
        ))}
      </div>

      {/* Interactive floating shapes */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-8 h-8 bg-portfolio-tertiary/30 rounded-full transition-all duration-500 hover:scale-150"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px) rotate(${mousePosition.x * 0.5}deg)`,
          }}
        />
        <div 
          className="absolute top-40 right-20 w-6 h-6 bg-portfolio-secondary/40 rounded-full transition-all duration-700"
          style={{
            transform: `translate(${-mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px) rotate(${-mousePosition.y * 0.3}deg)`,
          }}
        />
        <div 
          className="absolute bottom-40 left-20 w-10 h-10 bg-portfolio-primary-light/30 rounded-full transition-all duration-600"
          style={{
            transform: `translate(${mousePosition.x * 0.04}px, ${-mousePosition.y * 0.04}px) rotate(${mousePosition.x * 0.2}deg)`,
          }}
        />
      </div>

      {/* Custom cursor */}
      {isHovered && (
        <div 
          className="fixed w-8 h-8 bg-portfolio-tertiary/20 rounded-full pointer-events-none z-50 transition-all duration-200 backdrop-blur-sm border border-portfolio-tertiary/30"
          style={{
            left: `${mousePosition.x * window.innerWidth / 100 - 16}px`,
            top: `${mousePosition.y * window.innerHeight / 100 - 16}px`,
            transform: 'scale(1.5)',
          }}
        >
          <Sparkles className="w-4 h-4 text-portfolio-tertiary m-2 animate-spin" />
        </div>
      )}

      {/* Content with enhanced animations */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6 group">
            <Film 
              className="w-8 h-8 text-portfolio-tertiary mr-3 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" 
              style={{
                transform: isHovered ? `rotate(${mousePosition.x * 0.1}deg)` : 'rotate(0deg)',
              }}
            />
            <span className="text-portfolio-primary-light font-medium tracking-wide transition-all duration-300 group-hover:text-portfolio-tertiary">
              FULL STACK ENGINEER • DIGITAL MARKETER
            </span>
            <Video 
              className="w-8 h-8 text-portfolio-tertiary ml-3 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" 
              style={{
                transform: isHovered ? `rotate(${-mousePosition.x * 0.1}deg)` : 'rotate(0deg)',
              }}
            />
          </div>
          
          <h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-500"
            style={{
              transform: isHovered ? `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.1}deg) rotateY(${(mousePosition.x - 50) * 0.1}deg)` : 'none',
            }}
          >
            <span className="text-gradient">Crafting Digital</span>
            <br />
            <span className="text-white">Experiences</span>
          </h1>
          
          <p 
            className="text-xl sm:text-2xl text-portfolio-primary-light mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-300"
            style={{
              transform: isHovered ? `translateY(${(mousePosition.y - 50) * -0.02}px)` : 'translateY(0px)',
            }}
          >
            Where full-stack engineering meets strategic marketing. I build scalable applications and run high-converting campaigns across digital platforms, CTV, and beyond.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-portfolio-tertiary/30 group"
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
              className="border-portfolio-primary-light text-portfolio-primary-light hover:bg-portfolio-primary-light hover:text-portfolio-primary-dark px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `scale(1.1) rotate(${Math.random() * 4 - 2}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <span className="group-hover:animate-pulse">Get In Touch</span>
            </Button>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group"
          style={{
            transform: `translateX(-50%) translateY(${isHovered ? (mousePosition.y - 50) * 0.1 : 0}px)`,
          }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <ChevronDown className="w-8 h-8 text-portfolio-primary-light opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
          <div className="absolute inset-0 bg-portfolio-primary-light/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
        </div>
      </div>

      {/* Interactive glow effect */}
      {isHovered && (
        <div 
          className="absolute pointer-events-none z-30 w-96 h-96 rounded-full opacity-20 transition-all duration-300"
          style={{
            left: `${mousePosition.x * window.innerWidth / 100 - 192}px`,
            top: `${mousePosition.y * window.innerHeight / 100 - 192}px`,
            background: `radial-gradient(circle, rgba(194, 132, 122, 0.3) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      )}
    </section>
  );
};

export default Hero;
