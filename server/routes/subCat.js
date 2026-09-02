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

        if (req.query.page !== undefined && req.query.perPage !== undefined && perPage > 0) {
            const totalPosts = await Category.countDocuments(query);
            totalPages = Math.ceil(totalPosts / perPage) || 1;

            SubCategoryList = await Category.find(query)
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        } else {
            SubCategoryList = await Category.find(query);
        }

        return res.status(200).json({
            subCategoryList: SubCategoryList,
            totalPages: totalPages,
            page: page
        });
    } catch (error) {
        console.error("SubCategory list error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const subCat = await Category.findById(req.params.id);
        if (!subCat) {
            return res.status(404).json({ success: false, message: 'Sub category not found' });
        }
        return res.status(200).send(subCat);
    } catch (error) {
        console.error("Error fetching subCategory:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/create', async (req, res) => {
    try {
        const name = req.body.name || req.body.subCat;
        const parentId = req.body.parentId || req.body.category;

        if (!name || !parentId) {
            return res.status(400).json({ success: false, error: "Subcategory name and parent category are required." });
        }

        let baseSlug = name.toString().toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        if (!baseSlug) baseSlug = `subcat-${Date.now()}`;

        const existing = await Category.findOne({ slug: baseSlug });
        let slug = baseSlug;
        if (existing) {
            slug = `${baseSlug}-${Date.now()}`;
        }

        let subCat = new Category({
            name: name,
            parentId: parentId,
            slug: slug,
            color: req.body.color || '',
            images: req.body.images || []
        });

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
            });
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
        const name = req.body.name || req.body.subCat;
        const parentId = req.body.parentId || req.body.category;

        let baseSlug = name ? name.toString().toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') : null;
        let slug = baseSlug;
        if (slug) {
            const existing = await Category.findOne({ slug: slug, _id: { $ne: req.params.id } });
            if (existing) {
                slug = `${slug}-${Date.now()}`;
            }
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (parentId) updateData.parentId = parentId;
        if (slug) updateData.slug = slug;
        if (req.body.color !== undefined) updateData.color = req.body.color;
        if (req.body.images) updateData.images = req.body.images;

        const subCat = await Category.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!subCat) {
            return res.status(404).json({
                message: 'Sub Category cannot be updated!',
                success: false
            });
        }

        return res.status(200).json(subCat);
    } catch (error) {
        console.error("Update subCategory error:", error);
        return res.status(500).json({ success: false, error: error.message });
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

    try {
        const subCatCount = await Category.countDocuments(query);
        return res.status(200).json({ subCatCount: subCatCount });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;