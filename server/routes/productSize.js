const { ProductSize } = require("../models/productSize");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
    try {
        const productSizeList = await ProductSize.find();
        return res.status(200).json(productSizeList || []);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!req.params.id || req.params.id === 'undefined' || !mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }
        const item = await ProductSize.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'The item with the given ID was not found.' });
        }
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});



router.post('/create', async (req, res) => {

    let productSize = new ProductSize({
        size: req.body.size
    });



    if (!productSize) {
        res.status(500).json({
            error: err,
            success: false
        })
    }


    productSize = await productSize.save();

    res.status(201).json(productSize);

});


router.delete('/:id', async (req, res) => {
    const deletedItem = await ProductSize.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
        res.status(404).json({
            message: 'Item not found!',
            success: false
        })
    }

    res.status(200).json({
        success: true,
        message: 'Item Deleted!'
    })

});


router.put('/:id', async (req, res) => {

    const item = await ProductSize.findByIdAndUpdate(
        req.params.id,
        {
            size: req.body.size,
        },
        { new: true }
    )

    if (!item) {
        return res.status(500).json({
            message: 'item cannot be updated!',
            success: false
        })
    }


    res.send(item);

});

module.exports = router;