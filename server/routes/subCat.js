const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage);

        const allCategories = await Category.find().sort({ createdAt: -1 });
        const subCats = allCategories.filter(c => c.parentId && c.parentId !== "" && c.parentId !== "null" && c.parentId !== "undefined");
        
        const enrichedList = subCats.map(sub => {
            const parent = allCategories.find(p => p._id.toString() === (sub.parentId || '').toString());
            return {
                _id: sub._id,
                id: sub._id,
                name: sub.name,
                subCat: sub.name,
                category: parent ? { _id: parent._id, name: parent.name, images: parent.images, color: parent.color } : { _id: sub.parentId, name: "" },
                parentId: sub.parentId,
                slug: sub.slug,
                color: sub.color || '',
                images: sub.images || [],
                createdAt: sub.createdAt || sub.dateCreated || new Date(),
                updatedAt: sub.updatedAt || new Date(),
                dateCreated: sub.dateCreated || sub.createdAt || new Date()
            };
        });

        if (perPage && perPage > 0) {
            const totalPosts = enrichedList.length;
            const totalPages = Math.ceil(totalPosts / perPage) || 1;
            const paginated = enrichedList.slice((page - 1) * perPage, page * perPage);
            return res.status(200).json({
                subCategoryList: paginated,
                totalPages: totalPages,
                page: page,
                totalPosts: totalPosts
            });
        }

        return res.status(200).json({
            subCategoryList: enrichedList
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
        let parentCat = null;
        if (subCat.parentId) {
            parentCat = await Category.findById(subCat.parentId);
        }
        return res.status(200).json({
            _id: subCat._id,
            id: subCat._id,
            name: subCat.name,
            subCat: subCat.name,
            category: parentCat ? { _id: parentCat._id, name: parentCat.name, images: parentCat.images } : { _id: subCat.parentId, name: "" },
            parentId: subCat.parentId,
            slug: subCat.slug,
            color: subCat.color || '',
            images: subCat.images || [],
            createdAt: subCat.createdAt || sub.dateCreated || new Date(),
            updatedAt: subCat.updatedAt || new Date(),
            dateCreated: subCat.dateCreated || subCat.createdAt || new Date()
        });
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
            images: req.body.images || [],
            dateCreated: new Date()
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

        const updateData = {
            updatedAt: new Date()
        };
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