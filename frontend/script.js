let cart = JSON.parse(localStorage.getItem("cart")) || [];
const products = [
    {
        id: 1,
        name: "Floral Dress",
        price: 1499,
        category: "Casual",
        image: "images/dress1.jpg",
        description: "Beautiful floral casual wear."
    },
    {
        id: 2,
        name: "Party Dress",
        price: 2499,
        category: "Party",
        image: "images/dress2.jpg",
        description: "Stylish party wear."
    },
    {
        id: 3,
        name: "Wedding Dress",
        price: 4999,
        category: "Wedding",
        image: "images/dress3.jpg",
        description: "Premium wedding collection."
    },
    {
    id: 4,
    name: "Summer Maxi Dress",
    price: 1799,
    category: "Casual",
    image: "images/dress4.jpg",
    description: "Comfortable summer maxi dress with elegant style."
},
{
    id: 5,
    name: "Elegant Evening Gown",
    price: 3299,
    category: "Party",
    image: "images/dress5.jpg",
    description: "Perfect evening gown for special parties."
},
{
    id: 6,
    name: "Princess Wedding Gown",
    price: 6999,
    category: "Wedding",
    image: "images/dress6.jpg",
    description: "Luxury wedding gown with premium design."
},
{
    id: 7,
    name: "Denim Casual Dress",
    price: 1599,
    category: "Casual",
    image: "images/dress7.jpg",
    description: "Trendy denim dress for casual outings."
},
{
    id: 8,
    name: "Cocktail Party Dress",
    price: 2899,
    category: "Party",
    image: "images/dress8.jpg",
    description: "Stylish cocktail dress for party nights."
},
{
    id: 9,
    name: "Bridal Designer Dress",
    price: 7999,
    category: "Wedding",
    image: "images/dress9.jpg",
    description: "Designer bridal dress with elegant finishing."
},
{
    id: 10,
    name: "Printed Midi Dress",
    price: 1399,
    category: "Casual",
    image: "images/dress10.jpg",
    description: "Lightweight printed midi dress for daily wear."
}
];

const productContainer = document.getElementById("products");
const popup = document.getElementById("popup");

function displayProducts(items) {
    productContainer.innerHTML = "";

    items.forEach(product => {
        productContainer.innerHTML += `
        <div class="card">
            <img src="${product.image}">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="showPopup(${product.id})">View Details</button>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
        `;
    });
}

function goToCollection() {
    document.getElementById("collection").scrollIntoView({
        behavior: "smooth"
    });
}
displayProducts(products);

/* Search */
document.getElementById("search").addEventListener("input", function () {
    let value = this.value.toLowerCase();

    let filtered = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
});

/* Category Filter */
document.getElementById("category").addEventListener("change", function () {
    let value = this.value;

    if (value === "all") {
        displayProducts(products);
    } else {
        let filtered = products.filter(product =>
            product.category === value
        );
        displayProducts(filtered);
    }
});

/* Popup */
function showPopup(id) {
    let product = products.find(p => p.id === id);

    popup.style.display = "flex";
    popup.innerHTML = `
    <div class="popup-content">
        <img src="${product.image}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="closePopup()">Close</button>
    </div>
    `;
}
updateCartCount();
function addToCart(id) {
    let product = products.find(p => p.id === id);

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

function closePopup() {
    popup.style.display = "none";
}