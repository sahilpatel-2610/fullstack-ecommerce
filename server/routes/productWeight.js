const { ProductWeight } = require("../models/productWeight");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
    try {
        const productWeightList = await ProductWeight.find();
        return res.status(200).json(productWeightList || []);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (!req.params.id || req.params.id === 'undefined' || !mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }
        const item = await ProductWeight.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'The item with the given ID was not found.' });
        }
        return res.status(200).send(item);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});



router.post('/create', async (req, res) => {

    let productWeight = new ProductWeight({
        productWeight: req.body.productWeight
    });



    if (!productWeight) {
        res.status(500).json({
            error: err,
            success: false
        })
    }


    productWeight = await productWeight.save();

    res.status(201).json(productWeight);

});


router.delete('/:id', async (req, res) => {
    const deletedItem = await ProductWeight.findByIdAndDelete(req.params.id);

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

    const item = await ProductWeight.findByIdAndUpdate(
        req.params.id,
        {
            productWeight: req.body.productWeight,
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