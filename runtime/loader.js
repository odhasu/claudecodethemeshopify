/**
 * Vexel Scaled Loader v3
 * Client-side section rendering engine.
 * Reads shell sections from DOM and renders their HTML client-side.
 */
(function() {
  'use strict';

  var config = window.VexelConfig || {};
  var colors = config.colors || {};
  var brandName = config.brandName || '';
  var logoUrl = config.logoUrl || null;

  // ─── CSS Variables Helper ──────────────────────────────────────
  function cv(name) { return 'var(--' + name + ')'; }

  // ─── Escape HTML ───────────────────────────────────────────────
  function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ─── Format Money ──────────────────────────────────────────────
  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  // ─── Cart API ──────────────────────────────────────────────────
  window.VexelCart = {
    get: function() { return fetch('/cart.js').then(function(r) { return r.json(); }); },
    add: function(id, qty) {
      return fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: id, quantity: qty || 1 }] })
      }).then(function(r) { return r.json(); }).then(function(data) {
        document.dispatchEvent(new CustomEvent('cart:refresh'));
        return data;
      });
    },
    update: function(updates) {
      return fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates: updates })
      }).then(function(r) { return r.json(); }).then(function(data) {
        document.dispatchEvent(new CustomEvent('cart:refresh'));
        return data;
      });
    }
  };


  // ═══════════════════════════════════════════════════════════════
  // SECTION RENDERERS
  // ═══════════════════════════════════════════════════════════════

  // ─── SVG Icon Helper ───────────────────────────────────────────
  var icons = {
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    starFilled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0a0a"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>'
  };

  function getIcon(name) { return icons[name] || icons.star; }

  // ─── 1. Urgency Bar ────────────────────────────────────────────
  function renderUrgencyBar(s) {
    var accent = s.accent_color || '#19d400';
    var bgColor = s.bg_color || '#000000';
    var textColor = s.text_color || '#ffffff';
    var iconColor = s.icon_color || accent;
    var dotColor = s.dot_color || '#39ff14';
    var dividerColor = s.divider_color || '#333';
    var dividerStyle = s.divider_style || 'asterisk';
    var borderColor = s.border_color || '#1a1a1a';
    var speed = s.scroll_speed != null ? s.scroll_speed : 30;
    var barHeight = s.bar_height != null ? s.bar_height : 36;
    var fontSize = s.font_size != null ? s.font_size : 13;
    var reveal = s.reveal_on_scroll;
    var revealDist = s.reveal_distance != null ? s.reveal_distance : 80;
    var minV = s.min_viewers != null ? s.min_viewers : 10;
    var maxV = s.max_viewers != null ? s.max_viewers : 100;

    var items = '';
    function addItem(html) {
      var divider = dividerStyle === 'asterisk' ? '*' : '';
      items += '<span class="vx-urgency-item">' + html + '</span><span class="vx-urgency-divider">' + divider + '</span>';
    }

    if (s.show_private) {
      addItem('<span class="vx-urgency-icon">' + icons.lock + '</span>' + esc(s.private_text || 'Private suppliers not found anywhere else'));
    }
    if (s.show_personally_verified) {
      addItem('<span class="vx-urgency-icon">' + icons.check + '</span>' + esc(s.personally_verified_text || 'All suppliers personally verified'));
    }
    if (s.show_rating) {
      addItem('<span class="vx-urgency-icon vx-urgency-icon--filled">' + icons.starFilled + '</span>Rated <span class="accent">' + esc(s.rating_value || '4.96/5') + '</span> by <span class="accent">' + esc(s.rating_count || '2,400+') + '</span> resellers');
    }
    if (s.show_countdown) {
      addItem('<span class="vx-urgency-icon">' + icons.clock + '</span>' + esc(s.countdown_prefix || 'Price goes up in') + ' <span class="accent" id="vx-countdown">0m 00s</span>');
    }
    if (s.show_viewers) {
      addItem('<span class="vx-urgency-dot"></span><span class="accent" id="vx-viewers">' + minV + '</span> ' + esc(s.viewers_text || 'people viewing right now'));
    }
    if (s.blocks) {
      s.blocks.forEach(function(b) {
        if (b.type === 'custom_item' && b.settings && b.settings.text) {
          addItem(esc(b.settings.text));
        }
      });
    }

    var track = '<div class="vx-urgency-track">' + items + items + '</div>';

    var css = '<style>' +
      '.vx-urgency-wrap{position:fixed;top:0;left:0;right:0;z-index:1000;transition:transform 0.45s cubic-bezier(0.22,1,0.36,1);}' +
      (reveal ? '.vx-urgency-wrap{transform:translateY(-100%)}.vx-urgency-wrap.is-visible{transform:translateY(0)}' : '') +
      '.vx-urgency-bar{background:' + bgColor + ';color:' + textColor + ';height:' + barHeight + 'px;overflow:hidden;position:relative;border-bottom:1px solid ' + borderColor + '}' +
      '.vx-urgency-bar:hover .vx-urgency-track{animation-play-state:paused}' +
      '.vx-urgency-track{display:flex;align-items:center;height:100%;white-space:nowrap;animation:vxUrgScroll ' + speed + 's linear infinite;width:max-content}' +
      '.vx-urgency-item{display:inline-flex;align-items:center;gap:6px;padding:0 24px;font-size:' + fontSize + 'px;font-weight:500;letter-spacing:0.02em}' +
      '.vx-urgency-item .accent{color:' + accent + ';font-weight:700}' +
      '.vx-urgency-icon{display:inline-flex;align-items:center;flex-shrink:0}.vx-urgency-icon svg{width:14px;height:14px;stroke:' + iconColor + ';fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
      '.vx-urgency-icon--filled svg{fill:' + iconColor + ';stroke:' + iconColor + '}' +
      '.vx-urgency-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:' + dotColor + ';animation:vxPulseDot 1.5s ease-in-out infinite}' +
      '.vx-urgency-divider{display:inline-flex;align-items:center;justify-content:center;color:' + dividerColor + ';font-size:11px;margin:0 8px;flex-shrink:0}' +
      '@keyframes vxUrgScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}' +
      '@keyframes vxPulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.4)}}' +
      '</style>';

    return css + '<div class="vx-urgency-wrap" id="vx-urgency-wrap" data-reveal="' + (reveal ? 'true' : 'false') + '" data-reveal-distance="' + revealDist + '">' +
      '<div class="vx-urgency-bar" role="marquee">' + track + '</div></div>';
  }

  function attachUrgencyBar(s, root, life) {
    var minV = s.min_viewers != null ? s.min_viewers : 10;
    var maxV = s.max_viewers != null ? s.max_viewers : 100;
    var wrap = root.querySelector('#vx-urgency-wrap');

    // Reveal on scroll
    if (wrap && wrap.dataset.reveal === 'true') {
      var dist = parseInt(wrap.dataset.revealDistance, 10) || 80;
      var barHeight = wrap.offsetHeight;
      var shown = null;
      function checkScroll() {
        var y = window.scrollY || document.documentElement.scrollTop;
        var nextShown = y >= (shown ? Math.max(0, dist - 16) : dist);
        if (nextShown === shown) return;
        shown = nextShown;
        wrap.classList.toggle('is-visible', shown);
        document.documentElement.style.setProperty('--urgency-bar-height', shown ? barHeight + 'px' : '0px');
      }
      life.listen(window, 'scroll', checkScroll, { passive: true });
      checkScroll();
    } else if (wrap) {
      document.documentElement.style.setProperty('--urgency-bar-height', wrap.offsetHeight + 'px');
    }

    // Countdown
    function updateCountdown() {
      var now = new Date();
      var next = new Date(now); next.setMinutes(60, 0, 0);
      var diff = next - now;
      var m = Math.floor(diff / 60000);
      var sec = Math.floor((diff % 60000) / 1000);
      var str = m + 'm ' + String(sec).padStart(2, '0') + 's';
      var el = root.querySelector('#vx-countdown');
      if (el) el.textContent = str;
    }
    if (root.querySelector('#vx-countdown')) {
      updateCountdown();
      life.interval(updateCountdown, 1000);
    }

    // Viewer count drift
    var viewers = Math.floor(Math.random() * (maxV - minV + 1)) + minV;
    var viewerEl = root.querySelector('#vx-viewers');
    if (viewerEl) {
      viewerEl.textContent = viewers;
      function driftViewers() {
        var change = Math.floor(Math.random() * 4) - 1;
        if (Math.random() < 0.3) change = -Math.abs(change);
        viewers = Math.max(minV, Math.min(maxV, viewers + change));
        if (viewerEl) viewerEl.textContent = viewers;
        life.timeout(driftViewers, (60 + Math.floor(Math.random() * 120)) * 1000);
      }
      life.timeout(driftViewers, (60 + Math.floor(Math.random() * 120)) * 1000);
    }
  }

  // ─── 2. Header ─────────────────────────────────────────────────
  function renderHeader(s) {
    var navColor = s.nav_color || '#ffffff';
    var navHover = s.nav_hover_color || '#19d400';
    var brandColor = s.brand_color || '#ffffff';
    var bText = s.brand_text || brandName || 'Vexel';
    var hDesk = s.header_height_desktop != null ? s.header_height_desktop : 65;
    var hMob = s.header_height_mobile != null ? s.header_height_mobile : 48;
    var lwDesk = s.logo_width_desktop != null ? s.logo_width_desktop : 112;
    var lwMob = s.logo_width_mobile != null ? s.logo_width_mobile : 96;
    var badgeBg = s.badge_bg || '#19d400';
    var badgeTextColor = s.badge_text_color || '#000000';
    var dropdownBg = s.dropdown_bg || '#0a0a0a';
    var scrollBg = s.scroll_bg || 'rgba(0,0,0,0.82)';
    var scrollBorder = s.scroll_border || '#1a1a1a';
    var scrollBlur = s.scroll_blur != null ? s.scroll_blur : 12;
    var navGap = s.nav_gap != null ? s.nav_gap : 32;
    var sidePaddingDesktop = s.side_padding_desktop != null ? s.side_padding_desktop : 28;
    var sidePaddingMobile = s.side_padding_mobile != null ? s.side_padding_mobile : 16;
    var headerLogo = s.logo_url || logoUrl;
    var navLinks = s.use_menu && s.nav_links && s.nav_links.length ? s.nav_links : [
      { title: s.home_label || 'Home', url: '/' },
      { title: s.products_label || 'Products', url: s.products_url || '/' }
    ];
    if (!s.use_menu && s.show_products_link === false) navLinks = navLinks.slice(0, 1);

    var navHtml = '';
    var mobileNavHtml = '';
    if (navLinks.length) {
      navLinks.forEach(function(link) {
        navHtml += '<a href="' + esc(link.url) + '">' + esc(link.title) + '</a>';
        mobileNavHtml += '<a href="' + esc(link.url) + '">' + esc(link.title) + '</a>';
      });
    } else {
      navHtml = '<a href="/">Home</a><a href="/">Products</a>';
      mobileNavHtml = '<a href="/">Home</a><a href="/">Products</a>';
    }

    var logoHtml = headerLogo
      ? '<div class="vx-header__logo"><img src="' + esc(headerLogo) + '" alt="' + esc(bText) + '" width="' + lwDesk + '" loading="eager"></div>'
      : '<span class="vx-header__brand">' + esc(bText) + '</span>';

    var css = '<style>' +
      '.vx-header{position:fixed;left:0;right:0;top:0;transform:translate3d(0,var(--urgency-bar-height,0px),0);z-index:999;background:transparent;border-bottom:1px solid transparent;backdrop-filter:blur(0);-webkit-backdrop-filter:blur(0);transition:background 0.4s ease,border-color 0.4s ease,backdrop-filter 0.4s ease,-webkit-backdrop-filter 0.4s ease,transform 0.45s cubic-bezier(0.22,1,0.36,1)}' +
      '.vx-header.scrolled{background:' + scrollBg + ';border-bottom-color:' + scrollBorder + ';backdrop-filter:blur(' + scrollBlur + 'px);-webkit-backdrop-filter:blur(' + scrollBlur + 'px)}' +
      '.vx-header__inner{display:flex;align-items:center;justify-content:space-between;max-width:1310px;margin:0 auto;padding:0 ' + sidePaddingDesktop + 'px;height:' + hDesk + 'px}' +
      '.vx-header__logo-link{display:flex;align-items:center;flex-shrink:0}' +
      '.vx-header__logo img{width:' + lwDesk + 'px;height:auto;display:block}' +
      '.vx-header__brand{font-family:' + cv('font-heading') + ';font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;color:' + brandColor + '}' +
      '.vx-header__right{display:flex;align-items:center;gap:36px}' +
      '.vx-header__nav{display:flex;align-items:center;gap:' + navGap + 'px}' +
      '.vx-header__nav a{font-family:' + cv('font-body') + ';font-size:14px;font-weight:500;letter-spacing:0;text-transform:none;color:' + navColor + ';transition:color 0.2s;text-decoration:none}' +
      '.vx-header__nav a:hover{color:' + navHover + '}' +
      '.vx-header__cart{position:relative;display:flex;align-items:center;justify-content:center;width:38px;height:38px;color:' + navColor + ';transition:color 0.2s;text-decoration:none}' +
      '.vx-header__cart:hover{color:' + navHover + '}.vx-header__cart svg{width:20px;height:20px}' +
      '.vx-cart-badge{position:absolute;top:1px;right:1px;background:' + badgeBg + ';color:' + badgeTextColor + ';font-size:10px;font-weight:800;min-width:16px;height:16px;border-radius:8px;display:none;align-items:center;justify-content:center;padding:0 3px}' +
      '.vx-cart-badge.has-items{display:flex}' +
      '.vx-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;color:' + navColor + ';background:none;border:none}' +
      '.vx-hamburger span{display:block;width:22px;height:2px;background:currentColor;border-radius:2px;transition:transform 0.3s,opacity 0.3s}' +
      '.vx-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}.vx-hamburger.open span:nth-child(2){opacity:0}.vx-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}' +
      '.vx-mobile-nav{display:none;position:absolute;top:100%;left:0;right:0;background:' + dropdownBg + ';border-bottom:1px solid ' + scrollBorder + ';z-index:998;padding:8px 0;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}' +
      '.vx-mobile-nav.open{display:block}' +
      '.vx-mobile-nav a{display:block;padding:14px 32px;font-family:' + cv('font-body') + ';font-size:15px;font-weight:500;color:' + navColor + ';border-bottom:1px solid ' + scrollBorder + ';transition:color 0.2s;text-decoration:none}' +
      '.vx-mobile-nav a:last-child{border-bottom:none}.vx-mobile-nav a:hover{color:' + navHover + '}' +
      '@media(max-width:768px){.vx-header__inner{height:' + hMob + 'px;padding:0 ' + sidePaddingMobile + 'px}.vx-header__logo img{width:' + lwMob + 'px}.vx-header__nav{display:none}.vx-hamburger{display:flex}}' +
      '</style>';

    return css +
      '<header class="vx-header" id="vx-header">' +
      '<div class="vx-header__inner">' +
        '<a href="/" class="vx-header__logo-link" aria-label="Home">' + logoHtml + '</a>' +
        '<div class="vx-header__right">' +
          '<nav class="vx-header__nav" aria-label="Main navigation">' + navHtml + '</nav>' +
          '<a href="/cart" class="vx-header__cart" aria-label="Cart">' + icons.cart + '<span class="vx-cart-badge" id="vx-cart-badge"></span></a>' +
          '<button class="vx-hamburger" id="vx-hamburger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>' +
      '<div class="vx-mobile-nav" id="vx-mobile-nav">' + mobileNavHtml + '</div>' +
      '</header>';
  }

  function attachHeader(s, root, life) {
    var toggle = root.querySelector('#vx-hamburger');
    var menu = root.querySelector('#vx-mobile-nav');
    var header = root.querySelector('#vx-header');

    if (toggle && menu) {
      life.listen(toggle, 'click', function() {
        var open = menu.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open);
      });
      life.listen(document, 'click', function(e) {
        if (!e.target.closest('#vx-header')) {
          menu.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    if (header) {
      var ticking = false;
      function updateHeader() {
        header.classList.toggle('scrolled', window.scrollY > (s.scroll_threshold != null ? s.scroll_threshold : 50));
        ticking = false;
      }
      life.listen(window, 'scroll', function() {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateHeader);
        }
      }, { passive: true });
      updateHeader();
    }

    // Cart count
    fetch('/cart.js').then(function(r) { return r.json(); }).then(function(c) {
      var badge = document.getElementById('vx-cart-badge');
      if (root.isConnected && badge && c.item_count > 0) {
        badge.textContent = c.item_count;
        badge.classList.add('has-items');
      }
    }).catch(function() {});

  }

  // ─── 3. Hero ───────────────────────────────────────────────────
  function renderHero(s) {
    var titleBefore = s.title_before || 'START YOUR';
    var titleHighlight = s.title_highlight || 'RESELLING';
    var titleAfter = s.title_after || 'JOURNEY TODAY';
    var highlightColor = s.highlight_color || '#19d400';
    var titleColor = s.title_color || '#ffffff';
    var titleSizeDesktop = s.title_size_desktop != null ? s.title_size_desktop : 56;
    var titleSizeMobile = s.title_size_mobile != null ? s.title_size_mobile : 36;
    var titleMaxWidth = s.title_max_width != null ? s.title_max_width : 900;
    var trustPrefix = s.trust_prefix || 'Trusted By';
    var trustCount = s.trust_count || '10,000+';
    var trustSuffix = s.trust_suffix || 'Resellers';
    var trustCountColor = s.trust_count_color || '#fbbf24';
    var trustTextColor = s.trust_text_color || '#9ca3af';
    var trustFontSize = s.trust_font_size != null ? s.trust_font_size : 15;
    var trustGap = s.trust_gap != null ? s.trust_gap : 6;
    var showAvatars = s.show_avatars !== false;
    var avatarSize = s.avatar_size != null ? s.avatar_size : 36;
    var showGlow = s.show_glow !== false;
    var glowColor = s.glow_color || '#19d400';
    var paddingTop = s.padding_top != null ? s.padding_top : 64;
    var paddingBottom = s.padding_bottom != null ? s.padding_bottom : 60;
    var heroFont = s.hero_font || 'Satoshi';
    var bgImage = s.bg_image || null;
    var bgGradientStrength = s.bg_gradient_strength != null ? s.bg_gradient_strength : 40;
    var bgImagePosition = s.bg_image_position || 'center center';
    var showBtn1 = s.show_btn_1 === true;
    var showBtn2 = s.show_btn_2 === true;
    var btn1Text = s.btn_1_text || 'BUY NOW';
    var btn1Url = s.btn_1_url || '';
    var btn1Action = s.btn_1_action || 'scroll';
    var btn1Bg = s.btn_1_bg || '#19d400';
    var btn1TextColor = s.btn_1_text_color || '#000000';
    var btn2Text = s.btn_2_text || 'ADD TO CART';
    var btn2Url = s.btn_2_url || '';
    var btn2Action = s.btn_2_action || 'scroll';
    var btn2Bg = s.btn_2_bg || 'transparent';
    var btn2TextColor = s.btn_2_text_color || '#ffffff';
    var btnLayout = s.btn_layout || 'side-by-side';
    var buttonRadius = s.button_radius != null ? s.button_radius : 50;

    var avatarsHtml = '';
    if (showAvatars) {
      avatarsHtml = '<div class="vx-hero__avatars" aria-hidden="true">';
      for (var i = 1; i <= 10; i++) {
        var avatar = s['avatar_' + i];
        avatarsHtml += avatar
          ? '<img class="vx-hero__avatar" src="' + esc(avatar) + '" alt="" loading="lazy">'
          : '<span class="vx-hero__avatar vx-hero__avatar--placeholder"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0z"/></svg></span>';
      }
      avatarsHtml += '</div>';
    }

    // Background image CSS
    var bgCss = '';
    if (bgImage) {
      var gradAlpha = (bgGradientStrength / 100).toFixed(2);
      bgCss = '.vx-hero{background-image:linear-gradient(to bottom,rgba(0,0,0,' + gradAlpha + ') 0%,rgba(0,0,0,' + gradAlpha + ') 100%),url(' + esc(bgImage) + ');background-size:cover;background-position:' + bgImagePosition + ';background-repeat:no-repeat}';
    }

    var glowCss = showGlow && !bgImage ? '.vx-hero::before{content:\'\';position:absolute;top:50%;left:50%;width:600px;height:600px;transform:translate(-50%,-50%);background:radial-gradient(ellipse,' + glowColor + '15 0%,transparent 70%);pointer-events:none;z-index:0}@media(max-width:768px){.vx-hero::before{width:300px;height:300px;background:radial-gradient(ellipse,' + glowColor + '10 0%,transparent 70%)}}' : '';

    // CTA buttons
    var btnFlexDir = btnLayout === 'stacked' ? 'column' : 'row';
    var buttonsHtml = '';
    if (showBtn1 || showBtn2) {
      buttonsHtml = '<div class="vx-hero__buttons">';
      if (showBtn1) {
        var btn1IsFilled = btn1Bg !== 'transparent';
        var btn1DataAttr = btn1Action === 'scroll' ? ' data-vx-hero-scroll' : (btn1Action === 'checkout' ? ' data-vx-hero-checkout' : '');
        var btn1Href = btn1Action === 'link' && btn1Url ? btn1Url : '#';
        buttonsHtml += '<a href="' + esc(btn1Href) + '" class="vx-hero__btn vx-hero__btn--filled"' + btn1DataAttr + ' style="background:' + btn1Bg + ';color:' + btn1TextColor + '">' + esc(btn1Text) + '</a>';
      }
      if (showBtn2) {
        var btn2DataAttr = btn2Action === 'scroll' ? ' data-vx-hero-scroll' : (btn2Action === 'checkout' ? ' data-vx-hero-checkout' : '');
        var btn2Href = btn2Action === 'link' && btn2Url ? btn2Url : '#';
        var btn2Style = btn2Bg === 'transparent' || btn2Bg === '#000000'
          ? 'background:transparent;color:' + btn2TextColor + ';border:2px solid rgba(255,255,255,0.3)'
          : 'background:' + btn2Bg + ';color:' + btn2TextColor;
        buttonsHtml += '<a href="' + esc(btn2Href) + '" class="vx-hero__btn vx-hero__btn--outline"' + btn2DataAttr + ' style="' + btn2Style + '">' + esc(btn2Text) + '</a>';
      }
      buttonsHtml += '</div>';
    }

    var css = '<style>' +
      '.vx-hero{text-align:center;padding:' + paddingTop + 'px 20px ' + paddingBottom + 'px;position:relative;overflow:hidden}' +
      bgCss +
      glowCss +
      '.vx-hero__content{position:relative;z-index:1}' +
      '.vx-hero__title{font-family:\'' + heroFont + '\',' + cv('font-heading') + ';font-size:calc(clamp(' + titleSizeMobile + 'px,8vw,' + titleSizeDesktop + 'px) * var(--section-title-scale,1));font-weight:900;text-transform:uppercase;letter-spacing:-1.4px;line-height:1.05;color:' + titleColor + ';margin:0 auto 34px;max-width:' + titleMaxWidth + 'px}' +
      '.vx-hero__highlight{background:linear-gradient(135deg,' + highlightColor + ',' + highlightColor + 'cc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}' +
      '.vx-hero__trust{display:flex;align-items:baseline;justify-content:center;flex-wrap:wrap;gap:' + trustGap + 'px;margin:0;color:' + trustTextColor + ';font-size:clamp(' + trustFontSize + 'px,2.2vw,' + (trustFontSize * 2) + 'px);line-height:1.3}' +
      '.vx-hero__trust-count{color:' + trustCountColor + ';font-weight:800}' +
      '.vx-hero__avatars{display:flex;justify-content:center;margin-top:8px}' +
      '.vx-hero__avatar{width:' + avatarSize + 'px;height:' + avatarSize + 'px;border-radius:50%;border:2px solid var(--color-bg,#000);margin-left:-' + Math.round(avatarSize * .28) + 'px;object-fit:cover;flex-shrink:0}' +
      '.vx-hero__avatar:first-child{margin-left:0}' +
      '.vx-hero__avatar--placeholder{display:flex;align-items:center;justify-content:center;background:var(--color-card-bg,#111);color:' + trustTextColor + '}' +
      '.vx-hero__avatar--placeholder svg{width:65%;height:65%}' +
      '.vx-hero__buttons{display:flex;flex-direction:' + btnFlexDir + ';align-items:center;justify-content:center;gap:16px;margin-top:32px}' +
      '.vx-hero__btn{display:inline-flex;align-items:center;justify-content:center;padding:16px 40px;font-family:' + cv('font-heading') + ';font-size:16px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;border-radius:' + buttonRadius + 'px;text-decoration:none;transition:transform .2s,box-shadow .2s,opacity .2s;cursor:pointer}' +
      '.vx-hero__btn--filled{box-shadow:0 0 20px rgba(25,212,0,0.3),0 4px 15px rgba(0,0,0,0.3)}' +
      '.vx-hero__btn--filled:hover{transform:translateY(-2px);box-shadow:0 0 30px rgba(25,212,0,0.5),0 6px 20px rgba(0,0,0,0.3)}' +
      '.vx-hero__btn--outline:hover{transform:translateY(-2px);border-color:rgba(255,255,255,0.6)}' +
      '@media(max-width:600px){.vx-hero__buttons{flex-direction:column}.vx-hero__btn{width:100%;max-width:320px;padding:14px 32px;font-size:15px}}' +
      '</style>';

    return css +
      '<section class="vx-hero">' +
      '<div class="vx-hero__content container">' +
        '<h1 class="vx-hero__title">' + esc(titleBefore) + ' <span class="vx-hero__highlight">' + esc(titleHighlight) + '</span> ' + esc(titleAfter) + '</h1>' +
        '<p class="vx-hero__trust"><span>' + esc(trustPrefix) + '</span><span class="vx-hero__trust-count">' + esc(trustCount) + '</span><span>' + esc(trustSuffix) + '</span></p>' +
        avatarsHtml +
        buttonsHtml +
      '</div>' +
      '</section>';
  }

  function attachHero(s, root, life) {
    // Scroll-to-products buttons
    root.querySelectorAll('[data-vx-hero-scroll]').forEach(function(btn) {
      life.listen(btn, 'click', function(e) {
        e.preventDefault();
        var grid = document.querySelector('[data-vx-section="product-grid"]');
        if (grid) grid.scrollIntoView({ behavior: getComputedStyle(document.documentElement).scrollBehavior, block: 'start' });
      });
    });
    // Checkout buttons — add first available product to cart then redirect
    root.querySelectorAll('[data-vx-hero-checkout]').forEach(function(btn) {
      life.listen(btn, 'click', function(e) {
        e.preventDefault();
        var productsEl = document.querySelector('script[data-vx-products="product-grid"]');
        if (productsEl) {
          try {
            var prods = JSON.parse(productsEl.textContent);
            if (prods && prods.length && prods[0].variantId) {
              fetch('/cart/add.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: [{ id: Number(prods[0].variantId), quantity: 1 }] })
              }).then(function() { window.location.href = '/checkout'; });
            }
          } catch(ex) {}
        }
      });
    });
  }

  // ─── 4. Product Grid (glassmorphic, matches original Liquid) ────
  function renderProductGrid(s, products) {
    if (s.layout_style === 'lin') return renderLinProductGrid(s, products || []);
    if (!products || !products.length) return '<p style="text-align:center;color:var(--color-text-muted);padding:40px;">No products found.</p>';

    var accent = colors.accent1 || '#19d400';
    var cardBg = s.card_bg || '#111111';
    var cardBorder = s.card_border || '#2a2a2a';
    var cardHoverBorder = s.card_hover_border || '#19d400';
    var imageBg = s.image_bg || '#0a0a0a';
    var titleColor = s.title_color || '#ffffff';
    var priceColor = s.price_color || accent;
    var compareColor = s.compare_price_color || '#6b7280';
    var btnBg = s.buy_btn_bg || accent;
    var btnText = s.buy_btn_text_color || '#1a1a1a';
    var btnLabel = s.buy_btn_label || 'BUY NOW';
    var btnRadius = s.buy_btn_radius != null ? s.buy_btn_radius : 10;
    var btnAction = s.buy_btn_action || 'checkout';
    var showInfoBtn = s.show_info_btn !== false;
    var showDescription = s.show_description !== false;
    var glassmorphic = s.glassmorphic !== false;
    var showGlow = s.show_glow !== false;
    var glowColor = s.glow_color || accent;
    var glowIntensity = s.glow_intensity != null ? s.glow_intensity : 35;
    var showTopFade = s.show_top_fade;
    var showOverlay = s.show_overlay_title !== false;
    var overlayGreen = s.overlay_green_color || accent;
    var overlayWhite = s.overlay_white_color || '#ffffff';
    var overlayFontSize = s.overlay_font_size != null ? s.overlay_font_size : 14;
    var showBadge = s.show_sale_badge !== false;
    var badgeLabel = s.sale_badge_label || 'SALE';
    var badgeBg = s.sale_badge_bg || 'rgba(0,0,0,0.5)';
    var badgeTextColor = s.sale_badge_text_color || '#ffffff';
    var badgePosY = s.sale_badge_position_y || 'top';
    var badgePosX = s.sale_badge_position_x || 'right';
    var colsDesk = s.columns_desktop != null ? s.columns_desktop : 4;
    var colsMob = s.columns_mobile != null ? s.columns_mobile : 2;
    var cardRadius = s.card_radius != null ? s.card_radius : 12;
    var cardPadding = s.card_padding != null ? s.card_padding : 18;
    var cardHoverLift = s.card_hover_lift != null ? s.card_hover_lift : 2;
    var imageRatio = s.image_ratio || '1 / 1';
    var padTop = s.padding_top != null ? s.padding_top : 40;
    var padBot = s.padding_bottom != null ? s.padding_bottom : 60;


    // Glassmorphic card shadows
    var cardShadow = glassmorphic ? 'box-shadow:inset 0 0 0 1px rgba(255,255,255,0.03),inset 1.8px 3px 0px -2px rgba(255,255,255,0.15),inset -2px -2px 0px -2px rgba(255,255,255,0.12),0 2px 8px rgba(0,0,0,0.4);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);' : 'box-shadow:none;';
    var cardHoverShadow = glassmorphic
      ? 'inset 0 0 0 1px rgba(255,255,255,0.06),inset 1.8px 3px 0px -2px rgba(255,255,255,0.2),inset -2px -2px 0px -2px rgba(255,255,255,0.15),0 8px 32px ' + cardHoverBorder + '33,0 2px 12px rgba(0,0,0,0.3)'
      : '0 8px 32px ' + cardHoverBorder + '33,0 2px 12px rgba(0,0,0,0.3)';

    var css = '<style>' +
      '.vx-pg{padding:' + padTop + 'px 20px ' + padBot + 'px;position:relative;overflow:hidden}' +
      (showGlow ? '.vx-pg::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 1200px 800px at 10% 15%,color-mix(in srgb,' + glowColor + ' ' + (glowIntensity) + '%,transparent) 0%,transparent 60%),radial-gradient(ellipse 1000px 700px at 80% 25%,color-mix(in srgb,' + glowColor + ' ' + (glowIntensity * .85) + '%,transparent) 0%,transparent 65%),radial-gradient(ellipse 1400px 900px at 90% 85%,color-mix(in srgb,' + glowColor + ' ' + (glowIntensity) + '%,transparent) 0%,transparent 70%),radial-gradient(ellipse 800px 600px at 5% 70%,color-mix(in srgb,' + glowColor + ' ' + (glowIntensity * .6) + '%,transparent) 0%,transparent 50%);pointer-events:none;z-index:0}' : '') +
      (showTopFade ? '.vx-pg::after{content:"";position:absolute;top:0;left:0;right:0;height:350px;background:linear-gradient(to bottom,var(--color-bg,#000) 10%,transparent 100%);pointer-events:none;z-index:1}' : '') +
      '.vx-pg-inner{position:relative;z-index:2;max-width:var(--max-width,1200px);margin:0 auto}' +
      '.vx-pg-grid{display:grid;grid-template-columns:repeat(' + colsDesk + ',1fr);gap:var(--grid-gap,16px)}' +
      '@media(max-width:768px){.vx-pg-grid{grid-template-columns:repeat(' + colsMob + ',1fr)}' +
        (showGlow ? '.vx-pg::before{background:radial-gradient(ellipse 600px 400px at 10% 10%,color-mix(in srgb,' + glowColor + ' ' + (glowIntensity) + '%,transparent) 0%,transparent 60%),radial-gradient(ellipse 500px 350px at 90% 20%,color-mix(in srgb,' + glowColor + ' ' + (glowIntensity * .8) + '%,transparent) 0%,transparent 65%)!important}' : '') +
      '}' +
      '.vx-pc{background:' + cardBg + ';border:1px solid ' + cardBorder + ';border-radius:' + cardRadius + 'px;overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s;' + cardShadow + '}' +
      '.vx-pc:hover{transform:translateY(-' + cardHoverLift + 'px);border-color:' + cardHoverBorder + ';box-shadow:' + cardHoverShadow + '}' +
      '.vx-pc-img{position:relative;aspect-ratio:' + imageRatio + ';width:100%;padding:0;border:0;text-align:left;background:' + imageBg + ';overflow:hidden;display:block;cursor:pointer}' +
      '.vx-pc-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s}' +
      '.vx-pc:hover .vx-pc-img img{transform:scale(1.03)}' +
      '.vx-pc-overlay{position:absolute;top:12px;left:12px;font-family:var(--font-heading);font-size:' + overlayFontSize + 'px;line-height:1.3;text-transform:uppercase;z-index:2}' +
      '.vx-pc-badge{position:absolute;' + badgePosY + ':12px;' + badgePosX + ':12px;background:' + badgeBg + ';color:' + badgeTextColor + ';font-family:' + cv('font-body') + ';font-size:12px;font-weight:800;text-transform:uppercase;padding:7px 14px;border-radius:30px;box-shadow:0 4px 12px rgba(0,0,0,.15);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);z-index:2}' +
      '.vx-pc-info{padding:' + cardPadding + 'px}' +
      '.vx-pc-title{font-family:' + cv('font-body') + ';font-size:16px;font-weight:600;text-transform:uppercase;letter-spacing:.015em;color:' + titleColor + ';margin-bottom:12px;line-height:1.4}' +
      '.vx-pc-title button{color:inherit;background:none;border:0;padding:0;text-align:left;font:inherit;text-transform:inherit;letter-spacing:inherit;line-height:inherit;cursor:pointer}' +
      '.vx-pc-desc{font-size:12px;line-height:1.5;color:var(--color-text-muted,#9ca3af);margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}' +
      '.vx-pc-prices{display:flex;align-items:baseline;gap:8px;margin-bottom:10px}' +
      '.vx-price-sale{color:' + priceColor + ';font-family:' + cv('font-body') + ';font-weight:700;font-size:18px}' +
      '.vx-price-compare{color:' + compareColor + ';text-decoration:line-through;font-family:' + cv('font-body') + ';font-size:14px}' +
      '.vx-pc-actions{display:flex;gap:10px}' +
      '.vx-btn-info{width:48px;height:48px;border-radius:10px;background:#2a2a2a;border:0;box-shadow:inset 0 2px 4px rgba(255,255,255,.08),inset 0 -2px 4px rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);transition:background .2s,border-color .2s,color .2s;flex-shrink:0;cursor:pointer;position:relative;overflow:hidden}' +
      '.vx-btn-info:hover{background:#222;border-color:#fff;color:#fff}' +
      '.vx-btn-buy{flex:1;height:clamp(42px,5vw,48px);border-radius:' + btnRadius + 'px;background:' + btnBg + ';color:' + btnText + ';font-family:' + cv('font-heading') + ';font-weight:900;font-size:clamp(13px,3.5vw,22px);text-transform:uppercase;letter-spacing:-.3px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;border:0;box-shadow:0 18px 40px -15px color-mix(in srgb,' + btnBg + ' 85%,transparent),inset 0 3px 6px rgba(255,255,255,.7),inset 0 -3px 6px rgba(0,0,0,.2);text-shadow:0 1px 2px rgba(255,255,255,.1);transition:all .3s ease;cursor:pointer;text-decoration:none;box-sizing:border-box;white-space:nowrap;padding:0 clamp(10px,2vw,24px)}' +
      '.vx-btn-buy:hover{background:color-mix(in srgb,' + btnBg + ',#fff 12%);box-shadow:0 18px 40px -15px color-mix(in srgb,' + btnBg + ' 85%,transparent),inset 0 3px 6px rgba(255,255,255,.7),inset 0 -3px 6px rgba(0,0,0,.2)}' +
      '@media(max-width:768px){.vx-btn-info{height:42px;width:42px}.vx-pc-info{padding:' + Math.max(10, cardPadding - 4) + 'px}.vx-pc-title{font-size:14px}}' +
      '.vx-section-title{text-align:center;font-family:var(--font-heading);font-size:calc(clamp(24px,4vw,36px) * var(--section-title-scale,1));text-transform:uppercase;letter-spacing:-.5px;margin-bottom:32px;color:#fff}' +
      '</style>';

    var titleHtml = s.title ? '<h2 class="vx-section-title">' + esc(s.title) + '</h2>' : '';

    var cardsHtml = products.map(function(p, index) {
      var hasCompare = p.comparePrice && p.comparePrice > p.price;

      // Overlay title
      var overlayHtml = '';
      if (showOverlay && p.overlayGreen) {
        overlayHtml = '<div class="vx-pc-overlay">' +
          '<span style="color:' + overlayGreen + ';font-style:italic;font-weight:600">' + esc(p.overlayGreen) + '</span>' +
          (p.overlayWhite ? '<br><span style="color:' + overlayWhite + ';font-weight:800">' + esc(p.overlayWhite) + '</span>' : '') +
          '</div>';
      }

      // Sale badge
      var badgeHtml = '';
      if (showBadge && (hasCompare || s.always_show_sale_badge)) {
        badgeHtml = '<span class="vx-pc-badge">' + esc(badgeLabel) + '</span>';
      }

      // Info button
      var infoBtnHtml = '';
      if (showInfoBtn) {
        infoBtnHtml = '<button type="button" class="vx-btn-info" data-vx-desc="' + esc(p.handle) + '" aria-label="View product information" aria-haspopup="dialog">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><circle cx="12" cy="7.5" r=".7" fill="currentColor" stroke="none"/></svg>' +
          '</button>';
      }

      // Buy button
      var buyBtnHtml = '';
      if (btnAction === 'checkout') {
        buyBtnHtml = '<a class="vx-btn-buy" href="/cart/add?id=' + encodeURIComponent(p.variantId) + '&amp;return_to=/checkout">' + esc(btnLabel) + '</a>';
      } else if (btnAction === 'add_to_cart') {
        buyBtnHtml = '<button class="vx-btn-buy" data-vx-add="' + p.variantId + '">' + esc(btnLabel) + '</button>';
      } else if (btnAction === 'description') {
        buyBtnHtml = '<button type="button" class="vx-btn-buy" data-vx-desc="' + esc(p.handle) + '" aria-haspopup="dialog">' + esc(btnLabel) + '</button>';
      } else if (btnAction === 'custom') {
        var customUrl = /^(https?:\/\/|\/(?!\/)|#)/i.test(s.buy_btn_url || '') ? s.buy_btn_url : '#';
        buyBtnHtml = '<a href="' + esc(customUrl) + '" class="vx-btn-buy">' + esc(btnLabel) + '</a>';
      } else {
        buyBtnHtml = '<a href="' + esc(p.url) + '" class="vx-btn-buy">' + esc(btnLabel) + '</a>';
      }

      return '<div class="vx-pc" data-product-id="' + p.id + '">' +
        '<div style="border-radius:' + Math.max(0, cardRadius - 1) + 'px;overflow:hidden">' +
          '<button type="button" class="vx-pc-img" data-vx-desc="' + esc(p.handle) + '" aria-label="View description">' +
            (p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt || p.title) + '" loading="' + (index < colsDesk ? 'eager' : 'lazy') + '"' + (index === 0 ? ' fetchpriority="high"' : '') + ' decoding="async" width="600" height="600">' : '<div style="width:100%;height:100%;background:' + imageBg + '"></div>') +
            overlayHtml +
            badgeHtml +
          '</button>' +
          '<div class="vx-pc-info">' +
            '<h3 class="vx-pc-title"><button type="button" data-vx-desc="' + esc(p.handle) + '">' + esc(p.title) + '</button></h3>' +
            (showDescription && p.description ? '<p class="vx-pc-desc">' + esc(p.description.substring(0, 120)) + '</p>' : '') +
            '<div class="vx-pc-prices">' +
              '<span class="vx-price-sale">' + formatMoney(p.price) + '</span>' +
              (hasCompare ? '<span class="vx-price-compare">' + formatMoney(p.comparePrice) + '</span>' : '') +
            '</div>' +
            '<div class="vx-pc-actions">' + infoBtnHtml + buyBtnHtml + '</div>' +
          '</div>' +
        '</div>' +
        '</div>';
    }).join('');

    return css +
      '<div class="vx-pg">' +
        '<div class="vx-pg-inner">' +
          titleHtml +
          '<div class="vx-pg-grid">' + cardsHtml + '</div>' +
        '</div>' +
      '</div>';
  }

  function renderLinProductGrid(s, products) {
    products = products.slice(0, Math.max(1, Number(s.max_products) || 12));
    var accent = colors.accent1 || '#ff86dd';
    var cardBg = s.card_bg || '#111111';
    var cardBorder = s.card_border || '#333333';
    var cardRadius = s.card_radius != null ? s.card_radius : 20;
    var cardPadding = s.card_padding != null ? s.card_padding : 18;
    var btnBg = s.buy_btn_bg || accent;
    var btnText = s.buy_btn_text_color || '#000000';
    var btnRadius = s.buy_btn_radius != null ? s.buy_btn_radius : 10;
    var colsDesk = Math.max(1, Math.min(8, Number(s.columns_desktop) || 4));
    var colsMob = Math.max(1, Math.min(4, Number(s.columns_mobile) || 2));
    var headline = s.headline || '';
    var highlight = s.headline_highlight || '';
    var headingHtml = esc(headline);
    var highlightIndex = highlight ? headline.indexOf(highlight) : -1;
    if (highlightIndex !== -1) headingHtml = esc(headline.slice(0, highlightIndex)) + '<span>' + esc(highlight) + '</span>' + esc(headline.slice(highlightIndex + highlight.length));
    var shadow = s.card_style === 'flat' ? 'none' : '0 2px 4px rgba(0,0,0,.04),0 6px 16px rgba(0,0,0,.06),0 20px 60px rgba(0,0,0,.1),0 0 80px -20px rgba(0,0,0,.08)';
    var headlineScale = (s.headline_size != null ? Number(s.headline_size) : 110) / 100;
    var clickAction = s.card_click_action || 'description';
    var glowColor = s.glow_color || accent;
    var glowStrength = Math.max(0, Math.min(100, Number(s.glow_intensity) || 0)) / 100;
    var infoIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><circle cx="12" cy="7.5" r=".7" fill="currentColor" stroke="none"/></svg>';
    function destination(value) {
      value = String(value || '').trim();
      return /^(https?:\/\/|\/(?!\/)|#)/i.test(value) ? value : '#';
    }
    function button(p, action, label, customUrl, className, icon) {
      var attrs = ' class="' + className + '"';
      var text = icon ? infoIcon : esc(label);
      if (icon) attrs += ' aria-label="View product information"';
      if (action === 'description') return '<button type="button"' + attrs + ' data-vx-desc="' + esc(p.handle) + '" aria-haspopup="dialog">' + text + '</button>';
      if (p.previewOnly || p.available === false || !p.variantId) return '<button type="button"' + attrs + ' disabled aria-disabled="true" title="This product is not available for purchase">' + text + '</button>';
      if (action === 'add_to_cart') return '<button type="button"' + attrs + ' data-vx-add="' + esc(p.variantId) + '" data-original-text="' + esc(label) + '">' + text + '</button>';
      var href = action === 'checkout' ? '/cart/add?id=' + encodeURIComponent(p.variantId) + '&return_to=/checkout' : action === 'custom' ? destination(customUrl) : destination(p.url);
      return '<a' + attrs + ' href="' + esc(href) + '">' + text + '</a>';
    }
    function cardControl(p, className, content, label) {
      var attrs = ' class="' + className + '"';
      if (label) attrs += ' aria-label="' + esc(label) + '"';
      if (clickAction === 'none') return '<div' + attrs + '>' + content + '</div>';
      if (clickAction === 'description' || p.previewOnly) return '<button type="button"' + attrs + ' data-vx-desc="' + esc(p.handle) + '" aria-haspopup="dialog">' + content + '</button>';
      return '<a' + attrs + ' href="' + esc(clickAction === 'custom' ? destination(s.card_click_url) : destination(p.url)) + '">' + content + '</a>';
    }
    var css = '<style>' +
      '.vx-pg--lin.vx-pg--lin{padding:' + (s.padding_top != null ? s.padding_top : 48) + 'px 0 ' + (s.padding_bottom != null ? s.padding_bottom : 48) + 'px;position:relative;overflow:hidden}' +
      (s.show_glow ? '.vx-pg--lin::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:' + glowStrength + ';background:radial-gradient(ellipse 800px 500px at 5% 20%,color-mix(in srgb,' + glowColor + ' 60%,transparent) 0%,transparent 70%),radial-gradient(ellipse 700px 450px at 95% 35%,color-mix(in srgb,' + glowColor + ' 50%,transparent) 0%,transparent 70%),radial-gradient(ellipse 900px 600px at 50% 55%,color-mix(in srgb,' + glowColor + ' 55%,transparent) 0%,transparent 70%)}' : '') +
      '.vx-pg--lin.vx-pg--lin .vx-pg-inner{position:relative;z-index:1;max-width:var(--max-width,1200px);box-sizing:border-box;margin:0 auto;padding-inline:var(--homepage-inline-padding,16px)}' +
      '.vx-pg--lin .vx-pg-headline{padding:' + (s.hero_padding_top != null ? s.hero_padding_top : 64) + 'px 0 ' + (s.hero_padding_bottom != null ? s.hero_padding_bottom : 32) + 'px;margin-bottom:' + (s.hero_margin_bottom != null ? s.hero_margin_bottom : 24) + 'px;text-align:center}' +
      '.vx-pg--lin .vx-pg-headline h1{margin:0;color:' + (s.title_color || '#fff') + ';font-family:var(--font-heading);font-weight:900;font-size:calc(clamp(28px,5vw,48px) * ' + headlineScale + ');line-height:1.1;letter-spacing:-1px}' +
      '.vx-pg--lin .vx-pg-headline h1 span{color:' + (s.headline_highlight_color || accent) + '}' +
      '.vx-pg--lin.vx-pg--lin .vx-pg-grid{--lin-gap:var(--grid-gap,24px);display:flex;justify-content:center;flex-wrap:wrap;gap:var(--lin-gap);align-items:flex-start}' +
      '.vx-pg--lin .vx-pc{width:calc((100% - (var(--lin-gap) * ' + (colsDesk - 1) + ')) / ' + colsDesk + ');min-width:0;position:relative;background:' + cardBg + ';border:1px solid color-mix(in srgb,' + cardBorder + ',transparent 10%);border-radius:' + cardRadius + 'px;overflow:hidden;box-sizing:border-box;box-shadow:' + shadow + ';transition:transform .3s,border-color .3s}' +
      (s.card_style === 'flat' ? '' : '.vx-pg--lin .vx-pc::after{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;z-index:2;box-shadow:inset 0 1px 4px rgba(255,255,255,.25),inset 0 -1px 4px rgba(0,0,0,.08),inset 1px 0 4px rgba(255,255,255,.15),inset -1px 0 4px rgba(0,0,0,.04),inset 0 0 20px rgba(255,255,255,.06)}') +
      '.vx-pg--lin .vx-pc:hover{transform:translateY(-' + (s.card_hover_lift != null ? s.card_hover_lift : 2) + 'px);border-color:' + (s.card_hover_border || accent) + '}' +
      '.vx-pg--lin .vx-pc-img{position:relative;width:100%;aspect-ratio:' + (s.image_ratio || '1 / 1') + ';display:block;overflow:hidden;padding:0;border:0;background:' + (s.image_bg || '#0a0a0a') + ';cursor:pointer;text-decoration:none}' +
      '.vx-pg--lin .vx-pc-img img{display:block;width:100%;height:100%;object-fit:var(--product-image-fit,cover);transition:transform .4s}' +
      '.vx-pg--lin .vx-pc:hover .vx-pc-img img{transform:scale(var(--product-image-zoom,1.03))}' +
      '.vx-pg--lin .vx-pc-badge{position:absolute;' + (s.sale_badge_position_y || 'top') + ':12px;' + (s.sale_badge_position_x || 'right') + ':12px;padding:7px 14px;border-radius:30px;border:1px solid rgba(255,255,255,.2);background:' + (s.sale_badge_bg || '#000') + ';color:' + (s.sale_badge_text_color || '#fff') + ';font:800 12px var(--font-body);z-index:1}' +
      '.vx-pg--lin .vx-pc-info{padding:' + cardPadding + 'px;display:flex;flex-direction:column;gap:12px}' +
      '.vx-pg--lin.vx-pg--lin .vx-pc-title{margin:0;font:600 var(--product-title-size,16px)/1.4 var(--font-body);text-transform:uppercase;color:' + (s.title_color || '#fff') + ';letter-spacing:.02em}' +
      '.vx-pg--lin .vx-pc-title :is(button,a){padding:0;border:0;background:none;font:inherit;color:inherit;text-align:left;text-transform:inherit;letter-spacing:inherit;text-decoration:none;cursor:pointer}' +
      '.vx-pg--lin .vx-pc-prices{display:flex;align-items:baseline;gap:8px;margin:0 0 4px}' +
      '.vx-pg--lin.vx-pg--lin .vx-price-sale{font:700 var(--product-price-size,18px)/1.5 var(--font-body);color:' + (s.price_color || accent) + '}' +
      '.vx-pg--lin.vx-pg--lin .vx-price-compare{font:400 var(--product-compare-size,14px)/1.5 var(--font-body);color:' + (s.compare_price_color || '#9ca3af') + ';text-decoration:line-through}' +
      '.vx-pg--lin .vx-pc-desc{font:400 12px/1.5 var(--font-body);color:var(--color-text-muted);margin:0}' +
      '.vx-pg--lin .vx-pc-actions{display:flex;gap:10px;' + (s.second_btn_layout === 'stacked' ? 'flex-direction:column;' : '') + '}' +
      '.vx-pg--lin.vx-pg--lin .vx-btn-info{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:var(--buy-button-height,48px);height:var(--buy-button-height,48px);padding:0;background:var(--info-button-bg,#2a2a2a);color:var(--info-button-color,#fff);border:0;box-shadow:inset 0 2px 4px rgba(255,255,255,.08),inset 0 -2px 4px rgba(0,0,0,.15);border-radius:var(--info-button-radius,10px);cursor:pointer;text-decoration:none}' +
      '.vx-pg--lin .vx-btn-info svg{width:20px;height:20px}' +
      '.vx-pg--lin.vx-pg--lin .vx-btn-buy{display:flex;flex:1;align-items:center;justify-content:center;min-width:0;height:var(--buy-button-height,48px);padding:0 24px;border:0;border-radius:' + btnRadius + 'px;background:' + btnBg + ';color:' + btnText + ';letter-spacing:-.3px;font:900 var(--buy-button-size,18px) var(--font-heading);text-decoration:none;text-transform:uppercase;white-space:nowrap;box-shadow:0 18px 40px -15px color-mix(in srgb,' + btnBg + ' 85%,transparent),inset 0 3px 6px rgba(255,255,255,.7),inset 0 -3px 6px rgba(0,0,0,.2);cursor:pointer;transition:transform .2s,background .2s}' +
      '.vx-pg--lin .vx-btn-buy:hover{background:color-mix(in srgb,' + btnBg + ',#fff 12%)}' +
      '.vx-pg--lin .vx-btn-buy:disabled{cursor:default}' +
      '@media(max-width:768px){.vx-pg--lin.vx-pg--lin .vx-pg-grid{--lin-gap:clamp(var(--grid-gap-mobile,12px),2.4vw,16px)}.vx-pg--lin .vx-pc{width:calc((100% - (var(--lin-gap) * ' + (colsMob - 1) + ')) / ' + colsMob + ')}.vx-pg--lin .vx-pc-info{padding:' + Math.max(10, cardPadding - 4) + 'px;gap:10px}.vx-pg--lin.vx-pg--lin .vx-pc-title{font-size:var(--product-title-size-mobile,15px)}.vx-pg--lin.vx-pg--lin .vx-price-sale{font-size:var(--product-price-size-mobile,17px)}.vx-pg--lin.vx-pg--lin .vx-btn-info{width:var(--buy-button-height-mobile,42px);height:var(--buy-button-height-mobile,42px)}.vx-pg--lin.vx-pg--lin .vx-btn-buy{height:var(--buy-button-height-mobile,42px);font-size:var(--buy-button-size-mobile,13px);padding-inline:4px}}' +
      '.vx-pg--lin.vx-pg--lin .vx-pc-actions--stacked .vx-btn-info{width:100%}.vx-pg--lin.vx-pg--lin .vx-pc-actions--stacked .vx-btn-buy{flex:none}' +
      '</style>';
    var cards = products.map(function(p, index) {
      var hasCompare = Number(p.comparePrice) > Number(p.price);
      var image = p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt || p.title) + '" width="600" height="600" loading="' + (index < colsDesk ? 'eager' : 'lazy') + '"' + (index === 0 ? ' fetchpriority="high"' : '') + ' decoding="async">' : '';
      if (s.show_sale_badge !== false && (hasCompare || s.always_show_sale_badge)) image += '<span class="vx-pc-badge">' + esc(s.sale_badge_label || 'SALE') + '</span>';
      var secondAction = s.second_btn_action || 'description';
      var second = s.show_info_btn === false ? '' : button(p, secondAction, s.second_btn_label || 'ADD TO CART', s.second_btn_url, secondAction === 'description' ? 'vx-btn-info' : 'vx-btn-buy vx-btn-secondary', secondAction === 'description');
      var buy = button(p, s.buy_btn_action || 'checkout', s.buy_btn_label || 'BUY NOW', s.buy_btn_url, 'vx-btn-buy', false);
      return '<article class="vx-pc" data-product-id="' + esc(p.id) + '">' + cardControl(p, 'vx-pc-img', image, 'View ' + p.title + ' information') + '<div class="vx-pc-info"><h3 class="vx-pc-title">' + cardControl(p, 'vx-pc-title-control', esc(p.title)) + '</h3>' + (s.show_description && p.description ? '<p class="vx-pc-desc">' + esc(p.description) + '</p>' : '') + '<div class="vx-pc-prices"><span class="vx-price-sale">' + formatMoney(p.price) + '</span>' + (hasCompare ? '<span class="vx-price-compare">' + formatMoney(p.comparePrice) + '</span>' : '') + '</div><div class="vx-pc-actions' + (s.second_btn_layout === 'stacked' ? ' vx-pc-actions--stacked' : '') + '">' + second + buy + '</div></div></article>';
    }).join('');
    return css + '<div class="vx-pg vx-pg--lin"><div class="vx-pg-inner">' + (headline ? '<header class="vx-pg-headline"><h1>' + headingHtml + '</h1></header>' : '') + (s.title ? '<h2 class="vx-section-title">' + esc(s.title) + '</h2>' : '') + '<div class="vx-pg-grid">' + cards + '</div></div></div>';
  }

  function attachProductGrid() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
      var addBtn = e.target.closest('[data-vx-add]');
      if (addBtn) {
        e.preventDefault();
        var vid = addBtn.getAttribute('data-vx-add');
        addBtn.textContent = 'ADDING...';
        addBtn.disabled = true;
        window.VexelCart.add(Number(vid)).then(function() {
          addBtn.textContent = 'ADDED!';
          setTimeout(function() { addBtn.textContent = addBtn.getAttribute('data-original-text') || 'ADD TO CART'; addBtn.disabled = false; }, 1500);
          // Update badge
          window.VexelCart.get().then(function(c) {
            var badge = document.getElementById('vx-cart-badge');
            if (badge) { badge.textContent = c.item_count; badge.classList.toggle('has-items', c.item_count > 0); }
          });
          // Open cart drawer
          if (window.CartDrawer) window.CartDrawer.open();
        }).catch(function() { addBtn.textContent = 'ERROR'; addBtn.disabled = false; });
        return;
      }

      // Checkout buttons
      var checkBtn = e.target.closest('[data-vx-checkout]');
      if (checkBtn) {
        e.preventDefault();
        var vid2 = checkBtn.getAttribute('data-vx-checkout');
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: Number(vid2), quantity: 1 }] })
        }).then(function() { window.location.href = '/checkout'; }).catch(function(err) { console.error(err); });
        return;
      }

    });
  }

  // ─── 5. Testimonials ───────────────────────────────────────────
  function renderTestimonials(s) {
    var title = s.title || 'What Our Customers Say';
    var titleColor = s.title_color || '#ffffff';
    var speed = s.scroll_speed != null ? s.scroll_speed : 20;
    var imgHeight = s.image_height != null ? s.image_height : 250;
    var imgHeightMobile = s.image_height_mobile != null ? s.image_height_mobile : 180;
    var imgRadius = s.image_radius != null ? s.image_radius : 12;
    var bgColor = s.bg_color || '#000000';
    var paddingTop = s.padding_top != null ? s.padding_top : 60;
    var paddingBottom = s.padding_bottom != null ? s.padding_bottom : 60;
    var gap = s.gap != null ? s.gap : 16;
    var maxWidth = s.max_width != null ? s.max_width : 1400;
    var imgHeight2x = imgHeight * 2;

    var imgHtml = '';
    for (var i = 1; i <= 20; i++) {
      var img = s['image_' + i];
      if (img) {
        imgHtml += '<img src="' + esc(img) + '" alt="Customer testimonial ' + i + '" loading="lazy" style="height:' + imgHeight + 'px;width:auto;border-radius:' + imgRadius + 'px;object-fit:cover;flex-shrink:0">';
      }
    }

    var css = '<style>' +
      '.vx-testimonials{background:' + bgColor + ';padding:' + paddingTop + 'px 0 ' + paddingBottom + 'px;overflow:hidden}' +
      '.vx-testimonials__title{text-align:center;font-family:' + cv('font-heading') + ';font-size:calc(clamp(24px,4vw,36px) * var(--section-title-scale,1));text-transform:uppercase;color:' + titleColor + ';margin-bottom:32px;padding:0 20px}' +
      '.vx-testimonials__wrap{position:relative;max-width:' + maxWidth + 'px;margin:0 auto;-webkit-mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent);mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent)}' +
      '.vx-testimonials__track{display:flex;gap:' + gap + 'px;width:max-content;animation:vxTestScroll ' + speed + 's linear infinite}' +
      '.vx-testimonials__track:hover{animation-play-state:paused}' +
      '@media(max-width:768px){.vx-testimonials__track img{height:' + imgHeightMobile + 'px!important}}' +
      '@keyframes vxTestScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}' +
      '</style>';

    var galleryHtml = imgHtml
      ? '<div class="vx-testimonials__wrap"><div class="vx-testimonials__track">' + imgHtml + imgHtml + '</div></div>'
      : '';

    return css +
      '<section class="vx-testimonials">' +
      (title ? '<h2 class="vx-testimonials__title">' + esc(title) + '</h2>' : '') +
      galleryHtml +
      '</section>';
  }

  // ─── 6. FAQ ────────────────────────────────────────────────────
  function renderFAQ(s) {
    var title = s.title || 'Frequently Asked Questions';
    var titleColor = s.title_color || '#ffffff';
    var cardBg = s.card_bg || '#111111';
    var cardBorder = s.card_border || '#2a2a2a';
    var cardBorderOpen = s.card_border_open || '#28731f';
    var questionColor = s.question_color || '#ffffff';
    var answerColor = s.answer_color || '#9ca3af';
    var toggleBg = s.toggle_bg || '#1a1a1a';
    var toggleBgOpen = s.toggle_bg_open || '#19d400';
    var toggleIconColor = s.toggle_icon_color || '#ffffff';
    var toggleIconOpen = s.toggle_icon_open || '#1a1a1a';
    var maxWidth = s.max_width != null ? s.max_width : 720;
    var cardRadius = s.card_radius != null ? s.card_radius : 16;
    var cardPadding = s.card_padding != null ? s.card_padding : 24;
    var itemGap = s.item_gap != null ? s.item_gap : 12;
    var questionFontSize = s.question_font_size != null ? s.question_font_size : 15;
    var answerFontSize = s.answer_font_size != null ? s.answer_font_size : 14;
    var toggleSize = s.toggle_size != null ? s.toggle_size : 32;
    var paddingTop = s.padding_top != null ? s.padding_top : 60;
    var paddingBottom = s.padding_bottom != null ? s.padding_bottom : 60;

    var faqs = (s.blocks || []).filter(function(b) { return b.type === 'question'; });
    if (!faqs.length) return '';
    var openFirst = s.open_first !== false;

    var faqHtml = faqs.map(function(faq, idx) {
      var initiallyOpen = openFirst && idx === 0;
      return '<div class="vx-faq-item' + (initiallyOpen ? ' open' : '') + '">' +
        '<button class="vx-faq-question" data-vx-faq-toggle aria-expanded="' + initiallyOpen + '">' +
          '<span>' + esc(faq.settings.question) + '</span>' +
          '<span class="vx-faq-toggle"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>' +
        '</button>' +
        '<div class="vx-faq-answer"' + (initiallyOpen ? ' style="max-height:500px"' : '') + '><div class="vx-faq-answer-inner">' + (faq.settings.answer || '') + '</div></div>' +
      '</div>';
    }).join('');

    var css = '<style>' +
      '.vx-faq{padding:' + paddingTop + 'px 16px ' + paddingBottom + 'px}' +
      '.vx-faq__title{text-align:center;font-family:' + cv('font-heading') + ';font-size:calc(' + (s.title_size || 40) + 'px * var(--section-title-scale,1));font-weight:800;letter-spacing:0;color:' + titleColor + ';margin-bottom:' + (s.title_gap || 48) + 'px}' +
      '.vx-faq__list{max-width:' + maxWidth + 'px;margin:0 auto;display:flex;flex-direction:column;gap:' + itemGap + 'px}' +
      '.vx-faq-item{background:' + cardBg + ';border:1px solid ' + cardBorder + ';border-radius:' + cardRadius + 'px;box-shadow:0 4px 20px -5px rgba(0,0,0,.2);overflow:hidden;transition:border-color 0.3s}' +
      '.vx-faq-item.open{border-color:' + cardBorderOpen + '}' +
      '.vx-faq-question{display:flex;align-items:center;justify-content:space-between;padding:' + cardPadding + 'px ' + (s.card_padding_x || cardPadding) + 'px;cursor:pointer;gap:16px;width:100%;background:none;border:none;text-align:left;color:' + questionColor + ';font-size:' + questionFontSize + 'px;font-weight:700;font-family:inherit;line-height:1.4}' +
      '.vx-faq-toggle{width:' + toggleSize + 'px;height:' + toggleSize + 'px;border-radius:50%;background:' + toggleBg + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.3s,transform 0.3s}' +
      '.vx-faq-toggle svg{width:14px;height:14px;stroke:' + toggleIconColor + ';transition:stroke 0.3s}' +
      '.vx-faq-item.open .vx-faq-toggle{background:' + toggleBgOpen + ';transform:rotate(180deg)}' +
      '.vx-faq-item.open .vx-faq-toggle svg{stroke:' + toggleIconOpen + '}' +
      (s.answer_gap != null ? '.vx-faq-item.open .vx-faq-question{padding-bottom:0}' : '') +
      '.vx-faq-answer{max-height:0;overflow:hidden;transition:max-height 0.4s ease}' +
      '.vx-faq-answer-inner{padding:' + (s.answer_gap != null ? s.answer_gap : 0) + 'px ' + (s.card_padding_x || cardPadding) + 'px ' + cardPadding + 'px;font-size:' + answerFontSize + 'px;color:' + answerColor + ';line-height:1.75}' +
      '@media(max-width:768px){.vx-faq__title{font-size:' + (s.title_size_mobile || 30) + 'px}.vx-faq-question{font-size:' + (s.question_font_size_mobile || 15) + 'px;padding:' + (s.card_padding_mobile || 24) + 'px ' + (s.card_padding_x || 32) + 'px}.vx-faq-answer-inner{padding:' + (s.answer_gap != null ? s.answer_gap : 0) + 'px ' + (s.card_padding_x || 32) + 'px ' + (s.card_padding_mobile || 24) + 'px}}' +
      '</style>';

    return css +
      '<section class="vx-faq"><h2 class="vx-faq__title">' + esc(title) + '</h2><div class="vx-faq__list">' + faqHtml + '</div></section>';
  }

  function attachFAQ(s, root, life) {
    life.listen(root, 'click', function(e) {
      var btn = e.target.closest('[data-vx-faq-toggle]');
      if (!btn) return;
      var item = btn.closest('.vx-faq-item');
      var answer = item.querySelector('.vx-faq-answer');
      var isOpen = item.classList.contains('open');

      if (!s.allow_multiple) {
        root.querySelectorAll('.vx-faq-item.open').forEach(function(el) {
          el.classList.remove('open');
          el.querySelector('.vx-faq-answer').style.maxHeight = '0';
          el.querySelector('[data-vx-faq-toggle]').setAttribute('aria-expanded', 'false');
        });
      }

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ─── 7. Reviews ────────────────────────────────────────────────
  function renderReviews(s) {
    var title = s.title || 'Customer Reviews';
    var subtitle = s.subtitle || 'See what our customers are saying';
    var titleColor = s.title_color || '#ffffff';
    var subtitleColor = s.subtitle_color || '#9ca3af';
    var starColor = s.star_color || '#fbbf24';
    var rating = s.rating || '4.9';
    var reviewCount = s.review_count || '15';
    var cardBg = s.card_bg || '#111111';
    var cardBorder = s.card_border || '#2a2a2a';
    var avatarBg = s.avatar_bg || '#19d400';
    var avatarTextColor = s.avatar_text_color || '#000000';
    var writeBtnBg = s.write_btn_bg || '#19d400';
    var writeBtnText = s.write_btn_text_color || '#000000';
    var columns = s.columns != null ? s.columns : 1;
    var avatarSize = s.avatar_size != null ? s.avatar_size : 40;
    var cardPadding = s.card_padding != null ? s.card_padding : 20;
    var cardRadius = s.card_radius != null ? s.card_radius : 12;
    var maxWidth = s.max_width != null ? s.max_width : 900;
    var initialReviews = s.initial_reviews != null ? s.initial_reviews : 10;
    var showWriteButton = s.show_write_button !== false;
    var writeButtonLabel = s.write_button_label || 'Write a Review';
    var loadMoreLabel = s.load_more_label || 'Load More Reviews';
    var paddingTop = s.padding_top != null ? s.padding_top : 60;
    var paddingBottom = s.padding_bottom != null ? s.padding_bottom : 60;

    var reviews = (s.blocks || []).filter(function(b) { return b.type === 'review'; });

    var reviewCardsHtml = reviews.map(function(r, index) {
      var initials = (r.settings.name || 'A').slice(0, 2).toUpperCase();
      var starsHtml = '';
      for (var i = 1; i <= 5; i++) {
        starsHtml += i <= (r.settings.stars || 5) ? '\u2605' : '\u2606';
      }
      var avatarHtml = r.settings.avatar
        ? '<img src="' + esc(r.settings.avatar) + '" alt="" loading="lazy" style="width:' + avatarSize + 'px;height:' + avatarSize + 'px;border-radius:50%;object-fit:cover;flex-shrink:0">'
        : '<div style="width:' + avatarSize + 'px;height:' + avatarSize + 'px;border-radius:50%;background:' + avatarBg + ';color:' + avatarTextColor + ';display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">' + esc(initials) + '</div>';
      var photoHtml = r.settings.photo
        ? '<img class="vx-review-photo" src="' + esc(r.settings.photo) + '" alt="Review photo" loading="lazy">'
        : '';
      return '<article class="vx-review-card"' + (index >= initialReviews ? ' hidden' : '') + ' style="background:' + cardBg + ';border:1px solid ' + cardBorder + ';border-radius:' + cardRadius + 'px;padding:' + cardPadding + 'px">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">' +
          avatarHtml +
          '<div><div style="font-weight:700;font-size:14px">' + esc(r.settings.name) + '</div><div style="font-size:12px;color:' + cv('color-text-muted') + '">' + esc(r.settings.date || 'Recently') + '</div></div>' +
        '</div>' +
        '<div style="color:' + starColor + ';font-size:14px;margin-bottom:8px;letter-spacing:1px">' + starsHtml + '</div>' +
        '<div style="font-size:14px;color:' + cv('color-text-muted') + ';line-height:1.6">' + esc(r.settings.text) + '</div>' +
        photoHtml +
      '</article>';
    }).join('');
    var loadMoreHtml = reviews.length > initialReviews
      ? '<button class="vx-reviews__load-more" type="button" data-vx-load-more>' + esc(loadMoreLabel) + '</button>'
      : '';

    var css = '<style>' +
      '.vx-reviews{padding:' + paddingTop + 'px 20px ' + paddingBottom + 'px;max-width:' + maxWidth + 'px;margin:0 auto}' +
      '.vx-reviews__heading{text-align:center;margin-bottom:28px}' +
      '.vx-reviews__heading h2{font-family:' + cv('font-heading') + ';font-size:calc(clamp(30px,4vw,42px) * var(--section-title-scale,1));font-weight:700;letter-spacing:-.8px;color:' + titleColor + ';margin-bottom:8px}' +
      '.vx-reviews__subtitle{color:' + subtitleColor + ';font-size:15px;margin-bottom:20px}' +
      '.vx-reviews__summary{display:flex;align-items:center;justify-content:space-between;gap:24px;background:' + cardBg + ';border:1px solid ' + cardBorder + ';border-radius:12px;padding:26px 30px;margin-bottom:18px}' +
      '.vx-reviews__score{display:flex;align-items:center;gap:14px}.vx-reviews__score strong{font-family:' + cv('font-heading') + ';font-size:44px;line-height:1}.vx-reviews__score small{color:' + subtitleColor + ';font-size:14px}' +
      '.vx-reviews__stars{color:' + starColor + ';font-size:18px;letter-spacing:2px}' +
      '.vx-reviews__grid{display:grid;grid-template-columns:repeat(' + columns + ',minmax(0,1fr));gap:14px}' +
      '.vx-review-card{width:100%;text-align:left}' +
      '.vx-review-photo{display:block;width:auto;max-width:100%;max-height:320px;object-fit:cover;border-radius:10px;margin-top:14px}' +
      '.vx-reviews__load-more{display:block;margin:20px auto 0;padding:12px 24px;border:1px solid ' + cardBorder + ';border-radius:10px;background:transparent;color:#fff;font:600 14px ' + cv('font-body') + ';cursor:pointer;transition:border-color .2s,background .2s}' +
      '.vx-reviews__load-more:hover{border-color:' + writeBtnBg + ';background:rgba(255,255,255,.04)}' +
      '@media(max-width:600px){.vx-reviews__grid{grid-template-columns:1fr}.vx-reviews__summary{align-items:flex-start;flex-direction:column;padding:22px}.vx-reviews__score strong{font-size:38px}}' +
      '</style>';

    return css +
      '<section class="vx-reviews">' +
      '<div class="vx-reviews__heading">' +
        '<h2>' + esc(title) + '</h2>' +
        '<p class="vx-reviews__subtitle">' + esc(subtitle) + '</p>' +
      '</div>' +
      '<div class="vx-reviews__summary">' +
        '<div class="vx-reviews__score"><strong>' + esc(rating) + '</strong><div><div class="vx-reviews__stars">\u2605\u2605\u2605\u2605\u2605</div><small>' + esc(reviewCount) + ' reviews</small></div></div>' +
        (showWriteButton ? '<button class="vx-write-review" style="display:inline-flex;align-items:center;gap:6px;padding:11px 24px;border-radius:999px;background:' + writeBtnBg + ';color:' + writeBtnText + ';font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:0.03em;cursor:pointer;border:none;transition:box-shadow 0.3s" data-vx-open-review>+ ' + esc(writeButtonLabel) + '</button>' : '') +
      '</div>' +
      '<div class="vx-reviews__grid">' +
        reviewCardsHtml +
      '</div>' +
      loadMoreHtml +
      '</section>';
  }

  function attachReviews(s, root, life) {
    life.listen(root, 'click', function(e) {
      var loadMore = e.target.closest('[data-vx-load-more]');
      if (loadMore) {
        var hiddenReviews = Array.prototype.slice.call(root.querySelectorAll('.vx-review-card[hidden]'));
        hiddenReviews.slice(0, 10).forEach(function(card) { card.hidden = false; });
        if (hiddenReviews.length <= 10) loadMore.remove();
        return;
      }

    });
  }

  // ─── 8. Trust Badges ───────────────────────────────────────────
  function renderTrustBadges(s) {
    var bgColor = s.bg_color || '#000000';
    var borderTop = s.border_top || '#1a1a1a';
    var borderBot = s.border_bot || '#1a1a1a';
    var iconColor = s.icon_color || '#19d400';
    var textColor = s.text_color || '#ffffff';
    var speed = s.scroll_speed != null ? s.scroll_speed : 30;
    var barHeight = s.bar_height != null ? s.bar_height : 44;
    var showSep = s.show_separator !== false;

    var badgesHtml = '';
    for (var i = 1; i <= 4; i++) {
      var text = s['badge_' + i + '_text'];
      var icon = s['badge_' + i + '_icon'] || 'star';
      if (text) {
        badgesHtml += '<span class="vx-trust-badge"><span class="vx-trust-badge__icon" style="color:' + iconColor + '">' + getIcon(icon) + '</span>' + esc(text) + '</span>';
        if (showSep) badgesHtml += '<span class="vx-trust-badge__sep">&bull;</span>';
      }
    }
    if (!badgesHtml) return '';

    var css = '<style>' +
      '.vx-trust-badges{background:' + bgColor + ';border-top:1px solid ' + borderTop + ';border-bottom:1px solid ' + borderBot + ';overflow:hidden;height:' + barHeight + 'px;display:flex;align-items:center}' +
      '.vx-trust-badges:hover .vx-trust-badges__track{animation-play-state:paused}' +
      '.vx-trust-badges__track{display:flex;align-items:center;gap:0;white-space:nowrap;animation:vxTrustScroll ' + speed + 's linear infinite;will-change:transform}' +
      '.vx-trust-badge{display:inline-flex;align-items:center;gap:8px;padding:0 28px;font-size:13px;font-weight:600;color:' + textColor + ';white-space:nowrap;flex-shrink:0}' +
      '.vx-trust-badge__icon{display:flex;align-items:center;flex-shrink:0}.vx-trust-badge__icon svg{width:16px;height:16px}' +
      '.vx-trust-badge__sep{color:' + iconColor + ';font-size:10px;opacity:0.5;padding:0 4px}' +
      '@keyframes vxTrustScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}' +
      '</style>';

    return css +
      '<div class="vx-trust-badges"><div class="vx-trust-badges__track">' + badgesHtml + badgesHtml + '</div></div>';
  }

  // ─── 9. Footer ─────────────────────────────────────────────────
  function renderFooter(s) {
    var bg = s.bg_color || '#000000';
    var borderTop = s.border_color || '#1a1a1a';
    var brandColor = s.brand_color || '#ffffff';
    var linkColor = s.link_color || '#6b7280';
    var linkHover = s.link_hover_color || '#ffffff';
    var copyColor = s.copyright_color || '#6b7280';
    var iconColor = s.social_icon_color || '#19d400';
    var iconSize = s.social_icon_size != null ? s.social_icon_size : 20;
    var bText = s.brand_text || brandName || 'Vexel';
    var brandFontSize = s.brand_font_size != null ? s.brand_font_size : 26;
    var paddingTop = s.padding_top != null ? s.padding_top : 40;
    var paddingBottom = s.padding_bottom != null ? s.padding_bottom : 40;
    var linkGap = s.link_gap != null ? s.link_gap : 24;
    var ctaText = s.cta_text || 'Get this store design';
    var ctaUrl = s.cta_url || 'https://vexelthemes.com';
    var ctaColor = s.cta_color || '#19d400';
    var ctaTextColor = s.cta_text_color || '#1a1a1a';
    var ctaRadius = s.cta_radius != null ? s.cta_radius : 12;
    var footerLogo = s.logo_url || logoUrl || null;
    var logoHeight = s.logo_height != null ? s.logo_height : 40;

    var brandHtml = footerLogo
      ? '<div style="margin-bottom:' + (s.content_gap != null ? s.content_gap : 24) + 'px"><img src="' + esc(footerLogo) + '" alt="' + esc(bText) + '" style="height:' + logoHeight + 'px;margin:0 auto"></div>'
      : '<div style="font-family:' + cv('font-heading') + ';font-size:' + brandFontSize + 'px;font-weight:700;letter-spacing:-0.02em;color:' + brandColor + ';margin-bottom:' + (s.content_gap != null ? s.content_gap : 24) + 'px">' + esc(bText) + '</div>';

    var socialHtml = '';
    var socialLinks = [
      { url: s.instagram_url, icon: icons.instagram, label: 'Instagram' },
      { url: s.tiktok_url, icon: icons.tiktok, label: 'TikTok' },
      { url: s.youtube_url, icon: icons.youtube, label: 'YouTube' },
      { url: s.discord_url, icon: icons.discord, label: 'Discord' }
    ];
    var hasSocials = socialLinks.some(function(l) { return l.url; });
    if (hasSocials) {
      socialHtml = '<div style="display:flex;justify-content:center;gap:16px;margin-bottom:' + (s.content_gap != null ? s.content_gap : 24) + 'px">';
      socialLinks.forEach(function(l) {
        if (l.url) {
          socialHtml += '<a href="' + esc(l.url) + '" target="_blank" rel="noopener" aria-label="' + l.label + '" style="display:flex;align-items:center;justify-content:center;width:' + (iconSize + 16) + 'px;height:' + (iconSize + 16) + 'px;color:' + iconColor + ';transition:transform 0.2s,opacity 0.2s;opacity:0.8;text-decoration:none"><span style="width:' + iconSize + 'px;height:' + iconSize + 'px;display:flex">' + l.icon + '</span></a>';
        }
      });
      socialHtml += '</div>';
    }

    var policyHtml = '';
    if (s.show_policies !== false) {
      policyHtml = '<div class="vx-footer__policies" style="display:flex;justify-content:center;align-items:center;gap:' + linkGap + 'px;flex-wrap:wrap;margin-bottom:' + (s.content_gap != null ? s.content_gap : 24) + 'px">' +
        '<a href="/policies/refund-policy" style="color:' + linkColor + ';font-size:13px;text-decoration:none">' + esc(s.label_refund || 'Refund') + '</a>' +
        '<a href="/policies/shipping-policy" style="color:' + linkColor + ';font-size:13px;text-decoration:none">' + esc(s.label_shipping || 'Shipping') + '</a>' +
        '<a href="/policies/privacy-policy" style="color:' + linkColor + ';font-size:13px;text-decoration:none">' + esc(s.label_privacy || 'Privacy') + '</a>' +
        '<a href="/policies/terms-of-service" style="color:' + linkColor + ';font-size:13px;text-decoration:none">' + esc(s.label_terms || 'Terms') + '</a>' +
      '</div>';
    }

    var copyrightHtml = '';
    if (s.show_copyright !== false) {
      copyrightHtml = '<div style="color:' + copyColor + ';font-size:12px">&copy; ' + new Date().getFullYear() + ' ' + esc(s.copyright_name || bText) + '. All rights reserved.</div>';
    }

    var ctaHtml = '';
    if (s.show_cta !== false) {
      ctaHtml = '<div style="margin-top:' + (s.bottom_gap != null ? s.bottom_gap : 12) + 'px"><a href="' + esc(ctaUrl) + '" target="_blank" rel="noopener noreferrer" data-vx-attribution class="vx-footer__badge" style="--vx-footer-cta-bg:' + ctaColor + ';--vx-footer-cta-text:' + ctaTextColor + ';--vx-footer-cta-radius:' + ctaRadius + 'px"><span>' + esc(ctaText) + '</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg></a></div>';
    }
    var attributionHtml = s.show_cta === false
      ? '<a href="https://vexelthemes.com" target="_blank" rel="noopener" data-vx-attribution style="display:inline-block;margin-top:18px;color:' + linkColor + ';font-size:11px;text-decoration:none;opacity:.6">Powered by Vexel</a>'
      : '';

    return '<style>.vx-footer__policies a:hover{color:' + linkHover + '!important}.vx-footer__badge{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:var(--vx-footer-cta-radius);font-family:' + cv('font-body') + ';font-size:12px;font-weight:700;text-decoration:none;background:var(--vx-footer-cta-bg);color:var(--vx-footer-cta-text);box-shadow:0 18px 40px -15px color-mix(in srgb,var(--vx-footer-cta-bg) 85%,transparent),inset 0 3px 6px rgba(255,255,255,.7),inset 0 -3px 6px rgba(0,0,0,.2);transition:transform .2s,box-shadow .2s,background .2s}.vx-footer__badge:hover{transform:translateY(-1px);background:color-mix(in srgb,var(--vx-footer-cta-bg),#fff 12%);box-shadow:0 18px 40px -15px color-mix(in srgb,var(--vx-footer-cta-bg) 85%,transparent),inset 0 3px 6px rgba(255,255,255,.7),inset 0 -3px 6px rgba(0,0,0,.2)}</style>' +
    '<footer class="vx-footer" data-vx-footer style="background:' + bg + ';border-top:1px solid ' + borderTop + ';padding:' + paddingTop + 'px 16px ' + paddingBottom + 'px;text-align:center">' +
      brandHtml + socialHtml + policyHtml + copyrightHtml + ctaHtml + attributionHtml +
    '</footer>';
  }

  // ─── 10. Cart Drawer ───────────────────────────────────────────
  function renderCartDrawer(s) {
    var drawerBg = s.drawer_bg || '#0a0a0a';
    var overlayOpacity = (s.overlay_opacity != null ? s.overlay_opacity : 60) / 100;
    var borderColor = s.border_color || '#1a1a1a';
    var textColor = s.text_color || '#ffffff';
    var mutedColor = s.muted_color || '#6b7280';
    var accent = s.accent_color || '#19d400';
    var btnText = s.btn_text_color || '#000000';
    var itemBg = s.item_bg || '#111111';
    var drawerWidth = s.drawer_width != null ? s.drawer_width : 400;
    var drawerTitle = s.title || 'Your Cart';
    var checkoutText = s.checkout_text || 'Checkout';

    var css = '<style>' +
      '.vx-cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,' + overlayOpacity + ');z-index:9999;opacity:0;visibility:hidden;transition:opacity 0.3s ease,visibility 0.3s ease;cursor:pointer}' +
      '.vx-cart-overlay.is-open{opacity:1;visibility:visible}' +
      '.vx-cart-drawer{position:fixed;top:0;right:0;bottom:0;width:' + drawerWidth + 'px;max-width:100vw;background:' + drawerBg + ';border-left:1px solid ' + borderColor + ';z-index:10000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform 0.35s cubic-bezier(0.16,1,0.3,1)}' +
      '.vx-cart-drawer.is-open{transform:translateX(0)}' +
      '.vx-cart-drawer__header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid ' + borderColor + ';flex-shrink:0}' +
      '.vx-cart-drawer__title{font-family:' + cv('font-heading') + ';font-size:18px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:' + textColor + '}' +
      '.vx-cart-drawer__count{font-family:' + cv('font-body') + ';font-size:13px;font-weight:500;color:' + mutedColor + ';margin-left:8px}' +
      '.vx-cart-drawer__close{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;color:' + mutedColor + ';transition:color 0.2s,background 0.2s;cursor:pointer;background:none;border:none}' +
      '.vx-cart-drawer__close:hover{color:' + textColor + ';background:' + itemBg + '}.vx-cart-drawer__close svg{width:18px;height:18px}' +
      '.vx-cart-drawer__body{flex:1;overflow-y:auto;padding:16px 24px;scrollbar-width:none}.vx-cart-drawer__body::-webkit-scrollbar{display:none}' +
      '.vx-cart-item{display:flex;gap:14px;padding:16px;background:' + itemBg + ';border-radius:12px;margin-bottom:12px;position:relative}' +
      '.vx-cart-item__img{width:72px;height:72px;border-radius:8px;overflow:hidden;flex-shrink:0;background:' + borderColor + '}.vx-cart-item__img img{width:100%;height:100%;object-fit:cover}' +
      '.vx-cart-item__info{flex:1;display:flex;flex-direction:column;gap:4px;min-width:0}' +
      '.vx-cart-item__title{font-size:14px;font-weight:600;color:' + textColor + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '.vx-cart-item__variant{font-size:12px;color:' + mutedColor + '}' +
      '.vx-cart-item__price{font-size:14px;font-weight:700;color:' + accent + ';margin-top:auto}' +
      '.vx-cart-item__remove{position:absolute;top:12px;right:12px;width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:' + mutedColor + ';cursor:pointer;transition:color 0.2s;border-radius:4px;background:none;border:none}.vx-cart-item__remove:hover{color:#ef4444}.vx-cart-item__remove svg{width:14px;height:14px}' +
      '.vx-cart-item__qty{display:flex;align-items:center;margin-top:8px;width:fit-content;border:1px solid ' + borderColor + ';border-radius:6px;overflow:hidden}' +
      '.vx-cart-item__qty button{width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:' + mutedColor + ';font-size:14px;font-weight:600;cursor:pointer;background:transparent;border:none}' +
      '.vx-cart-item__qty button:hover{color:' + textColor + '}' +
      '.vx-cart-item__qty span{width:32px;text-align:center;font-size:13px;font-weight:600;color:' + textColor + '}' +
      '.vx-cart-drawer__footer{flex-shrink:0;padding:20px 24px;border-top:1px solid ' + borderColor + '}' +
      '.vx-cart-drawer__checkout{display:block;width:100%;padding:14px;font-family:' + cv('font-body') + ';font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;text-align:center;color:' + btnText + ';background:linear-gradient(180deg,color-mix(in srgb,' + accent + ' 85%,#ffffff) 0%,' + accent + ' 50%,color-mix(in srgb,' + accent + ' 85%,#000000) 100%);border:1.5px solid rgba(255,255,255,0.3);border-radius:50px;cursor:pointer;text-decoration:none;box-shadow:inset 0 1px 0 rgba(255,255,255,0.25),0 0 20px color-mix(in srgb,' + accent + ' 25%,transparent),0 2px 8px rgba(0,0,0,0.3);transition:transform 0.2s}' +
      '.vx-cart-drawer__checkout:hover{transform:translateY(-2px)}' +
      '.vx-cart-item.is-loading{opacity:0.5;pointer-events:none}' +
      '@media(max-width:480px){.vx-cart-drawer{width:100vw}}' +
      '</style>';

    return css +
      '<div class="vx-cart-overlay" id="vx-cart-overlay"></div>' +
      '<div class="vx-cart-drawer" id="vx-cart-drawer" aria-label="Shopping cart">' +
        '<div class="vx-cart-drawer__header">' +
          '<div style="display:flex;align-items:baseline"><span class="vx-cart-drawer__title">' + esc(drawerTitle) + '</span><span class="vx-cart-drawer__count" id="vx-cart-count"></span></div>' +
          '<button class="vx-cart-drawer__close" id="vx-cart-close" aria-label="Close cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
        '</div>' +
        '<div class="vx-cart-drawer__body" id="vx-cart-body"></div>' +
        '<div class="vx-cart-drawer__footer" id="vx-cart-footer" style="display:none">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><span style="font-size:14px;font-weight:500;color:' + mutedColor + ';text-transform:uppercase;letter-spacing:0.05em">Subtotal</span><span style="font-family:' + cv('font-heading') + ';font-size:20px;font-weight:700;color:' + textColor + '" id="vx-cart-subtotal"></span></div>' +
          '<a href="/checkout" class="vx-cart-drawer__checkout">' + esc(checkoutText) + '</a>' +
        '</div>' +
      '</div>';
  }

  function attachCartDrawer(s, root, life) {
    var overlay = root.querySelector('#vx-cart-overlay');
    var drawer = root.querySelector('#vx-cart-drawer');
    var closeBtn = root.querySelector('#vx-cart-close');
    var body = root.querySelector('#vx-cart-body');
    var footer = root.querySelector('#vx-cart-footer');
    var countEl = root.querySelector('#vx-cart-count');
    var subtotalEl = root.querySelector('#vx-cart-subtotal');

    if (!drawer) return;

    var previousOverflow = '';
    function open() {
      if (!drawer.classList.contains('is-open')) previousOverflow = document.body.style.overflow;
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      refreshCart();
    }
    function close() {
      if (!drawer.classList.contains('is-open')) return;
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = previousOverflow;
    }

    life.listen(overlay, 'click', close);
    life.listen(closeBtn, 'click', close);
    life.listen(document, 'keydown', function(e) { if (e.key === 'Escape') close(); });

    function refreshCart() {
      fetch('/cart.js').then(function(r) { return r.json(); }).then(function(cart) { renderCart(cart); }).catch(function() {});
    }

    function renderCart(cart) {
      var badge = document.getElementById('vx-cart-badge');
      if (badge) {
        if (cart.item_count > 0) { badge.textContent = cart.item_count; badge.classList.add('has-items'); }
        else { badge.classList.remove('has-items'); }
      }
      countEl.textContent = cart.item_count > 0 ? '(' + cart.item_count + ')' : '';

      if (cart.item_count === 0) {
        body.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 20px;gap:16px">' +
          '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4;color:#6b7280"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' +
          '<p style="font-size:15px;color:#6b7280">Your cart is empty</p>' +
          '<a href="/" style="font-size:14px;font-weight:600;color:#19d400;text-decoration:none">Continue shopping</a>' +
        '</div>';
        footer.style.display = 'none';
        return;
      }

      footer.style.display = '';
      subtotalEl.textContent = formatMoney(cart.total_price);

      var html = '';
      cart.items.forEach(function(item) {
        var imgSrc = item.image ? item.image.replace(/(\.[a-z]+)(\?|$)/, '_180x$1$2') : '';
        html += '<div class="vx-cart-item" data-key="' + item.key + '">' +
          '<div class="vx-cart-item__img">' + (imgSrc ? '<img src="' + imgSrc + '" alt="' + esc(item.title) + '" loading="lazy">' : '') + '</div>' +
          '<div class="vx-cart-item__info">' +
            '<span class="vx-cart-item__title">' + esc(item.product_title) + '</span>' +
            (item.variant_title ? '<span class="vx-cart-item__variant">' + esc(item.variant_title) + '</span>' : '') +
            '<div class="vx-cart-item__qty">' +
              '<button data-action="minus">\u2212</button><span>' + item.quantity + '</span><button data-action="plus">+</button>' +
            '</div>' +
            '<span class="vx-cart-item__price">' + formatMoney(item.final_line_price) + '</span>' +
          '</div>' +
          '<button class="vx-cart-item__remove" data-action="remove" aria-label="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
        '</div>';
      });
      body.innerHTML = html;
    }

    life.listen(body, 'click', function(e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var item = btn.closest('.vx-cart-item');
      var key = item.dataset.key;
      var action = btn.dataset.action;
      var qtySpan = item.querySelector('.vx-cart-item__qty span');
      var qty = parseInt(qtySpan.textContent, 10);
      if (action === 'minus') qty = Math.max(0, qty - 1);
      else if (action === 'plus') qty += 1;
      else if (action === 'remove') qty = 0;
      item.classList.add('is-loading');
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: qty })
      }).then(function(r) { return r.json(); }).then(function(cart) { renderCart(cart); }).catch(function() { item.classList.remove('is-loading'); });
    });

    life.listen(document, 'cart:open', open);
    life.listen(document, 'cart:refresh', refreshCart);
    var api = { open: open, close: close, refresh: refreshCart };
    window.CartDrawer = api;
    life.cleanup(function() {
      close();
      if (window.CartDrawer === api) delete window.CartDrawer;
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER ENGINE
  // ═══════════════════════════════════════════════════════════════

  function createLifecycle() {
    var cleanups = [];
    var active = true;
    var timeouts = new Set();
    return {
      cleanup: function(handler) { cleanups.push(handler); },
      listen: function(target, type, handler, options) {
        target.addEventListener(type, handler, options);
        cleanups.push(function() { target.removeEventListener(type, handler, options); });
      },
      interval: function(handler, delay) {
        var id = setInterval(handler, delay);
        cleanups.push(function() { clearInterval(id); });
      },
      timeout: function(handler, delay) {
        var id = setTimeout(function() { timeouts.delete(id); if (active) handler(); }, delay);
        timeouts.add(id);
      },
      destroy: function() {
        active = false;
        timeouts.forEach(function(id) { clearTimeout(id); });
        timeouts.clear();
        cleanups.forEach(function(cleanup) { cleanup(); });
        cleanups = [];
      }
    };
  }

  var sectionSequence = 0;
  function scopeSectionStyles(shell) {
    var selector = '[data-vx-instance="' + shell.dataset.vxInstance + '"]';
    function scopeRules(rules) {
      Array.prototype.forEach.call(rules, function(rule) {
        if (rule.type === 1) {
          rule.selectorText = rule.selectorText.split(',').map(function(part) { return selector + ' ' + part.trim(); }).join(',');
        } else if (rule.cssRules && rule.type !== 7) {
          scopeRules(rule.cssRules);
        }
      });
    }
    shell.querySelectorAll('style').forEach(function(style) {
      if (!style.sheet) return;
      scopeRules(style.sheet.cssRules);
    });
  }

  var renderers = {
    'urgency-bar': { render: renderUrgencyBar, attach: attachUrgencyBar },
    'header': { render: renderHeader, attach: attachHeader },
    'hero': { render: renderHero, attach: attachHero },
    'product-grid': { render: renderProductGrid },
    'testimonials': { render: renderTestimonials },
    'faq': { render: renderFAQ, attach: attachFAQ },
    'reviews': { render: renderReviews, attach: attachReviews },
    'trust-badges': { render: renderTrustBadges },
    'footer': { render: renderFooter },
    'cart-drawer': { render: renderCartDrawer, attach: attachCartDrawer }
  };

  function renderAllSections(root) {
    root = root || document;
    var shells = Array.prototype.slice.call(root.querySelectorAll('[data-vx-section]'));
    if (root.matches && root.matches('[data-vx-section]')) shells.unshift(root);
    var attachQueue = [];
    shells.forEach(function(shell) {
      var type = shell.getAttribute('data-vx-section');
      var renderer = renderers[type];
      if (!renderer) return;
      if (shell.vxLifecycle) shell.vxLifecycle.destroy();
      shell.vxLifecycle = createLifecycle();
      shell.dataset.vxInstance = String(++sectionSequence);
      var sectionScope = shell.closest('.shopify-section') || document;
      var settings = {};
      var settingsEl = sectionScope.querySelector('script[data-vx-settings="' + type + '"]');
      if (settingsEl) {
        try { settings = JSON.parse(settingsEl.textContent); } catch(e) {}
      }
      var data = null;
      var dataEl = sectionScope.querySelector('script[data-vx-products="' + type + '"]') ||
                   sectionScope.querySelector('script[data-vx-blocks="' + type + '"]');
      if (dataEl) {
        try { data = JSON.parse(dataEl.textContent); } catch(e) {}
      }
      shell.innerHTML = (data !== null ? renderer.render(settings, data) : renderer.render(settings)) || '';
      scopeSectionStyles(shell);
      shell.classList.remove('vx-shell--loading');
      shell.classList.add('vx-shell--loaded');
      if (renderer.attach) attachQueue.push({ attach: renderer.attach, settings: settings, shell: shell });
    });
    attachQueue.forEach(function(item) { item.attach(item.settings, item.shell, item.shell.vxLifecycle); });
  }

  document.addEventListener('shopify:section:load', function(event) { renderAllSections(event.target); });
  document.addEventListener('shopify:section:unload', function(event) {
    event.target.querySelectorAll('[data-vx-section]').forEach(function(shell) {
      if (shell.vxLifecycle) shell.vxLifecycle.destroy();
      if (shell.dataset.vxSection === 'urgency-bar') document.documentElement.style.setProperty('--urgency-bar-height', '0px');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // BOOT
  // ═══════════════════════════════════════════════════════════════

  function boot() {
    renderAllSections();
    attachProductGrid();
  }

  // ─── Start ─────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
