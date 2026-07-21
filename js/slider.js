/* =========================================================
   Samyam Khanal - Portfolio
   Image Slider (vanilla JS, no dependencies)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const track = slider.querySelector('.slider-track');
  const slides = Array.from(track.children);
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dotsWrap = slider.querySelector('.slider-dots');

  const AUTOPLAY_DELAY = 5000; // ms; set to 0 to disable autoplay
  let current = 0;
  let autoplayTimer = null;

  // Build one dot per slide
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function update() {
    track.style.transform = 'translateX(-' + current * 100 + '%)';
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    update();
    restartAutoplay();
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function prevSlide() {
    goToSlide(current - 1);
  }

  function startAutoplay() {
    if (AUTOPLAY_DELAY > 0) {
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Controls
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Pause on hover / focus so it doesn't jump while browsing
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);

  // Keyboard support
  slider.setAttribute('tabindex', '0');
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // Touch swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 40) {
      delta < 0 ? nextSlide() : prevSlide();
    }
  }, { passive: true });

  update();
  startAutoplay();
});
