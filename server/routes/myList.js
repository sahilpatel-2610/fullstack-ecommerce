const { MyList } = require('../models/myList');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) => {
    try {
        const myList = await MyList.find(req.query);

        if (!myList || myList.length === 0) {
            return res.status(200).json([]);
        }

        let validMyList = myList;
        try {
            const { Product } = require('../models/products');
            const activeProducts = await Product.find({}, '_id').lean();
            const activeProductSet = new Set(activeProducts.map(p => p._id.toString()));

            const filtered = [];
            const orphanedListIds = [];

            for (const item of myList) {
                const pId = item.productId ? item.productId.toString() : null;
                if (pId && activeProductSet.has(pId)) {
                    filtered.push(item);
                } else {
                    orphanedListIds.push(item._id);
                }
            }

            if (orphanedListIds.length > 0) {
                MyList.deleteMany({ _id: { $in: orphanedListIds } }).exec().catch(err => console.error("Clean orphaned myList error:", err));
            }
            validMyList = filtered;
        } catch (e) {
            console.error("MyList active product filter error:", e);
        }

        return res.status(200).json(validMyList);

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



router.post('/add', async (req, res) => {
    try {
        if (!req.body.userId || !req.body.productId) {
            return res.status(400).json({
                status: false,
                msg: "Authentication required to add items to My List!"
            });
        }

        const item = await MyList.findOne({
            productId: req.body.productId,
            userId: req.body.userId
        });

        if (!item) {
            let list = new MyList({
                productTitle: req.body.productTitle,
                images: req.body.images,
                rating: req.body.rating,
                price: req.body.price,
                productId: req.body.productId,
                userId: req.body.userId,
            });

            list = await list.save();

            res.status(201).json({
                status: true,
                ...list._doc
            });
        } else {
            return res.status(200).json({
                status: false,
                msg: 'Product already added in the My List'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message,
            msg: "Something went wrong on the server!",
            success: false,
            status: false
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const item = await MyList.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: 'The item given id is not found!',
                success: false
            });
        }

        const deletedItem = await MyList.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({
                message: 'Item not found!',
                success: false
            });
        }

        res.status(200).json({
            success: true,
            message: 'Item deleted!'
        });

    } catch (error) {
        console.error("Delete item error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const mongoose = require('mongoose');

router.get('/:id', async (req, res) => {
    try {
        if (!req.params.id || req.params.id === 'undefined' || !mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }
        const item = await MyList.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                message: 'The item with given ID was not found.',
            });
        }
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;
