import React, { useEffect, useRef } from 'react';

export const InteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="contents">
      {/* Flashlight Mouse Tracker */}
      <div id="flashlight" className="fixed top-0 left-0 w-full height-full pointer-events-none z-[100]" />

      {/* Persistent Background Layer */}
      <div id="dot-matrix-container">
        <div className="dot-matrix" />
        <div 
          id="dot-matrix-highlight" 
          style={{ opacity: 1 }}
        />
      </div>

      {/* Ambient Background Decorations */}
      <div className="ambient-glow top-[-20%] left-[-10%]" />
      <div className="ambient-glow bottom-[-10%] right-[-10%] bg-[radial-gradient(circle,rgba(208,188,255,0.1)_0%,rgba(0,0,0,0)_70%)]" />
    </div>
  );
};

export default InteractiveBackground;
