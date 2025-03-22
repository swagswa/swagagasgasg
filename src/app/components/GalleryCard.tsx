'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryCardProps {
  title: string;
  image: string;
  artist?: string;
  year?: string;
  description?: string;
  reverse?: boolean;
}

export default function GalleryCard({
  title,
  image,
  artist,
  year,
  description,
  reverse = false,
}: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    const element = document.getElementById(`gallery-${title}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [title]);

  const isLargeImage = image.includes('24Mp') || image.includes('100Mp');

  return (
    <div id={`gallery-${title}`} className="relative">
      {/* Мобильная версия */}
      <div className="md:hidden">
        <div className="relative w-full aspect-[4/3]">
          {isVisible && (
            <div className={`relative w-full h-full transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}>
              <Image
                src={image}
                alt={title}
                fill
                sizes="100vw"
                className="object-cover"
                quality={isLargeImage ? 40 : 75}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          )}
        </div>
        <div className="mt-4 px-4">
          <h3 className="text-2xl font-light mb-2">{title}</h3>
          {artist && <p className="text-gray-600 mb-1">{artist}</p>}
          {year && <p className="text-gray-600 mb-1">{year}</p>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      </div>

      {/* Десктопная версия */}
      <div className="hidden md:flex gap-16 items-start group">
        <div className={`flex-1 relative h-[800px] transition-transform duration-700 group-hover:scale-[1.02] ${reverse ? 'order-2' : ''}`}>
          {isVisible && (
            <div className={`relative w-full h-full transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}>
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                quality={isLargeImage ? 40 : 75}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
              />
            </div>
          )}
        </div>
        <div className={`w-96 sticky top-32 ${reverse ? 'order-1' : ''}`}>
          <div className="space-y-6">
            <h2 className="text-3xl font-light">{title}</h2>
            {artist && <p className="text-xl text-gray-700">{artist}</p>}
            {year && <p className="text-lg text-gray-600">{year}</p>}
            <div className="w-16 h-[1px] bg-gray-300"></div>
            {description && (
              <p className="text-gray-600 leading-relaxed">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
