document.addEventListener('DOMContentLoaded', function () {
  const sliderContainer = document.querySelector('.native-slider');
  if (!sliderContainer) return;

  const track = sliderContainer.querySelector('.slider-track');
  const slides = sliderContainer.querySelectorAll('.slider-slide');
  const dots = sliderContainer.querySelectorAll('.slider-dots .dot');
  let currentIndex = 0;
  let interval;

  // Obtém os dados do HTML
  const autoSlideEnabled = sliderContainer.dataset.autoSlide === 'true';
  const slideSpeed = (parseInt(sliderContainer.dataset.slideSpeed) || 5) * 1000;

  function updateSlider(index) {
    const offset = index * -100;
    track.style.transform = 'translateX(' + offset + '%)';
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-slide'));
      updateSlider(index);
      resetInterval();
    });
  });

  // Swipe
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;

    if (delta > 50 && currentIndex > 0) {
      updateSlider(currentIndex - 1);
      resetInterval();
    } else if (delta < -50 && currentIndex < slides.length - 1) {
      updateSlider(currentIndex + 1);
      resetInterval();
    }

    isDragging = false;
  });

  function autoSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateSlider(nextIndex);
  }

  function resetInterval() {
    if (!autoSlideEnabled) return;
    clearInterval(interval);
    interval = setInterval(autoSlide, slideSpeed);
  }

  updateSlider(0);
  if (autoSlideEnabled) {
    interval = setInterval(autoSlide, slideSpeed);
  }
});
