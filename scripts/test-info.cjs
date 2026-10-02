const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM, VirtualConsole } = require('jsdom');
const themeRoot = require('node:path').resolve(__dirname, '..');
const runtimeRoot = themeRoot;
const themeJs = fs.readFileSync(themeRoot + '/assets/theme.js', 'utf8');
const json = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
const longDescription = 'Delivery &amp; details\n' + 'Full product description. '.repeat(35) + 'END OF DESCRIPTION';
function product(id, handle, title, description) {
  return { id, handle, title, description, url: '/products/' + handle, price: 999, comparePrice: null, available: true, variantId: id, image: null };
}
function section(id, settings, products) {
  return `<div class="shopify-section" id="${id}"><section class="vx-shell vx-shell--loading" data-vx-section="product-grid"></section><script type="application/json" data-vx-settings="product-grid">${json(settings)}</script><script type="application/json" data-vx-products="product-grid">${json(products)}</script></div>`;
}
for (const loaderPath of ['/runtime/loader.js', '/assets/scaled-loader-current.js']) {
  const errors = [];
  const console = new VirtualConsole();
  console.on('jsdomError', (error) => errors.push(error.message));
  const dom = new JSDOM('<!doctype html><html><body style="overflow:auto">' +
    section('first', {}, [product(1, 'shared', 'First product', longDescription)]) +
    section('second', { info_fallback_text: 'Store delivery &amp; refund information.' }, [product(2, 'shared', 'Second product', 'Second section description'), product(3, 'empty', 'No description', '')]) +
    section('no-info', { show_info_btn: false }, [product(4, 'image-only', 'Image product', 'Image product details')]) +
    '</body></html>', { url: 'https://fixture.invalid/', runScripts: 'outside-only', virtualConsole: console });
  const { window } = dom;
  const { document } = window;
  window.eval(fs.readFileSync(runtimeRoot + loaderPath, 'utf8'));
  window.eval(themeJs);
  document.dispatchEvent(new window.Event('DOMContentLoaded'));
  const first = document.querySelector('#first .vx-btn-info');
  const second = document.querySelector('#second .vx-btn-info');
  const empty = document.querySelectorAll('#second .vx-btn-info')[1];
  assert.equal(second.closest('.vx-pc').querySelector('.vx-pc-title').textContent, 'Second product', 'Renderer must use second section data');
  assert.equal(document.querySelectorAll('#vx-detail-modal').length, 0, 'Dialog should be created independently on click');
  first.querySelector('svg circle').dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
  const modal = document.querySelector('#vx-detail-modal');
  const body = modal.querySelector('#vx-pdm-body');
  const close = modal.querySelector('.vx-detail-modal__close');
  assert.equal(modal.parentElement, document.body, 'Dialog must escape clipped section containers');
  assert.equal(modal.hidden, false);
  assert.equal(body.textContent, longDescription.replace('&amp;', '&'));
  assert.ok(body.textContent.length > 500);
  assert.equal(document.activeElement, close);
  assert.equal(document.body.style.overflow, 'hidden');
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
  assert.equal(document.activeElement, close, 'Single-control dialog traps focus');
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  assert.equal(modal.hidden, true);
  assert.equal(document.activeElement, first);
  assert.equal(document.body.style.overflow, 'auto');
  second.click();
  assert.equal(modal.querySelector('#vx-pdm-title').textContent, 'Second product');
  assert.equal(body.textContent, 'Second section description');
  modal.querySelector('.vx-detail-modal__bg').click();
  assert.equal(modal.hidden, true);
  empty.click();
  assert.match(body.textContent, /Store delivery & refund information/);
  assert.equal(body.querySelector('a').getAttribute('href'), '/products/empty');
  const link = body.querySelector('a');
  close.focus();
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
  assert.equal(document.activeElement, link);
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
  assert.equal(document.activeElement, close);
  close.click();
  assert.equal(document.activeElement, empty);
  const image = document.querySelector('#no-info .vx-pc-img');
  image.click();
  assert.equal(body.textContent, 'Image product details', 'Image trigger works when info button is hidden');
  document.querySelector('#no-info').dispatchEvent(new window.Event('shopify:section:unload', { bubbles: true }));
  assert.equal(modal.hidden, true, 'Editor unload closes open dialog');
  const script = document.querySelector('#second script[data-vx-products]');
  script.textContent = json([product(2, 'shared', 'Updated product', '<img src=x onerror=alert(1)> &amp; safe text')]);
  second.click();
  assert.equal(modal.querySelector('#vx-pdm-title').textContent, 'Updated product');
  assert.equal(body.querySelector('img'), null, 'Descriptions must remain text, not execute markup');
  assert.equal(body.textContent, '<img src=x onerror=alert(1)> & safe text');
  close.click();
  script.textContent = '{invalid';
  second.click();
  assert.equal(modal.hidden, false, 'Malformed product data still opens useful fallback');
  assert.match(body.textContent, /Store delivery & refund information/);
  assert.equal(document.querySelectorAll('#vx-detail-modal').length, 1, 'Repeated opens reuse one dialog');
  close.click();
  assert.deepEqual(errors, []);
  dom.window.close();
  process.stdout.write(loaderPath + ': full descriptions, entities, multiple grids, SVG clicks, fallback, close/backdrop/Escape, focus trap/return, scroll restore, hidden-info image trigger, editor unload, fresh data, safe text, singleton passed.\n');
}
