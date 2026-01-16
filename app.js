// Cart Management
let cart = [];
let selectedLocation = null;
let selectedPayment = null;
let currentModalItem = { name: '', price: 0 };

// Open Add to Cart Modal
function openAddToCartModal(itemName, price) {
    currentModalItem = { name: itemName, price: price };
    const modal = document.getElementById('addToCartModal');
    const modalDetails = document.getElementById('modalItemDetails');
    const quantityInput = document.getElementById('quantityInput');
    
    // Reset quantity to 1
    quantityInput.value = 1;
    
    // Display item details
    modalDetails.innerHTML = `
        <div class="modal-item-info">
            <p><strong>Item:</strong> ${itemName}</p>
            <p><strong>Price per unit:</strong> $${price.toFixed(2)}</p>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'block';
    updateModalPrice();
}

// Close Add to Cart Modal
function closeAddToCartModal() {
    const modal = document.getElementById('addToCartModal');
    modal.style.display = 'none';
}

// Update Modal Price Display
function updateModalPrice() {
    const quantityInput = document.getElementById('quantityInput');
    const quantity = parseInt(quantityInput.value) || 1;
    const totalPrice = currentModalItem.price * quantity;
    const modalPriceEl = document.getElementById('modalItemPrice');
    modalPriceEl.innerHTML = `
        <div class="price-summary">
            <p>Total: <strong>$${totalPrice.toFixed(2)}</strong> (${quantity} × $${currentModalItem.price.toFixed(2)})</p>
        </div>
    `;
}

// Increase Modal Quantity
function increaseModalQuantity() {
    const quantityInput = document.getElementById('quantityInput');
    quantityInput.value = (parseInt(quantityInput.value) || 1) + 1;
    updateModalPrice();
}

// Decrease Modal Quantity
function decreaseModalQuantity() {
    const quantityInput = document.getElementById('quantityInput');
    const currentValue = parseInt(quantityInput.value) || 1;
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    } else {
        quantityInput.value = 1;
    }
    updateModalPrice();
}

// Validate Quantity Input
function validateQuantity() {
    const quantityInput = document.getElementById('quantityInput');
    let value = parseInt(quantityInput.value);
    
    if (isNaN(value) || value < 1) {
        quantityInput.value = 1;
    }
    updateModalPrice();
}

// Confirm Add to Cart from Modal
function confirmAddToCart() {
    const quantityInput = document.getElementById('quantityInput');
    const quantity = parseInt(quantityInput.value) || 1;
    
    addToCartWithQuantity(currentModalItem.name, currentModalItem.price, quantity);
    closeAddToCartModal();
}

// Add to cart with specific quantity
function addToCartWithQuantity(itemName, price, quantity) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: quantity,
            category: getItemCategory(itemName)
        });
    }
    
    // Show confirmation alert
    alert(`✓ ${quantity}x ${itemName} added to cart!`);
    updateCart();
}

// Add to cart (legacy function, now used by addToCartWithQuantity)
function addToCart(itemName, price) {
    addToCartWithQuantity(itemName, price, 1);
}

// Get category based on item name
function getItemCategory(itemName) {
    const medicineItems = ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Diclofenac', 'Cough Syrup', 'Throat Lozenges', 
                           'Decongestant', 'Antihistamine', 'Antacid', 'Loperamide', 'Probiotic', 'Omeprazole',
                           'Hydrocortisone', 'Antibiotic Ointment', 'Antifungal Cream', 'Moisturizing Lotion',
                           'Vitamin C', 'Vitamin D3', 'Multivitamin', 'Iron Supplement', 'Sterile Bandages',
                           'Antiseptic Solution', 'Elastic Bandage', 'Thermometer'];
    
    if (medicineItems.some(med => itemName.includes(med))) return '💊 Medicine';
    if (itemName.includes('Beverage') || itemName.includes('Coffee') || itemName.includes('Tea') || itemName.includes('Juice')) return '🥤 Beverage';
    if (itemName.includes('Food') || itemName.includes('Meal') || itemName.includes('Burger') || itemName.includes('Pasta')) return '🍔 Food';
    if (itemName.includes('Grocery') || itemName.includes('Produce') || itemName.includes('Pantry') || itemName.includes('Essential')) return '🛒 Grocery';
    
    return 'Other';
}

// Update cart display with order table
function updateCart() {
    const orderTableBody = document.getElementById('orderTableBody');
    
    if (cart.length === 0) {
        orderTableBody.innerHTML = '<tr class="empty-row"><td colspan="6" style="text-align: center; padding: 2rem;">No items ordered yet. <a href="index.html">Browse categories</a></td></tr>';
        document.getElementById('checkoutBtn').disabled = true;
        updateSummary();
        return;
    }
    
    // Sort items by category
    const sortedCart = [...cart].sort((a, b) => a.category.localeCompare(b.category));
    
    let tableHTML = '';
    let currentCategory = '';
    
    sortedCart.forEach((item, index) => {
        // Add category header if category changed
        if (item.category !== currentCategory) {
            if (currentCategory !== '') {
                tableHTML += '<tr class="category-separator"><td colspan="6"></td></tr>';
            }
            currentCategory = item.category;
            tableHTML += `<tr class="category-row"><td colspan="6"><strong>${item.category}</strong></td></tr>`;
        }
        
        tableHTML += `
            <tr class="product-row">
                <td>${item.category}</td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="quantity-control">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-btn" onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    });
    
    orderTableBody.innerHTML = tableHTML;
    updateSummary();
}

