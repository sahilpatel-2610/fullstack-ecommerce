const { Order } = require('../models/order');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = 8;

        let query = { ...req.query };
        delete query.page;
        delete query.perPage;

        const totalOrder = await Order.countDocuments(query);
        const totalPages = Math.ceil(totalOrder / perPage);

        if (page > totalPages && totalPages > 0) {
            return res.status(404).json({ message: "Page not found!" });
        }

        const ordersList = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        if (!ordersList) {
            res.status(500).json({ success: false });
        }

        return res.status(200).json({
            "ordersList": ordersList,
            "totalPages": totalPages,
            "page": page
        })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(500).json({ success: false, message: 'The order with the given ID was not found.' });
    }
    res.status(200).send(order);
});

router.post('/create', async (req, res) => {
    try {
        console.log("Incoming order body:", req.body);

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
            date: req.body.date
        })

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


router.get(`/get/count`, async (req, res) => {
    const orderCount = await Order.countDocuments();

    if (!orderCount && orderCount !== 0) {
        res.status(500).json({ success: false })
    }

    res.send({
        orderCount: orderCount
    });
});

module.exports = router;
