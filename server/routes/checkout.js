const { Order } = require('../models/order.js');
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
    try {
        const products = req.body.products;

        const lineItems = products.map((product) => {
            let images = [];
            
            // If images is an array, take the first one; if it's a string, use it.
            let imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;

            if (imageUrl && typeof imageUrl === 'string') {
                if (imageUrl.startsWith('http')) {
                    images.push(imageUrl);
                } else {
                    // Prepend backend base URL if it's relative
                    images.push(`${req.protocol}://${req.get('host')}${imageUrl}`);
                }
            }

            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.productTitle?.substr(0, 30) + "...",
                        images: images.length > 0 ? images : undefined,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            };
        });

        const customer = await stripe.customers.create({
            email: req.body.email,
            metadata: {
                userId: req.body.userId,
            }
        })

        const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
        console.log("Client URL:", clientUrl);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            phone_number_collection: {
                enabled: false // Disabled to avoid confusion with card number fields
            },
            customer: customer.id,
            line_items: lineItems,
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['IN', 'US', 'CA', 'GB']
            },
            success_url: `${clientUrl}/payment/complete/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${clientUrl}/cart`,
        });

        res.json({ 
            id: session.id,
            url: session.url
        });

    } catch (error) {
        console.error("Stripe Session Error:", error);
        res.status(500).json({ message: error.message || "Failed to create checkout session!" });
    }
});

router.get('/payment/complete', async (req, res) => {
    const result = Promise.all([
        stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
        stripe.checkout.sessions.listLineItems(req.query.session_id)
    ])

    res.status(200).send(JSON.stringify(await result))
});

router.get('/cancel', (req, res) => {
    res.redirect("/")
});


//create order


const createOrder = async (req, res) => {

}

module.exports = router;
