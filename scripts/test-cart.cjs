const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const tick = () => new Promise(resolve => setImmediate(resolve));
const response = (data, ok = true) => ({ ok, json: async () => data });
const emptyCart = { items: [], item_count: 0, total_price: 0 };
const cart = quantity => ({
  item_count: quantity, total_price: quantity * 999,
  items: [{ key: 'variant:key', product_title: 'Vendor', title: 'Vendor', quantity, final_line_price: quantity * 999 }]
});
const product = { id: 1, variantId: 123, handle: 'vendor', title: 'Vendor', price: 999, available: true };
const section = (type, settings, products) => `<div class="shopify-section"><section class="vx-shell" data-vx-section="${type}"></section><script data-vx-settings="${type}" type="application/json">${JSON.stringify(settings)}</script>${products ? `<script data-vx-products="${type}" type="application/json">${JSON.stringify(products)}</script>` : ''}</div>`;

function fixture(html) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(html, { url: 'https://fixture.invalid/en/', runScripts: 'outside-only', virtualConsole: vc });
  dom.window.Shopify = { routes: { root: '/en/' } };
  return { dom, w: dom.window, d: dom.window.document, errors };
}

async function checkRuntime(file) {
  const { dom, w, d, errors } = fixture(section('product-grid', { layout_style: 'lin', buy_btn_action: 'add_to_cart' }, [product]) + section('cart-drawer', {}));
  let next = () => response(emptyCart);
  const calls = [];
  w.fetch = async (url, options) => { calls.push({ url, options }); return next(url, options); };
  await tick();
  w.eval(fs.readFileSync(path.join(root, file), 'utf8'));
  let refreshes = 0;
  d.addEventListener('cart:refresh', () => refreshes++);

  const rejected = { description: 'Only 1 item available. <b>Try again</b>' };
  next = () => response(rejected, false);
  for (const operation of [() => w.VexelCart.get(), () => w.VexelCart.add(123), () => w.VexelCart.update({ 123: 2 }), () => w.VexelCart.change('variant:key', 2)]) {
    await assert.rejects(operation(), /Only 1 item available/);
  }
  assert.equal(refreshes, 0, 'Rejected mutations must not announce success');
  assert.ok(calls.every(call => call.url.startsWith('/en/cart')));

  next = () => ({ ok: false, json: async () => { throw new SyntaxError(); } });
  await assert.rejects(w.VexelCart.add(123), /Unable to update your cart/);
  next = () => { throw new TypeError('network'); };
  await assert.rejects(w.VexelCart.add(123), /Unable to reach the store/);

  next = () => response(rejected, false);
  const buy = d.querySelector('[data-vx-add]');
  const before = calls.length;
  buy.click();
  buy.click();
  await tick();
  assert.equal(calls.length, before + 1, 'Pending purchase must reject repeated clicks');
  assert.equal(buy.textContent, 'BUY NOW');
  assert.equal(buy.disabled, false);
  assert.equal(buy.hasAttribute('aria-disabled'), false);
  assert.equal(d.querySelector('[data-vx-purchase-error]').textContent, rejected.description);
  assert.equal(d.querySelector('[data-vx-purchase-error] b'), null, 'Shopify errors must be text');

  const wrapper = buy.closest('.shopify-section');
  wrapper.querySelector('[data-vx-settings]').textContent = JSON.stringify({ layout_style: 'lin', buy_btn_action: 'checkout' });
  wrapper.dispatchEvent(new w.Event('shopify:section:load', { bubbles: true }));
  const checkout = d.querySelector('[data-vx-checkout]');
  assert.match(checkout.getAttribute('href'), /^\/en\/cart\/add/);
  checkout.click();
  await tick();
  assert.equal(w.location.pathname, '/en/', 'Failed add must not navigate to checkout');
  assert.equal(checkout.textContent, 'BUY NOW');
  assert.equal(checkout.getAttribute('aria-disabled'), null);

  next = () => response(cart(1));
  w.CartDrawer.open();
  await tick();
  next = () => response(rejected, false);
  d.querySelector('[data-action="plus"]').click();
  await tick();
  assert.equal(d.querySelector('.vx-cart-item__qty span').textContent, '1');
  assert.equal(d.querySelector('.vx-cart-item.is-loading'), null);
  assert.equal(d.querySelector('[data-action="plus"]').disabled, false);
  assert.equal(d.querySelector('[data-vx-cart-error]').textContent, rejected.description);
  next = () => response(cart(2));
  d.querySelector('[data-action="plus"]').click();
  await tick();
  assert.equal(d.querySelector('.vx-cart-item__qty span').textContent, '2');
  assert.equal(d.querySelector('[data-vx-cart-error]').hidden, true);
  next = () => response({}, false);
  w.CartDrawer.refresh();
  await tick();
  assert.equal(d.querySelector('[data-vx-cart-error]').hidden, false);
  assert.equal(d.querySelector('.vx-cart-item__qty span').textContent, '2');

  // A successful add remains successful even if the later badge request fails.
  wrapper.querySelector('[data-vx-settings]').textContent = JSON.stringify({ layout_style: 'lin', buy_btn_action: 'add_to_cart' });
  wrapper.dispatchEvent(new w.Event('shopify:section:load', { bubbles: true }));
  next = url => url.endsWith('/add.js') ? response({ items: [product] }) : response({}, false);
  d.querySelector('[data-vx-add]').click();
  await tick();
  assert.equal(d.querySelector('[data-vx-add]').textContent, 'ADDED!');
  assert.equal(refreshes, 1);
  assert.deepEqual(errors, []);
  dom.window.close();

  const draft = fixture(section('hero', { show_btn_1: true, btn_1_action: 'checkout' }) + section('product-grid', { layout_style: 'lin' }, [{ ...product, available: false, previewOnly: true }]));
  let draftCalls = 0;
  draft.w.fetch = async () => { draftCalls++; return response(emptyCart); };
  await tick();
  draft.w.eval(fs.readFileSync(path.join(root, file), 'utf8'));
  // Test the delegated checkout action on an explicitly disabled control, too.
  const disabled = draft.d.querySelector('.vx-btn-buy');
  disabled.setAttribute('data-vx-checkout', '123');
  disabled.dispatchEvent(new draft.w.MouseEvent('click', { bubbles: true, cancelable: true }));
  const hero = draft.d.querySelector('[data-vx-hero-checkout]');
  assert.ok(hero, 'Hero checkout fixture must render a control');
  hero.click();
  await tick();
  assert.equal(draftCalls, 0, 'Draft preview must not send an add request');
  assert.match(draft.d.querySelector('[data-vx-purchase-error]').textContent, /No products are available/);
  draft.dom.window.close();
  console.log(`${file}: cart rejection, network errors, locale, retry, duplicate clicks, checkout failure and draft guard passed`);
}

