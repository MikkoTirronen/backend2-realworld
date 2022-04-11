const express = require("express");
const router = express.Router();

const { Article } = require("../models/article")

const requireLogin = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
};

router.delete("/articles/:slug/favorite", requireLogin, async (req, res) => {
    console.log("DELETE")
    let favorite = req.params.slug;
    console.log(favorite)
    await Article.updateOne(
        { slug: favorite },
        {
            $pull: { followers: req.user.userId },
            $inc: { favoritesCount: -1 },
            favorited: false
        })
    let article = await Article.find({ slug: favorite })
    article = article[0]
    res.json({ article });
})


exports.router = router;