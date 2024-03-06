const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Word = mongoose.model("MyWord");
/* const Shorts = mongoose.model("Shorts");
 */

//https://stackoverflow.com/questions/70994543/mongoose-get-documents-where-id-does-not-exist-inside-nested-object
//https://stackoverflow.com/questions/36726166/mongoose-find-all-items-with-id-from-an-array-that-do-exist
router.get("/myword", (req, res) => {
    //res.send("Home")
    Word.find({ listedBy: req.query.id })
        .populate("listedBy", "_id name color")
        .then((word) => {
            res.json({ word });
        })
        .catch((err) => {
            console.log(err);
        });
});

/* router.get("/shorts", (req, res) => {
    //res.send("Home")
    Shorts.find()
        .limit(10)
        .then((word) => {
            res.json({ word });
        })
        .catch((err) => {
            console.log(err);
        });
}); */

router.post("/myword", (req, res) => {
    const { word, translate } = req.body;
    console.log("myword");
    if (!word || !translate) {
        return res.status(404).json("Lütfen gerekli alanları doldurunuz");
    }

    //console.log(req)

    //console.log(req.user)

    const words = new Word({
        word,
        translate,
        listedBy: req.body.listedBy,
    });

    words
        .save()
        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.delete("/deletemyword/:mywordId", (req, res) => {
    console.log("deletemyword");
    console.log(req.params.mywordId);
    Word.findOne({ _id: req.params.mywordId }).exec((err, word) => {
        if (err || !word) {
            return res.status(422).json({ error: err });
        }
        word.remove()
            .then((result) => {
               
                res.json(result);
            })
            .catch((err) => {
                console.log(err);
            });
    });
});

module.exports = router;
