const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Grammer = mongoose.model("Grammer");
const GrammerItem = mongoose.model("GrammerItem");
const Post = mongoose.model("Movie");
const requireLogin = require("../middleware/requireLogin")


router.get("/grammer", requireLogin,(req, res) => {
    Grammer.find()
        .then((lists) => {
            res.json({ lists: lists });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/grammerItem", requireLogin,(req, res) => {
    Grammer.find()
        .then((lists) => {
            res.json({ lists: lists });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/grammer", requireLogin,(req, res) => {
    const { name, type } = req.body;

    if (!name ||  !type ) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const list = new Grammer({
        name,
        type,
    });

    list.save()
        .then((list) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});

router.post("/grammerItem", requireLogin,(req, res) => {
    const { status,grammerBy,regex } = req.body;

    if (!status || !grammerBy ||!regex ) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const grammerItem = new GrammerItem({
        status,
        grammerBy,
        regex
    });

    grammerItem.save()
        .then((list) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});

router.post("/search-grammer", requireLogin,(req, res) => {
    const { regex,language,id,status } = req.body;

    GrammerItem.find({ grammerBy: id,status:status })
        .then((lists) => {
            Post.aggregate([
                {$match: { name: { $regex: lists[0].regex, $options: 'i' }
            }},
                {$sample: {size: 500}}
                , { $sort :{ ct: -1}}
            ], )
/*              Post.find({
        $and: [
            {
                name: {
                    $regex: lists[0].regex,
                    $options: "i",
                },
            },
        ],
    })
        .select("_id  name number tr")
        .limit(200)
 */        .then((posts) => {
            console.log(posts)
            var count = posts.length;
            res.json({ count, posts,lists });
            console.log(lists)
        })
        .catch((err) => {
            console.log(err);
        }); 
        })
        .catch((err) => {
            console.log(err);
        });

   
});





router.get("/grammer-free1453",(req, res) => {
    Grammer.find()
        .then((lists) => {
            res.json({ lists: lists });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/grammerItem-free1453",(req, res) => {
    Grammer.find()
        .then((lists) => {
            res.json({ lists: lists });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/grammer-free1453",(req, res) => {
    const { name, type } = req.body;

    if (!name ||  !type ) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const list = new Grammer({
        name,
        type,
    });

    list.save()
        .then((list) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});

router.post("/grammerItem-free1453",(req, res) => {
    const { status,grammerBy,regex } = req.body;

    if (!status || !grammerBy ||!regex ) {
        return res.status(422).json({ error: "please fill all fields" });
    }

    const grammerItem = new GrammerItem({
        status,
        grammerBy,
        regex
    });

    grammerItem.save()
        .then((list) => {
            res.json({ message: "succesfully" });
        })
        .catch((err) => {
            return res.status(422).json({ error: err });
        });
});

router.post("/search-grammer-free1453",(req, res) => {
    const { regex,language,id,status } = req.body;

    GrammerItem.find({ grammerBy: id,status:status })
        .then((lists) => {
            Post.aggregate([
                {$match: { name: { $regex: lists[0].regex, $options: 'i' }
            }},
                {$sample: {size: 500}}
                , { $sort :{ ct: -1}}
            ], )
/*              Post.find({
        $and: [
            {
                name: {
                    $regex: lists[0].regex,
                    $options: "i",
                },
            },
        ],
    })
        .select("_id  name number tr")
        .limit(200)
 */        .then((posts) => {
            console.log(posts)
            var count = posts.length;
            res.json({ count, posts,lists });
            console.log(lists)
        })
        .catch((err) => {
            console.log(err);
        }); 
        })
        .catch((err) => {
            console.log(err);
        });

   
});



module.exports = router;

