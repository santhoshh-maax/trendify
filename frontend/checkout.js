let cart = JSON.parse(localStorage.getItem("cart")) || [];

const totalElement = document.getElementById("checkout-total");

let total = 0;

cart.forEach(item => {
    total += item.price;
});

totalElement.innerText = total;

async function placeOrder() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!name || !phone || !address) {
        alert("Please fill all details");
        return;
    }

    let order = {
        customerName: name,
        phone: phone,
        address: address,
        items: cart,
        totalPrice: total
    };

    try {
        // Connect to local backend when served via server (localhost), fallback to Railway if opened directly
        const API_URL = window.location.protocol.startsWith("http")
            ? "/orders"
            : "https://trendifybackend-production.up.railway.app/orders";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        });

        const data = await response.json();

        alert("Order Placed Successfully!");

        localStorage.removeItem("cart");

        window.location.href = "success.html";

    } catch (error) {
        console.log(error);
        alert("Failed to place order");
    }
}