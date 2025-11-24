
import React, { useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface HeroCustomCursorProps {
  isHovered: boolean;
}

const HeroCustomCursor = ({ isHovered }: HeroCustomCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 16}px`;
        cursorRef.current.style.top = `${e.clientY - 16}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed w-8 h-8 bg-white/20 rounded-full pointer-events-none z-50 backdrop-blur-sm border border-white/30 transition-opacity duration-500"
      style={{
        transform: 'scale(1.5)',
      }}
    >
      <Sparkles className="w-4 h-4 text-white m-2" />
    </div>
  );
};

export default HeroCustomCursor;
