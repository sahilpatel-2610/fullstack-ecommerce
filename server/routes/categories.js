const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require("../utils/cloudinary.js");


router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.send(categoryList);
});


// router.get('/:id', async (req, res) => {
//     const category = await Category.findById(req.params.id);

//     if (!category) {
//         res.status(500).json({ message: 'The category with thw given ID was not found.' })
//     }
//     return res.status(200).send(category);
// })

router.get('/:id', async (req, res) => {
  try {
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



router.delete('/:id', async (req, res) => {
    const deletedUser = await Category.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
        res.status(404).json({
            message: 'Category not found!',
            success: false
        })
    }

    res.status(200).json({
        success: true,
        message: 'Category Deleted!'
    })
});



router.post('/create', async (req, res) => {

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


    let category = new Category({
        name:req.body.name,
        images:imgurl,
        color:req.body.color
    });


    if(!category) {
        res.status(500).json({
            error: err,
            success: false
        })
    }


    category = await category.save();

    
    res.status(201).json(category);

});



router.put('/:id', async (req,res) => {
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
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        { 
            name: req.body.name,
            images: imgurl,
            color: req.body.color
        },
        {new: true}
    )
    
    if (!category) {
        return res.status(500).json({
            message: 'Category cannot be updated!',
            success: false
        })
    }


    res.send(category);
    
})


module.exports = router;


// const { Category } = require('../models/category');
// const express = require('express');
// const router = express.Router();
// const pLimit = require('p-limit');
// const cloudinary = require("../utils/cloudinary.js");

// // Get all categories
// router.get(`/`, async (req, res) => {
//     try {
//         const categoryList = await Category.find();
//         res.send(categoryList);
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

// // Get single category
// router.get('/:id', async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);
//         if (!category) return res.status(404).json({ message: 'Category not found' });
//         res.send(category);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Delete category
// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedCategory = await Category.findByIdAndDelete(req.params.id);
//         if (!deletedCategory) return res.status(404).json({ message: 'Category not found!' });
//         res.json({ success: true, message: 'Category Deleted!' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Create category
// router.post('/create', async (req, res) => {
//     try {
//         const limit = pLimit(2);

//         const imagesToUpload = req.body.images.map(image => 
//             limit(async () => await cloudinary.uploader.upload(image))
//         );

//         const uploadStatus = await Promise.all(imagesToUpload);
//         const imgurl = uploadStatus.map(item => item.secure_url);

//         let category = new Category({
//             name: req.body.name,
//             images: imgurl,
//             color: req.body.color
//         });

//         category = await category.save();
//         res.status(201).json(category);

//     } catch (err) {
//         res.status(500).json({ error: err.message, success: false });
//     }
// });

// // Update category
// router.put('/:id', async (req, res) => {
//     try {
//         const limit = pLimit(2);

//         const imagesToUpload = req.body.images.map(image =>
//             limit(async () => await cloudinary.uploader.upload(image))
//         );

//         const uploadStatus = await Promise.all(imagesToUpload);
//         const imgurl = uploadStatus.map(item => item.secure_url);

//         const category = await Category.findByIdAndUpdate(
//             req.params.id,
//             { 
//                 name: req.body.name,
//                 images: imgurl,
//                 color: req.body.color
//             },
//             { new: true }
//         );

//         if (!category) return res.status(404).json({ message: 'Category not found' });
//         res.json(category);

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;
