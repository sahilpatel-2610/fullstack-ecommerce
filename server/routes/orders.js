const { Order } = require('../models/order');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/get/count`, async (req, res) => {
    try {
        let query = {};
        if (req.query.period !== undefined && req.query.period !== null && req.query.period !== "") {
            const today = new Date();
            let startDate;

            if (req.query.period === "lastDay") {
                startDate = new Date(today.setDate(today.getDate() - 1));
            } else if (req.query.period === "lastWeek") {
                startDate = new Date(today.setDate(today.getDate() - 7));
            } else if (req.query.period === "lastMonth") {
                startDate = new Date(today.setMonth(today.getMonth() - 1));
            } else if (req.query.period === "lastYear") {
                startDate = new Date(today.setFullYear(today.getFullYear() - 1));
            }

            if (startDate) {
                query.createdAt = { $gte: startDate };
            }
        }

        const orderCount = await Order.countDocuments(query);
        return res.status(200).send({
            orderCount: orderCount || 0
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

router.get(`/`, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 8;

        let query = {};

        if (req.query.userId && req.query.userId !== 'undefined' && req.query.userId !== 'null') {
            query.userId = req.query.userId;
        }

        if (req.query.email && req.query.email !== 'undefined' && req.query.email !== 'null') {
            query.email = req.query.email;
        }

        const totalOrders = await Order.countDocuments(query);
        const totalPages = Math.ceil(totalOrders / perPage) || 1;

        const { Product } = require('../models/products');

        const ordersList = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        const enrichedOrders = await Promise.all(
            (ordersList || []).map(async (order) => {
                const orderObj = order.toObject ? order.toObject() : { ...order };
                if (orderObj.products && Array.isArray(orderObj.products)) {
                    orderObj.products = await Promise.all(
                        orderObj.products.map(async (prodItem) => {
                            let img = prodItem.images || prodItem.image || "";
                            if (Array.isArray(img)) img = img[0] || "";
                            if ((!img || img === "") && prodItem.productId) {
                                try {
                                    const prod = await Product.findById(prodItem.productId);
                                    if (prod && prod.images && prod.images.length > 0) {
                                        img = prod.images[0];
                                    }
                                } catch (e) {}
                            }
                            return { ...prodItem, images: img };
                        })
                    );
                }
                return orderObj;
            })
        );

        return res.status(200).json({
            ordersList: enrichedOrders,
            totalPages: totalPages,
            page: page,
            totalOrders: totalOrders
        });
    } catch (error) {
        console.error("Fetch orders error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        if (!req.params.id || req.params.id === 'undefined' || !mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid order ID' });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'The order with the given ID was not found.' });
        }

        const { Product } = require('../models/products');
        const enrichedProducts = await Promise.all(
            (order.products || []).map(async (item) => {
                let img = item.images || item.image || "";
                if (Array.isArray(img)) img = img[0] || "";

                if ((!img || img === "") && item.productId) {
                    try {
                        const prod = await Product.findById(item.productId);
                        if (prod && prod.images && prod.images.length > 0) {
                            img = prod.images[0];
                        }
                    } catch (e) {}
                }

                const itemObj = item.toObject ? item.toObject() : { ...item };
                itemObj.images = img;
                return itemObj;
            })
        );

        const orderObj = order.toObject();
        orderObj.products = enrichedProducts;
        return res.status(200).send(orderObj);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/create', async (req, res) => {
    try {
        console.log("Incoming order body:", req.body);

        let orderDate = req.body.date;
        if (!orderDate || !orderDate.includes(':')) {
            orderDate = new Date().toLocaleString("en-IN", { 
                month: "short", 
                day: "2-digit", 
                year: "numeric", 
                hour: "2-digit", 
                minute: "2-digit", 
                hour12: true 
            });
        }

        let order = new Order({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            pincode: req.body.pincode,
            amount: req.body.amount,
            paymentId: req.body.paymentId,
            email: req.body.email,
            userId: req.body.userId,
            products: req.body.products,
            date: orderDate
        });

        order = await order.save();

        if (!order) return res.status(400).send('The order cannot be created!');

        res.status(201).send(order);
    } catch (error) {
        console.error("Order Creation Error:", error.message);
        res.status(500).json({ error: error.message, success: false });
    }
});

router.delete('/:id', async (req, res) => {

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
        res.status(404).json({ success: false, message: 'The order with the given ID was not found.' });
    }
    res.status(200).json({ success: true, message: 'The order with the given ID was deleted.' });
});


router.put('/:id', async (req, res) => {
    try {

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                pincode: req.body.pincode,
                amount: req.body.amount,
                paymentId: req.body.paymentId,
                email: req.body.email,
                userId: req.body.userId,
                products: req.body.products,
                date: req.body.date,
                status: req.body.status
            },
            { new: true }
        );

        if (!order) {
            return res.status(500).json({
                message: 'Order cannot be updated!',
                success: false
            });
        }

        res.status(200).json(order);

    } catch (error) {
        console.error("Update order error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;
