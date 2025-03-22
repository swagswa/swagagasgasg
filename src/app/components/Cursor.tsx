'use client';
import { useEffect, useState } from 'react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      {/* Внешнее свечение */}
      <div 
        className="pointer-events-none fixed top-0 left-0 w-32 h-32 rounded-full"
        style={{
          transform: `translate(${position.x - 64}px, ${position.y - 64}px)`,
          transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(5px)',
        }}
      />
      {/* Основная сфера */}
      <div 
        className="pointer-events-none fixed top-0 left-0 w-24 h-24 rounded-full"
        style={{
          transform: `translate(${position.x - 48}px, ${position.y - 48}px)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 0 20px rgba(255,255,255,0.2)',
        }}
      />
    </>
  );
}
