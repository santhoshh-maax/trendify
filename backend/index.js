const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use(orderRoutes);

// Path to frontend directory
const frontendPath = path.join(__dirname, "../frontend");

// Serve frontend static assets (CSS, JS, images, html)
app.use(express.static(frontendPath));

// Serve main frontend page
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Clean URL support for pages
app.get("/cart", (req, res) => {
    res.sendFile(path.join(frontendPath, "cart.html"));
});

app.get("/checkout", (req, res) => {
    res.sendFile(path.join(frontendPath, "checkout.html"));
});

app.get("/success", (req, res) => {
    res.sendFile(path.join(frontendPath, "success.html"));
});

// Safe MongoDB connection
if (process.env.MONGO_URL) {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log("MongoDB connection error:", err));
} else {
    console.log("Warning: MONGO_URL is not set. Add MONGO_URL in backend/.env to connect to database.");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend accessible at http://localhost:${PORT}`);
});