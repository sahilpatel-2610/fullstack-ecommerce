const { Cart } = require('../models/cart');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) => {
    try {
        let query = {};
        if (req.query.userId && req.query.userId !== "undefined" && req.query.userId !== "null") {
            query.userId = String(req.query.userId);
        } else if (req.query.id && req.query.id !== "undefined" && req.query.id !== "null") {
            query.userId = String(req.query.id);
        } else if (Object.keys(req.query).length > 0) {
            query = { ...req.query };
        }

        const cartList = await Cart.find(query);

        if (!cartList) {
            return res.status(200).json([]);
        }

        // Deduplicate duplicate items if any exist for the same product & options
        const uniqueCartMap = new Map();
        const duplicatesToDelete = [];

        for (const item of cartList) {
            const key = `${item.userId}_${item.productId}_${item.size || ''}_${item.weight || ''}_${item.ram || ''}`;
            if (!uniqueCartMap.has(key)) {
                uniqueCartMap.set(key, item);
            } else {
                const existing = uniqueCartMap.get(key);
                existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
                existing.subTotal = existing.price * existing.quantity;
                duplicatesToDelete.push(item._id);
            }
        }

        if (duplicatesToDelete.length > 0) {
            await Cart.deleteMany({ _id: { $in: duplicatesToDelete } });
            for (const item of uniqueCartMap.values()) {
                await Cart.findByIdAndUpdate(item._id, { quantity: item.quantity, subTotal: item.subTotal });
            }
        }

        return res.status(200).json(Array.from(uniqueCartMap.values()));

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        if (!req.body.userId || !req.body.productId) {
            return res.status(400).json({
                status: false,
                success: false,
                msg: "Authentication required to add items to cart!"
            });
        }

        const sizeVal = req.body.size || "";
        const weightVal = req.body.weight || "";
        const ramVal = req.body.ram || "";
        const productIdVal = String(req.body.productId);
        const userIdVal = String(req.body.userId);

        const cartItem = await Cart.findOne({
            productId: productIdVal,
            userId: userIdVal,
            size: sizeVal,
            weight: weightVal,
            ram: ramVal
        });

        if (!cartItem) {
            const qty = parseInt(req.body.quantity) || 1;
            const price = parseFloat(req.body.price) || 0;
            let cartList = new Cart({
                productTitle: req.body.productTitle,
                images: req.body.images,
                rating: req.body.rating,
                price: price,
                quantity: qty,
                subTotal: price * qty,
                productId: productIdVal,
                userId: userIdVal,
                size: sizeVal,
                weight: weightVal,
                ram: ramVal
            });

            cartList = await cartList.save();
            return res.status(201).json(cartList);
        } else {
            const addedQty = parseInt(req.body.quantity) || 1;
            const newQuantity = (cartItem.quantity || 0) + addedQty;
            const price = parseFloat(cartItem.price) || 0;
            const newSubTotal = price * newQuantity;
            cartItem.quantity = newQuantity;
            cartItem.subTotal = newSubTotal;
            await cartItem.save();

            return res.status(200).json({
                status: true,
                msg: 'Product quantity updated in the cart',
                cartList: cartItem
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            success: false
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {
            return res.status(404).json({
                message: 'The cart item given id is not found!',
                success: false
            });
        }

        const deletedItem = await Cart.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({
                message: 'Cart item not found!',
                success: false
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cart item deleted!'
        });

    } catch (error) {
        console.error("Delete cart item error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {

        const cartList = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                productTitle: req.body.productTitle,
                images: req.body.images,
                rating: req.body.rating,
                price: req.body.price,
                quantity: req.body.quantity,
                subTotal: req.body.subTotal,
                productId: req.body.productId,
                userId: req.body.userId,
                size: req.body.size,
                weight: req.body.weight,
                ram: req.body.ram
            },
            { new: true }
        );

        if (!cartList) {
            return res.status(500).json({
                message: 'Cart item cannot be updated!',
                success: false
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cart item updated!',
            cartList
        });

    } catch (error) {
        console.error("Update cart item error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


router.delete('/user/:userId', async (req, res) => {
    try {
        const uId = String(req.params.userId);
        await Cart.deleteMany({ $or: [{ userId: uId }, { userId: req.params.userId }] });

        return res.status(200).json({
            success: true,
            message: 'Cart cleared!'
        });
    } catch (error) {
        console.error("Clear cart error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;
