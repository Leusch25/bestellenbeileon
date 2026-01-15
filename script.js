// Warenkorb-Array
let cart = [];

// Produkte laden
function loadProducts() {
    const products = [
        { id: 1, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/200x150?text=Laptop' },
        { id: 2, name: 'Smartphone', price: 599.99, image: 'https://via.placeholder.com/200x150?text=Smartphone' },
        { id: 3, name: 'Kopfhörer', price: 149.99, image: 'https://via.placeholder.com/200x150?text=Kopfhoerer' },
        { id: 4, name: 'Tablet', price: 399.99, image: 'https://via.placeholder.com/200x150?text=Tablet' },
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