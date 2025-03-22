'use client';

import Link from 'next/link';
import SmoothLink from './SmoothLink';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Затемненный фон */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ zIndex: 49 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
      />
      
      {/* Меню */}
      <div 
        className="fixed top-0 right-0 h-full w-[400px] bg-[#FFFFF0]/95 backdrop-blur-sm flex flex-col transition-all duration-300 ease-in-out"
        style={{ zIndex: 51 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-8 right-8 hover:opacity-70 transition-opacity duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        
        <nav className="flex flex-col space-y-8 pt-32 px-12" onClick={(e) => e.stopPropagation()}>
          <Link href="/" className="hover:opacity-70 transition-opacity duration-300 uppercase tracking-wider">
            ГЛАВНАЯ
          </Link>
          <Link href="/gallery" className="hover:opacity-70 transition-opacity duration-300 uppercase tracking-wider">
            ГАЛЕРЕЯ РАБОТ
          </Link>
          <Link href="/video" className="hover:opacity-70 transition-opacity duration-300 uppercase tracking-wider">
            ВИДЕО
          </Link>
          <SmoothLink 
            href="#artists" 
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.stopPropagation();
              onClose();
            }} 
            className="hover:opacity-70 transition-opacity duration-300 uppercase tracking-wider"
          >
            О ХУДОЖНИКЕ
          </SmoothLink>
          <a href="#contact" onClick={(e) => {
            e.stopPropagation();
            onClose();
          }} className="hover:opacity-70 transition-opacity duration-300 uppercase tracking-wider">
            КОНТАКТЫ
          </a>
        </nav>

        <div className="mt-auto mb-8 px-12 text-sm uppercase tracking-wider">
          SAS gallery
        </div>
      </div>
    </>
  );
}
