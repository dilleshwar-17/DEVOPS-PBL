const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Sample product data (same as in script.js)
const products = [
    { id: 1, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/250x200?text=Laptop', description: 'High-performance laptop for work and gaming.' },
    { id: 2, name: 'Smartphone', price: 699.99, image: 'https://via.placeholder.com/250x200?text=Smartphone', description: 'Latest smartphone with advanced features.' },
    { id: 3, name: 'Headphones', price: 199.99, image: 'https://via.placeholder.com/250x200?text=Headphones', description: 'Noise-cancelling wireless headphones.' },
    { id: 4, name: 'Tablet', price: 399.99, image: 'https://via.placeholder.com/250x200?text=Tablet', description: 'Versatile tablet for productivity and entertainment.' },
    { id: 5, name: 'Smart Watch', price: 299.99, image: 'https://via.placeholder.com/250x200?text=Smart Watch', description: 'Fitness and health tracking smartwatch.' },
    { id: 6, name: 'Camera', price: 799.99, image: 'https://via.placeholder.com/250x200?text=Camera', description: 'Professional DSLR camera for photography enthusiasts.' }
];

// API endpoints
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/product.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'product.html'));
});

app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'cart.html'));
});

app.listen(PORT, () => {
    console.log(`TEVRA Online server running on http://localhost:${PORT}`);
});
