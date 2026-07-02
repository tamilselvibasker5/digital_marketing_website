/* =====================================================
   SCS Digital Marketing – testimonials.js
   Carousel logic for centered overlapping slider layout
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.t-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!cards.length || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  
  function updateCarousel() {
    cards.forEach((card, index) => {
      // Remove slide classes
      card.classList.remove('active', 'prev', 'next');
      
      // Determine position relative to currentIndex
      if (index === currentIndex) {
        card.classList.add('active');
      } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
        card.classList.add('prev');
      } else if (index === (currentIndex + 1) % cards.length) {
        card.classList.add('next');
      }
    });
  }
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });
  
  // Auto-slide every 5 seconds (optional, but enhances user experience)
  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }, 5000);
  
  // Pause auto-sliding when user interacts
  const stopAutoSlide = () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  };
  
  prevBtn.addEventListener('click', stopAutoSlide);
  nextBtn.addEventListener('click', stopAutoSlide);
  cards.forEach(card => card.addEventListener('click', stopAutoSlide));

  // Initialize
  updateCarousel();
});
