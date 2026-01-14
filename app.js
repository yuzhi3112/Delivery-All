// Cart Management
let cart = [];
let selectedLocation = null;
let selectedPayment = null;

// Add to cart
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1,
            category: getItemCategory(itemName)
        });
    }
    
    alert(`${itemName} added to cart!`);
    updateCart();
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
});
