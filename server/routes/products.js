const { Category } = require('../models/category.js');
const { RecentlyViewed } = require('../models/recentlyViewed.js');
const { Product } = require('../models/products.js');
const { ImageUpload } = require('../models/imageUpload.js');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require("fs");

// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.cloudinary_Config_Cloud_Name,
//     api_key: process.env.cloudinary_Config_api_Key,
//     api_secret: process.env.cloudinary_Config_api_Secret,
//     secure: true
// });

const cloudinary = require("cloudinary").v2;

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
        console.error("Products Upload Route Error:", error);
        return res.status(500).json({ error: true, msg: error.message || "Images Upload Failed" });
    }
});

router.get(`/`, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        let query = {};
        const andConditions = [];

        if (req.query.catName && req.query.catName !== "undefined") {
            query.catName = req.query.catName;
        }

        if (req.query.category && req.query.category !== "undefined" && req.query.category !== "null" && req.query.category !== "all") {
            const catVal = decodeURIComponent(req.query.category);
            const { Category } = require('../models/category');
            
            let catObj = null;
            if (mongoose.Types.ObjectId.isValid(catVal)) {
                catObj = await Category.findById(catVal).catch(() => null);
            }
            
            const catNameStr = catObj ? catObj.name : catVal;

            const categoryConditions = [
                { catName: new RegExp(`^${catNameStr}$`, "i") },
                { categoryName: new RegExp(`^${catNameStr}$`, "i") },
                { catName: new RegExp(catNameStr, "i") },
                { categoryName: new RegExp(catNameStr, "i") }
            ];

            if (mongoose.Types.ObjectId.isValid(catVal)) {
                categoryConditions.push({ category: new mongoose.Types.ObjectId(catVal) });
                categoryConditions.push({ category: String(catVal) });
                categoryConditions.push({ catId: String(catVal) });
            }

            andConditions.push({ $or: categoryConditions });
        }

        if (req.query.subCatId && req.query.subCatId !== "undefined" && req.query.subCatId !== "null" && req.query.subCatId !== "all") {
            const subVal = decodeURIComponent(req.query.subCatId);
            const { Category } = require('../models/category');

            let subObj = null;
            if (mongoose.Types.ObjectId.isValid(subVal)) {
                subObj = await Category.findById(subVal).catch(() => null);
            }
            const subNameStr = subObj ? subObj.name : subVal;

            const subConditions = [
                { subCatName: new RegExp(subNameStr, "i") },
                { subCatName: new RegExp(`^${subNameStr}$`, "i") },
                { catName: new RegExp(subNameStr, "i") }
            ];

            if (mongoose.Types.ObjectId.isValid(subVal)) {
                subConditions.push({ subCatId: String(subVal) });
                subConditions.push({ subCat: new mongoose.Types.ObjectId(subVal) });
                subConditions.push({ subCat: String(subVal) });
                if (subObj) {
                    subConditions.push({ subCatId: String(subObj._id) });
                    subConditions.push({ subCat: subObj._id });
                    subConditions.push({ subCatName: new RegExp(subObj.name, "i") });
                    subConditions.push({ catName: new RegExp(subObj.name, "i") });
                }
            } else {
                subConditions.push({ subCatId: subVal });
                subConditions.push({ subCatName: new RegExp(subVal, "i") });
            }

            andConditions.push({ $or: subConditions });
        }

        const location = req.query.location;
        if (location && location !== "All" && location !== "undefined" && location !== "null") {
            andConditions.push({
                $or: [
                    { 'location.label': location },
                    { location: { $size: 0 } },
                    { location: { $exists: false } }
                ]
            });
        }

        if (andConditions.length > 0) {
            query.$and = andConditions;
        }

        if (req.query.minPrice !== undefined && req.query.maxPrice !== undefined) {
            query.price = { $gte: parseInt(req.query.minPrice), $lte: parseInt(req.query.maxPrice) };
        }

        if (req.query.rating !== undefined) {
            query.rating = parseInt(req.query.rating);
        }

        const totalPosts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages && totalPages !== 0) {
            // Optional: handle page out of bounds
        }

        const productList = await Product.find(query)
            .populate('category subCat')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        return res.status(200).json({
            "products": productList || [],
            "totalPages": totalPages || 1,
            "page": page,
            "totalPosts": totalPosts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
});




