const  { Category } = require('../models/category.js');
const {Product} = require('../models/products.js');
const express = require('express');
const router = express.Router();
const pLimit = require('p-limit');
const { route } = require('./products.js');
const multer = require('multer');
const fs = require("fs");


var imagesArr=[];
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
    let images;
    if (productEditId !== undefined) {
        const product = await Product.findById(productEditId);

        if (product) {
            images = product.images;
        }

        if (images.length !== 0) {
            for (image of images) {
                fs.unlinkSync(`uploads/${image}`);
            }
        }
        
        imagesArr = [];
        const files = req.files;

        
        for(let i=0; i<files.length; i++){
            imagesArr.push(files[i].filename);
        }

        res.send(imagesArr);

    }

});


router.get(`/`, async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const totalPosts = await Product.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
        return res.status(404).json({ message: "Page not found" })
    }

    const productList = await Product.find().populate('category')
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();


    if (!productList) {
        res.status(500).json({ success: false })
    }

    return res.status(200).json({
        "products": productList,
        "totalPages":   totalPages,
        "page": page
    });
        

    res.send(productList);
});
 

router.post(`/create`, async (req, res) => {
    
    
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).send("Invalid Category!");
    }

   

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        images: imagesArr,
        brand: req.body.brand,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured
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

    productEditId = req.params.id;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(500).json({success:false, message:'The product with the given ID was not found.'});
    }
    return res.status(200).send(product);
})



router.delete('/:id', async(req, res) => {

    const product = await Product.findById(req.params.id);
    const images = product.images;

    if(images.length!==0){
        for(image of images){
            fs.unlinkSync(`uploads/${image}`);
        }
    }

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

