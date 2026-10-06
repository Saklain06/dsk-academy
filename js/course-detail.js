(function() {
  'use strict';

  function initCourseDetail() {
    const enrollBtn = document.querySelector('[data-course-enroll]');
    const wishlistBtn = document.querySelector('[data-course-wishlist-sidebar]');
    
    if (enrollBtn) {
      enrollBtn.addEventListener('click', () => {
        alert('Thank you for your interest! Please sign up or log in to enroll.');
      });
    }
    
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        const isActive = wishlistBtn.classList.toggle('active');
        wishlistBtn.textContent = isActive ? 'Remove from Wishlist' : 'Add to Wishlist';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCourseDetail);
  } else {
    initCourseDetail();
  }
})();