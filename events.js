function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export async function loadProductDetails() {
  const id = getQueryParam('id');
  if (!id) return;
  if (typeof ProductService === 'undefined') {
    console.warn('ProductService global not available');
    return;
  }
  const svc = new ProductService();
  const product = await svc.getProductById(id);
  console.log('Loaded product ->', product);

  const hero = document.getElementById('product-hero');
  const title = document.getElementById('product-title');
  const desc = document.getElementById('product-description');

  if (hero && product.image) hero.src = product.image;
  if (title && product.title) title.textContent = product.title;
  if (desc && product.description) desc.textContent = product.description;

 
  const priceEl = document.getElementById('product-price');
  if (priceEl) {
    try {
      priceEl.textContent = typeof product.price === 'number'
        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)
        : product.price ? String(product.price) : '';
    } catch (e) {
      priceEl.textContent = product.price != null ? String(product.price) : '';
    }
  }


  const singleEl = document.getElementById('product-single-price');
  const pairEl = document.getElementById('product-pair-price');
  if ((singleEl || pairEl) && product.price != null) {
    try {
      const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
      if (singleEl) singleEl.textContent = fmt.format(product.price);
      if (pairEl) pairEl.textContent = fmt.format(product.price * 2);
    } catch (e) {
      if (singleEl) singleEl.textContent = String(product.price);
      if (pairEl) pairEl.textContent = String(product.price * 2);
    }
  }
}


loadProductDetails().catch(err => console.error('loadProductDetails error ->', err));
