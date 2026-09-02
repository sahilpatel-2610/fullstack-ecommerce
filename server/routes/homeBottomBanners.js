const { HomeBottomBanner } = require('../models/homeBottomBanner');
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

router.get(`/`, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage);
        let bannerList = [];
        let totalPages = 0;

        if (req.query.page !== undefined && req.query.perPage !== undefined) {
            const totalPosts = await HomeBottomBanner.countDocuments();
            totalPages = Math.ceil(totalPosts / perPage);

            bannerList = await HomeBottomBanner.find()
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        } else {
            bannerList = await HomeBottomBanner.find();
        }

        return res.status(200).json({
            "bannerList": bannerList,
            "totalPages": totalPages,
            "page": page
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const banner = await HomeBottomBanner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }
        return res.status(200).send(banner);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

const { Product } = require('../models/products');

router.post('/create', async (req, res) => {
    try {
        let pIds = req.body.productIds || (req.body.productId ? [req.body.productId] : []);
        let pNames = req.body.productNames || (req.body.productName ? [req.body.productName] : []);

        if (Array.isArray(pIds) && pIds.length > 0) {
            if (!pNames || pNames.length < pIds.length) {
                const fetchedProds = await Product.find({ _id: { $in: pIds } });
                pNames = pIds.map(pid => {
                    const pObj = fetchedProds.find(p => p._id.toString() === pid.toString());
                    return pObj ? pObj.name : pid;
                });
            }
        }

        let newEntry = new HomeBottomBanner({
            images: req.body.images,
            bannerTitle: req.body.bannerTitle || req.body.name || "",
            name: req.body.name || req.body.bannerTitle || "",
            catId: req.body.catId || "",
            subCatId: req.body.subCatId || "",
            catName: req.body.catName || "",
            catIds: req.body.catIds || (req.body.catId ? [req.body.catId] : []),
            catNames: req.body.catNames || (req.body.catName ? [req.body.catName] : []),
            productId: req.body.productId || "",
            productName: req.body.productName || "",
            productIds: pIds,
            productNames: pNames
        });

        newEntry = await newEntry.save();
        return res.status(201).json(newEntry);
    } catch (err) {
        return res.status(500).json({ error: err.message, success: false });
    }
});

router.put('/:id', async (req, res) => {
    try {
        let pIds = req.body.productIds || (req.body.productId ? [req.body.productId] : []);
        let pNames = req.body.productNames || (req.body.productName ? [req.body.productName] : []);

        if (Array.isArray(pIds) && pIds.length > 0) {
            if (!pNames || pNames.length < pIds.length) {
                const fetchedProds = await Product.find({ _id: { $in: pIds } });
                pNames = pIds.map(pid => {
                    const pObj = fetchedProds.find(p => p._id.toString() === pid.toString());
                    return pObj ? pObj.name : pid;
                });
            }
        }

        const banner = await HomeBottomBanner.findByIdAndUpdate(
            req.params.id,
            {
                images: req.body.images,
                bannerTitle: req.body.bannerTitle || req.body.name || "",
                name: req.body.name || req.body.bannerTitle || "",
                catId: req.body.catId || "",
                subCatId: req.body.subCatId || "",
                catName: req.body.catName || "",
                catIds: req.body.catIds || (req.body.catId ? [req.body.catId] : []),
                catNames: req.body.catNames || (req.body.catName ? [req.body.catName] : []),
                productId: req.body.productId || "",
                productName: req.body.productName || "",
                productIds: pIds,
                productNames: pNames
            },
            { new: true }
        );

        if (!banner) {
            return res.status(404).json({ message: 'Banner cannot be updated!', success: false });
        }
        return res.status(200).json(banner);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const banner = await HomeBottomBanner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found!', success: false });
        }

        if (banner.images && banner.images.length !== 0) {
            for (let img of banner.images) {
                const urlArr = img.split('/');
                const image = urlArr[urlArr.length - 1];
                const imageName = image.split('.')[0];
                if (imageName) {
                    await cloudinary.uploader.destroy(imageName);
                }
            }
        }

        await HomeBottomBanner.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: 'Banner Deleted!' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
