/**
 * Vexel Theme JS
 */
(function() {
  'use strict';

  function revealWhenReady() {
    var loader = document.getElementById('vx-loader');
    if (!loader) {
      initScrollReveal();
      return;
    }

    var start = Date.now();
    var hidden = false;
    var observer;
    function reveal() {
      if (hidden) return;
      hidden = true;
      if (observer) observer.disconnect();
      setTimeout(function() {
        document.body.classList.remove('is-loading');
        loader.classList.add('is-hidden');
        initScrollReveal();
        setTimeout(function() { loader.remove(); }, 600);
      }, Math.max(0, 1000 - (Date.now() - start)));
    }

    var shells = document.querySelectorAll('[data-vx-section]');
    if (!shells.length) {
      reveal();
      return;
    }
    function check() {
      for (var i = 0; i < shells.length; i++) {
        if (shells[i].classList.contains('vx-shell--loading')) return;
      }
      reveal();
    }
    observer = new MutationObserver(check);
    shells.forEach(function(shell) {
      observer.observe(shell, { childList: true, attributes: true, attributeFilter: ['class'] });
    });
    check();
    setTimeout(reveal, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealWhenReady);
  } else {
    revealWhenReady();
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
