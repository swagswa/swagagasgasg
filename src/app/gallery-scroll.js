// Отслеживаем скролл страницы
window.addEventListener('scroll', () => {
  const scrollElements = document.querySelectorAll('[data-scroll]');
  const scrollY = window.scrollY;
  
  scrollElements.forEach(el => {
    el.style.transform = `translateY(${scrollY * 0.5}px)`;
  });
});
