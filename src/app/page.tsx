'use client';

import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import YandexMap from './components/YandexMap'
import SmoothLink from './components/SmoothLink';
import MobileMenu from './components/MobileMenu';
import { useEffect, useState } from 'react';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

const playfair = {
  fontFamily: 'Playfair Display',
  fontWeight: '400',
  subsets: ['latin'],
};

export default function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Предзагрузка изображений
    const preloadImages = async () => {
      const imageUrls = ['/images/susorange.jpeg', '/images/sasblue.jpeg'];
      try {
        await Promise.all(
          imageUrls.map(
            (src) =>
              new Promise((resolve, reject) => {
                const img = document.createElement('img');
                img.onload = () => resolve(src);
                img.onerror = reject;
                img.src = src;
              })
          )
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        // В случае ошибки все равно показываем контент
        setImagesLoaded(true);
      }
    };

    preloadImages();

    const handleInitialScroll = () => {
      if (window.scrollY > 100) {
        setShowBackgrounds(true);
        window.removeEventListener('scroll', handleInitialScroll);
      }
    };

    window.addEventListener('scroll', handleInitialScroll);

    const handleBackgroundScroll = () => {
      const scrollPosition = window.scrollY;
      const changePoint = 4000;
      const secondImage = document.getElementById('second-image');
      
      if (secondImage) {
        if (scrollPosition > changePoint) {
          secondImage.style.opacity = '1';
        } else {
          secondImage.style.opacity = '0';
        }
      }
    };

    window.addEventListener('scroll', handleBackgroundScroll);
    return () => {
      window.removeEventListener('scroll', handleInitialScroll);
      window.removeEventListener('scroll', handleBackgroundScroll);
    };
  }, []);

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 bg-[#F2F0E6] z-50">
        {/* Можно добавить здесь индикатор загрузки */}
      </div>
    );
  }

  return (
    <main className="relative bg-[#F2F0E6]">
      {/* Hero секция */}
      <section id="hero" className="relative h-screen w-full overflow-hidden hero-section section-transition z-10">
        {/* Фоновый контейнер */}
        <div 
          className="absolute inset-0 w-[115%] h-[115%] -top-[7.5%] left-1/2 -translate-x-1/2 bg-cover bg-center brightness-75"
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
          {/* Навигация для десктопа */}
          <div className="absolute top-8 right-12 hidden md:flex gap-8 z-10">
            <SmoothLink 
              href="#gallery" 
              className="text-sm tracking-wider text-white hover:text-gray-300 transition-colors fade-in-up delay-500"
            >
              ГАЛЕРЕЯ РАБОТ
            </SmoothLink>
            <Link 
              href="/video" 
              className="text-sm tracking-wider text-white hover:text-gray-300 transition-colors fade-in-up delay-500"
            >
              ВИДЕО
            </Link>
            <SmoothLink href="#artists" className="text-sm tracking-wider text-white hover:text-gray-300 transition-colors fade-in-up delay-600">
              ХУДОЖНИКИ
            </SmoothLink>
            <SmoothLink href="#contacts" className="text-sm tracking-wider text-white hover:text-gray-300 transition-colors fade-in-up delay-700">
              КОНТАКТЫ
            </SmoothLink>
          </div>

          {/* Кнопка мобильного меню */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="absolute top-8 right-8 md:hidden z-10 text-white hover:opacity-70 transition-opacity duration-300"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Мобильное меню */}
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />

          {/* Логотип */}
          <div className="absolute top-8 left-8 z-20 w-32">
            <div className="relative group transition-all duration-300">
              <Image
                src="/images/IMG_3471.svg"
                alt="Logo"
                width={200}
                height={62}
                className="w-full h-auto drop-shadow-lg fade-in-up delay-300"
                priority
                loading="eager"
                quality={100}
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
              SAS 
              <br />ART FASHION<br />
              GALLERY
            </h2>
          </div>

          {/* Текст слева снизу */}
          <div className="absolute bottom-12 left-12 z-10 max-w-lg">
            <p className="text-white/80 text-sm tracking-wider mb-6 fade-in-up delay-600">
              ПРЕДСТАВЛЯЕТ ЧАСТНУЮ ЗАКРЫТУЮ ГАЛЕРЕЮ КЛУБ ДЕКОРИРОВАННЫЙ ОТ HERMES HOME
            </p>
            <a href="#" className="text-white text-sm tracking-wider group inline-flex items-center fade-in-up delay-700">
              Смотреть картины
              <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
          </div>

          {/* Instagram иконка справа снизу */}
          <div className="absolute bottom-12 right-12 z-10">
            <a 
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
                className="feather feather-instagram fade-in-up delay-700"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Фиксированные фоновые изображения */}
      {showBackgrounds && (
        <>
          <div className="fixed inset-0 w-full h-full z-[1] opacity-0 transition-opacity duration-500" style={{ opacity: 0 }}>
            <Image
              src="/images/susorange.jpeg"
              alt="Gallery background"
              fill
              className="object-cover"
              quality={100}
              sizes="100vw"
              loading="lazy"
            />
          </div>

          <div id="second-image" className="fixed inset-0 w-full h-full z-[2] opacity-0 transition-opacity duration-500">
            <Image
              src="/images/sasblue.jpeg"
              alt="Gallery background"
              fill
              className="object-cover"
              quality={100}
              sizes="100vw"
              loading="lazy"
            />
          </div>
        </>
      )}

      {/* Секция с художниками */}
      <section id="artists" className="relative bg-[#F2F0E6] py-32 w-full z-10">
        <div className="container mx-auto px-4">
          {/* Первый художник - Алексей */}
          <div className="relative mb-16">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
              <div className="md:col-span-5 md:col-start-2 scroll-animation">
                <div className="relative w-full aspect-square max-w-[400px] mx-auto">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <Image
                      src="/images/phirsov.jpg"
                      alt="Алексей Фирсов"
                      fill
                      className="object-cover artist-image"
                      quality={100}
                      style={{
                        objectPosition: '4% center'
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-4 md:col-start-8 scroll-animation">
                <div className="relative">
                  <div className="absolute -left-8 top-0 w-1 h-16 bg-black/10"></div>
                  <h2 className="artist-title font-normal text-3xl mb-6 tracking-wider text-black">АЛЕКСЕЙ ФИРСОВ</h2>
                  <p className="text-gray-600 leading-relaxed">
                  Необычный художник и еще более удивительный человек. Свой стиль он называет &quot;лавизм&quot;. Его творчество присутствует в каталоге Sotheby&#39;s: Icons, Russian Pictures and Works of Art.
Работы художника находятся в российских частных собраниях, собраниях шведской королевской семьи, в Лондоне и ОАЭ, а также в музее имени Рериха, Мюльхайм-Рур (Германия) и фонде Майкла Кентского.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Второй художник - Надежда */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
              <div className="md:col-span-4 md:col-start-2 scroll-animation order-2 md:order-1">
                <div className="relative">
                  <div className="absolute -left-8 top-0 w-1 h-16 bg-black/10"></div>
                  <h2 className="artist-title font-normal text-3xl mb-6 tracking-wider text-black">НАДЕЖДА ЕЛКИНА</h2>
                  <p className="text-gray-600 leading-relaxed">
                  Путь художницы действительно вызывает неподдельный интерес. Она обучалась в Московском академическом художественном училище (МАХУ), участвовала в благотворительном мероприятии «Мечты ангела», а более 20 лет посвятила сотрудничеству с известным французским домом моды Chanel в России и за рубежом.
Прослыв одним из ведущих фэшн-экспертов страны, она стала амбассадором-экспертом бренда.
                  </p>
                </div>
              </div>
              <div className="md:col-span-5 md:col-start-7 scroll-animation order-1 md:order-2">
                <div className="relative w-full aspect-square max-w-[400px] mx-auto">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <Image
                      src="/images/elkina.jpg"
                      alt="Надежда Елкина"
                      fill
                      className="object-cover artist-image"
                      quality={100}
                      style={{
                        objectPosition: 'center 20%'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Фиксированное изображение между секциями */}
      <div className="relative h-screen">
        <div className="fixed inset-0 z-0">
          <Image
            src="/images/sasoink.jpeg"
            alt="Gallery background"
            fill
            className="object-cover"
            quality={100}
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHSIeHx8dIigjJCUmJSQkIiYnLC4sJic0NCw4PD9AQEBAQEBAQEBAQEBAQED/2wBDAQUXFxwdHB8dHx8gICBBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQED/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      </div>

      {/* Секция галереи */}
      <section id="gallery" className="relative bg-[#F2F0E6] pt-20 pb-32 w-full z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-light mb-4">Галерея работ</h2>
            <div className="w-16 h-[1px] bg-gray-400"></div>
          </div>
          <div className="space-y-16 md:space-y-32">
            {/* Первая работа - текст справа */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start group">
              <div className="w-full md:flex-1 relative h-[400px] md:h-[800px] transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src="/images/SAS. Новая.pdf-image-003.jpg"
                  alt="Люпины. Сныть. Букет"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
              <div className="w-full md:w-96 md:sticky md:top-32">
                <div className="space-y-6">
                  <h3 className="text-3xl font-light">Люпины. Сныть. Букет</h3>
                  <p className="text-xl text-gray-700">Алексей Фирсов</p>
                  <p className="text-lg text-gray-600">150×200</p>
                  <div className="w-16 h-[1px] bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Работы 2-6 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-start group">
              <div className="w-full md:flex-1 relative h-[400px] md:h-[800px] transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src="/images/SAS. Новая.pdf-image-004.jpg"
                  alt="Цветение Черёмухи"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
              <div className="w-full md:w-96 md:sticky md:top-32">
                <div className="space-y-6">
                  <h3 className="text-3xl font-light">Цветение Черёмухи</h3>
                  <p className="text-xl text-gray-700">Алексей Фирсов</p>
                  <p className="text-lg text-gray-600">150х200</p>
                  <div className="w-16 h-[1px] bg-gray-300"></div>
                  <p className="text-gray-600 leading-relaxed"></p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start group">
              <div className="w-full md:flex-1 relative h-[400px] md:h-[800px] transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src="/images/SAS. Новая.pdf-image-005.jpg"
                  alt="Осенний букет на окне"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
              <div className="w-full md:w-96 md:sticky md:top-32">
                <div className="space-y-6">
                  <h3 className="text-3xl font-light">Осенний букет на окне</h3>
                  <p className="text-xl text-gray-700">Алексей Фирсов</p>
                  <p className="text-lg text-gray-600">120х100</p>
                  <div className="w-16 h-[1px] bg-gray-300"></div>
                  <p className="text-gray-600 leading-relaxed"></p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-start group">
              <div className="w-full md:flex-1 relative h-[400px] md:h-[800px] transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src="/images/SAS. Новая.pdf-image-006.jpg"
                  alt="Разнотравье. Букет"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
              <div className="w-full md:w-96 md:sticky md:top-32">
                <div className="space-y-6">
                  <h3 className="text-3xl font-light">Разнотравье. Букет</h3>
                  <p className="text-xl text-gray-700">Алексей Фирсов</p>
                  <p className="text-lg text-gray-600">150x120</p>
                  <div className="w-16 h-[1px] bg-gray-300"></div>
                  <p className="text-gray-600 leading-relaxed"></p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start group">
              <div className="w-full md:flex-1 relative h-[400px] md:h-[800px] transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src="/images/SAS. Новая.pdf-image-007.jpg"
                  alt="Камыш"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
              <div className="w-full md:w-96 md:sticky md:top-32">
                <div className="space-y-6">
                  <h3 className="text-3xl font-light">Камыш</h3>
                  <p className="text-xl text-gray-700">Алексей Фирсов</p>
                  <p className="text-lg text-gray-600">200х150</p>
                  <div className="w-16 h-[1px] bg-gray-300"></div>
                  <p className="text-gray-600 leading-relaxed"></p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16 items-start group">
              <div className="w-full md:flex-1 relative h-[400px] md:h-[800px] transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src="/images/SAS. Новая.pdf-image-008.jpg"
                  alt="Абстракция"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
              <div className="w-full md:w-96 md:sticky md:top-32">
                <div className="space-y-6">
                  <h3 className="text-3xl font-light">Абстракция</h3>
                  <p className="text-xl text-gray-700">Алексей Фирсов</p>
                  <p className="text-lg text-gray-600">150х200</p>
                  <div className="w-16 h-[1px] bg-gray-300"></div>
                  <p className="text-gray-600 leading-relaxed"></p>
                </div>
              </div>
            </div>

            {/* Кнопка "Посмотреть все работы" */}
            <div className="flex justify-center pt-16">
              <a 
                href="/gallery" 
                className="inline-block px-8 py-4 text-lg text-gray-800 border-2 border-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
              >
                Посмотреть все работы
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Фиксированное изображение */}
      <div className="relative h-screen">
        <div className="fixed inset-0 z-0">
          <Image
            src="/images/sasgrey.jpeg"
            alt="Gallery background"
            fill
            className="object-cover"
            quality={100}
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHSIeHx8dIigjJCUmJSQkIiYnLC4sJic0NCw4PD9AQEBAQEBAQEBAQEBAQED/2wBDAQUXFxwdHB8dHx8gICBBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQED/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      </div>

      {/* Секция с контактами и картой */}
      <section id="contacts" className="relative bg-[#F2F0E6] pt-20 w-full z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Левая колонка с информацией */}
            <div className="space-y-8">
              <div className="text-left">
                <h1 className={`text-5xl font-normal mb-4 text-left invitation-title ${playfair.fontFamily} ${playfair.fontWeight}`}>
                  <span className="block md:inline">Приглашаем вас в галерею</span>{' '}
                  <span className="block md:inline">на Кропоткинской</span>
                </h1>
                <div className="w-24 h-0.5 bg-gray-400 my-4"></div>
                <p className="text-lg text-gray-800 mb-8 mt-8">
                  Мы рады приветствовать вас в нашей галерее современного искусства. Здесь вы найдете уникальные работы талантливых художников и сможете погрузиться в мир искусства.
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                В уютной галерее в центре Москвы вы можете посмотреть на работы,&#39; 
                пообщаться с художниками и приобрести понравившиеся произведения искусства.
                Мы находимся по адресу: Курсовой переулок, дом 8/2.
              </p>
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-1">Адрес мастерской:</div>
                  <div className="text-gray-600">Курсовой пер., 8/2, Москва</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Телефон для связи:</div>
                  <div className={`text-base text-gray-800 ${inter.className}`}>
                    +7 985 788 88 25
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Почта:</div>
                  <div className="text-gray-600">sasartgallery@gmail.com</div>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-light mb-4">Записаться на просмотр</h3>
                <p className="text-gray-600 mb-6">
                  Позвоните мне или напишите в удобный мессенджер, чтобы договориться
                  об удобном времени для визита в мастерскую.
                </p>
              </div>
            </div>
            
            {/* Правая колонка с картой */}
            <div className="h-full">
              <YandexMap />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 mt-16 pt-8 pb-8 text-center">
            <h2 className="text-2xl font-light mb-6">SAS Art Fashion Gallery</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Мы стремимся создавать пространство, где искусство и мода 
              сливаются воедино, рассказывая уникальные истории через 
              визуальные образы наших талантливых художников.
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Facebook</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">VKontakte</a>
            </div>
            <div className="text-sm text-gray-500">
              2024 SAS Art Fashion Gallery. Все права защищены.
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}