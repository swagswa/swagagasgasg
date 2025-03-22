'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    ymaps?: any;
  }
}

export default function YandexMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const mapInstanceRef = useRef<any | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return;

    if (!scriptRef.current) {
      scriptRef.current = document.createElement('script');
      scriptRef.current.src = 'https://api-maps.yandex.ru/2.1/?apikey=e9b5e7a7-d5c6-4e1c-9e8f-2d6f4b3a2c1d&lang=ru_RU';
      scriptRef.current.async = true;
      
      scriptRef.current.onload = () => {
        if (!window.ymaps) return;
        
        window.ymaps.ready(() => {
          if (mapRef.current && !mapInstanceRef.current && window.ymaps) {
            // Координаты Курсового переулка, 8/2
            const coordinates = [55.741951, 37.599896];
            
            // Создаем карту
            const myMap = new window.ymaps.Map(mapRef.current, {
              center: coordinates,
              zoom: 17,
              controls: ['zoomControl'],
              type: 'yandex#map'
            });
            
            // Применяем фильтр grayscale
            const mapElement = myMap.container.getElement();
            if (mapElement) {
              mapElement.style.filter = 'grayscale(100%)';
            }

            // Создаем метку по документации Яндекс
            const myPlacemark = new window.ymaps.Placemark(coordinates, {
              // Свойства
              hintContent: 'SAS Gallery',
              balloonContent: 'SAS Gallery<br>Курсовой переулок, 8/2'
            }, {
              // Опции
              preset: 'islands#redDotIcon', // Стиль метки
              iconColor: '#FF0000' // Цвет метки
            });

            // Добавляем метку на карту
            myMap.geoObjects.add(myPlacemark);
            
            // Сохраняем ссылку на карту
            mapInstanceRef.current = myMap;
            
            console.log('Метка добавлена на карту');
          }
        });
      };

      document.body.appendChild(scriptRef.current);
    }

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[300px] md:h-[600px] rounded-lg overflow-hidden"
      style={{ aspectRatio: '16/9' }}
    />
  );
}
