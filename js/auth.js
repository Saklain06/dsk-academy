(function() {
  'use strict';

  function initAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const register = urlParams.get('register');
    
    if (register === 'true') {
      const registerTab = document.querySelector('[data-tab-btn="register"]');
      const loginTab = document.querySelector('[data-tab-btn="login"]');
      const registerPanel = document.querySelector('[data-tab-panel="register"]');
      const loginPanel = document.querySelector('[data-tab-panel="login"]');
      
      if (registerTab && loginTab && registerPanel && loginPanel) {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerPanel.classList.add('active');
        loginPanel.classList.remove('active');
      }
    }
    
    const switchLinks = document.querySelectorAll('[data-switch-tab]');
    switchLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = link.dataset.switchTab;
        const targetBtn = document.querySelector(`[data-tab-btn="${targetTab}"]`);
        if (targetBtn) {
          targetBtn.click();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }
})();