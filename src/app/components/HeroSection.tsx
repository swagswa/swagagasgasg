'use client';

import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export default function HeroSection({ isMenuOpen, setIsMenuOpen }: HeroSectionProps) {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden hero-section section-transition z-10">
      {/* Фоновый контейнер */}
      <div 
        className="absolute inset-0 w-[120%] left-1/2 -translate-x-1/2 bg-cover bg-center brightness-75"
        style={{
          backgroundImage: 'url("/images/SAS. Новая.pdf-image-010 (1).jpg")',
        }}
      >
        {/* Градиентные наложения */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent h-96" />
      </div>

      {/* Контейнер для контента */}
      <div className="relative h-full w-full content-wrapper">
        {/* Header */}
        <header className="absolute top-0 right-0 z-50 p-8">
          {/* Кнопка мобильного меню */}
          <button
            className="w-8 h-8 flex flex-col justify-center items-center"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="w-6 h-0.5 bg-white mb-1.5"></span>
            <span className="w-6 h-0.5 bg-white mb-1.5"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </header>

        {/* Логотип */}
        <div className={`absolute top-8 left-8 z-20 w-32 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}>
          <div className="relative group transition-all duration-300">
            <Image
              src="/images/IMG_3471.svg"
              alt="Logo"
              width={200}
              height={62}
              className="w-full h-auto drop-shadow-lg fade-in-up delay-300"
              style={{
                filter: 'brightness(0) invert(1)',
                transform: 'scale(1.02)',
              }}
            />
          </div>
        </div>
        
        {/* Центральный текст */}
        <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <h2 className="gallery-title fade-in delay-500">
            <div className="block">SAS</div>
            <div className="block whitespace-nowrap">ART FASHION</div>
            <div className="block">GALLERY</div>
          </h2>
        </div>

        {/* Текст слева снизу */}
        <div className="absolute bottom-12 left-12 z-10 max-w-lg">
          <p className="text-white/80 text-sm tracking-wider md:mb-6 mb-2 fade-in-up delay-600">
            ПРЕДСТАВЛЯЕТ ЧАСТНУЮ ЗАКРЫТУЮ ГАЛЕРЕЮ КЛУБ ДЕКОРИРОВАННЫЙ ОТ HERMES HOME
          </p>
          <Link href="#" className="text-white text-sm tracking-wider group md:inline-flex block items-center fade-in-up delay-700">
            Смотреть картины
            <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Instagram иконка справа снизу */}
        <div className="absolute bottom-12 right-12 z-10">
          <Link 
            href="https://www.instagram.com/sas.gallery.club/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="feather feather-instagram fade-in-up delay-700"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
