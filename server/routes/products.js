const { Category } = require('../models/category.js');
const { SubCategory } = require('../models/subCat.js');
const { RecentlyViewed } = require('../models/recentlyViewed.js');
const { Product } = require('../models/products.js');
const { ImageUpload } = require('../models/imageUpload.js');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require("fs");

const formatProductResponse = (item) => {
    if (!item) return item;
    const p = item.toObject ? item.toObject() : { ...item };

    // Format category
    let catId = p.category?._id || p.category?.id || (mongoose.isValidObjectId(p.category) ? p.category : null);
    let catName = p.category?.name || p.catName || (typeof p.category === 'string' && !mongoose.isValidObjectId(p.category) ? p.category : '');
    p.category = {
        _id: catId,
        id: catId,
        name: catName
    };
    if (!p.catName) {
        p.catName = catName;
    }

    // Format subCat
    let subId = null;
    let subName = '';

    if (p.subCat && typeof p.subCat === 'object' && (p.subCat._id || p.subCat.name || p.subCat.subCat)) {
        subId = p.subCat._id || p.subCat.id || null;
        subName = p.subCat.name || p.subCat.subCat || p.subCatName || p.subCategory || '';
    } else if (p.subCat && mongoose.isValidObjectId(p.subCat)) {
        subId = p.subCat;
        subName = p.subCatName || p.subCategory || '';
    } else if (p.subCatId && mongoose.isValidObjectId(p.subCatId)) {
        subId = p.subCatId;
        subName = p.subCatName || p.subCategory || '';
    } else if (typeof p.subCat === 'string' && !mongoose.isValidObjectId(p.subCat)) {
        subName = p.subCat;
    }

    p.subCat = (subId || subName) ? {
        _id: subId,
        id: subId,
        name: subName,
        subCat: subName
    } : null;
    p.subCatName = subName;
    p.subCategory = subName;
    p.subCatId = subId ? String(subId) : '';

    return p;
};

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

        const formattedProducts = (productList || []).map(formatProductResponse);

        return res.status(200).json({
            "products": formattedProducts,
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

        return res.status(200).json((productList || []).map(formatProductResponse));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
});


router.get(`/recentlyViewed`, async (req, res) => {
    try {
        let productList = await RecentlyViewed.find({ productId: { $exists: true, $ne: null } }).sort({ dateCreated: -1 });

        if (!productList || productList.length === 0) {
            return res.status(200).json([]);
        }

        // Fetch all active products populated with category and subCat
        const activeProducts = await Product.find().populate('category subCat');
        const activeProductMap = new Map();
        activeProducts.forEach(p => {
            activeProductMap.set(p._id.toString(), p);
        });

        const validRecentlyViewed = [];
        const seenProductIds = new Set();
        const orphanedIds = [];

        for (const item of productList) {
            const pId = item.productId ? item.productId.toString() : null;
            if (pId && activeProductMap.has(pId)) {
                if (!seenProductIds.has(pId)) {
                    seenProductIds.add(pId);
                    // Use live product data so price, images, rating, stock are always fresh and dynamic
                    const liveProd = activeProductMap.get(pId);
                    const formatted = formatProductResponse(liveProd);
                    validRecentlyViewed.push({
                        ...formatted,
                        _id: liveProd._id,
                        id: liveProd._id,
                        productId: liveProd._id.toString(),
                        dateCreated: item.dateCreated
                    });
                }
            } else {
                orphanedIds.push(item._id);
            }
        }

        // Automatically clean up deleted products from RecentlyViewed collection in MongoDB
        if (orphanedIds.length > 0) {
            RecentlyViewed.deleteMany({ _id: { $in: orphanedIds } }).exec().catch(err => console.error("Clean orphaned recentlyViewed error:", err));
        }

        return res.status(200).json(validRecentlyViewed);
    } catch (err) {
        console.error("RecentlyViewed GET error:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});


router.post(`/recentlyViewed`, async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Request body is missing" });
        }

        const productId = req.body.id || req.body._id || req.body.productId;

        if (!productId || !mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ success: false, message: "Valid Product ID is required" });
        }

        // Ensure product actually exists in database
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ success: false, message: "Product no longer exists" });
        }

        let findProduct = await RecentlyViewed.findOne({ productId: String(productId) });

        if (findProduct) {
            findProduct.dateCreated = Date.now();
            await findProduct.save();
            return res.status(200).json(findProduct);
        }

        let product = new RecentlyViewed({
            name: productExists.name,
            productId: String(productId),
            subCat: productExists.subCat,
            description: productExists.description,
            images: productExists.images,
            brand: productExists.brand,
            price: productExists.price,
            oldPrice: productExists.oldPrice,
            category: productExists.category,
            subCatId: productExists.subCatId,
            catName: productExists.catName,
            countInStock: productExists.countInStock,
            rating: productExists.rating,
            isFeatured: productExists.isFeatured,
            discount: productExists.discount,
            productRam: productExists.productRam,
            size: productExists.size,
            productWeight: productExists.productWeight,
            dateCreated: Date.now()
        });

        product = await product.save();
        return res.status(201).json(product);
    } catch (err) {
        console.error("Product recentlyViewed error:", err);
        return res.status(500).json({
            error: err.message || err,
            success: false
        });
    }
});

