(function() {
  'use strict';

  function initHomeSpecific() {
    const courseWishlistBtns = document.querySelectorAll('[data-course-wishlist]');
    const courseCartBtns = document.querySelectorAll('[data-course-cart]');
    
    courseWishlistBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = btn.classList.toggle('active');
        btn.setAttribute('aria-pressed', isActive);
      });
    });
    
    courseCartBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomeSpecific);
  } else {
    initHomeSpecific();
  }
})();