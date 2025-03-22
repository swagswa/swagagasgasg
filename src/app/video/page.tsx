'use client';

import Link from 'next/link';
import ReactPlayer from 'react-player';
import MobileMenu from '../components/MobileMenu';
import { useState, useEffect, useRef } from 'react';

interface VideoProps {
  src: string;
  poster: string;
  title?: string;
  subtitle?: string;
}

const videos: VideoProps[] = [
  {
    src: '/videos/Fin_uni.mov',
    poster: '/images/photo_2025-03-22_16-08-46.jpg',
    title: 'ЦВЕТЕНИЕ',
    subtitle: 'Выставка Надежды Елкиной'
  }
];

// Компонент для отдельного видеоплеера
const VideoPlayerWrapper = ({ src, poster, title, subtitle }: VideoProps) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  // Удаляем заголовки и надписи из плеера
  useEffect(() => {
    if (isReady && playerRef.current) {
      // Добавляем CSS для скрытия заголовков
      const style = document.createElement('style');
      style.textContent = `
        .vjs-title-text, .vjs-title-overlay, .vjs-caption-text, 
        [class*="title"], [class*="caption"], [class*="text-track"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isReady]);

  return (
    <div>
      <div className="relative aspect-video shadow-lg overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url={src}
          width="100%"
          height="100%"
          controls={true}
          light={poster}
          playing={false}
          onReady={() => setIsReady(true)}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                disablePictureInPicture: true,
              },
            },
          }}
        />
      </div>
      {title && <h2 className="text-2xl font-normal mt-4 text-center">{title}</h2>}
      {subtitle && <p className="text-lg text-gray-600 mt-2 text-center">{subtitle}</p>}
    </div>
  );
};

export default function VideoPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState(false);

  useEffect(() => {
    // Имитация загрузки видео
    setTimeout(() => {
      setVideosLoaded(true);
    }, 1000);

    // Добавляем обработчик для Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(() => {
          console.log('ServiceWorker успешно зарегистрирован');
        }).catch(err => {
          console.log('Ошибка регистрации ServiceWorker: ', err);
        });
      });
    }
  }, []);

  if (!videosLoaded) {
    return (
      <div className="fixed inset-0 bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-800">Загрузка видео...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white">
      <div className="fixed top-4 left-4 z-[1000]">
        <Link href="/">
          <img src="/images/IMG_3471.svg" alt="Logo" className="w-24 h-24 md:w-32 md:h-32" style={{position: 'fixed'}} />
        </Link>
      </div>
      {/* Header с кнопкой меню */}
      <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 50 }}>
        <button
          className="w-8 h-8 flex flex-col justify-center items-center"
          onClick={() => setIsMenuOpen(true)}
        >
          <span className="w-6 h-0.5 bg-gray-800 mb-1.5"></span>
          <span className="w-6 h-0.5 bg-gray-800 mb-1.5"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>

      {/* Кнопка домой */}
      <div style={{ position: 'fixed', left: '16px', bottom: '16px', zIndex: 52 }}>
        <Link href="/">
          <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-6 h-6"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
        </Link>
      </div>

      {/* Мобильное меню */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Основной контент */}
      <div className="bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center pt-8">
            <h1 className="text-4xl font-normal">Видео</h1>
            <div className="w-24 h-0.5 bg-black mx-auto mt-4 mb-12"></div>
          </div>
          
          <div className="space-y-32">
            {videos.map((video, index) => (
              <div key={index} className="max-w-5xl mx-auto">
                <VideoPlayerWrapper 
                  src={video.src} 
                  poster={video.poster}
                  title={video.title}
                  subtitle={video.subtitle}
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-32 border-t border-gray-200 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-light mb-8">SAS Art Fashion Gallery</h2>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                Мы стремимся создавать пространство, где искусство и мода 
                сливаются воедино, рассказывая уникальные истории через 
                визуальные образы наших талантливых художников.
              </p>
              <div className="flex justify-center space-x-8 mb-12">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Instagram</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Facebook</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">VKontakte</a>
              </div>
              <div className="text-sm text-gray-500">
                2024 SAS Art Fashion Gallery. Все права защищены.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}