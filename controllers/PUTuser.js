const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { User } = require("../models/user");

const requireLogin = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
};

router.put("/user", requireLogin, async (req, res) => {
    const { email, username, image, bio } = req.body.user
    let { password } = req.body.user

    if (password) {
        let newPassword = await bcrypt.hash(password, 10);
        password = newPassword;
    }
    if (email) {
        console.log("HÄR EMAIL")
        await User.updateOne({ username: req.user.username }, { email: email })
    }
    if (username) {
        console.log("HÄR USERNAME")
        await User.updateOne({ username: req.user.username }, { username: username })
    }
    if (password) {
        console.log("HÄR PASSWORD")
        await User.updateOne({ username: req.user.username }, { password: password })
    }
    if (image) {
        console.log("HÄR IMAGE")
        await User.updateOne({ username: req.user.username }, { image: image })
    }
    if (bio) {
        console.log("HÄR BIO")
        await User.updateOne({ username: req.user.username }, { bio: bio })
    }

    let user = await User.find({ username: req.user.username });
    user = user[0];
    res.json({ user });

});

exports.router = router;