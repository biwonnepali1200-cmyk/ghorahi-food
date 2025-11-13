const menuItems = [
    { name: " Chickn Burger", price: 150, img: "https://i.postimg.cc/pXWzQP2D/1acfb88db086cbec7dde3b31a5512e8f.jpg" },
    { name: "Chicken pizza", price: 500, img: "https://i.postimg.cc/k4H3zB3f/8f2f588ad27a61cdb4bbd599607dba59.jpg" },
    { name: "Vej pizza", price: 400, img: "https://i.postimg.cc/bJPszRrn/df11137f7ea78702571c15bccc691eb6.jpg" },
    { name: "Chicken Fried Rice", price: 200, img: "https://i.postimg.cc/jShzXfyj/40154c39f6bf03135aac61b25c3dc40c.jpg" },
    { name: " Chicken momo", price: 150, img: "https://i.postimg.cc/Prcd5qcR/e835ed89023c2a6d2d1933321d59efc4.jpg" },
    { name: "Vej thupkaa", price: 150, img: "https://i.postimg.cc/ydyn3Gnb/424e48528e963e952b68ae93f0a7a45b.jpg" },
    { name: "Chicken thupkaa", price: 200, img: "https://i.postimg.cc/76Tdtz0j/49a7c12ae908df04ec022548f40d62fe.jpg" },
    { name: "Samosa", price: 30, img: "https://i.postimg.cc/90X7Ldqd/5ef2a623d9673606ebdaab9cf22fe395.jpg" },
    { name: "Vej chowmin", price: 100, img: "https://i.postimg.cc/sD4QdrxG/252e01a45942bc9ae8fa9453942fc036.jpg" },
    { name: "Chicken chowmin", price: 130, img: "https://i.postimg.cc/FH5285SB/11233e96b9f5137a4ef69ceefcbb0423.jpg" },
    { name: "Chicken chilli", price: 200, img: "https://i.postimg.cc/NfDMCkC3/372b8613db840810af667beef6dc6941.jpg" },
    { name: "sprite 1liter", price: 150, img: "https://i.postimg.cc/y6gb70Jn/8494b47e3e3663917c3563b6c11f09b8.jpg" },
    { name: "Chicken mix chwomin", price: 170, img: "https://i.postimg.cc/FH5285SB/11233e96b9f5137a4ef69ceefcbb0423.jpg" },
    { name: "Chicken biriyani", price: 280, img: "https://i.postimg.cc/1zDzx8pk/57588b32c55b721df9710bfe1093fe1f.jpg" },
    { name: "Egg burger", price: 100, img: "https://i.postimg.cc/4dNnzJcR/f8c520d75e96958d2a50556f0135e036.jpg" },
];

let cart = [];

function generateMenu() {
    const menuDiv = document.getElementById('menu');
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('menu-item');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3 class="item-name">${item.name}</h3>
            <p class="price">Rs ${item.price}</p>
            <div class="quantity">
                <button onclick="changeQuantity(this, -1)">-</button>
                <span class="qty">0</span>
                <button onclick="changeQuantity(this, 1)">+</button>
            </div>
            <button onclick="addToCart(this)">Add to Cart</button>
        `;
        menuDiv.appendChild(div);
    });
}

function changeQuantity(btn, delta) {
    const qtyElem = btn.parentElement.querySelector('.qty');
    let qty = parseInt(qtyElem.textContent);
    qty = Math.max(0, qty + delta);
    qtyElem.textContent = qty;
}

function addToCart(btn) {
    const item = btn.parentElement;
    const name = item.querySelector('.item-name').textContent;
    const price = parseInt(item.querySelector('.price').textContent.replace('Rs ', ''));
    const qty = parseInt(item.querySelector('.qty').textContent);

    if (qty === 0) return alert("Select quantity first!");

    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    cart.forEach(item => {
        const p = document.createElement('p');
        p.textContent = `${item.name} x${item.qty} - Rs ${item.price * item.qty}`;
        cartDiv.appendChild(p);
    });
}

function checkout() {
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const area = document.getElementById('customer-area').value;

    if (!name || !phone || !address || !area || cart.length === 0) {
        return alert("Please fill all details and add items to cart!");
    }

    alert(`Order Placed!\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nArea: ${area}\nItems: ${cart.map(i => i.name + ' x' + i.qty).join(', ')}`);
    
    // Reset
    cart = [];
    updateCart();
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    document.getElementById('customer-address').value = '';
    document.getElementById('customer-area').value = '';
}

// Initialize menu on page load
generateMenu();

// Optional: Search functionality
function searchFood() {
    const query = document.getElementById('search').value.toLowerCase();
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';
    const filtered = menuItems.filter(item => item.name.toLowerCase().includes(query));
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('menu-item');
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3 class="item-name">${item.name}</h3>
            <p class="price">Rs ${item.price}</p>
            <div class="quantity">
                <button onclick="changeQuantity(this, -1)">-</button>
                <span class="qty">0</span>
                <button onclick="changeQuantity(this, 1)">+</button>
            </div>
            <button onclick="addToCart(this)">Add to Cart</button>
        `;
        menuDiv.appendChild(div);
    });
}