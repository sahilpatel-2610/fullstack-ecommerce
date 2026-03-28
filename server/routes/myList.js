const { MyList } = require('../models/myList');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) => {
    try {

        const myList = await MyList.find(req.query);

        if (!myList) {
            return res.status(500).json({ success: false })
        }

        return res.status(200).json(myList);

    } catch (error) {
        res.status(500).json({ success: false })
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

router.get('/:id', async (req, res) => {

    const item = await MyList.findById(req.params.id);

    if (!item) {
        return res.status(500).json({
            message: 'The item with given ID was not found.',
        });
    }
    return res.status(200).send(item);

});


module.exports = router;
