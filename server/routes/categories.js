const { Category } = require('../models/category');
const { ImageUpload } = require('../models/imageUpload');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const { error } = require('console');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});



var imagesArr = [];


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
        // imagesArr.push(`${Date.now()}-${file.originalname}`);
    },
})

const upload = multer({ storage: storage });


router.post(`/upload`, upload.array("images"), async (req, res) => {
    let imagesArr = [];
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: true, msg: "No image files provided." });
        }

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            try {
                const options = {
                    use_filename: true,
                    unique_filename: false,
                    overwrite: false,
                };
                const img = await cloudinary.uploader.upload(file.path, options);
                imagesArr.push(img.secure_url);
                if (fs.existsSync(`uploads/${file.filename}`)) {
                    fs.unlinkSync(`uploads/${file.filename}`);
                }
            } catch (cloudErr) {
                console.error("Cloudinary upload failed, using local storage fallback:", cloudErr.message || cloudErr);
                const localUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
                imagesArr.push(localUrl);
            }
        }

        try {
            const imagesUploaded = new ImageUpload({ images: imagesArr });
            await imagesUploaded.save();
        } catch (dbErr) {
            console.warn("Could not log upload to ImageUpload collection:", dbErr.message);
        }

        return res.status(200).json(imagesArr);
    } catch (error) {
        console.error("Categories Upload Route Error:", error);
        return res.status(500).json({ error: true, msg: error.message || "Images Upload Failed" });
    }
});


const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => 
            !cat.parentId || 
            cat.parentId === "" || 
            cat.parentId === null || 
            cat.parentId === "undefined" || 
            cat.parentId === "null"
        );
    } else {
        category = categories.filter((cat) => 
            cat.parentId && 
            cat.parentId !== "" && 
            cat.parentId !== "undefined" && 
            cat.parentId !== "null" && 
            cat.parentId.toString() === parentId.toString()
        );
    }

    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            images: cat.images,
            color: cat.color,
            slug: cat.slug,
            parentId: cat.parentId,
            children: createCategories(categories, cat._id)
        });
    }

    return categoryList;
};

router.get(`/`, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage);

        const categoryList = await Category.find();

        if (!categoryList) {
            return res.status(500).json({ success: false });
        }

        const categoryData = createCategories(categoryList);

        if (perPage && perPage > 0) {
            const totalPosts = categoryData.length;
            const totalPages = Math.ceil(totalPosts / perPage) || 1;
            const paginatedList = categoryData.slice((page - 1) * perPage, page * perPage);

            return res.status(200).json({
                categoryList: paginatedList,
                totalPages: totalPages,
                page: page,
                totalPosts: totalPosts
            });
        }

        return res.status(200).json({
            categoryList: categoryData
        });
    } catch (error) {
        console.error("Fetch categories error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', async (req, res) => {

    try {
        categoryEditId = req.params.id;

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        return res.status(200).send(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/deleteImage', async (req, res) => {
    const imgUrl = req.query.img;

    if (!imgUrl) {
        return res.status(400).send("Image URL is required");
    }

    const urlArr = imgUrl.split('/');
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split('.')[0];

    try {
        const response = await cloudinary.uploader.destroy(imageName);
        return res.status(200).send(response || { success: true, message: "Image removed" });
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        return res.status(500).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: 'Category not found!',
                success: false
            });
        }

        const images = category.images;

        if (images && images.length !== 0) {
            for (let img of images) {
                const urlArr = img.split('/');
                const image = urlArr[urlArr.length - 1];
                const imageName = image.split('.')[0];

                if (imageName) {
                    await cloudinary.uploader.destroy(imageName);
                }
            }
        }

        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        
        if (deletedCategory) {
            // Also delete all subcategories belonging to this category
            await Category.deleteMany({ parentId: req.params.id });
        }

        if (!deletedCategory) {
            return res.status(404).json({
                message: 'Category not found!',
                success: false
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category Deleted!'
        });

    } catch (error) {
        console.error("Delete category error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});



router.post('/create', async (req, res) => {
    try {
        const catImages = (Array.isArray(req.body.images) && req.body.images.length > 0)
            ? req.body.images
            : imagesArr;

        const baseSlug = req.body.slug || req.body.name || 'category';
        let slug = baseSlug.toString().toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        if (!slug) slug = `category-${Date.now()}`;

        const existingCategory = await Category.findOne({ slug });
        if (existingCategory) {
            slug = `${slug}-${Date.now()}`;
        }

        let catObj = {
            name: req.body.name,
            images: catImages,
            color: req.body.color || '',
            slug: slug,
        };

        if (req.body.parentId) {
            catObj.parentId = req.body.parentId;
        }

        let category = new Category(catObj);
        category = await category.save();

        imagesArr = [];

        return res.status(201).json(category);
    } catch (error) {
        console.error("Create category error:", error);
        return res.status(500).json({
            error: error.message || error,
            success: false
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const catImages = (Array.isArray(req.body.images) && req.body.images.length > 0)
            ? req.body.images
            : imagesArr;

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                images: catImages,
                color: req.body.color,
                parentId: req.body.parentId
            },
            { new: true }
        );

        if (!category) {
            return res.status(500).json({
                message: 'Category cannot be updated!',
                success: false
            });
        }

        return res.status(200).json(category);

    } catch (error) {
        console.error("Update category error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});


router.get(`/get/count`, async (req, res) => {
    let query = { $or: [{ parentId: { $exists: false } }, { parentId: "" }, { parentId: null }] };
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

    const categoryCount = await Category.countDocuments(query);

    if (!categoryCount && categoryCount !== 0) {
        res.status(500).json({ success: false })
    }

    res.send({
        categoryCount: categoryCount
    });
});


router.get(`/subCat/get/count`, async (req, res) => {
    const categories = await Category.find();

    if (!categories) {
        res.status(500).json({ success: false })
    } else {

        const subCatList = [];
        for (let cat of categories) {
            if (cat.parentId !== undefined) {
                subCatList.push(cat);
            }
        }

        res.send({
            subCatList: subCatList,
        });
    }
});


module.exports = router;