async function checkProduct() {
  const liquid = fs.readFileSync(path.join(root, 'sections/main-product.liquid'), 'utf8');
  assert.match(liquid, /form 'product', product, id: 'pp-form'/);
  const { dom, w, d, errors } = fixture(`<form id="pp-form"><input name="id" value="123"><input name="quantity" id="pp-qty" type="number" value="3" min="1"><button id="pp-add-cart-btn">Add to Cart</button><p id="pp-cart-error" hidden></p></form><a id="pp-more-payment" href="/en/checkout">More payment options</a><span id="vx-cart-badge"></span><div id="pp-star-select"></div><div id="pp-review-modal" class="open"></div><p id="pp-review-status" hidden></p>`);
  let next = () => response({ description: 'Sold out' }, false);
  const calls = [];
  w.fetch = async (url, options) => { calls.push({ url, options }); return next(); };
  const source = liquid.match(/<script>([\s\S]*?)<\/script>/)[1].replace('{{ reviews_per_page }}', '10').replace('{{ routes.root_url | json }}', '"/"');
  w.eval(source);
  d.querySelector('#pp-form').requestSubmit();
  await tick();
  assert.equal(calls[0].url, '/en/cart/add.js');
  assert.equal(JSON.parse(calls[0].options.body).items[0].quantity, 3);
  assert.equal(d.querySelector('#pp-add-cart-btn').textContent, 'Add to Cart');
  assert.equal(d.querySelector('#pp-add-cart-btn').disabled, false);
  assert.equal(d.querySelector('#pp-cart-error').textContent, 'Sold out');
  d.querySelector('#pp-more-payment').click();
  await tick();
  assert.equal(w.location.pathname, '/en/');
  assert.equal(d.querySelector('#pp-form').getAttribute('action'), null, 'Payment link must keep the product form intact');
  next = () => { throw new TypeError(); };
  d.querySelector('#pp-form').requestSubmit();
  await tick();
  assert.match(d.querySelector('#pp-cart-error').textContent, /Unable to reach/);
  next = () => response(cart(3));
  d.querySelector('#pp-form').requestSubmit();
  await tick();
  assert.equal(d.querySelector('#pp-cart-error').hidden, true);
  assert.match(d.querySelector('#pp-add-cart-btn').textContent, /ADDED/);
  assert.equal(d.querySelector('#vx-cart-badge').textContent, '3');
  w.ppSubmitReview();
  assert.match(d.querySelector('#pp-review-status').textContent, /not been sent or saved/);
  assert.equal(d.querySelector('#pp-review-modal').classList.contains('open'), true);
  assert.deepEqual(errors, []);
  dom.window.close();
  console.log('Product page: native form, quantity, rejection, network retry, payment failure, badge and honest review status passed');
}

(async () => {
  for (const file of ['runtime/loader.js', 'assets/scaled-loader-current.js']) await checkRuntime(file);
  await checkProduct();
})().catch(error => { console.error(error); process.exitCode = 1; });
