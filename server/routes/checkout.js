const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
    try {
        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.productTitle,
                    images: [product.images],
                },
                unit_amount: product.price * 100, // Amount should be in cents (or paise for INR)
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/success`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/cart`,
        });

        res.status(200).json({ id: session.id });

    } catch (error) {
        console.error("Stripe Session Error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
