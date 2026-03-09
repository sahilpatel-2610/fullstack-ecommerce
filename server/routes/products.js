const { Category } = require('../models/category.js');
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
var productEditId;

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

    // if (productEditId !== undefined) {

    //     const product = await Product.findById(productEditId);

    //     if (product) {
    //         images = product.images;
    //     }

    //     if (images.length !== 0) {
    //         for (image of images) {
    //             console.log(image);
    //             fs.unlinkSync(`uploads/${image}`);
    //         }
    //         productEditId="";
    //     }
    // }



    // imagesArr = [];
    // const files = req.files;


    // for(let i = 0; i < files.length; i++) {
    //     imagesArr.push(files[i].filename);
    // }

    // res.send(imagesArr);

    try {
        for (let i = 0; i < req.files.length; i++) {

            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: false,
            };

            const img = await cloudinary.uploader.upload(req.files[i].path, options);
            imagesArr.push(img.secure_url);
            fs.unlinkSync(`uploads/${req.files[i].filename}`);
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


router.get(`/`, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage);
        let productList = [];
        let totalPages = 0;

        if (req.query.page !== undefined && req.query.perPage !== undefined) {
            const totalPosts = await Product.countDocuments();
            totalPages = Math.ceil(totalPosts / perPage);

            if (page > totalPages) {
                return res.status(404).json({ message: "Page not found" })
            }

            productList = await Product.find().populate('category subCat')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        } else {
            if (req.query.catName !== undefined) {
                productList = await Product.find({ catName: req.query.catName }).populate('category subCat');
            } else {
                productList = await Product.find().populate('category subCat');
            }
        }

        if (!productList) {
            return res.status(500).json({ success: false })
        }

        return res.status(200).json({
            "products": productList,
            "totalPages": totalPages,
            "page": page
        });
    } catch (error) {
        res.status(500).json({ success: false })
    }
});

router.get(`/featured`, async (req, res) => {
    const productList = await Product.find({ isFeatured: true });
    if (!productList) {
        res.status(500).json({ success: false })
    }

    return res.status(200).json(productList);
});


router.post(`/create`, async (req, res) => {

    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).json({ error: true, message: "Invalid Category!", success: false });
    }

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
                catName: req.body.catName,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
                productRam: req.body.productRam,
                size: req.body.size,
                productWeight: req.body.productWeight,
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




module.exports = router;
