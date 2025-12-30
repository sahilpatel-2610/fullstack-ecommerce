const  { Category } = require('../models/category.js');
const {Product} = require('../models/products.js');
const express = require('express');
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require("../utils/cloudinary.js");
const { route } = require('./products.js');

router.get(`/`, async (req, res) => {
    const productList = await Product.find().populate('category');

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});
 

router.post(`/create`, async (req, res) => {
    
    
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).send("Invalid Category!");
    }

    const limit = pLimit(2);
    
    // const imagesToUpload = req.body.images.map((image) => {
    //     return limit(async () => {
    //         const result = await cloudinary.uploader.upload(image);
    //         // console.log(`Successfully uploaded ${image}`);
    //         // console.log(`> Result: ${result.secure_url}`);
    //         return result;
    //     })
    // });

    if (!req.body.images || req.body.images.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Images are required"
        });
    }
    
    const uploadStatus = await Promise.all(imagesToUpload);
    
    const imgurl = uploadStatus.map((item) => {
        return item.secure_url
    })
    
    
    
    if(!uploadStatus) {
        return res.status(500).json({
            error:"images cannot upload!",
            status:false
        })
    }

    let product = new Product({
        name:req.body.name,
        description:req.body.description,
        images:imgurl,
        brand:req.body.brand,
        price:req.body.price,
        oldPrice:req.body.oldPrice,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        isFeatured:req.body.isFeatured
    });

    product = await product.save();
    if (!product) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

    res.status(201).json(product);
});


router.get('/:id', async(req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(500).json({success:false, message:'The product with the given ID was not found.'});
    }
    return res.status(200).send(product);
})



router.delete('/:id', async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if(!deletedProduct) {
        return res.status(404).json({
            message:"product not found!",
            status:false
        })
    }
    res.status(200).json({
        message:"the product is deleted!",
        status:true
    })
})




router.put('/:id', async(req, res) => {

     const limit = pLimit(2);
    
    const imagesToUpload = req.body.images.map((image) => {
        return limit(async () => {
            const result = await cloudinary.uploader.upload(image);
            // console.log(`Successfully uploaded ${image}`);
            // console.log(`> Result: ${result.secure_url}`);
            return result;
        })
    });
    
    const uploadStatus = await Promise.all(imagesToUpload);
    
    const imgurl = uploadStatus.map((item) => {
        return item.secure_url
    })
    
    
    
    if(!uploadStatus) {
        return res.status(500).json({
            error:"images cannot upload!",
            status:false
        })
    }


    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            description:req.body.description,
            images:imgurl,
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured
        },
        { new: true }
    );



    if (!product) {
        res.status(404).json({
            message: "the product cannot be updated!",
            status: false
        })
    }

    res.status(200).json({
        message: "the product is updated!",
        status: true
    });


    // res.send(product);

})



module.exports = router;

// const { Category } = require('../models/category');
// const { Product } = require('../models/products');
// const express = require('express');
// const router = express.Router();
// const pLimit = require('p-limit');
// const cloudinary = require("../utils/cloudinary.js");

// // Get all products
// router.get(`/`, async (req, res) => {
//     try {
//         const productList = await Product.find().populate('category');
//         res.send(productList);
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

// // Create product
// router.post(`/create`, async (req, res) => {
//     try {
//         const category = await Category.findById(req.body.category);
//         if (!category) return res.status(404).send("Invalid Category!");

//         const limit = pLimit(2);

//         const imagesToUpload = req.body.images.map(image =>
//             limit(async () => await cloudinary.uploader.upload(image))
//         );

//         const uploadStatus = await Promise.all(imagesToUpload);
//         const imgurl = uploadStatus.map(item => item.secure_url);

//         let product = new Product({
//             name: req.body.name,
//             description: req.body.description,
//             images: imgurl,
//             brand: req.body.brand,
//             price: req.body.price,
//             category: req.body.category,
//             countInStock: req.body.countInStock,
//             rating: req.body.rating,
//             numReviews: req.body.numReviews,
//             isFeatured: req.body.isFeatured
//         });

//         product = await product.save();
//         res.status(201).json(product);

//     } catch (err) {
//         res.status(500).json({ error: err.message, success: false });
//     }
// });

// module.exports = router;
