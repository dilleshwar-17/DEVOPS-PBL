// Sample product data
const products = [
    { id: 1, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/250x200?text=Laptop', description: 'High-performance laptop for work and gaming.', reviews: [] },
    { id: 2, name: 'Smartphone', price: 699.99, image: 'https://via.placeholder.com/250x200?text=Smartphone', description: 'Latest smartphone with advanced features.', reviews: [] },
    { id: 3, name: 'Headphones', price: 199.99, image: 'https://via.placeholder.com/250x200?text=Headphones', description: 'Noise-cancelling wireless headphones.', reviews: [] },
    { id: 4, name: 'Tablet', price: 399.99, image: 'https://via.placeholder.com/250x200?text=Tablet', description: 'Versatile tablet for productivity and entertainment.', reviews: [] },
    { id: 5, name: 'Smart Watch', price: 299.99, image: 'https://via.placeholder.com/250x200?text=Smart Watch', description: 'Fitness and health tracking smartwatch.', reviews: [] },
    { id: 6, name: 'Camera', price: 799.99, image: 'https://via.placeholder.com/250x200?text=Camera', description: 'Professional DSLR camera for photography enthusiasts.', reviews: [] }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || [];

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

// Login function
function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
}

// Signup function
function signup(name, email, password) {
    if (users.find(u => u.email === email)) {
        alert('Email already exists');
        return;
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully!');
    window.location.href = 'login.html';
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Display reviews
function displayReviews(productId) {
    const product = products.find(p => p.id === productId);
    const reviewsSection = document.getElementById('reviews-section');
    if (product && reviewsSection) {
        reviewsSection.innerHTML = '<h3>Customer Reviews</h3>';
        if (product.reviews.length === 0) {
            reviewsSection.innerHTML += '<p>No reviews yet.</p>';
        } else {
            product.reviews.forEach(review => {
                reviewsSection.innerHTML += `
                    <div class="review">
                        <h4>${review.user}</h4>
                        <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                        <p>${review.comment}</p>
                    </div>
                `;
            });
        }

        if (currentUser) {
            reviewsSection.innerHTML += `
                <div class="add-review">
                    <h4>Add a Review</h4>
                    <select id="rating">
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                    <textarea id="review-comment" placeholder="Write your review..."></textarea>
                    <button onclick="addReview(${productId})">Submit Review</button>
                </div>
            `;
        } else {
            reviewsSection.innerHTML += '<p><a href="login.html">Login</a> to add a review.</p>';
        }
    }
}

// Add review
function addReview(productId) {
    if (!currentUser) {
        alert('Please login to add a review');
        return;
    }
    const rating = parseInt(document.getElementById('rating').value);
    const comment = document.getElementById('review-comment').value.trim();
    if (!comment) {
        alert('Please enter a review comment');
        return;
    }
    const product = products.find(p => p.id === productId);
    if (product) {
        product.reviews.push({
            user: currentUser.name,
            rating,
            comment,
            date: new Date().toISOString()
        });
        localStorage.setItem('products', JSON.stringify(products));
        displayReviews(productId);
        document.getElementById('review-comment').value = '';
    }
}

// Update header based on login status
function updateHeader() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        if (currentUser) {
            navLinks.innerHTML = `
                <span>Welcome, ${currentUser.name}!</span>
                <a href="#" onclick="logout()">Logout</a>
                <a href="cart.html">Cart (<span id="cart-count">0</span>)</a>
            `;
        } else {
            navLinks.innerHTML = `
                <a href="login.html">Sign In</a>
                <a href="signup.html">Sign Up</a>
                <a href="cart.html">Cart (<span id="cart-count">0</span>)</a>
            `;
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateHeader();
    displayProducts();
    displayProductDetail();
    displayCart();

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
    }

    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            signup(name, email, password);
        });
    }

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

    // Display reviews on product page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    if (productId) {
        displayReviews(productId);
    }
});
