/**
 * Vexel Theme — License Validation & Protection System
 */
(function() {
  'use strict';

  var cfgEl = document.getElementById('vx-config');
  if (!cfgEl || cfgEl.getAttribute('data-vx-integrity') !== '1') {
    return;
  }

  var VX = window.__VX;
  if (!VX) return;

  var licenseKey = (VX.k || '').trim();
  var serverUrl = (VX.s || '').trim().replace(/\/+$/, '');
  var domain = VX.d || window.location.hostname;
  var permanentDomain = VX.pd || '';
  var storeUrl = VX.u || 'https://vexelthemes.com';
  var storeName = VX.n || 'Vexel Themes';
  var loader = document.getElementById('vx-loader');

  function vxCheck(a, b, c) {
    var combined = a + b + c + 'VXL9';
    var hash = 5381;
    for (var i = 0; i < combined.length; i++) {
      hash = ((hash << 5) + hash) + combined.charCodeAt(i);
      hash = hash & 0xFFFF;
    }
    var hex = hash.toString(16).toUpperCase();
    while (hex.length < 4) hex = '0' + hex;
    return hex;
  }

  function isValidKeyFormat(key) {
    var parts = key.split('-');
    if (parts.length !== 4) return false;
    for (var i = 0; i < 4; i++) {
      if (parts[i].length !== 4) return false;
      if (!/^[0-9A-Fa-f]{4}$/.test(parts[i])) return false;
    }
    var expected = vxCheck(parts[0].toUpperCase(), parts[1].toUpperCase(), parts[2].toUpperCase());
    return expected === parts[3].toUpperCase();
  }

  function dismissLoader() {
    if (loader) {
      loader.classList.add('vx-ok');
      setTimeout(function() { loader.style.display = 'none'; }, 500);
    }
    initScrollReveal();
    initFooterProtection();
    initIntegrityMonitor();
  }

  function showSetupPage() {
    if (!loader) return;
    var setup = document.createElement('div');
    setup.className = 'vx-setup';
    setup.innerHTML = '<div style="text-align:center;padding:40px 20px;max-width:500px;">' +
      '<div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;">' +
      '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#ff4444" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>' +
      '</div>' +
      '<h1 style="font-family:inherit;font-size:22px;font-weight:700;color:#fff;margin-bottom:12px;">License Required</h1>' +
      '<p style="color:#9ca3af;font-size:14px;line-height:1.6;margin-bottom:28px;">This theme requires a valid license key. Enter your license key in Theme Settings.</p>' +
      '<a href="' + storeUrl + '" target="_blank" rel="noopener" style="display:inline-block;padding:14px 32px;background:#fff;color:#000;font-weight:700;font-size:14px;border-radius:999px;text-decoration:none;text-transform:uppercase;letter-spacing:0.05em;">Get a License</a>' +
      '<p style="color:#6b7280;font-size:12px;margin-top:20px;">Powered by ' + storeName + '</p>' +
      '</div>';
    loader.appendChild(setup);
    loader.classList.add('vx-setup-show');
  }

  function showInvalidPage() {
    if (!loader) return;
    var setup = document.createElement('div');
    setup.className = 'vx-setup';
    setup.innerHTML = '<div style="text-align:center;padding:40px 20px;max-width:500px;">' +
      '<div style="width:64px;height:64px;border-radius:50%;background:rgba(255,68,68,0.1);border:2px solid rgba(255,68,68,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;">' +
      '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#ff4444" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' +
      '</div>' +
      '<h1 style="font-family:inherit;font-size:22px;font-weight:700;color:#fff;margin-bottom:12px;">Invalid License</h1>' +
      '<p style="color:#9ca3af;font-size:14px;line-height:1.6;margin-bottom:28px;">This license key is not valid.</p>' +
      '<a href="' + storeUrl + '" target="_blank" rel="noopener" style="display:inline-block;padding:14px 32px;background:#ff4444;color:#fff;font-weight:700;font-size:14px;border-radius:999px;text-decoration:none;text-transform:uppercase;letter-spacing:0.05em;">Get a Valid License</a>' +
      '</div>';
    loader.appendChild(setup);
    loader.classList.add('vx-setup-show');
  }

  function killSwitch() {
    var style = document.createElement('style');
    style.id = 'vx-kill';
    style.textContent = 'body>*:not(#vx-loader){display:none!important}#vx-loader{display:flex!important;opacity:1!important;pointer-events:all!important}';
    document.head.appendChild(style);
  }

  // ─── NO LICENSE KEY ──────────────────────────────────────────
  if (!licenseKey) {
    showSetupPage();
    return;
  }

  // ─── "OG" UNIVERSAL KEY ──────────────────────────────────────
  if (licenseKey.toLowerCase() === 'og') {
    window.addEventListener('load', function() { setTimeout(dismissLoader, 200); });
    if (document.readyState === 'complete') setTimeout(dismissLoader, 200);
    return;
  }

  // ─── LOCAL CHECKSUM VALIDATION ───────────────────────────────
  if (!isValidKeyFormat(licenseKey)) {
    showInvalidPage();
    killSwitch();
    return;
  }

  // ─── KEY IS VALID — dismiss loader ───────────────────────────
  window.addEventListener('load', function() { setTimeout(dismissLoader, 200); });
  if (document.readyState === 'complete') setTimeout(dismissLoader, 200);

  // ─── SCROLL REVEAL ───────────────────────────────────────────
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

  // ─── FOOTER PROTECTION ──────────────────────────────────────
  function initFooterProtection() {
    var footerCheck = setInterval(function() {
      var footer = document.querySelector('footer, [class*="footer"], #shopify-section-footer, .footer-section');
      if (!footer || footer.offsetHeight === 0) {
        killSwitch();
        clearInterval(footerCheck);
        var ldr = document.getElementById('vx-loader');
        if (ldr) { ldr.classList.remove('vx-ok'); ldr.style.display = 'flex'; }
      }
    }, 3000);
  }

  // ─── INTEGRITY MONITOR ──────────────────────────────────────
  function initIntegrityMonitor() {
    setInterval(function() {
      var cfg = document.getElementById('vx-config');
      if (!cfg) { killSwitch(); return; }
      if (!window.__VX || !window.__VX._v) { killSwitch(); return; }
    }, 5000);
  }

})();