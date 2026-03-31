/* --- 1. DATA ARCHITECTURE (9 PREMIUM ITEMS) --- */
const junkMenu = [
    { id: 1, name: "NEON_GLAZE_BURGER", price: 18, desc: "Double-aged wagyu, gold-leaf cheddar, charcoal bun.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600" },
    { id: 2, name: "CYBER_TRUFFLE_FRIES", price: 12, desc: "Hand-cut potatoes, white truffle oil, volcanic salt.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600" },
    { 
    id: 3, 
    name: "SOLARIS_ICED_TEA", 
    price: 9, 
    desc: "Cold-pressed peach nectar, jasmine infusion, edible silver.", 
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600" 
},
    { id: 4, name: "OBSIDIAN_WINGS", price: 16, desc: "Honey-soy reduction, black garlic, toasted sesame.", img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600" },
    { id: 5, name: "24K_GOLD_PIZZA", price: 28, desc: "Iberico ham, 24k gold flakes, buffalo mozzarella.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600" },
    { id: 6, name: "STATIC_SHAKE", price: 11, desc: "Madagascar vanilla, blue spirulina, popping sugar.", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600" },
    { id: 7, name: "QUANTUM_TACOS", price: 15, desc: "Slow-cooked brisket, lime-cilantro crema, blue corn.", img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=600" },
    { id: 8, name: "DIGITAL_DONUTS", price: 10, desc: "Galaxy glaze, algorithmic sugar shards, cream fill.", img: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=600" },
    { id: 9, name: "VAPOR_NACHOS", price: 14, desc: "Liquid gold cheese, jalapeño extract, blue corn chips.", img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600" }
];

let cart = [];

/* --- 2. INITIALIZE SHOP --- */
function initShop() {
    const grid = document.getElementById('menuGrid');
    if(!grid) return;

    grid.innerHTML = junkMenu.map(item => `
        <div class="card">
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div style="color: var(--gold); font-weight: 800; margin-bottom: 15px; font-size: 1.1rem;">
                $${item.price}.00
            </div>
            <button class="btn-gold-solid" style="width: 100%; margin: 0;" onclick="addToCart(${item.id})">
                ADD_TO_CART
            </button>
        </div>
    `).join('');
}

/* --- 3. CART CORE LOGIC --- */
function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('active');
}

function addToCart(id) {
    const item = junkMenu.find(p => p.id === id);
    cart.push({...item, cartId: Date.now()}); // Unique ID for removal
    updateCartUI();
    
    // Auto-open drawer for feedback
    const drawer = document.getElementById('cartDrawer');
    if(!drawer.classList.contains('active')) toggleCart();
}

function removeItem(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCartUI();
}

function updateCartUI() {
    const countBadge = document.getElementById('cart-count');
    const cartBody = document.getElementById('cartItems');
    const totalDisplay = document.getElementById('cartTotal');

    countBadge.innerText = cart.length;

    if(cart.length === 0) {
        cartBody.innerHTML = `<div style="text-align:center; color:#555; margin-top:50px;">EMPTY_MANIFEST</div>`;
    } else {
        cartBody.innerHTML = cart.map(item => `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #111; padding-bottom:10px;">
                <div>
                    <div style="font-family:'Syncopate'; font-size:0.6rem; color:var(--gold);">${item.name}</div>
                    <div style="font-size:0.8rem;">$${item.price}.00</div>
                </div>
                <button onclick="removeItem(${item.cartId})" style="background:none; border:none; color:red; cursor:pointer; font-size:1.2rem;">&times;</button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.innerText = `$${total.toFixed(2)}`;
}

/* --- 4. ORDER & POPUP LOGIC --- */
function openOrderModal() {
    if(cart.length === 0) {
        alert("MANIFEST_EMPTY: Please select items.");
        return;
    }

    const modal = document.getElementById('orderModal');
    const summary = document.getElementById('finalSummary');
    const tracking = document.getElementById('trackingID');

    // Generate Summary
    summary.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.9rem;">
            <span>${item.name}</span>
            <span>$${item.price}.00</span>
        </div>
    `).join('');

    // Generate Random 2026 Tracking Code
    const randomID = "LM-" + Math.floor(100 + Math.random() * 900) + "-" + Math.random().toString(36).substr(2, 4).toUpperCase();
    tracking.innerText = randomID;

    modal.style.display = 'grid';
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    cart = []; // Clear cart after order
    updateCartUI();
    toggleCart();
}

/* --- 5. UI ENHANCEMENTS (Custom Cursor) --- */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;
    
    cursorOutline.animate({
        left: `${x}px`,
        top: `${y}px`
    }, { duration: 400, fill: "forwards" });
});

/* --- 6. FORM HANDLING --- */
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = "TRANSMITTING...";
    
    setTimeout(() => {
        btn.innerText = "DATA_RECEIVED";
        e.target.reset();
        setTimeout(() => btn.innerText = "TRANSMIT_DATA", 2000);
    }, 1500);
});

// Initialize on Load
window.onload = () => {
    initShop();
    updateCartUI();
};
