/**
 * OGVendors Theme Loader — The Protection Script
 *
 * This is the UN-OBFUSCATED source. Run `node build.js` to create
 * the obfuscated version for production.
 *
 * How it works:
 * 1. Reads ScaledConfig from the theme (licenseKey + shopDomain)
 * 2. Checks for required DOM elements (anti-removal)
 * 3. Sends handshake to the Railway backend
 * 4. If valid → injects CSS + executes JS
 * 5. If invalid → injects kill-switch overlay that hides everything
 * 6. If server unreachable → graceful fallback with timeout
 *
 * Anti-Theft Features:
 * - If this script is removed, the theme has NO CSS layout at all
 * - If someone copies the theme files without the license, kill-switch activates
 * - debugProtection in obfuscated version crashes on DevTools
 * - selfDefending detects code modification/reformatting
 * - Domain is checked server-side so the license can't be reused on other stores
 */

(function () {
  'use strict';

  // ─── Configuration ──────────────────────────────────────────
  var config = window.ScaledConfig;
  if (!config || !config.licenseKey || !config.shopDomain) {
    showLicenseError('missing_config', 'Theme configuration is missing. Please contact support.');
    return;
  }

  var API_URL = config.apiUrl || 'https://your-app.up.railway.app';
  var LICENSE_KEY = config.licenseKey;
  var SHOP_DOMAIN = config.shopDomain;
  var PERMANENT_DOMAIN = config.permanentDomain || '';
  var TIMEOUT_MS = 8000;
  var RETRY_COUNT = 2;
  var RETRY_DELAY = 1500;

  // ─── Anti-Removal Check ─────────────────────────────────────
  // If key DOM elements are missing, someone might have stripped the theme
  function checkDOMIntegrity() {
    // The footer section must exist — if removed, the theme was tampered with
    var footer = document.getElementById('shopify-section-footer') ||
                 document.querySelector('[class*="footer"]') ||
                 document.querySelector('footer');
    return !!footer;
  }

  // ─── Handshake with Server ──────────────────────────────────
  function loadThemeContent(retryNum) {
    retryNum = retryNum || 0;

    var controller = new AbortController();
    var timeoutId = setTimeout(function () {
      controller.abort();
    }, TIMEOUT_MS);

    fetch(API_URL + '/api/v1/load', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        licenseKey: LICENSE_KEY,
        domain: SHOP_DOMAIN,
        permanentDomain: PERMANENT_DOMAIN
      }),
      signal: controller.signal
    })
    .then(function (response) {
      clearTimeout(timeoutId);

      if (response.status === 403) {
        return response.json().then(function (data) {
          // License invalid — inject kill-switch
          if (data.killCSS) {
            injectCSS(data.killCSS);
          }
          showLicenseError(data.error, data.message);
        });
      }

      if (response.status === 429) {
        // Rate limited — retry after delay
        if (retryNum < RETRY_COUNT) {
          setTimeout(function () {
            loadThemeContent(retryNum + 1);
          }, RETRY_DELAY * (retryNum + 1));
        }
        return;
      }

      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }

      return response.json();
    })
    .then(function (data) {
      if (!data || data.error) return;

      // ═══ SUCCESS — Inject the Brain ═══

      // 1. Inject Critical CSS
      if (data.css) {
        injectCSS(data.css);
      }

      // 2. Execute Theme JS
      if (data.js) {
        try {
          var fn = new Function(data.js);
          fn();
        } catch (e) {
          // Silent fail — don't expose errors
        }
      }

      // 3. Mark as loaded
      document.documentElement.classList.add('scaled-loaded');
      document.documentElement.dataset.scaledVersion = data.version || '1.0.0';

      // 4. Hide loader
      hideLoader();
    })
    .catch(function (err) {
      clearTimeout(timeoutId);

      // Network error / timeout — retry
      if (retryNum < RETRY_COUNT) {
        setTimeout(function () {
          loadThemeContent(retryNum + 1);
        }, RETRY_DELAY * (retryNum + 1));
      } else {
        // All retries failed — show error
        showLicenseError('network_error', 'Unable to load theme. Please check your connection and try again.');
      }
    });
  }

  // ─── CSS Injection ──────────────────────────────────────────
  function injectCSS(css) {
    var style = document.createElement('style');
    style.setAttribute('data-scaled', 'critical');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ─── Kill-Switch — License Error Overlay ────────────────────
  function showLicenseError(errorCode, message) {
    // Remove any existing notices
    var existing = document.querySelector('.scaled-license-notice');
    if (existing) existing.remove();

    var notice = document.createElement('div');
    notice.className = 'scaled-license-notice';
    notice.innerHTML =
      '<div style="text-align:center;max-width:420px;padding:40px;">' +
        '<div style="width:56px;height:56px;margin:0 auto 16px;border-radius:50%;background:rgba(239,68,68,0.1);display:flex;align-items:center;justify-content:center;font-size:24px;">&#9888;</div>' +
        '<h2 style="font-size:20px;font-weight:700;margin-bottom:8px;">License Required</h2>' +
        '<p style="color:#9ca3af;font-size:14px;line-height:1.6;margin-bottom:24px;">' +
          (message || 'This theme requires a valid license. Please contact the theme developer.') +
        '</p>' +
        '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:16px;text-align:left;margin-bottom:16px;">' +
          '<p style="font-size:12px;color:#6b7280;margin-bottom:8px;">To resolve this:</p>' +
          '<p style="font-size:12px;color:#9ca3af;">1. Check your license key in theme settings</p>' +
          '<p style="font-size:12px;color:#9ca3af;">2. Ensure your domain matches the license</p>' +
          '<p style="font-size:12px;color:#9ca3af;">3. Contact support if the issue persists</p>' +
        '</div>' +
        '<p style="font-size:11px;color:#4b5563;">Error: ' + (errorCode || 'unknown') + '</p>' +
      '</div>';

    // Inject kill-switch CSS if not already present
    if (!document.querySelector('[data-scaled="kill"]')) {
      var killStyle = document.createElement('style');
      killStyle.setAttribute('data-scaled', 'kill');
      killStyle.textContent = 'body>*:not(.scaled-license-notice){display:none!important}.scaled-license-notice{position:fixed!important;inset:0!important;z-index:999999!important;background:#000!important;display:flex!important;align-items:center!important;justify-content:center!important}';
      document.head.appendChild(killStyle);
    }

    document.body.appendChild(notice);
  }

  // ─── Loader Hide ────────────────────────────────────────────
  function hideLoader() {
    var loader = document.getElementById('scaled-loader');
    if (loader) {
      loader.classList.add('hide');
      setTimeout(function () { loader.style.display = 'none'; }, 400);
    }
  }

  // ─── Integrity Monitor ──────────────────────────────────────
  // Watches for someone trying to remove the kill-switch via DevTools
  function startIntegrityMonitor() {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.removedNodes.forEach(function (node) {
          // If someone removes the kill-switch style, re-inject it
          if (node.nodeType === 1 && node.getAttribute && node.getAttribute('data-scaled') === 'kill') {
            document.head.appendChild(node);
          }
          // If someone removes the license notice, re-inject it
          if (node.nodeType === 1 && node.classList && node.classList.contains('scaled-license-notice')) {
            document.body.appendChild(node);
          }
        });
      });
    });

    observer.observe(document.head, { childList: true });
    observer.observe(document.body, { childList: true });
  }

  // ─── Boot Sequence ──────────────────────────────────────────
  function boot() {
    // Wait for footer to exist (Shopify renders sections async)
    var checkCount = 0;
    var maxChecks = 30; // 30 * 200ms = 6 seconds max wait

    function checkAndLoad() {
      checkCount++;

      if (checkDOMIntegrity()) {
        loadThemeContent(0);
        startIntegrityMonitor();
      } else if (checkCount < maxChecks) {
        setTimeout(checkAndLoad, 200);
      } else {
        // Footer never appeared — could be a stripped theme or a non-index page
        // Still try to load content
        loadThemeContent(0);
        startIntegrityMonitor();
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAndLoad);
    } else {
      checkAndLoad();
    }
  }

  boot();
})();
