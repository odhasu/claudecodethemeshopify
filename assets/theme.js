/**
 * OGVendors Theme JS
 */
(function() {
  'use strict';

  function dismissLoader() {
    var loader = document.getElementById('vx-loader');
    if (loader) {
      loader.classList.add('vx-ok');
      setTimeout(function() { loader.style.display = 'none'; }, 400);
    }
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', dismissLoader);
  } else {
    dismissLoader();
  }

  function initScrollReveal() {
    var reveals = document.querySelectorAll('.scroll-reveal');
    if (reveals.length === 0) return;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function(el) { observer.observe(el); });
  }
})();
