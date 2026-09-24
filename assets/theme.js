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

  function updateCartIcon() {
    var icon = document.querySelector('.vx-header__cart svg');
    if (!icon || icon.dataset.vxCartIcon === 'reference') return;
    icon.innerHTML = '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>';
    icon.dataset.vxCartIcon = 'reference';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCartIcon);
  } else {
    updateCartIcon();
  }
  document.addEventListener('shopify:section:load', updateCartIcon);

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

  var reviewTrigger = null;
  function enhanceReviewModal() {
    var modal = document.getElementById('vx-review-modal');
    if (!modal || modal.dataset.vxEnhanced === 'true') return modal;

    var stars = '';
    for (var rating = 1; rating <= 5; rating++) {
      stars += '<button type="button" class="vx-review-modal__star" data-vx-review-star="' + rating + '" aria-label="' + rating + ' star" aria-pressed="false"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg></button>';
    }

    modal.innerHTML = '<div class="vx-review-modal__card">' +
      '<button class="vx-review-modal__close" type="button" data-vx-close-review aria-label="Close">&times;</button>' +
      '<h3 class="vx-review-modal__title" id="vx-review-modal-title">Write a Review</h3>' +
      '<div class="vx-review-modal__stars" role="group" aria-label="Rating">' + stars + '</div>' +
      '<input class="vx-review-modal__input" type="text" placeholder="Your name" aria-label="Your name" maxlength="100" autocomplete="name">' +
      '<textarea class="vx-review-modal__textarea" placeholder="Share your experience (optional)" aria-label="Share your experience" maxlength="5000"></textarea>' +
      '<div class="vx-review-modal__media" aria-disabled="true" title="Media uploads require a review service"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="m21 15-5-5L5 21"></path></svg>Add Photos or Video</div>' +
      '<p class="vx-review-modal__status" role="status" hidden></p>' +
      '<button class="vx-review-modal__submit" type="button" data-vx-submit-review>Submit Review</button>' +
      '</div>';
    modal.dataset.vxEnhanced = 'true';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'vx-review-modal-title');
    return modal;
  }

  document.addEventListener('click', function(event) {
    var open = event.target.closest('[data-vx-open-review]');
    if (open) {
      reviewTrigger = open;
      var openingModal = enhanceReviewModal();
      if (openingModal) {
        openingModal.querySelector('.vx-review-modal__status').hidden = true;
      }
      return;
    }

    if (event.target.closest('[data-vx-close-review]')) {
      queueMicrotask(function() {
        if (reviewTrigger) reviewTrigger.focus();
        reviewTrigger = null;
      });
      return;
    }

    var star = event.target.closest('[data-vx-review-star]');
    if (star) {
      var selected = Number(star.getAttribute('data-vx-review-star'));
      star.parentElement.querySelectorAll('[data-vx-review-star]').forEach(function(item) {
        var active = Number(item.getAttribute('data-vx-review-star')) <= selected;
        item.classList.toggle('is-selected', active);
        item.setAttribute('aria-pressed', String(active));
        item.querySelector('svg').setAttribute('fill', active ? 'currentColor' : 'none');
      });
      return;
    }

    var submit = event.target.closest('[data-vx-submit-review]');
    if (submit) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var status = submit.parentElement.querySelector('.vx-review-modal__status');
      status.textContent = 'Review submission is not available yet. Please contact the store directly.';
      status.hidden = false;
      return;
    }
  }, true);

  document.addEventListener('keydown', function(event) {
    if (event.key !== 'Escape') return;
    var modal = document.getElementById('vx-review-modal');
    if (!modal || modal.style.display !== 'flex') return;
    modal.style.display = 'none';
    if (reviewTrigger) reviewTrigger.focus();
    reviewTrigger = null;
  });
})();
