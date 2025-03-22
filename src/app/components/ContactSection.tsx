'use client';

import { Inter } from 'next/font/google';
import YandexMap from './YandexMap';

const inter = Inter({ subsets: ['latin'] });

export default function ContactSection() {
  return (
    <section id="contacts" className="relative bg-[#F2F0E6] py-32 pb-0 w-full z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Левая колонка с информацией */}
          <div className="space-y-8">
            <div className="text-left">
              <h1 className={`text-5xl font-normal mb-6 text-left ${inter.className}`}>
                Приглашаем вас в галерею<br />на Кропоткинской
              </h1>
              <p className="text-lg text-gray-800 mb-8">
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

        {/* Футер */}
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
              © 2024 SAS Art Fashion Gallery. Все права защищены.
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
