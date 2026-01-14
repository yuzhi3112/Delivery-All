// Cart Management
let cart = [];
let selectedLocation = null;

// Add to cart
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    alert(`${itemName} added to cart!`);
    updateCart();
}

// Update cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">No items in cart. <a href="../index.html">Browse categories</a></p>';
        document.getElementById('checkoutBtn').disabled = true;
        updateSummary();
        return;
    }
    
    let cartHTML = '';
    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item">
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-quantity">Quantity: ${item.quantity}</div>
                </div>
                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    
    cartItemsDiv.innerHTML = cartHTML;
    updateSummary();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCart();
    }
}

// Update location
function updateLocation() {
    const locationSelect = document.getElementById('locationSelect');
    selectedLocation = locationSelect.value;
    
    const locationDisplay = document.getElementById('selectedLocation');
    const locations = {
        'east': '🏘️ East Singapore',
        'west': '🏘️ West Singapore',
        'south': '🏘️ South Singapore',
        'north': '🏘️ North Singapore',
        'central': '🏘️ Central Singapore'
    };
    
    if (selectedLocation) {
        locationDisplay.textContent = `Selected: ${locations[selectedLocation]}`;
        document.getElementById('checkoutBtn').disabled = false;
    } else {
        locationDisplay.textContent = 'No location selected';
        document.getElementById('checkoutBtn').disabled = true;
    }
}

// Update summary
function updateSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const gst = subtotal * 0.07;
    const total = subtotal + gst;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('gst').textContent = `$${gst.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    // Disable checkout if no items or location
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (cart.length === 0 || !selectedLocation) {
        checkoutBtn.disabled = true;
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    if (!selectedLocation) {
        alert('Please select a delivery location!');
        return;
    }
    
    alert(`Order placed! Delivery to ${selectedLocation}. Your order will arrive in 30-45 minutes.`);
    cart = [];
    selectedLocation = null;
    document.getElementById('locationSelect').value = '';
    updateCart();
}

// Load cart on page load
window.addEventListener('DOMContentLoaded', function() {
    // Initialize cart display if on dashboard page
    if (document.getElementById('cartItems')) {
        updateCart();
    }
});