// Increase quantity
function increaseQuantity(index) {
    if (cart[index]) {
        cart[index].quantity++;
        updateCart();
    }
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index]) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            removeFromCart(index);
            return;
        }
        updateCart();
    }
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
        checkCheckoutEnabled();
    } else {
        locationDisplay.textContent = 'No location selected';
        document.getElementById('checkoutBtn').disabled = true;
    }
}

// Update payment method
function updatePaymentMethod() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const selectedRadio = Array.from(paymentRadios).find(radio => radio.checked);
    
    selectedPayment = selectedRadio ? selectedRadio.value : null;
    
    const paymentDisplay = document.getElementById('selectedPayment');
    const payments = {
        'online': '💻 Online Payment',
        'delivery': '🚚 Pay on Delivery'
    };
    
    if (selectedPayment) {
        paymentDisplay.textContent = `Selected: ${payments[selectedPayment]}`;
        checkCheckoutEnabled();
    } else {
        paymentDisplay.textContent = 'No payment method selected';
        document.getElementById('checkoutBtn').disabled = true;
    }
}

// Check if checkout should be enabled
function checkCheckoutEnabled() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (cart.length > 0 && selectedLocation && selectedPayment) {
        checkoutBtn.disabled = false;
    } else {
        checkoutBtn.disabled = true;
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
    
    // Disable checkout if no items or location or payment method
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (cart.length === 0 || !selectedLocation || !selectedPayment) {
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

    if (!selectedPayment) {
        alert('Please select a payment method!');
        return;
    }
    
    const locations = {
        'east': 'East Singapore',
        'west': 'West Singapore',
        'south': 'South Singapore',
        'north': 'North Singapore',
        'central': 'Central Singapore'
    };

    const payments = {
        'online': 'Online Payment',
        'delivery': 'Pay on Delivery'
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.07;
    
    alert(`Order Confirmed!\n\nDelivery Location: ${locations[selectedLocation]}\nPayment Method: ${payments[selectedPayment]}\nTotal: $${total.toFixed(2)}\n\nYour order will arrive in 30-45 minutes.`);
    
    cart = [];
    selectedLocation = null;
    selectedPayment = null;
    document.getElementById('locationSelect').value = '';
    document.querySelectorAll('input[name="payment"]').forEach(radio => radio.checked = false);
    document.getElementById('selectedPayment').textContent = 'No payment method selected';
    document.getElementById('selectedLocation').textContent = 'No location selected';
    updateCart();
}

// Load cart on page load
window.addEventListener('DOMContentLoaded', function() {
    // Initialize cart display if on dashboard page
    if (document.getElementById('orderTableBody')) {
        updateCart();
    }
    
    // Modal click-outside-to-close functionality
    const modal = document.getElementById('addToCartModal');
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeAddToCartModal();
            }
        });
    }
});
