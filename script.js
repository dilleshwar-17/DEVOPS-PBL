// Sample product data
const products = [
    { id: 1, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/250x200?text=Laptop', description: 'High-performance laptop for work and gaming.' },
    { id: 2, name: 'Smartphone', price: 699.99, image: 'https://via.placeholder.com/250x200?text=Smartphone', description: 'Latest smartphone with advanced features.' },
    { id: 3, name: 'Headphones', price: 199.99, image: 'https://via.placeholder.com/250x200?text=Headphones', description: 'Noise-cancelling wireless headphones.' },
    { id: 4, name: 'Tablet', price: 399.99, image: 'https://via.placeholder.com/250x200?text=Tablet', description: 'Versatile tablet for productivity and entertainment.' },
    { id: 5, name: 'Smart Watch', price: 299.99, image: 'https://via.placeholder.com/250x200?text=Smart Watch', description: 'Fitness and health tracking smartwatch.' },
    { id: 6, name: 'Camera', price: 799.99, image: 'https://via.placeholder.com/250x200?text=Camera', description: 'Professional DSLR camera for photography enthusiasts.' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Display products on homepage
function displayProducts(productList = products) {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
        productsSection.innerHTML = '';
        productList.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="viewProduct(${product.id})">View Details</button>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productsSection.appendChild(productDiv);
        });
    }
}

// View product details
function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

// Add to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Product added to cart!');
    }
}

// Display product details
function displayProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === id);
    const productDetail = document.getElementById('product-detail');
    if (product && productDetail) {
        productDetail.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    }
}

// Display cart
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(itemDiv);
        });
        cartTotal.textContent = total.toFixed(2);
    }
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Search products
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Checkout functionality would be implemented here. Total: $' + cart.reduce((sum, item) => sum + item.price, 0).toFixed(2));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayProducts();
    displayProductDetail();
    displayCart();

    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchProducts);
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});
