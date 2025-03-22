'use client';

export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  // Функция для проверки видимости элемента
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Элемент считается видимым, когда его верхняя граница находится ниже верха окна
    // и нижняя граница выше низа окна
    return (
      rect.top <= windowHeight * 0.85 && // Триггерим анимацию когда элемент на 85% высоты окна
      rect.bottom >= windowHeight * 0.15  // И убираем когда элемент ушел выше 15% высоты окна
    );
  }

  // Функция для анимации элементов
  function animateElements() {
    const elements = document.querySelectorAll('.scroll-animation');
    elements.forEach(el => {
      if (isElementInViewport(el)) {
        el.classList.add('animate');
      } else {
        el.classList.remove('animate');
      }
    });
  }

  // Запускаем первую проверку
  setTimeout(animateElements, 100);

  // Добавляем плавный обработчик скролла
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        animateElements();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
