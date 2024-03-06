const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Phrasel = mongoose.model("Phrasel");
const requireLogin = require("../middleware/requireLogin")

router.get("/phrasel",requireLogin, (req, res) => {
    const page = req.query.from

    Phrasel.find({ })
        .select("_id word translate")
        .skip(page*100)
        .limit(100)

        .then((word) => {
            res.json({ word });
        })
        .catch((err) => {
            console.log(err);
        });
});


router.post("/phrasel",requireLogin, (req, res) => {
    const { word, translate } = req.body;
    
    if (!word || !translate) {
        return res.status(404).json("Lütfen gerekli alanları doldurunuz");
    }


    const phrasel = new Phrasel({
        word,
        translate,
    });

    phrasel
        .save()
        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
});


router.get("/phrasel-free1453", (req, res) => {
    /* console.log(req) */
    console.log(req.query.from)
    const page = req.query.from

    Phrasel.find({ })
        .select("_id word translate")
        .skip(page*100)
        .limit(100)

        .then((word) => {
            res.json({ word });
        })
        .catch((err) => {
            console.log(err);
        });
});


module.exports = router;