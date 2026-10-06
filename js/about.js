(function() {
  'use strict';

  function initAbout() {
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAbout);
  } else {
    initAbout();
  }
})();