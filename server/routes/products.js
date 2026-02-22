const  { Category } = require('../models/category.js');
const {Product} = require('../models/products.js');
const { ImageUpload } = require('../models/imageUpload.js');
const express = require('express');
const router = express.Router(); 
const multer = require('multer');
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

    }catch (error) {
        console.log(error);
    }
});


router.get(`/`, async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const perPage = 12;
    const totalPosts = await Product.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
        return res.status(404).json({ message: "Page not found" })
    }

    const productList = await Product.find().populate('category subCat productWEIGHT')
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
        return res.status(404).send("Invalid Category!");
    }

    const images_Array=[];
    const uploadedImages = await ImageUpload.find();

    const images_Arr = uploadedImages?.map((item) => {
        item.images?.map((image)=> {
            images_Array.push(image);
            console.log(image);
        })
    })

   

    product = new Product({
        name: req.body.name,
        subCat: req.body.subCat,
        description: req.body.description,
        // images: images_Array,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        discount: req.body.discount,
        productRAMS: req.body.productRAMS,
        productSIZE: req.body.productSIZE,
        productWEIGHT: req.body.productWEIGHT,
    });

    product = await product.save();

    if (!product) {
        res.status(500).json({
            error: err,
            success: false
        })
    }

    imagesArr = [];

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


router.delete('/deleteImage', async(req, res) => {
    const imgUrl = req.query.img;

    const urlArr = imgUrl.split('/');
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split('.')[0];

    const response = await cloudinary.uploader.destroy(imageName,  (error, result) => {

    })

    if(response) {
        res.status(200).send(response);
    }

});



router.delete('/:id', async(req, res) => {

    const product = await Product.findById(req.params.id);
    const images = product.images;

    for(img of images){
        const imgUrl = img;
        const urlArr = imgUrl.split('/');
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split('.')[0];

        if(imageName) {
            cloudinary.uploader.destroy(imageName,  (error, result) => {
                // console.log(result, error);
            })
        }

        // console.log(imageName);
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if(!deletedProduct) {
        res.status(404).json({
            message:"Category not found!",
            status:false
        })
    }
    res.status(200).json({
        status: true,
        message: "Category Deleted!"
       
    })
})




router.put('/:id', async(req, res) => {

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
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
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

