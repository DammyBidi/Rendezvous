
class Product {
	constructor(product = {}) {
		this.id = product.id;
		this.title = product.title;
		this.price = product.price;
		this.description = product.description;
		this.category = product.category;
		this.image = product.image;
	}

	getProductInfo() {
		return 'Here are the info ' + '' + this.image;
	}
}

const NewProduct = { id: 0, title: 'string', price: 0.1, description: 'string', category: 'string', image: 'https://example.com' };

const CheckDetails = new Product(NewProduct);
console.log(CheckDetails.getProductInfo());

// Keep CommonJS export and browser attachment for compatibility
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = Product;
}
if (typeof window !== 'undefined') {
	window.Product = Product;
}

