const express = require("express");
const router = express.Router();

const { Article } = require("../models/article");
const { User } = require("../models/user");

router.get("/articles", async (req, res) => {

    let queryParameters = {};


    if (req.query.tag) {
        queryParameters = { tagList: req.query.tag }
    }
    if (req.query.favorited) {
        const user = await User.findOne({ username: req.query.favorited })
        queryParameters = { followers: user._id }
    }
    if (req.user) {
        if (req.query.author) {
            console.log(req.query.author)
            const user = await User.findOne({ username: req.query.author })
            queryParameters = { author: user._id }
        }
    }

    let articlesCount = await Article.find(queryParameters).count();

    if (req.user) {
        await Article.updateMany({ followers: { "$ne": req.user.userId } }, { favorited: false })
        await Article.updateMany({ followers: req.user.userId }, { favorited: true })
    }

    let articles = await Article
        .find(queryParameters)
        .sort('-createdAt')
        .populate("author")
    res.json({ articles, articlesCount });

});
//Test
exports.router = router;