router.get(`/featured`, async (req, res) => {
    try {
        let productList = [];
        const location = req.query.location;

        if (location && location !== "All" && location !== "undefined" && location !== "null") {
            productList = await Product.find({
                isFeatured: true,
                $or: [
                    { 'location.label': location },
                    { location: { $size: 0 } },
                    { location: { $exists: false } }
                ]
            }).populate('category subCat');
        }
        else {
            productList = await Product.find({ isFeatured: true }).populate('category subCat');
        }


        if (!productList) {
            return res.status(500).json({ success: false });
        }

        return res.status(200).json(productList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
});


router.get(`/recentlyViewed`, async (req, res) => {
    let productList = [];
    productList = await RecentlyViewed.find({ productId: { $exists: true, $ne: null } }).populate("category subCat").sort({ dateCreated: -1 });

    if (!productList) {
        return res.status(500).json({ success: false });
    }

    return res.status(200).json(productList);

});


router.post(`/recentlyViewed`, async (req, res) => {

    if (!req.body) {
        return res.status(400).json({ success: false, message: "Request body is missing" });
    }

    const productId = req.body.id || req.body._id;

    if (!productId) {
        return res.status(400).json({ success: false, message: "Product ID is missing in request body" });
    }

    let findProduct = await RecentlyViewed.findOne({ productId: productId });

    if (findProduct) {
        findProduct.dateCreated = Date.now();
        await findProduct.save();
        return res.status(200).json(findProduct);
    }

    if (!findProduct) {
        let product = new RecentlyViewed({
            name: req.body.name,
            productId: productId,
            subCat: req.body.subCat,
            description: req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            category: req.body.category,
            subCatId: req.body.subCatId,
            catName: req.body.catName,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured,
            discount: req.body.discount,
            productRam: req.body.productRam,
            size: req.body.size,
            productWeight: req.body.productWeight,
        });



        try {
            product = await product.save();

            if (!product) {
                return res.status(500).json({
                    success: false
                });
            }

            res.status(201).json(product);
        } catch (err) {
            console.error("Product creation error:", err);
            return res.status(500).json({
                error: err.message || err,
                success: false
            });
        }


    }





});

router.post(`/create`, async (req, res) => {

    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).json({ error: true, message: "Invalid Category!", success: false });
    }

    // const images_Array = [];
    // const uploadedImages = await ImageUpload.find();

    // const images_Arr = uploadedImages?.map((item) => {
    //     item.images?.map((image) => {
    //         images_Array.push(image);
    //         console.log(image);
    //     })
    // })

    // Using req.body.images directly
    let product = new Product({
        name: req.body.name,
        subCat: req.body.subCat,
        description: req.body.description,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        category: req.body.category,
        subCatId: req.body.subCatId,
        catName: req.body.catName,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        discount: req.body.discount,
        productRam: req.body.productRam,
        size: req.body.size,
        productWeight: req.body.productWeight,
        location: Array.isArray(req.body.location) ? req.body.location : [],
    });

    try {
        product = await product.save();

        if (!product) {
            return res.status(500).json({
                success: false
            });
        }

        res.status(201).json(product);
    } catch (err) {
        console.error("Product creation error:", err);
        return res.status(500).json({
            error: err.message || err,
            success: false
        });
    }
});

router.get('/:id', async (req, res) => {
    productEditId = req.params.id;

    if (!req.params.id || req.params.id === 'undefined' || !mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'The product with the given ID was not found.' });
        }
        return res.status(200).send(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
})


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
        if (!req.params.id || req.params.id === 'undefined' || !mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found!' });
        }
        const images = product.images;

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

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found!",
                status: false
            })
        }

        res.status(200).json({
            status: true,
            message: "Product Deleted!"
        })
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ status: false, error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                subCat: req.body.subCat,
                description: req.body.description,
                images: req.body.images,
                brand: req.body.brand,
                price: req.body.price,
                oldPrice: req.body.oldPrice,
                category: req.body.category,
                subCatId: req.body.subCatId,
                catName: req.body.catName,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
                productRam: req.body.productRam,
                size: req.body.size,
                productWeight: req.body.productWeight,
                location: Array.isArray(req.body.location) ? req.body.location : [],
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "the product cannot be updated!",
                status: false
            });
        }

        res.status(200).json({
            message: "the product is updated!",
            status: true
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message || err,
            status: false
        });
    }
});



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

    const productsCount = await Product.countDocuments(query);

    if (!productsCount && productsCount !== 0) {
        res.status(500).json({ success: false })
    }

    res.send({
        productsCount: productsCount
    });
});


module.exports = router;
