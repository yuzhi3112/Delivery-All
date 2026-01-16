# DeliveryItAll - Generic Delivery Platform

A comprehensive multi-category delivery platform for Food, Beverages, Medicine, and Grocery items across Singapore.

## Project Structure

```
FnB website/
├── index.html              # Home page with category showcase
├── dashboard.html          # Shopping cart & order summary
├── styles.css             # Global stylesheet
├── app.js                 # JavaScript for cart and interactions
├── categories/            # Individual category pages
│   ├── food.html          # Food delivery (COMPLETED)
│   ├── beverage.html      # Beverages (TEMPLATE - Team Member 2)
│   ├── medicine.html      # Medicine & Health (TEMPLATE - Team Member 3)
│   └── grocery.html       # Grocery & Essentials (TEMPLATE - Team Member 4)
└── README.md              # This file
```

## Features

### 1. **Dashboard**
- Real-time order tracking
- Item quantities management
- 7% GST/Service charge calculation
- Delivery location selection (Singapore regions: East, West, South, North, Central)
- Total cost calculation
- Add/Remove items from cart
- Checkout functionality

### 2. **Category System**
- Food: Ready-to-eat meals, snacks, desserts
- Beverages: Hot drinks, cold beverages, juices & smoothies
- Medicine: OTC medicines, health supplements, first aid
- Grocery: Fresh produce, pantry items, household essentials

### 3. **Navigation**
- Sticky navigation bar with dropdown menu
- Easy access to all categories
- Quick navigation to dashboard
- Home page with category overview

### 4. **Responsive Design**
- Mobile-friendly layout
- Flexible grid system
- Touch-friendly buttons and interactions

## Category Pages Assignment

### Food Category (COMPLETED) ✅
- 12 food products with descriptions and prices
- Organized into sections: Ready-to-Eat Meals, Snacks & Appetizers, Desserts
- All items functional and ready to order

### Beverage Category (TEMPLATE)
**Team Member 2**: Please add:
1. At least 12 beverage products across sections:
   - Hot Beverages (coffee, tea, hot chocolate, etc.)
   - Cold Beverages (soft drinks, iced tea, etc.)
   - Juices & Smoothies

Example product format:
```html
<div class="product-item">
    <h3>Product Name</h3>
    <p>Description of the beverage</p>
    <p class="price">$XX.XX</p>
    <button class="add-btn" onclick="addToCart('Product Name', XX.XX)">Add to Cart</button>
</div>
```

### Medicine Category (COMPLETED) ✅
Complete pharmaceutical product catalog with 20+ medicines organized into:
1. **Pain Relief & Fever** - Paracetamol, Ibuprofen, Aspirin, Diclofenac
2. **Cold & Cough Relief** - Cough syrup, throat lozenges, decongestants, antihistamines
3. **Digestive & Stomach Health** - Antacids, loperamide, probiotics, omeprazole
4. **Skin Care & Topicals** - Hydrocortisone cream, antibiotic ointment, antifungal cream, moisturizer
5. **Vitamins & Supplements** - Vitamin C, D3, multivitamins, iron supplement
6. **First Aid & Wellness** - Bandages, antiseptic solution, elastic bandages, digital thermometer

Each product includes:
- Product name and strength/size
- Detailed uses and benefits
- Application/usage instructions
- Price in SGD

### Grocery Category (TEMPLATE)
**Team Member 4**: Please add:
1. At least 12 grocery products across sections:
   - Fresh Produce
   - Pantry Items
   - Household Essentials

## How to Use

1. **Clone the repository**
   ```bash
   git clone https://github.com/RedGittet/QuickDeliver.git
   cd QuickDeliver
   ```

2. **Open in browser**
   - Double-click `index.html` to open the home page
   - Or use a local server (Python: `python -m http.server` or Node.js: `npx http-server`)

3. **Navigation**
   - Home: Explore all categories
   - Categories: Access specific category pages
   - Dashboard: View cart and complete orders

## Delivery Locations (Singapore)

- 🏘️ **East Singapore**: Ang Mo Kio, Pasir Ris, Punggol, Serangoon
- 🏘️ **West Singapore**: Bukit Batok, Jurong, Choa Chu Kang
- 🏘️ **South Singapore**: Bedok, Tampines, Bishan, Marine Parade
- 🏘️ **North Singapore**: Woodlands, Yishun, Sembawang
- 🏘️ **Central Singapore**: Orchard, Bukit Timah, Newton, River Valley

## Technologies Used

- **HTML5**: Structure
- **CSS3**: Styling with gradients, flexbox, grid
- **JavaScript**: Cart management and interactions
- **No External Dependencies**: Pure vanilla JavaScript

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Key Features

### Shopping Cart
- Add items from any category
- Adjust quantities
- Remove items
- Real-time price calculation

### Order Summary
- Subtotal calculation
- 7% GST/Service charge
- Final total amount
- Delivery location selection
- Order placement confirmation

### User Experience
- Smooth animations and transitions
- Responsive navigation
- Clear product information
- Easy checkout process
- Mobile optimized

## Future Enhancements

- User authentication and account management
- Payment gateway integration
- Order tracking and history
- Reviews and ratings system
- Search and filter functionality
- Dietary restrictions and preferences
- Multi-language support
- Real-time delivery tracking
- Scheduled delivery options

## License

© 2026 DeliveryItAll. All rights reserved.

## Contact

- GitHub: @RedGittet
- Service Area: Singapore

---

**Project Created**: January 14, 2026
**Last Updated**: January 14, 2026

**Team Members**:
- Member 1 (You): Medicine Category (Completed) ✅
- Member 2: Beverage Category (In Progress)
- Member 3: Medicine Category (In Progress)
- Member 4: Grocery Category (In Progress)

## Product Information Structure

Each product in the medicine category includes:
- **Product Name**: Clear product name with strength/size
- **Uses**: What the medicine/supplement is used for
- **Application**: How to use the product (dosage, frequency, precautions)
- **Price**: Cost in SGD
- **Add to Cart**: One-click purchasing

## Notes

- All prices are in SGD ($)
- GST (7%) is automatically added to orders
- Estimated delivery time: 30-45 minutes
- Service covers all Singapore regions
