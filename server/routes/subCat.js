const { SubCategory } = require('../models/subCat');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage);
        let SubCategoryList = [];
        let totalPages = 0;

        if (req.query.page !== undefined && req.query.perPage !== undefined) {
            const totalPosts = await SubCategory.countDocuments();
            totalPages = Math.ceil(totalPosts / perPage);

            SubCategoryList = await SubCategory.find().populate('category')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        } else {
            SubCategoryList = await SubCategory.find().populate('category');
        }

        if (!SubCategoryList) {
            res.status(500).json({ success: false })
        }

        return res.status(200).json({
            "subCategoryList": SubCategoryList,
            "totalPages": totalPages,
            "page": page
        });

    } catch (error) {
        res.status(500).json({ success: false })
    }
});

router.get('/:id', async (req, res) => {

    try {

        const subCat = await SubCategory.findById(req.params.id);

        if (!subCat) {
            return res.status(404).json({ success: false, message: 'The sub category with the given ID was not found.' });
        }

        return res.status(200).send(subCat);
    } catch (error) {
        console.error("Error fetching subCategory:", error);
        return res.status(500).json({ success: false, error: error.message });
    }

    // router.get('/:id', async (req, res) => {

    //   const subCat = await SubCategory.findById(req.params.id).populate('category');

    //     if (!subCat) {
    //        res.status(500).json({ message: 'The sub category with the given ID was not found.' });
    //     }

    //     return res.status(200).send(subCat);
    // });
});

router.post('/create', async (req, res) => {
    try {
        let subCat = new SubCategory({
            category: req.body.category,
            subCat: req.body.subCat,
        });

        if (!subCat) {
            return res.status(500).json({
                error: "Failed to create sub category",
                success: false
            })
        }

        subCat = await subCat.save();
        return res.status(201).json(subCat);
    } catch (err) {
        console.error("Error creating sub category:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedSubCat = await SubCategory.findByIdAndDelete(req.params.id);

        if (!deletedSubCat) {
            return res.status(404).json({
                message: 'Sub Category not found!',
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Sub Category Deleted!'
        });
    } catch (err) {
        console.error("Error deleting sub category:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {

        const subCat = await SubCategory.findByIdAndUpdate(
            req.params.id,
            {
                category: req.body.category,
                subCat: req.body.subCat,
            },
            { new: true }
        );

        if (!subCat) {
            return res.status(500).json({
                message: 'Sub Category cannot be updated!',
                success: false
            });
        }

        res.status(200).json(subCat);

    } catch (error) {
        console.error("Update subCategory error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});



module.exports = router;