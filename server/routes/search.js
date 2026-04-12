const { Product } = require('../models/products.js');
const { Category } = require('../models/category.js');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ msg: 'Query is required' });
        }

        // Find categories that match the query
        const categories = await Category.find({
            name: { $regex: query, $options: 'i' }
        });
        const categoryIds = categories.map(cat => cat._id);

        const items = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { brand: { $regex: query, $options: 'i' } },
                { catName: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $in: categoryIds } }
            ]
        }).populate("category subCat");

        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;