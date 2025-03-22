'use client';

import { useState, useEffect } from 'react';
import SmoothLink from './SmoothLink';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isVisible 
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100' 
          : 'bg-transparent border-transparent'
      }`}
      style={{
        opacity: isVisible ? '1' : '0',
        transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="#" className="nav-link hover:text-gray-600">SHOP</a>
            <a href="#" className="nav-link hover:text-gray-600">ABOUT</a>
            <a href="#" className="nav-link hover:text-gray-600">STORES</a>
            <a href="#" className="nav-link hover:text-gray-600">CARE</a>
          </div>
          <div className="text-2xl font-light tracking-widest">QM</div>
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex space-x-8">
              <SmoothLink href="#gallery" className="text-white hover:text-gray-300 transition-colors">Галерея</SmoothLink>
              <SmoothLink href="#artists" className="text-white hover:text-gray-300 transition-colors">Художники</SmoothLink>
              <SmoothLink href="#contacts" className="text-white hover:text-gray-300 transition-colors">Контакты</SmoothLink>
            </div>
            <a href="#" className="nav-link hover:text-gray-600">LOGIN</a>
            <a href="#" className="nav-link hover:text-gray-600">CART (0)</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
