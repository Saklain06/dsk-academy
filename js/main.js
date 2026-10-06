(function() {
  'use strict';

  const state = {
    mobileMenuOpen: false,
    searchOpen: false,
    cartCount: 0,
    wishlistCount: 0,
    currentUser: null,
    courses: [],
    filters: {
      category: 'all',
      level: 'all',
      price: 'all',
      sort: 'popular'
    }
  };

  const selectors = {
    mobileMenuBtn: '[data-mobile-menu-btn]',
    mobileMenu: '[data-mobile-menu]',
    mobileMenuClose: '[data-mobile-menu-close]',
    searchBtn: '[data-search-btn]',
    searchModal: '[data-search-modal]',
    searchClose: '[data-search-close]',
    searchInput: '[data-search-input]',
    cartBtn: '[data-cart-btn]',
    cartCount: '[data-cart-count]',
    wishlistBtn: '[data-wishlist-btn]',
    wishlistCount: '[data-wishlist-count]',
    userMenuBtn: '[data-user-menu-btn]',
    userMenu: '[data-user-menu]',
    dropdown: '[data-dropdown]',
    dropdownToggle: '[data-dropdown-toggle]',
    dropdownMenu: '[data-dropdown-menu]',
    tabBtn: '[data-tab-btn]',
    tabPanel: '[data-tab-panel]',
    accordionHeader: '[data-accordion-header]',
    accordionItem: '[data-accordion-item]',
    filterBtn: '[data-filter-btn]',
    courseCard: '[data-course-card]',
    courseWishlist: '[data-course-wishlist]',
    courseCart: '[data-course-cart]',
    modalOverlay: '[data-modal-overlay]',
    modalClose: '[data-modal-close]',
    toastContainer: '[data-toast-container]',
    backToTop: '[data-back-to-top]',
    header: '[data-header]',
    scrollReveal: '[data-scroll-reveal]'
  };

  function $(selector, context = document) {
    return context.querySelector(selector);
  }

  function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  }

  function createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function throttle(fn, limit) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  function showToast(message, type = 'success', duration = 4000) {
    const container = $(selectors.toastContainer) || createToastContainer();
    const toast = createElement(`
      <div class="toast ${type}" role="alert" aria-live="polite">
        <span>${message}</span>
      </div>
    `);
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  function createToastContainer() {
    const container = createElement('<div data-toast-container style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 1000; display: flex; flex-direction: column; gap: 0.5rem;"></div>');
    document.body.appendChild(container);
    return container;
  }

  function openModal(modalId) {
    const modal = $(`#${modalId}`);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
    }
  }

  function closeModal(modalId) {
    const modal = $(`#${modalId}`);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function closeAllModals() {
    $$(selectors.modalOverlay).forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    const menu = $(selectors.mobileMenu);
    const btn = $(selectors.mobileMenuBtn);
    if (menu && btn) {
      menu.classList.toggle('active', state.mobileMenuOpen);
      btn.setAttribute('aria-expanded', state.mobileMenuOpen);
      btn.innerHTML = state.mobileMenuOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      document.body.style.overflow = state.mobileMenuOpen ? 'hidden' : '';
    }
  }

  function toggleSearch() {
    state.searchOpen = !state.searchOpen;
    const modal = $(selectors.searchModal);
    const btn = $(selectors.searchBtn);
    if (modal && btn) {
      modal.classList.toggle('active', state.searchOpen);
      btn.setAttribute('aria-expanded', state.searchOpen);
      if (state.searchOpen) {
        const input = $(selectors.searchInput);
        if (input) setTimeout(() => input.focus(), 100);
      }
    }
  }

  function handleDropdown(e) {
    const dropdown = e.target.closest(selectors.dropdown);
    if (!dropdown) return;

    const toggle = dropdown.querySelector(selectors.dropdownToggle);
    if (e.target === toggle || toggle.contains(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      const isActive = dropdown.classList.contains('active');
      closeAllDropdowns();
      dropdown.classList.toggle('active', !isActive);
    }
  }

  function closeAllDropdowns() {
    $$(selectors.dropdown).forEach(d => d.classList.remove('active'));
  }

  function handleTabs() {
    $$(selectors.tabBtn).forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tabBtn;
        const tabsContainer = btn.closest('[data-tabs]');
        if (!tabsContainer) return;

        tabsContainer.querySelectorAll(selectors.tabBtn).forEach(b => b.classList.remove('active'));
        tabsContainer.querySelectorAll(selectors.tabPanel).forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const panel = tabsContainer.querySelector(`[data-tab-panel="${tabId}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  function handleAccordions() {
    $$(selectors.accordionHeader).forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest(selectors.accordionItem);
        if (!item) return;
        const isActive = item.classList.contains('active');
        const accordion = item.closest('[data-accordion]');
        if (accordion && accordion.dataset.accordion === 'single') {
          accordion.querySelectorAll(selectors.accordionItem).forEach(i => i.classList.remove('active'));
        }
        item.classList.toggle('active', !isActive);
      });
    });
  }

  function handleCourseActions() {
    $$(selectors.courseWishlist).forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const courseId = btn.dataset.courseWishlist;
        const isActive = btn.classList.toggle('active');
        btn.setAttribute('aria-pressed', isActive);
        state.wishlistCount += isActive ? 1 : -1;
        updateWishlistCount();
        showToast(isActive ? 'Added to wishlist' : 'Removed from wishlist', 'success');
      });
    });

    $$(selectors.courseCart).forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const courseId = btn.dataset.courseCart;
        state.cartCount++;
        updateCartCount();
        showToast('Course added to cart', 'success');
      });
    });
  }

  function updateCartCount() {
    $$(selectors.cartCount).forEach(el => el.textContent = state.cartCount);
  }

  function updateWishlistCount() {
    $$(selectors.wishlistCount).forEach(el => el.textContent = state.wishlistCount);
  }

  function handleModals() {
    $$('[data-modal-trigger]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.dataset.modalTrigger;
        openModal(modalId);
      });
    });

    $$(selectors.modalClose).forEach(btn => {
      btn.addEventListener('click', () => closeAllModals());
    });

    $$(selectors.modalOverlay).forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeAllModals();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });
  }

  function handleScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    $$(selectors.scrollReveal).forEach(el => observer.observe(el));
  }

  function handleHeaderScroll() {
    const header = $(selectors.header);
    if (!header) return;

    const onScroll = throttle(() => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      const backToTop = $(selectors.backToTop);
      if (backToTop) {
        backToTop.classList.toggle('visible', window.scrollY > 300);
      }
    }, 50);

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function handleBackToTop() {
    const btn = $(selectors.backToTop);
    if (btn) {
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function handleSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = $(href);
      if (target) {
        e.preventDefault();
        const header = $(selectors.header);
        const offset = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        if (state.mobileMenuOpen) toggleMobileMenu();
      }
    });
  }

  function handleCourseFilters() {
    const filterBtns = $$(selectors.filterBtn);
    const courseCards = $$(selectors.courseCard);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterType = btn.dataset.filterBtn;
        const filterValue = btn.dataset.filterValue;

        filterBtns.filter(b => b.dataset.filterBtn === filterType)
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        state.filters[filterType] = filterValue;
        filterCourses(courseCards);
      });
    });
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
        card.classList.add('revealed');
      } else {
        card.style.display = 'none';
        card.classList.remove('revealed');
      }
    });
  }

  function handleForms() {
    $$('form[data-validate]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(form)) {
          const submitBtn = form.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          submitBtn.disabled = true;
          submitBtn.textContent = 'Processing...';

          setTimeout(() => {
            showToast('Form submitted successfully!', 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            const modal = form.closest(selectors.modalOverlay);
            if (modal) closeAllModals();
          }, 1000);
        }
      });

      form.querySelectorAll('.input').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
      });
    });
  }

  function validateForm(form) {
    let isValid = true;
    form.querySelectorAll('.input[required]').forEach(input => {
      if (!validateField(input)) isValid = false;
    });
    return isValid;
  }

  function validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    let error = '';

    if (input.required && !value) {
      error = 'This field is required';
    } else if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email address';
    } else if (type === 'password' && value && value.length < 8) {
      error = 'Password must be at least 8 characters';
    } else if (input.dataset.match && value !== $(input.dataset.match)?.value) {
      error = 'Passwords do not match';
    }

    const formGroup = input.closest('.form-group');
    if (formGroup) {
      const errorEl = formGroup.querySelector('.form-error');
      if (error) {
        input.classList.add('input-error');
        if (errorEl) errorEl.textContent = error;
        else {
          const newError = document.createElement('span');
          newError.className = 'form-error';
          newError.textContent = error;
          formGroup.appendChild(newError);
        }
      } else {
        input.classList.remove('input-error');
        if (errorEl) errorEl.remove();
      }
    }
    return !error;
  }

  function clearFieldError(input) {
    input.classList.remove('input-error');
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      const errorEl = formGroup.querySelector('.form-error');
      if (errorEl) errorEl.remove();
    }
  }

  function handleCounterAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.count, 10);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current).toLocaleString();
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString();
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    $$('[data-count]').forEach(el => observer.observe(el));
  }

  function handleParallax() {
    const parallaxElements = $$('[data-parallax]');
    if (parallaxElements.length === 0) return;

    const onScroll = throttle(() => {
      const scrolled = window.pageYOffset;
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, 16);

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function init() {
    handleTabs();
    handleAccordions();
    handleCourseActions();
    handleModals();
    handleScrollReveal();
    handleHeaderScroll();
    handleBackToTop();
    handleSmoothScroll();
    handleCourseFilters();
    handleForms();
    handleCounterAnimation();
    handleParallax();

    $(selectors.mobileMenuBtn)?.addEventListener('click', toggleMobileMenu);
    $(selectors.mobileMenuClose)?.addEventListener('click', toggleMobileMenu);
    $(selectors.searchBtn)?.addEventListener('click', toggleSearch);
    $(selectors.searchClose)?.addEventListener('click', toggleSearch);
    $(selectors.searchModal)?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) toggleSearch();
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest(selectors.dropdown)) closeAllDropdowns();
      if (!e.target.closest(selectors.userMenu) && !e.target.closest(selectors.userMenuBtn)) {
        $(selectors.userMenu)?.classList.remove('active');
      }
    });

    $(selectors.userMenuBtn)?.addEventListener('click', (e) => {
      e.stopPropagation();
      $(selectors.userMenu)?.classList.toggle('active');
    });

    $$(selectors.courseCard).forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('button, a, [data-course-wishlist], [data-course-cart]')) {
          const link = card.querySelector('a[data-course-link]');
          if (link) window.location.href = link.href;
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.mobileMenuOpen) toggleMobileMenu();
        if (state.searchOpen) toggleSearch();
        closeAllDropdowns();
        closeAllModals();
      }
    });

    document.body.classList.add('js-enabled');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.Elearn = {
    state,
    showToast,
    openModal,
    closeModal,
    closeAllModals
  };
})();