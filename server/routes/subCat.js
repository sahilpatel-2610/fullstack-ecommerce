const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage);
        let SubCategoryList = [];
        let totalPages = 0;

        const query = { parentId: { $exists: true, $ne: null, $ne: "" } };

        if (req.query.page !== undefined && req.query.perPage !== undefined) {
            const totalPosts = await Category.countDocuments(query);
            totalPages = Math.ceil(totalPosts / perPage);

            SubCategoryList = await Category.find(query).populate('category')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        } else {
            SubCategoryList = await Category.find(query).populate('category');
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

        const subCat = await Category.findById(req.params.id);

        if (!subCat) {
            return res.status(404).json({ success: false, message: 'The sub category with the given ID was not found.' });
        }

        return res.status(200).send(subCat);
    } catch (error) {
        console.error("Error fetching subCategory:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/create', async (req, res) => {
    try {
        let subCat = new Category({
            name: req.body.subCat,
            parentId: req.body.category,
            slug: req.body.subCat.toLowerCase().replace(/ /g, '-')
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
        const deletedSubCat = await Category.findByIdAndDelete(req.params.id);

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

        const subCat = await Category.findByIdAndUpdate(
            req.params.id,
            {
                parentId: req.body.category,
                name: req.body.subCat,
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



router.get(`/get/count`, async (req, res) => {
    let query = { parentId: { $exists: true, $ne: null, $ne: "" } };
    if (req.query.period !== undefined && req.query.period !== null && req.query.period !== "") {
        const today = new Date();
        let startDate;

        if (req.query.period === "lastDay") {
            startDate = new Date(today.setDate(today.getDate() - 1));
        } else if (req.query.period === "lastWeek") {
            startDate = new Date(today.setDate(today.getDate() - 7));
        } else if (req.query.period === "lastMonth") {
            startDate = new Date(today.setMonth(today.getMonth() - 1));
        } else if (req.query.period === "lastYear") {
            startDate = new Date(today.setFullYear(today.getFullYear() - 1));
        }

        if (startDate) {
            query.createdAt = { $gte: startDate };
        }
    }

    const subCatCount = await Category.countDocuments(query);

    if (!subCatCount && subCatCount !== 0) {
        res.status(500).json({ success: false })
    }

    res.send({
        subCatCount: subCatCount
    });
});

module.exports = router;