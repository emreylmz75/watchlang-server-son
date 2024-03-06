const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Word = mongoose.model("Word");
const MyWord = mongoose.model("Word");
const requireLogin = require("../middleware/requireLogin")

/* const Shorts = mongoose.model("Shorts");
 */

//https://stackoverflow.com/questions/70994543/mongoose-get-documents-where-id-does-not-exist-inside-nested-object
//https://stackoverflow.com/questions/36726166/mongoose-find-all-items-with-id-from-an-array-that-do-exist
router.get("/word",(req, res) => {
    //res.send("Home")
    const page = req.query.page;
    Word.find({ listedBy: req.query.id })
        .populate("listedBy", "_id name type number")
        .select("_id word translate listedBy")
        /* .skip(page*100)
        .limit(100) */
        .then((word) => {
            res.json({ word });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/wordpage", (req, res) => {
    const page = req.query.from;

    Word.find({ listedBy: req.query.id })
        .populate("listedBy", "_id name type number")
        .select("_id word translate listedBy")
        .skip(page*100)
        .limit(100)
        .then((word) => {
            res.json({ word });
            console.log(word)
        })
        .catch((err) => {
            console.log(err);
        });
});


router.get("/word2",requireLogin,(req, res) => {
    //res.send("Home")
    const language = req.query.language
    console.log(req.body.id);
    Word.find({ listedBy: req.query.id })
        .populate("listedBy", "_id name color")
        .select("_id word listedBy "+language)
        .then((word) => {
            var count = word.length;
            res.json({ word,count });
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

router.post("/word", (req, res) => {
    const { word, translate } = req.body;
    
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







router.get("/word-free1453",(req, res) => {
    //res.send("Home")
    const page = req.query.page;
    Word.find({ listedBy: req.query.id })
        .populate("listedBy", "_id name type number")
        .select("_id word translate listedBy")
        /* .skip(page*100)
        .limit(100) */
        .then((word) => {
            res.json({ word });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/wordpage-free1453", (req, res) => {
    const page = req.query.from;

    Word.find({ listedBy: req.query.id })
        .populate("listedBy", "_id name type number")
        .select("_id word translate listedBy")
        .skip(page*100)
        .limit(100)
        .then((word) => {
            res.json({ word });
            console.log(word)
        })
        .catch((err) => {
            console.log(err);
        });
});


router.get("/word2-free1453",(req, res) => {

    //res.send("Home")
    const language = req.query.language
    console.log(req.body.id);
    Word.find({ listedBy: req.query.id })
        .populate("listedBy", "_id name color")
        .select("_id word listedBy "+language)
        .then((word) => {
            var count = word.length;
            res.json({ word,count });
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

router.post("/word-free1453", (req, res) => {
    const { word, translate } = req.body;
    
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

module.exports = router;