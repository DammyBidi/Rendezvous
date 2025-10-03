
class ProductService {
  constructor(baseUrl = 'https://fakestoreapi.com') {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  async getProducts() {
    const res = await fetch(`${this.baseUrl}/products`);
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    return res.json();
  }

  async getProductById(id) {
    const res = await fetch(`${this.baseUrl}/products/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`);
    return res.json();
  }

  async addProduct(product) {
    const res = await fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error(`Failed to add product: ${res.status}`);
    return res.json();
  }

  async updateProduct(id, updates) {
    const res = await fetch(`${this.baseUrl}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`Failed to update product ${id}: ${res.status}`);
    return res.json();
  }

  async deleteProduct(id) {
    const res = await fetch(`${this.baseUrl}/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Failed to delete product ${id}: ${res.status}`);
    return res.json();
  }
}


async function renderProductsInto(container) {
  const svc = new ProductService();
  const products = await svc.getProducts();
  console.log('ProductService.getProducts ->', products);

  let el = null;
  if (typeof container === 'string') el = document.querySelector(container);
  else el = container instanceof Element ? container : null;
  if (!el) throw new Error('Invalid container for renderProductsInto');

  // Clear existing
  el.innerHTML = '';

  products.slice(0, 6).forEach(prod => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-sm border-[rgba(224, 224, 224, 1)] overflow-hidden';

    const img = document.createElement('img');
    img.src = prod.image || './assets/images/card-one.svg';
    img.alt = prod.title || 'Event image';
    img.className = 'w-full h-54 object-cover';

    const body = document.createElement('div');
    body.className = 'p-4';

    const h3 = document.createElement('h3');
    h3.className = 'font-semibold text-gray-900';
    h3.textContent = prod.title;

    const meta = document.createElement('p');
    meta.className = 'text-sm text-gray-500';
    // Show price instead of date
    try {
      const priceText = typeof prod.price === 'number'
        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(prod.price)
        : prod.price || '';
      meta.textContent = priceText;
    } catch (e) {
      meta.textContent = prod.price != null ? String(prod.price) : '';
    }

    const desc = document.createElement('p');
    desc.className = 'mt-2 text-sm text-gray-600';
    desc.textContent = prod.description;

  const link = document.createElement('a');
  link.href = `details.html?id=${encodeURIComponent(prod.id)}`;
    link.className = 'mt-4 inline-flex items-center text-sm font-medium text-purple-700 hover:underline';
    link.textContent = 'View details';

    body.appendChild(h3);
    body.appendChild(meta);
    body.appendChild(desc);
    body.appendChild(link);

    card.appendChild(img);
    card.appendChild(body);

    el.appendChild(card);
  });
}




