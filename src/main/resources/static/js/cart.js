// Helper functions
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = count;
}

// Add to cart button
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const id = parseInt(e.target.dataset.id);
        const title = e.target.dataset.title;
        const price = parseInt(e.target.dataset.price);

        let cart = getCart();
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({id, title, price, quantity: 1});
        }
        saveCart(cart);
        updateCartCount();
        alert(`${title} added to cart!`);
    }
});

// Render cart page
function renderCart() {
    const cart = getCart();
    const tbody = document.getElementById('cart-items');
    if (!tbody) return;

    tbody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.title}</td>
            <td>₹${item.price}</td>
            <td>
                <button class="btn btn-sm btn-secondary decrease-qty" data-id="${item.id}">-</button>
                ${item.quantity}
                <button class="btn btn-sm btn-secondary increase-qty" data-id="${item.id}">+</button>
            </td>
            <td>₹${itemTotal}</td>
            <td>
                <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">Remove</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('cart-total').innerText = total;
    updateCartCount();
}

// Remove item
document.addEventListener('click', function(e) {
    const cart = getCart();
    if (e.target.classList.contains('remove-item')) {
        const id = parseInt(e.target.dataset.id);
        const newCart = cart.filter(item => item.id !== id);
        saveCart(newCart);
        renderCart();
    }
    // Increase quantity
    if (e.target.classList.contains('increase-qty')) {
        const id = parseInt(e.target.dataset.id);
        cart.forEach(item => { if (item.id === id) item.quantity++; });
        saveCart(cart);
        renderCart();
    }
    // Decrease quantity
    if (e.target.classList.contains('decrease-qty')) {
        const id = parseInt(e.target.dataset.id);
        cart.forEach(item => { if (item.id === id && item.quantity > 1) item.quantity--; });
        saveCart(cart);
        renderCart();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});
