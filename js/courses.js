(function() {
  'use strict';

  const state = {
    filters: {
      category: 'all',
      level: 'all',
      price: 'all'
    },
    sort: 'popular'
  };

  function initCoursesPage() {
    const filterInputs = document.querySelectorAll('[data-filter]');
    const clearBtn = document.querySelector('[data-filter-clear]');
    const sortSelect = document.querySelector('[data-sort]');
    const courseCards = document.querySelectorAll('[data-course-card]');
    
    filterInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const filterType = e.target.name;
        const filterValue = e.target.value;
        state.filters[filterType] = filterValue;
        filterCourses(courseCards);
      });
    });
    
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        document.querySelectorAll('input[name="category"][value="all"]').forEach(i => i.checked = true);
        document.querySelectorAll('input[name="level"][value="all"]').forEach(i => i.checked = true);
        document.querySelectorAll('input[name="price"][value="all"]').forEach(i => i.checked = true);
        state.filters = { category: 'all', level: 'all', price: 'all' };
        filterCourses(courseCards);
      });
    }
    
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        sortCourses(courseCards);
      });
    }
  }

  function filterCourses(cards) {
    cards.forEach(card => {
      const category = card.dataset.courseCategory;
      const level = card.dataset.courseLevel;
      const price = card.dataset.coursePrice;

      const categoryMatch = state.filters.category === 'all' || category === state.filters.category;
      const levelMatch = state.filters.level === 'all' || level === state.filters.level;
      const priceMatch = state.filters.price === 'all' ||
        (state.filters.price === 'free' && price === '0') ||
        (state.filters.price === 'paid' && price !== '0');

      if (categoryMatch && levelMatch && priceMatch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function sortCourses(cards) {
    const container = document.querySelector('.courses-grid');
    if (!container) return;
    
    const cardsArray = Array.from(cards);
    
    cardsArray.sort((a, b) => {
      switch (state.sort) {
        case 'price-low': {
          const priceA = parseFloat(a.dataset.coursePrice);
          const priceB = parseFloat(b.dataset.coursePrice);
          return priceA - priceB;
        }
        case 'price-high': {
          const priceA = parseFloat(a.dataset.coursePrice);
          const priceB = parseFloat(b.dataset.coursePrice);
          return priceB - priceA;
        }
        default:
          return 0;
      }
    });
    
    cardsArray.forEach(card => container.appendChild(card));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoursesPage);
  } else {
    initCoursesPage();
  }
})();