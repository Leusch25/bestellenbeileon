// Warenkorb-Array
let cart = [];

// Produkte laden
function loadProducts() {
    const products = [
        { id: 1, name: 'Armband', price: 5.00,
        { id: 2, name: 'Schlüsselanhänger Stoff', price: 3.00,
        { id: 3, name: 'Schlüsselanhänger Paracord', price: 5.00,
    ];

    const productContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>€${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">In den Warenkorb</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Zum Warenkorb hinzufügen
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartDisplay();
}

// Warenkorb anzeigen aktualisieren
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - €${item.price.toFixed(2)} x ${item.quantity}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = `Gesamt: €${total.toFixed(2)}`;
}

// Warenkorb ein-/ausblenden
function toggleCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.style.display = cartDiv.style.display === 'none' ? 'block' : 'none';
}

// Checkout-Funktion
function checkout() {
    if (cart.length === 0) {
        alert('Ihr Warenkorb ist leer!');
        return;
    }
    
    // Warenkorb-Inhalt für E-Mail zusammenstellen
    let emailBody = 'Neue Bestellung:\n\n';
    let total = 0;
    cart.forEach(item => {
        emailBody += `${item.name} - €${item.price.toFixed(2)} x ${item.quantity}\n`;
        total += item.price * item.quantity;
    });
    emailBody += `\nGesamt: €${total.toFixed(2)}\n\n`;
    emailBody += 'Zahlung erfolgt bar bei persönlicher Abholung.\n';
    emailBody += 'Bitte bestätigen Sie die Bestellung.';
    
    // E-Mail-Link erstellen (ersetze 'deine-email@example.com' mit der tatsächlichen E-Mail)
    const emailSubject = 'Neue Bestellung';
    const emailLink = `mailto:l.grill@hgs-singen.online?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // E-Mail öffnen
    window.location.href = emailLink;
    
    // Warenkorb leeren
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Produkte beim Laden der Seite anzeigen
loadProducts();