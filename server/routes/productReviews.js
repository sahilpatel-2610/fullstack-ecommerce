const { ProductReviews } = require('../models/productReviews');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) => {

    let reviews = [];

    try {

        if (req.query.productId !== undefined && req.query.productId !== null && req.query.productId !== "") {
            reviews = await ProductReviews.find({ productId: req.query.productId });
        }

        if (!reviews) {
            res.status(500).json({ success: false })
        }

        return res.status(200).json(reviews);

    } catch (error) {
        res.status(500).json({ success: false })
    }
});

router.get(`/:id`, async (req, res) => {

    const review = await ProductReviews.findById(req.params.id);

    if (!review) {
        res.status(500).json({ message: 'The review with the given ID was not found.' })
    }

    return res.status(200).json(review);
});



router.post('/add', async (req, res) => {

    try {
        let review = new ProductReviews({
            customerName: req.body.customerName,
            review: req.body.review,
            customerRating: req.body.customerRating,
            productId: req.body.productId,
            customerId: req.body.customerId
        });

        if (!review) {
            return res.status(500).json({
                success: false,
                message: "Review could not be created"
            })
        }

        review = await review.save();

        res.status(201).json(review);
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
});

// router.delete('/:id', async (req, res) => {
//     try {
//         const review = await ProductReviews.findById(req.params.id);

//         if (!review) {
//             return res.status(404).json({
//                 message: 'The review given id is not found!',
//                 success: false
//             });
//         }

//         const deletedItem = await ProductReviews.findByIdAndDelete(req.params.id);

//         if (!deletedItem) {
//             return res.status(404).json({
//                 message: 'Review not found!',
//                 success: false
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Cart item deleted!'
//         });

//     } catch (error) {
//         console.error("Delete cart item error:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });


// router.put('/:id', async (req, res) => {
//     try {

//         const cartList = await Cart.findByIdAndUpdate(
//             req.params.id,
//             {
//                 productTitle: req.body.productTitle,
//                 images: req.body.images,
//                 rating: req.body.rating,
//                 price: req.body.price,
//                 quantity: req.body.quantity,
//                 subTotal: req.body.subTotal,
//                 productId: req.body.productId,
//                 userId: req.body.userId,
//                 size: req.body.size,
//                 weight: req.body.weight,
//                 ram: req.body.ram
//             },
//             { new: true }
//         );

//         if (!cartList) {
//             return res.status(500).json({
//                 message: 'Cart item cannot be updated!',
//                 success: false
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Cart item updated!',
//             cartList
//         });

//     } catch (error) {
//         console.error("Update cart item error:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });


module.exports = router;
