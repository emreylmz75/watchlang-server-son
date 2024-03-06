const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Collocations = mongoose.model("Collocations");
const requireLogin = require("../middleware/requireLogin")

router.get("/collocations", requireLogin,(req, res) => {
    console.log("girdi")

    Collocations.find({ })
        .select("_id word translate")
        .then((word) => {
            res.json({ word });
        })
        .catch((err) => {
            console.log(err);
        });
});


router.post("/collocations", requireLogin,(req, res) => {
    const { word, translate } = req.body;
    
    if (!word || !translate) {
        return res.status(404).json("Lütfen gerekli alanları doldurunuz");
    }


    const collocations = new Collocations({
        word,
        translate,
    });

    collocations
        .save()
        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/collocations-free1453",(req, res) => {
    console.log("girdi")

    Collocations.find({ })
        .select("_id word translate")
        .then((word) => {
            res.json({ word });
        })
        .catch((err) => {
            console.log(err);
        });
});


router.post("/collocations-free1453",(req, res) => {
    const { word, translate } = req.body;
    
    if (!word || !translate) {
        return res.status(404).json("Lütfen gerekli alanları doldurunuz");
    }


    const collocations = new Collocations({
        word,
        translate,
    });

    collocations
        .save()
        .then((result) => {
            res.json({ data: result });
        })
        .catch((err) => {
            console.log(err);
        });
});



module.exports = router;