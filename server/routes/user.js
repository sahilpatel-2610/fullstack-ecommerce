const { User } = require("../models/user");
const { ImageUpload } = require('../models/imageUpload');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require("fs");

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});



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

        for (let i = 0; i < req.files.length; i++) {

            const isVideo = req.files[i].mimetype.startsWith('video');

            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: false,
                resource_type: isVideo ? "video" : "image"
            };

            const result = await cloudinary.uploader.upload(req.files[i].path, options);
            imagesArr.push(result.secure_url);
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


router.post(`/signup`, async (req, res) => {
    const { name, phone, email, password, isAdmin } = req.body;

    try {

        const existingUser = await User.findOne({ email: email });
        const existingUserByPhone = await User.findOne({ phone: phone });

        if (existingUser) {
            return res.status(400).json({ error: true, msg: "user already exist by email!" });
        }

        if (existingUserByPhone) {
            return res.status(400).json({ error: true, msg: "user already exist by phone!" });
        }

        if (!password) {
            return res.status(400).json({ error: true, msg: "password is required!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            name: name,
            phone: phone,
            email: email,
            password: hashPassword,
            isAdmin: isAdmin
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY);

        res.status(200).json({
            error: false,
            user: result,
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, msg: "something went wrong" });
    }

});


router.put(`/changePassword/:id`, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: true, msg: "Invalid user ID." });
        }

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: true, msg: "Old password and new password are required." });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: true, msg: "User not found!" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: true, msg: "Old password is incorrect." });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { password: hashPassword },
            { new: true }
        );

        res.status(200).json({
            error: false,
            msg: "Password changed successfully!",
            user: updatedUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, msg: "Something went wrong." });
    }
});


router.post(`/signin`, async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).json({ error: true, msg: "User not found!" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ error: true, msg: "Invalid credentials" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY);

        return res.status(200).json({
            error: false,
            user: existingUser,
            token: token,
            msg: "user Authenticated"
        })

    } catch (error) {
        res.status(500).json({ error: true, msg: "something went wrong" });
    }

});

router.get('/', async (req, res) => {
    const userList = await User.find();

    if (!userList) {
        res.status(500).json({ error: true, msg: "something went wrong" })
    }
    res.send(userList);
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

    const userCount = await User.countDocuments(query);

    if (!userCount && userCount !== 0) {
        return res.status(500).json({ error: true, msg: "something went wrong" })
    }
    res.send({
        userCount: userCount
    });
});

router.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid User ID')
    }
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(500).json({ error: true, msg: "The user with the given ID was not found." })
    }
    res.status(200).send(user);
});

router.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid User ID')
    }
    User.findByIdAndDelete(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ error: false, message: "the user is deleted!" })
        } else {
            return res.status(404).json({ error: true, message: "user is not found!" })
        }
    })
        .catch(err => {
            return res.status(500).json({ error: true, error: err })
        })
});



router.put('/:id', async (req, res) => {

    const { name, phone, email } = req.body;

    const userExist = await User.findById(req.params.id);

    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.password;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: name,
            phone: phone,
            email: email,
            password: newPassword,
            images: req.body.images
        },
        {
            new: true
        }
    )

    if (!user)
        return res.status(404).json('the user cannot be updated!')

    res.send(user);
})

// router.put('/:id', async (req, res) => {

//     const { name, phone, email, password } = req.body;

//     const userExist = await User.findById(req.params.id);

//     let newPassword;

//     if (req.body.password) {
//         newPassword = bcrypt.hashSync(req.body.password, 10)
//     } else {
//         newPassword = userExist.password;
//     }

//     const user = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//             name: name,
//             phone: phone,
//             email: email,
//             password: newPassword,
//             images: imagesArr
//         },
//         {
//             new: true
//         }
//     )

//     if (!user)
//         return res.status(404).json('the user cannot be updated!')

//     res.send(user);
// })

router.delete('/deleteImage', async (req, res) => {
    const imgUrl = req.query.img;

    if (!imgUrl) {
        return res.status(400).send("Image URL is required");
    }

    const urlArr = imgUrl.split('/');
    const image = urlArr[urlArr.length - 1];

    const imageName = image.split('.')[0];
    const isVideo = imgUrl.match(/\.(mp4|webm|mkv|mov|avi)$/i) || imgUrl.includes('/video/');

    try {
        const response = await cloudinary.uploader.destroy(imageName, {
            resource_type: isVideo ? 'video' : 'image'
        });
        return res.status(200).send(response || { success: true, message: "Image removed" });
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        return res.status(500).send(error);
    }
});



module.exports = router;