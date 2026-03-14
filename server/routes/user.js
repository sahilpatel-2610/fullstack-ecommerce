const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

router.post(`/signup`, async (req, res) => {
    const { name, phone, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ msg: "user already exist!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            name: name,
            phone: phone,
            email: email,
            password: hashPassword,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY);

        res.status(200).json({
            user: result,
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
    }

});

router.post(`/signin`, async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).json({ msg: "User not found!" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY);

        res.status(200).json({
            user: existingUser,
            token: token,
            msg: "user Authenticated"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong" });
    }

});

router.get('/', async (req, res) => {
    const userList = await User.find();

    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
});

router.get(`/get/count`, async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount && userCount !== 0) {
        return res.status(500).json({ success: false })
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
        res.status(500).json({ msg: "The user with the given ID was not found." })
    }
    res.status(200).send(user);
});

router.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid User ID')
    }
    User.findByIdAndDelete(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: "the user is deleted!" })
        } else {
            return res.status(404).json({ success: false, message: "user is not found!" })
        }
    })
        .catch(err => {
            return res.status(500).json({ success: false, error: err })
        })
});

router.put('/:id', async (req, res) => {

    const { name, phone, email, password } = req.body;

    const userExist = await User.findById(req.params.id);

    let newPassword;

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
            password: newPassword
        },
        {
            new: true
        }
    )

    if (!user)
        return res.status(404).json('the user cannot be updated!')

    res.send(user);
})


module.exports = router;