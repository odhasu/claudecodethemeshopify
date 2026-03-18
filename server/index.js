/**
 * OGVendors Theme Protection Server
 *
 * The "Brain" — serves critical CSS, JS, and section HTML
 * only to licensed Shopify stores. If the license is invalid
 * or the domain doesn't match, returns a 403 with a kill-switch
 * overlay that hides the entire theme.
 *
 * Deploy to Railway: https://railway.app
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const crypto = require('crypto');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Database Setup ─────────────────────────────────────────────
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'licenses.db');
const fs = require('fs');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS licenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    license_key TEXT UNIQUE NOT NULL,
    domain TEXT NOT NULL,
    permanent_domain TEXT,
    store_name TEXT,
    plan TEXT DEFAULT 'standard',
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    expires_at TEXT,
    last_verified_at TEXT,
    request_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS request_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    license_key TEXT,
    domain TEXT,
    ip TEXT,
    user_agent TEXT,
    status TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(license_key);
  CREATE INDEX IF NOT EXISTS idx_licenses_domain ON licenses(domain);
  CREATE INDEX IF NOT EXISTS idx_request_log_created ON request_log(created_at);
`);

// ─── Middleware ──────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

app.use(cors({
  origin: (origin, callback) => {
    // Allow Shopify stores and theme editor
    if (!origin ||
        origin.includes('.myshopify.com') ||
        origin.includes('.shopify.com') ||
        origin.includes('localhost')) {
      callback(null, true);
    } else {
      // Also allow custom domains (checked against license DB)
      callback(null, true); // We validate domain in the route handler
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Rate limiting (simple in-memory)
const rateLimiter = {};
function rateLimit(ip, maxPerMinute = 60) {
  const now = Date.now();
  if (!rateLimiter[ip]) rateLimiter[ip] = [];
  rateLimiter[ip] = rateLimiter[ip].filter(t => now - t < 60000);
  if (rateLimiter[ip].length >= maxPerMinute) return false;
  rateLimiter[ip].push(now);
  return true;
}

// Clean rate limiter every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const ip of Object.keys(rateLimiter)) {
    rateLimiter[ip] = rateLimiter[ip].filter(t => now - t < 60000);
    if (rateLimiter[ip].length === 0) delete rateLimiter[ip];
  }
}, 300000);

// ─── License Helpers ────────────────────────────────────────────
function generateLicenseKey() {
  const segments = [];
  for (let i = 0; i < 4; i++) {
    segments.push(crypto.randomBytes(2).toString('hex').toUpperCase());
  }
  return segments.join('-');
}

function validateLicense(licenseKey, domain) {
  const stmt = db.prepare(`
    SELECT * FROM licenses
    WHERE license_key = ? AND active = 1
  `);
  const license = stmt.get(licenseKey);

  if (!license) return { valid: false, reason: 'invalid_key' };

  // Check expiry
  if (license.expires_at && new Date(license.expires_at) < new Date()) {
    return { valid: false, reason: 'expired' };
  }

  // Check domain match (allow .myshopify.com permanent domain too)
  const normalizedDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '').toLowerCase();
  const licenseDomain = license.domain.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '').toLowerCase();
  const permanentDomain = (license.permanent_domain || '').replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '').toLowerCase();

  if (normalizedDomain !== licenseDomain && normalizedDomain !== permanentDomain) {
    return { valid: false, reason: 'domain_mismatch', expected: licenseDomain };
  }

  // Update last verified
  db.prepare(`
    UPDATE licenses
    SET last_verified_at = datetime('now'), request_count = request_count + 1
    WHERE id = ?
  `).run(license.id);

  return { valid: true, license };
}

function logRequest(licenseKey, domain, ip, userAgent, status) {
  db.prepare(`
    INSERT INTO request_log (license_key, domain, ip, user_agent, status)
    VALUES (?, ?, ?, ?, ?)
  `).run(licenseKey, domain, ip, userAgent, status);
}

// ─── Theme Content ──────────────────────────────────────────────
// Critical CSS that makes the theme work — without it, the theme
// is just empty shells with no layout, colors, or functionality.
function getCriticalCSS(settings) {
  return `
/* ═══ OGVendors Theme — Critical Layout CSS ═══ */
/* This CSS is served from the protection server. Without it,
   the theme Shell has no layout, colors, or visual structure. */

