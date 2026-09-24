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

  var descriptionTrigger = null;
  document.addEventListener('click', function(event) {
    var trigger = event.target.closest('[data-vx-desc]');
    if (!trigger) return;

    var modal = document.getElementById('vx-detail-modal');
    var productsData = document.querySelector('script[data-vx-products="product-grid"]');
    if (!modal || !productsData) return;

    var products;
    try { products = JSON.parse(productsData.textContent); }
    catch (error) { return; }

    var handle = trigger.getAttribute('data-vx-desc');
    var product = products.find(function(item) { return item.handle === handle; });
    if (!product) return;

    event.preventDefault();
    event.stopPropagation();

    var title = modal.querySelector('#vx-pdm-title');
    var body = modal.querySelector('#vx-pdm-body');
    var price = modal.querySelector('#vx-pdm-price');
    title.textContent = product.title;
    body.replaceChildren();
    if (product.description && product.description.trim()) {
      body.textContent = product.description;
    } else {
      var detailsLink = document.createElement('a');
      detailsLink.href = product.url;
      detailsLink.className = 'vx-detail-modal__fallback';
      detailsLink.textContent = 'View product details';
      body.appendChild(detailsLink);
    }
    price.hidden = true;
    modal.classList.add('open');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'vx-pdm-title');
    descriptionTrigger = trigger;
    modal.querySelector('.vx-detail-modal__close').focus();
  }, true);

  function closeDescription() {
    var modal = document.getElementById('vx-detail-modal');
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    if (descriptionTrigger) descriptionTrigger.focus();
    descriptionTrigger = null;
  }

  document.addEventListener('click', function(event) {
    if (event.target.closest('.vx-detail-modal__close') || event.target.classList.contains('vx-detail-modal__bg')) {
      closeDescription();
    }
  });
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeDescription();
  });
})();
