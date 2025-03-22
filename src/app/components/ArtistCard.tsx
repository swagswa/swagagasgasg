'use client';
import Image from 'next/image';

interface ArtistCardProps {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

export default function ArtistCard({ name, description, image, imageAlt, reverse = false }: ArtistCardProps) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
        {/* Текстовый блок */}
        <div 
          className={`
            md:col-span-4 
            ${reverse ? 'md:col-start-2 order-2 md:order-1' : 'md:col-start-8 order-2'} 
            scroll-animation
          `}
        >
          <div className="relative">
            <div className="absolute -left-8 top-0 w-1 h-16 bg-black/10"></div>
            <h2 className="font-normal text-3xl mb-6 tracking-wider text-black">{name}</h2>
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Блок с фотографией */}
        <div 
          className={`
            md:col-span-5 
            ${reverse ? 'md:col-start-7 order-1 md:order-2' : 'md:col-start-2 order-1'} 
            scroll-animation
          `}
        >
          <div className="relative w-full aspect-square max-w-[400px] mx-auto">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover artist-image"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
