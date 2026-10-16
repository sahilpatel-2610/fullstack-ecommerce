const { SubCategory } = require('../models/subCat');
const { Category } = require('../models/category');
const { Product } = require('../models/products');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/get/count`, async (req, res) => {
    let query = {};
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
        const subCatCount = await SubCategory.countDocuments(query);
        return res.status(200).json({ subCatCount: subCatCount || 0 });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get(`/`, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage);

        let subCategoryList = [];
        let totalPages = 0;
        let filterQuery = {};

        const catFilter = req.query.category || req.query.parentId;
        if (catFilter && catFilter !== "undefined" && catFilter !== "null" && catFilter !== "all") {
            filterQuery.category = catFilter;
        }

        if (req.query.page !== undefined && req.query.perPage !== undefined && perPage > 0) {
            const totalPosts = await SubCategory.countDocuments(filterQuery);
            totalPages = Math.ceil(totalPosts / perPage) || 1;

            subCategoryList = await SubCategory.find(filterQuery)
                .populate('category')
                .sort({ createdAt: 1 })
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        } else {
            subCategoryList = await SubCategory.find(filterQuery).populate('category').sort({ createdAt: 1 });
        }

        const formattedList = subCategoryList.map(item => ({
            _id: item._id,
            id: item._id,
            parentId: item.category?._id || item.category || '',
            category: item.category || { _id: item.category, name: item.categoryName || '' },
            categoryName: item.categoryName || (item.category ? item.category.name : ''),
            subCat: item.subCat || item.name,
            name: item.name || item.subCat,
            slug: item.slug,
            dateCreated: item.dateCreated || item.createdAt || new Date(),
            createdAt: item.createdAt || new Date(),
            updatedAt: item.updatedAt || new Date()
        }));

        return res.status(200).json({
            subCategoryList: formattedList,
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
        if (!req.params.id || req.params.id === 'undefined' || !mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid subcategory ID' });
        }

        const subCat = await SubCategory.findById(req.params.id).populate('category');
        if (!subCat) {
            return res.status(404).json({ success: false, message: 'Sub category not found' });
        }

        return res.status(200).json({
            _id: subCat._id,
            id: subCat._id,
            category: subCat.category || { _id: subCat.category, name: subCat.categoryName || '' },
            categoryName: subCat.categoryName || (subCat.category ? subCat.category.name : ''),
            subCat: subCat.subCat || subCat.name,
            name: subCat.name || subCat.subCat,
            slug: subCat.slug,
            dateCreated: subCat.dateCreated || subCat.createdAt || new Date(),
            createdAt: subCat.createdAt || new Date(),
            updatedAt: subCat.updatedAt || new Date()
        });
    } catch (error) {
        console.error("Error fetching subCategory:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/create', async (req, res) => {
    try {
        const subCatName = req.body.subCat || req.body.name;
        const categoryId = req.body.category || req.body.parentId;

        if (!subCatName || !categoryId) {
            return res.status(400).json({ success: false, error: "Subcategory name and parent category are required." });
        }

        const parentCategory = await Category.findById(categoryId);
        const categoryName = parentCategory ? parentCategory.name : '';

        let baseSlug = subCatName.toString().toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        if (!baseSlug) baseSlug = `subcat-${Date.now()}`;

        const existing = await SubCategory.findOne({ slug: baseSlug });
        let slug = baseSlug;
        if (existing) {
            slug = `${baseSlug}-${Date.now()}`;
        }

        let subCatDoc = new SubCategory({
            category: categoryId,
            categoryName: categoryName,
            subCat: subCatName,
            name: subCatName,
            slug: slug,
            dateCreated: new Date()
        });

        subCatDoc = await subCatDoc.save();

        if (parentCategory) {
            await Category.findByIdAndUpdate(categoryId, {
                $addToSet: { subCategories: subCatName }
            }).catch(e => console.warn("Could not sync subCat to Category:", e.message));
        }

        return res.status(201).json(subCatDoc);
    } catch (err) {
        console.error("Error creating sub category:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const subCatToDelete = await SubCategory.findById(req.params.id);
        if (!subCatToDelete) {
            return res.status(404).json({
                message: 'Sub Category not found!',
                success: false
            });
        }

        const subCatName = subCatToDelete.name || subCatToDelete.subCat;
        const subCatId = req.params.id;

        // Delete from SubCategory collection
        await SubCategory.findByIdAndDelete(subCatId);

        // Remove subcategory from all associated products in database
        const orConditions = [
            { subCat: subCatId },
            { subCatId: String(subCatId) }
        ];
        if (subCatName) {
            orConditions.push({ subCatName: subCatName });
            orConditions.push({ subCategory: subCatName });
        }

        await Product.updateMany(
            { $or: orConditions },
            {
                $set: {
                    subCat: null,
                    subCatId: '',
                    subCatName: '',
                    subCategory: ''
                }
            }
        );

        // Remove from Category subCategories list if present
        if (subCatName) {
            await Category.updateMany(
                { subCategories: subCatName },
                { $pull: { subCategories: subCatName } }
            );
        }

        return res.status(200).json({
            success: true,
            message: 'Sub Category Deleted and removed from associated products!'
        });
    } catch (err) {
        console.error("Error deleting sub category:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const subCatName = req.body.subCat || req.body.name;
        const categoryId = req.body.category || req.body.parentId;

        let categoryName = '';
        if (categoryId) {
            const parentCategory = await Category.findById(categoryId);
            if (parentCategory) categoryName = parentCategory.name;
        }

        let slug = undefined;
        if (subCatName) {
            let baseSlug = subCatName.toString().toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
            const existing = await SubCategory.findOne({ slug: baseSlug, _id: { $ne: req.params.id } });
            slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;
        }

        const updateData = {
            updatedAt: new Date()
        };
        if (subCatName) {
            updateData.subCat = subCatName;
            updateData.name = subCatName;
        }
        if (categoryId) updateData.category = categoryId;
        if (categoryName) updateData.categoryName = categoryName;
        if (slug) updateData.slug = slug;

        const subCat = await SubCategory.findByIdAndUpdate(
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

        // Update all associated products with new subcategory name
        if (subCatName) {
            await Product.updateMany(
                {
                    $or: [
                        { subCat: req.params.id },
                        { subCatId: String(req.params.id) }
                    ]
                },
                {
                    $set: {
                        subCatName: subCatName,
                        subCategory: subCatName
                    }
                }
            ).catch(e => console.warn("Could not sync subCat update to products:", e.message));
        }

        return res.status(200).json(subCat);
    } catch (error) {
        console.error("Update subCategory error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;