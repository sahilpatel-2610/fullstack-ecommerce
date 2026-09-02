const { Newsletter } = require('../models/newsletter');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const list = await Newsletter.find().sort({ dateCreated: -1 });
        return res.status(200).json(list);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || email.trim() === "") {
            return res.status(400).json({
                status: false,
                msg: "Email is required!"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                status: false,
                msg: "Please enter a valid email address!"
            });
        }

        const existingSubscription = await Newsletter.findOne({ email: email.trim().toLowerCase() });
        if (existingSubscription) {
            return res.status(400).json({
                status: false,
                msg: "This email is already subscribed!"
            });
        }

        let newSub = new Newsletter({
            email: email.trim().toLowerCase()
        });

        newSub = await newSub.save();

        return res.status(201).json({
            status: true,
            msg: "Subscribed to Newsletter successfully!",
            data: newSub
        });

    } catch (error) {
        console.error("Newsletter Subscription error:", error);
        return res.status(500).json({
            status: false,
            msg: error.message || "Failed to subscribe. Please try again."
        });
    }
});

module.exports = router;