router.post(`/create`, async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(404).json({ error: true, message: "Invalid Category!", success: false });
        }

        let subCatObj = null;
        let subCatId = req.body.subCat || req.body.subCatId;
        if (!subCatId || !mongoose.isValidObjectId(subCatId)) {
            subCatId = null;
        } else {
            subCatObj = await SubCategory.findById(subCatId).catch(() => null);
        }

        let catName = req.body.catName || (category ? category.name : '');
        let subCatName = req.body.subCatName || (subCatObj ? (subCatObj.name || subCatObj.subCat) : '');

        let product = new Product({
            name: req.body.name,
            subCat: subCatId,
            subCatName: subCatName,
            subCategory: subCatName,
            description: req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            category: req.body.category,
            subCatId: subCatId ? String(subCatId) : '',
            catName: catName,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured,
            discount: req.body.discount,
            productRam: req.body.productRam,
            size: req.body.size,
            productWeight: req.body.productWeight,
            location: Array.isArray(req.body.location) ? req.body.location : [],
        });

        product = await product.save();

        if (!product) {
            return res.status(500).json({
                success: false
            });
        }

        res.status(201).json(formatProductResponse(product));
    } catch (err) {
        console.error("Product creation error:", err);
        return res.status(500).json({
            error: err.message || err,
            success: false
        });
    }
});
router.get(`/get/count`, async (req, res) => {
    try {
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
        return res.status(200).send({
            productsCount: productsCount || 0
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    if (!req.params.id || req.params.id === 'undefined' || !mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    try {
        const product = await Product.findById(req.params.id).populate('category subCat');

        if (!product) {
            return res.status(404).json({ success: false, message: 'The product with the given ID was not found.' });
        }
        return res.status(200).send(formatProductResponse(product));
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ success: false, error: 'Server error' });
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

        // Clean up from other collections so deleted products never linger
        await RecentlyViewed.deleteMany({ productId: req.params.id }).catch(() => {});
        try {
            const { Cart } = require('../models/cart');
            const { MyList } = require('../models/myList');
            const { ProductReviews } = require('../models/productReviews');
            await Cart.deleteMany({ productId: req.params.id }).catch(() => {});
            await MyList.deleteMany({ productId: req.params.id }).catch(() => {});
            await ProductReviews.deleteMany({ productId: req.params.id }).catch(() => {});
        } catch (e) {
            console.error("Cleanup collections error:", e);
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
        let categoryId = req.body.category?._id || req.body.category?.id || req.body.category;
        if (!categoryId || !mongoose.isValidObjectId(categoryId)) {
            categoryId = null;
        }

        let subCatId = req.body.subCat?._id || req.body.subCat?.id || req.body.subCat;
        if (!subCatId || !mongoose.isValidObjectId(subCatId)) {
            subCatId = null;
        }

        let catName = req.body.catName;
        if (!catName && categoryId) {
            const catObj = await Category.findById(categoryId).catch(() => null);
            if (catObj) catName = catObj.name;
        }

        let subCatName = req.body.subCatName;
        if (subCatId) {
            const subCatObj = await SubCategory.findById(subCatId).catch(() => null);
            if (subCatObj) {
                subCatName = subCatObj.name || subCatObj.subCat;
            }
        } else if (typeof req.body.subCat === 'string' && !mongoose.isValidObjectId(req.body.subCat)) {
            subCatName = req.body.subCat;
        } else {
            subCatName = '';
        }

        const updatePayload = {
            name: req.body.name,
            description: req.body.description,
            brand: req.body.brand,
            price: Number(req.body.price) || 0,
            oldPrice: Number(req.body.oldPrice) || 0,
            category: categoryId,
            catName: catName || '',
            subCat: subCatId,
            subCatId: subCatId ? String(subCatId) : '',
            subCatName: subCatName || '',
            subCategory: subCatName || '',
            countInStock: Number(req.body.countInStock) || 0,
            rating: Number(req.body.rating) || 0,
            numReviews: req.body.numReviews,
            isFeatured: Boolean(req.body.isFeatured),
            discount: Number(req.body.discount) || 0,
            productRam: Array.isArray(req.body.productRam) ? req.body.productRam : [],
            size: Array.isArray(req.body.size) ? req.body.size : [],
            productWeight: Array.isArray(req.body.productWeight) ? req.body.productWeight : [],
            location: Array.isArray(req.body.location) ? req.body.location : []
        };

        if (req.body.images && Array.isArray(req.body.images) && req.body.images.length > 0) {
            updatePayload.images = req.body.images;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatePayload,
            { new: true }
        ).populate('category subCat');

        if (!product) {
            return res.status(404).json({
                message: "the product cannot be updated!",
                status: false
            });
        }

        return res.status(200).json({
            message: "the product is updated!",
            status: true,
            product: formatProductResponse(product)
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message || err,
            status: false
        });
    }
});



module.exports = router;
