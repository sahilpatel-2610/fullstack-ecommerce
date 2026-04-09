const { Cart } = require('../models/cart');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) => {
    try {

        const cartList = await Cart.find(req.query);

        if (!cartList) {
            return res.status(500).json({ success: false })
        }

        return res.status(200).json(cartList);

    } catch (error) {
        res.status(500).json({ success: false })
    }
});



router.post('/add', async (req, res) => {
    try {
        const cartItem = await Cart.findOne({
            productId: req.body.productId,
            userId: req.body.userId,
            size: req.body.size,
            weight: req.body.weight,
            ram: req.body.ram
        });

        if (!cartItem) {
            let cartList = new Cart({
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
            });

            cartList = await cartList.save();

            res.status(201).json(cartList);
        } else {
            return res.status(200).json({
                status: false,
                msg: 'Product already added in the cart'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message,
            success: false
        })
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
        const deletedItems = await Cart.deleteMany({ userId: req.params.userId });

        if (!deletedItems) {
            return res.status(404).json({
                message: 'Cart items not found!',
                success: false
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cart cleared!'
        });

    } catch (error) {
        console.error("Clear cart error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;
