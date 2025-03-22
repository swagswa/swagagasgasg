'use client';
import Image from 'next/image';

interface ArtworkCardProps {
  title: string;
  author: string;
  size: string;
  imagePath: string;
}

export default function ArtworkCard({ 
  title,
  author,
  size,
  imagePath
}: ArtworkCardProps) {
  return (
    <div className="scroll-animation">
      <div className="relative w-full h-[600px]">
        <Image
          src={imagePath}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-contain hover:scale-[1.02] transition-transform duration-500"
          quality={90}
          loading="eager"
        />
      </div>
      <div className="mt-1">
        <h3 className="font-normal text-lg leading-none">«{title}»</h3>
        <p className="text-sm text-gray-600 leading-none mt-1">{author}, {size}</p>
      </div>
    </div>
  );
}
