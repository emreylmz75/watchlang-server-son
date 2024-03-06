const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const List = mongoose.model("List");
const requireLogin = require("../middleware/requireLogin")

router.get("/list", requireLogin,(req, res) => {
    List.find()
    .sort('sort')
        .then((lists) => {
            const lists2 = lists.sort((a, b) => a.sort < b.sort ? -1 : 1);
            console.log(lists)
            res.json({ lists });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/list", requireLogin,(req, res) => {
    const { name, type, icon } = req.body;

    if (!name || !type || !icon) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const list = new List({
        name,
        type,
        icon
    });

    list.save()
        .then((list) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});


router.get("/list-free1453",(req, res) => {
    List.find()
    .sort('sort')
        .then((lists) => {
            const lists2 = lists.sort((a, b) => a.sort < b.sort ? -1 : 1);
            console.log(lists)
            res.json({ lists });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/list-free1453",(req, res) => {
    const { name, type, icon } = req.body;

    if (!name || !type || !icon) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const list = new List({
        name,
        type,
        icon
    });

    list.save()
        .then((list) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});


module.exports = router;