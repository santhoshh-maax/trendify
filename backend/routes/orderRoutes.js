const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/orders", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        res.status(201).json({
            message: "Order Saved Successfully",
            data: order
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;