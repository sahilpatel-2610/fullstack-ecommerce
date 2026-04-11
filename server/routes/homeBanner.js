const { HomeBanner } = require('../models/homeBanner');
const { ImageUpload } = require('../models/imageUpload');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require("fs");

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
    },
})

const upload = multer({ storage: storage });

router.post(`/upload`, upload.array("images"), async (req, res) => {
    let imagesArr = [];
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
        let bannerList = [];
        let totalPages = 0;

        if (req.query.page !== undefined && req.query.perPage !== undefined) {
            const totalPosts = await HomeBanner.countDocuments();
            totalPages = Math.ceil(totalPosts / perPage);

            bannerList = await HomeBanner.find()
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        } else {
            bannerList = await HomeBanner.find();
        }

        if (!bannerList) {
            return res.status(500).json({ success: false })
        }

        return res.status(200).json({
            "bannerList": bannerList,
            "totalPages": totalPages,
            "page": page
        });

    } catch (error) {
        res.status(500).json({ success: false })
    }
});


router.get('/:id', async (req, res) => {
    try {
        const banner = await HomeBanner.findById(req.params.id);

        if (!banner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }

        return res.status(200).send(banner);
    } catch (error) {
        console.error("Error fetching banner:", error);
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
        const banner = await HomeBanner.findById(req.params.id);

        if (!banner) {
            return res.status(404).json({
                message: 'Banner not found!',
                success: false
            });
        }

        const images = banner.images;

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

        const deletedBanner = await HomeBanner.findByIdAndDelete(req.params.id);

        if (!deletedBanner) {
            return res.status(404).json({
                message: 'Slide not found!',
                success: false
            });
        }

        res.status(200).json({
            success: true,
            message: 'Slide Deleted!'
        });

    } catch (error) {
        console.error("Delete banner error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});



router.post('/create', async (req, res) => {
    try {
        let newEntry = new HomeBanner({
            images: req.body.images,
        });

        if (!newEntry) {
            return res.status(500).json({
                error: "Failed to create new entry",
                success: false
            });
        }

        newEntry = await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message || err,
            success: false
        });
    }
});

router.put('/:id', async (req, res) => {
    try {

        const banner = await HomeBanner.findByIdAndUpdate(
            req.params.id,
            {
                images: req.body.images,
            },
            { new: true }
        );

        if (!banner) {
            return res.status(500).json({
                message: 'Banner cannot be updated!',
                success: false
            });
        }

        res.status(200).json(banner);

    } catch (error) {
        console.error("Update banner error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;
