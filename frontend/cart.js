let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<h2>Your cart is empty</h2>";
        totalPrice.innerText = 0;
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>
            <button onclick="removeItem(${index})">Remove</button>
        </div>
        `;
    });

    totalPrice.innerText = total;
}

function removeItem(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

function checkout() {
    window.location.href = "checkout.html";
}

displayCart();