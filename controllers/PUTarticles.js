const express = require("express");
const router = express.Router();

const { Article } = require("../models/article");

const requireLogin = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
};

function slugTitle(title) {
    let slugTitle = "";
    array = title.toLowerCase().split(" ");
    lastChar = array[array.length - 1]
    map = array.map(item => item + "-");
    map.splice(map.length - 1, 1, lastChar);
    map.forEach(item => {
        slugTitle = slugTitle + item;
    })
    return slugTitle
};

router.put("/articles/:slug", requireLogin, async (req, res) => {

    let { title, description, body, tagList, slug } = req.body.article

    if (title) {
        // console.log("HÄR TITLE")
        let newSlug = slugTitle(title);
        await Article.updateOne({ username: req.user.username }, { title: title, slug: newSlug })
    }
    if (body) {
        // console.log("HÄR BODY")
        await Article.updateOne({ username: req.user.username }, { body: body })
    }
    if (description) {
        ///console.log("HÄR DESCRIPTION")
        await Article.updateOne({ username: req.user.username }, { description: description })
    }
    if (tagList) {
        await Article.updateOne({ username: req.user.username }, { tagList: tagList })
    }

    updatedAt = Date.now()
    await Article.updateOne({ username: req.user.username }, { updatedAt: updatedAt })

    let article = await Article
        .find({ updatedAt: updatedAt })
        .populate("author")
        .exec()

    article = article[0]
    res.json({ article })

})


exports.router = router;