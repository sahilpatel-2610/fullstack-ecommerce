const { Category } = require('../models/category');
const { ImageUpload } = require('../models/imageUpload');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const { error } = require('console');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CONFIG_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
    api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
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

    imagesArr = [];
    try {

        for (let i = 0; i < req.files.length; i++) {

            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: false,
            };

            const img = await cloudinary.uploader.upload(req.files[i].path, options,
                function (error, result) {
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${req.files[i].filename}`);
                });
        }

        let imagesUploaded = new ImageUpload({
            images: imagesArr,
        });

        imagesUploaded = await imagesUploaded.save();
        return res.status(200).json(imagesArr);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, msg: "Images Upload Failed", details: error });
    }

});


const createCategories = (categories, parentId = null) => {

    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => !cat.parentId);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
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
        })
    }

    return categoryList;

}

router.get(`/`, async (req, res) => {

    try {

        const categoryList = await Category.find();

        if (!categoryList) {
            return res.status(500).json({ success: false });
        }


        if (categoryList) {
            const categoryData = createCategories(categoryList);

            return res.status(200).json({
                categoryList: categoryData
            });
        }

    } catch (error) {
        res.status(500).json({ success: false });
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

    let catObj = {};

    if (imagesArr.length > 0) {
        catObj = {
            name: req.body.name,
            images: imagesArr,
            color: req.body.color,
            slug: req.body.slug,
        };
    } else {
        catObj = {
            name: req.body.name,
            slug: req.body.slug,
        };
    }

    if (req.body.parentId) {
        catObj.parentId = req.body.parentId;
    }

    let category = new Category(catObj);

    if (!category) {
        res.status(500).json({
            error: err,
            success: false
        });
    }

    category = await category.save();

    imagesArr = [];

    res.status(201).json(category);

});

router.put('/:id', async (req, res) => {
    try {

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                images: imagesArr,
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

        res.status(200).json(category);

    } catch (error) {
        console.error("Update category error:", error);
        res.status(500).json({ success: false, error: error.message });
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