/* Reset & Base */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font-body);background-color:var(--color-bg);color:var(--color-text);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
img{max-width:100%;height:auto;display:block}
button{cursor:pointer;border:none;background:none;font-family:inherit}
.container{max-width:var(--max-width);margin:0 auto;padding:0 20px}
.section-spacing{padding:var(--section-spacing) 0}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

/* Loading Spinner */
.scaled-loader{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999;background:var(--color-bg,#000);display:flex;align-items:center;justify-content:center;transition:opacity 0.4s ease}
.scaled-loader.hide{opacity:0;pointer-events:none}
.scaled-loader__spinner{width:44px;height:44px;position:relative}
.scaled-loader__spinner::before,.scaled-loader__spinner::after{content:'';position:absolute;inset:0;border-radius:50%}
.scaled-loader__spinner::before{border:3px solid transparent;border-top-color:var(--color-accent,#39ff14);border-right-color:var(--color-accent,#39ff14);animation:scaledSpin 1s cubic-bezier(0.68,-0.55,0.27,1.55) infinite}
.scaled-loader__spinner::after{inset:5px;border:2px solid transparent;border-bottom-color:var(--color-accent,#39ff14);border-left-color:var(--color-accent,#39ff14);animation:scaledSpin 0.8s cubic-bezier(0.68,-0.55,0.27,1.55) infinite reverse}
@keyframes scaledSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}

/* Header Pill */
.header-pill-wrapper{position:fixed;top:var(--header-top,16px);left:0;right:0;z-index:999;display:flex;flex-direction:column;align-items:center;padding:0 20px;background:transparent;pointer-events:none;transition:top 0.25s ease-out}
.header-pill{display:flex;align-items:center;justify-content:space-between;max-width:95vw;background:rgba(0,0,0,0.85);border:1px solid rgba(42,42,42,0.8);border-radius:999px;padding:6px;pointer-events:all;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.header-icon-btn{width:40px;height:40px;border-radius:50%;background:rgba(26,26,26,0.9);border:1px solid rgba(42,42,42,0.8);display:flex;align-items:center;justify-content:center;color:#fff;transition:background 0.2s,border-color 0.2s;flex-shrink:0}
.header-icon-btn:hover{background:rgba(42,42,42,0.9);border-color:#444}
.header-icon-btn svg{width:18px;height:18px}
.header-brand{font-family:var(--font-heading);font-size:16px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;color:#fff;white-space:nowrap}
.header-brand a{color:inherit}
.cart-count-badge{position:absolute;top:-4px;right:-4px;background:var(--color-accent);color:#000;font-size:10px;font-weight:800;min-width:18px;height:18px;border-radius:9px;display:none;align-items:center;justify-content:center;padding:0 4px}
.cart-count-badge.has-items{display:flex}
.header-dropdown{max-width:95vw;background:rgba(10,10,10,0.95);border:1px solid rgba(42,42,42,0.8);border-radius:16px;margin-top:8px;padding:8px 0;pointer-events:all;opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity 0.25s,transform 0.25s,visibility 0.25s}
.header-dropdown.open{opacity:1;visibility:visible;transform:translateY(0)}
.header-dropdown nav ul{list-style:none}
.header-dropdown nav a{display:block;padding:14px 20px;font-family:var(--font-heading);font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#fff;transition:color 0.2s,padding-left 0.2s;text-align:center}
.header-dropdown nav a:hover{color:var(--color-accent);padding-left:28px}
.menu-toggle-icon{transition:transform 0.3s}
.menu-toggle-icon.active{transform:rotate(90deg)}

/* Product Grid */
.product-grid-section{position:relative;overflow:hidden}
.product-grid-inner{position:relative;z-index:2;max-width:var(--max-width);margin:0 auto}
.product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--grid-gap)}
@media(max-width:768px){.product-grid{grid-template-columns:repeat(2,1fr)}}
.product-card{background:rgba(17,17,17,0.95);border:1px solid rgba(42,42,42,0.8);border-radius:var(--radius-card);overflow:hidden;transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s;box-shadow:inset 0 0 0 1px rgba(255,255,255,0.03),inset 1.8px 3px 0 -2px rgba(255,255,255,0.15),0 2px 8px rgba(0,0,0,0.4)}
.product-card:hover{transform:translateY(-3px);border-color:var(--color-accent);box-shadow:inset 0 0 0 1px rgba(255,255,255,0.06),0 8px 32px rgba(57,255,20,0.15)}
.product-card-inner{border-radius:calc(var(--radius-card) - 1px);overflow:hidden}
.product-card-image{position:relative;aspect-ratio:1;background:rgba(10,10,10,0.9);overflow:hidden;display:block;cursor:pointer}
.product-card-image img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s}
.product-card:hover .product-card-image img{transform:scale(1.03)}
.product-card-badge{position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.5);color:#fff;font-size:11px;font-weight:700;text-transform:uppercase;padding:4px 12px;border-radius:999px;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);z-index:2}
.product-card-info{padding:14px}
.product-card-title{font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.02em;color:#fff;margin-bottom:8px;line-height:1.3}
.product-card-title a{color:inherit}
.product-card-prices{display:flex;align-items:center;gap:8px;margin-bottom:12px}
.price-sale{color:var(--color-accent);font-weight:800;font-size:16px}
.price-compare{color:rgba(107,114,128,0.9);text-decoration:line-through;font-size:14px}
.product-card-actions{display:flex;gap:8px}
.btn-cart-icon{width:44px;height:44px;border-radius:var(--radius-button);background:rgba(26,26,26,0.9);border:1px solid rgba(42,42,42,0.8);display:flex;align-items:center;justify-content:center;color:#fff;transition:background 0.2s,border-color 0.2s;flex-shrink:0}
.btn-cart-icon:hover{border-color:#fff;color:#fff}
.btn-cart-icon.in-cart{background:rgba(34,197,94,0.9);border-color:rgba(34,197,94,0.9)}
.btn-cart-icon svg{width:18px;height:18px}
.btn-buy{flex:1;height:44px;border-radius:28px;background:var(--color-accent);color:#1a1a1a;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;display:flex;align-items:center;justify-content:center;border:none;backdrop-filter:blur(4px);box-shadow:inset 0 1px 0 rgba(255,255,255,0.15),0 2px 12px rgba(57,255,20,0.35);transition:box-shadow 0.3s,transform 0.2s}
.btn-buy:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 4px 24px rgba(57,255,20,0.55),0 0 40px rgba(57,255,20,0.2);transform:translateY(-1px)}

/* Urgency Bar */
.urgency-bar{background:var(--color-bg);border-bottom:1px solid var(--color-border);overflow:hidden;white-space:nowrap;position:relative}
.urgency-track{display:flex;animation:urgencyScroll var(--scroll-speed,20s) linear infinite}
.urgency-track:hover{animation-play-state:paused}
@keyframes urgencyScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.urgency-item{display:inline-flex;align-items:center;gap:6px;padding:8px 24px;font-size:13px;color:var(--color-text)}
.urgency-dot{width:6px;height:6px;border-radius:50%;animation:urgencyPulse 2s infinite}
@keyframes urgencyPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}

/* Testimonials */
.testimonials-section{overflow:hidden}
.testimonials-track{display:flex;gap:16px;animation:testimonialScroll var(--scroll-speed,25s) linear infinite}
.testimonials-track:hover{animation-play-state:paused}
@keyframes testimonialScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.testimonials-strip{-webkit-mask:linear-gradient(90deg,transparent,#000 80px,#000 calc(100% - 80px),transparent);mask:linear-gradient(90deg,transparent,#000 80px,#000 calc(100% - 80px),transparent)}
.testimonial-img{border-radius:var(--radius-card);object-fit:cover}

/* Reviews */
.reviews-section .review-card{background:var(--color-card-bg);border:1px solid var(--color-border);border-radius:var(--radius-card);padding:20px}
.reviews-section .review-stars{color:var(--color-stars)}
.reviews-section .review-avatar{width:40px;height:40px;border-radius:50%;background:var(--color-accent);color:#000;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px}

/* FAQ */
.faq-section .faq-item{background:var(--color-card-bg);border:1px solid var(--color-border);border-radius:var(--radius-card);margin-bottom:12px;overflow:hidden}
.faq-section .faq-question{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;cursor:pointer;font-weight:600;font-size:15px;color:var(--color-text)}
.faq-section .faq-toggle{width:30px;height:30px;border-radius:50%;background:var(--color-accent);color:#000;display:flex;align-items:center;justify-content:center;transition:transform 0.3s,background 0.3s}
.faq-section .faq-item.open .faq-toggle{transform:rotate(180deg)}
.faq-section .faq-answer{max-height:0;overflow:hidden;transition:max-height 0.4s ease,padding 0.4s ease}
.faq-section .faq-item.open .faq-answer{max-height:500px;padding:0 20px 18px}

/* Footer */
.footer-section{border-top:1px solid var(--color-border);padding:40px 0;text-align:center}
.footer-section .footer-links{display:flex;justify-content:center;gap:24px;flex-wrap:wrap}
.footer-section .footer-links a{color:var(--color-text-muted);font-size:13px;transition:color 0.2s}
.footer-section .footer-links a:hover{color:var(--color-accent)}

/* Chat Widget */
.chat-fab{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:var(--color-accent);color:#000;display:flex;align-items:center;justify-content:center;z-index:998;box-shadow:0 4px 20px rgba(57,255,20,0.4);cursor:pointer;transition:transform 0.2s,box-shadow 0.2s}
.chat-fab:hover{transform:scale(1.05);box-shadow:0 6px 28px rgba(57,255,20,0.55)}
.chat-fab svg{width:28px;height:28px}
.chat-pulse{position:absolute;top:2px;right:2px;width:12px;height:12px;border-radius:50%;background:var(--color-accent);animation:chatPulse 2s infinite}
@keyframes chatPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.85)}}
.chat-window{position:fixed;bottom:96px;right:24px;width:380px;max-height:500px;background:var(--color-card-bg);border:1px solid var(--color-border);border-radius:16px;z-index:999;display:none;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5)}
.chat-window.open{display:flex}
@media(max-width:768px){.chat-window{position:fixed;inset:0;width:100%;max-height:none;border-radius:0}}

/* Live Sales Notification */
.live-sales-toast{position:fixed;bottom:24px;left:24px;max-width:340px;background:rgba(99,99,99,0.25);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:14px 18px;z-index:997;transform:translateX(-120%);transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1);font-size:14px;color:#fff}
.live-sales-toast.show{transform:translateX(0)}
@media(max-width:768px){.live-sales-toast{left:12px;right:12px;bottom:80px;max-width:none}}

/* Section Title */
.section-title{text-align:center;font-family:var(--font-heading);font-size:clamp(24px,4vw,36px);text-transform:uppercase;letter-spacing:-0.5px;margin-bottom:32px;color:#fff}

/* Kill-switch notice */
.scaled-license-notice{position:fixed;inset:0;z-index:999999;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;color:#fff;font-family:system-ui,sans-serif}
.scaled-license-notice h2{font-size:24px;font-weight:700}
.scaled-license-notice p{color:#9ca3af;font-size:14px;max-width:400px;text-align:center;line-height:1.6}
`;
}

// Core theme JS — cart, FAQ, header, urgency, etc.
function getThemeJS() {
  return `
(function(){
  'use strict';

  /* ═══ Cart Functions ═══ */
  window.addToCartOnly = function(btn, variantId) {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
    }).then(function(r) { return r.json(); }).then(function() {
      btn.classList.add('in-cart');
      var cartIcon = btn.querySelector('.icon-cart');
      var checkIcon = btn.querySelector('.icon-check');
      if (cartIcon) cartIcon.style.display = 'none';
      if (checkIcon) checkIcon.style.display = 'block';
      updateCartBadge();
    }).catch(function(e) { console.error(e); });
  };

  window.addToCartAndNotify = function(variantId) {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
    }).then(function(r) { return r.json(); }).then(function() {
      updateCartBadge();
    }).catch(function(e) { console.error(e); });
  };

  window.buyNowCheckout = function(variantId) {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
    }).then(function(r) { return r.json(); }).then(function() {
      window.location.href = '/checkout';
    }).catch(function(e) { console.error(e); });
  };

  window.updateCartBadge = function() {
    fetch('/cart.js').then(function(r) { return r.json(); }).then(function(c) {
      var badge = document.getElementById('cart-count-badge');
      if (badge) {
        badge.textContent = c.item_count;
        badge.classList.toggle('has-items', c.item_count > 0);
      }
    });
  };

  /* ═══ Header Pill — Dropdown Toggle ═══ */
  var toggle = document.getElementById('menu-toggle');
  var dropdown = document.getElementById('header-dropdown');
  var icon = document.getElementById('menu-icon');
  var isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
    if (dropdown) dropdown.classList.toggle('open', isOpen);
    if (icon) icon.classList.toggle('active', isOpen);
  }
  if (toggle) toggle.addEventListener('click', toggleMenu);
  document.addEventListener('click', function(e) {
    if (isOpen && !e.target.closest('.header-pill-wrapper')) {
      isOpen = false;
      if (dropdown) dropdown.classList.remove('open');
      if (icon) icon.classList.remove('active');
    }
  });

  /* ═══ Header Pill — Sticky Scroll (Luke's style) ═══ */
  (function(){
    var BASE_TOP = 16, URGENCY_GAP = 8;
    var urgencyEl = null, ticking = false;

    function getUrgencyElement() {
      return document.querySelector('.urgency-bar');
    }

    function updateHeaderPosition() {
      var scrollY = window.scrollY;
      if (!urgencyEl) urgencyEl = getUrgencyElement();
      if (urgencyEl && urgencyEl.offsetHeight > 0) {
        var urgencyHeight = urgencyEl.offsetHeight;
        var headerTop = Math.max(BASE_TOP, urgencyHeight + URGENCY_GAP - scrollY);
        document.documentElement.style.setProperty('--header-top', headerTop + 'px');
      } else {
        document.documentElement.style.setProperty('--header-top', BASE_TOP + 'px');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) { requestAnimationFrame(updateHeaderPosition); ticking = true; }
    }, { passive: true });

    var observer = new MutationObserver(function() {
      var el = getUrgencyElement();
      if (el && el.offsetHeight > 0 && !urgencyEl) { urgencyEl = el; updateHeaderPosition(); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', function() { urgencyEl = null; updateHeaderPosition(); });
    updateHeaderPosition();
  })();

  /* ═══ Cart Count on Page Load ═══ */
  fetch('/cart.js').then(function(r){return r.json()}).then(function(c){
    var badge = document.getElementById('cart-count-badge');
    if(badge && c.item_count > 0){ badge.textContent = c.item_count; badge.classList.add('has-items'); }
  }).catch(function(){});

  /* ═══ FAQ Accordion ═══ */
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      var item = this.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function(i) { i.classList.remove('open'); });
      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ═══ Loading Screen Hide ═══ */
  function hideLoader() {
    var l = document.getElementById('scaled-loader');
    if(l) { l.classList.add('hide'); setTimeout(function(){ l.style.display='none'; }, 400); }
  }
  window.addEventListener('load', function(){ setTimeout(hideLoader, 300); });
  setTimeout(hideLoader, 5000);

})();
`;
}

// Kill-switch CSS — injected when license is invalid
function getKillSwitchCSS() {
  return `
body > *:not(.scaled-license-notice) { display: none !important; }
.scaled-license-notice {
  position: fixed !important;
  inset: 0 !important;
  z-index: 999999 !important;
  background: #000 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column !important;
  gap: 16px !important;
  color: #fff !important;
  font-family: system-ui, sans-serif !important;
}
`;
}

// ─── API Routes ─────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main content delivery endpoint
app.post('/api/v1/load', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || '';

  if (!rateLimit(ip)) {
    return res.status(429).json({ error: 'rate_limited' });
  }

  const { licenseKey, domain, permanentDomain } = req.body;

  if (!licenseKey || !domain) {
    logRequest(licenseKey || 'none', domain || 'none', ip, userAgent, 'missing_params');
    return res.status(400).json({ error: 'missing_params' });
  }

  // Validate against both custom domain and .myshopify.com domain
  let result = validateLicense(licenseKey, domain);
  if (!result.valid && permanentDomain) {
    result = validateLicense(licenseKey, permanentDomain);
  }

  if (!result.valid) {
    logRequest(licenseKey, domain, ip, userAgent, result.reason);
    return res.status(403).json({
      error: result.reason,
      killCSS: getKillSwitchCSS(),
      message: result.reason === 'domain_mismatch'
        ? 'This license is not authorized for this domain.'
        : result.reason === 'expired'
        ? 'License has expired.'
        : 'Invalid license key.'
    });
  }

  logRequest(licenseKey, domain, ip, userAgent, 'success');

  // Return the brain
  res.json({
    status: 'ok',
    css: getCriticalCSS(),
    js: getThemeJS(),
    version: '1.0.0',
    plan: result.license.plan,
  });
});

// GET version for script tag loading (lighter, just validates)
app.get('/api/v1/validate', (req, res) => {
  const { key, domain } = req.query;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!rateLimit(ip)) {
    return res.status(429).json({ error: 'rate_limited' });
  }

  if (!key || !domain) {
    return res.status(400).json({ valid: false });
  }

  const result = validateLicense(key, domain);
  res.json({ valid: result.valid, reason: result.valid ? undefined : result.reason });
});

// ─── Admin Routes (protected by admin key) ──────────────────────
const ADMIN_KEY = process.env.ADMIN_KEY || 'change-me-in-production';

function requireAdmin(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.admin_key;
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

// Create a license
app.post('/api/admin/licenses', requireAdmin, (req, res) => {
  const { domain, permanent_domain, store_name, plan, expires_at } = req.body;

  if (!domain) {
    return res.status(400).json({ error: 'domain is required' });
  }

  const licenseKey = generateLicenseKey();

  try {
    db.prepare(`
      INSERT INTO licenses (license_key, domain, permanent_domain, store_name, plan, expires_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(licenseKey, domain, permanent_domain || '', store_name || '', plan || 'standard', expires_at || null);

    res.json({
      license_key: licenseKey,
      domain,
      plan: plan || 'standard',
      message: 'License created successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all licenses
app.get('/api/admin/licenses', requireAdmin, (req, res) => {
  const licenses = db.prepare('SELECT * FROM licenses ORDER BY created_at DESC').all();
  res.json({ licenses });
});

// Revoke a license
app.delete('/api/admin/licenses/:key', requireAdmin, (req, res) => {
  const result = db.prepare('UPDATE licenses SET active = 0 WHERE license_key = ?').run(req.params.key);
  if (result.changes > 0) {
    res.json({ message: 'License revoked' });
  } else {
    res.status(404).json({ error: 'License not found' });
  }
});

// View request logs
app.get('/api/admin/logs', requireAdmin, (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 100, 500);
  const logs = db.prepare('SELECT * FROM request_log ORDER BY created_at DESC LIMIT ?').all(limit);
  res.json({ logs });
});

// Stats
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  const totalLicenses = db.prepare('SELECT COUNT(*) as count FROM licenses').get().count;
  const activeLicenses = db.prepare('SELECT COUNT(*) as count FROM licenses WHERE active = 1').get().count;
  const todayRequests = db.prepare("SELECT COUNT(*) as count FROM request_log WHERE created_at >= date('now')").get().count;
  const failedToday = db.prepare("SELECT COUNT(*) as count FROM request_log WHERE status != 'success' AND created_at >= date('now')").get().count;

  res.json({
    licenses: { total: totalLicenses, active: activeLicenses },
    requests: { today: todayRequests, failed_today: failedToday }
  });
});

// ─── Loader Script Serving ───────────────────────────────────────
// Serve the obfuscated loader directly from the server
// This is what the theme loads via <script src="...server.../api/loader/scaled-loader.js">
app.get('/api/loader/scaled-loader.js', (req, res) => {
  const loaderPath = path.join(__dirname, 'dist', 'scaled-loader.js');

  if (fs.existsSync(loaderPath)) {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour cache
    res.sendFile(loaderPath);
  } else {
    // Fallback: serve un-obfuscated source if build hasn't run
    const srcPath = path.join(__dirname, 'src', 'loader.js');
    if (fs.existsSync(srcPath)) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(srcPath);
    } else {
      res.status(404).send('// Loader not found. Run: node build.js');
    }
  }
});

// ─── Start Server ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[OGVendors] Theme protection server running on port ${PORT}`);
  console.log(`[OGVendors] Admin key: ${ADMIN_KEY === 'change-me-in-production' ? '⚠️  USING DEFAULT KEY — SET ADMIN_KEY ENV VAR!' : '✓ Custom key set'}`);
});
