const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require("../middleware/requireLogin")
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
/* router.post("/search-shorts", (req, res) => {

    Post.find({
        name: new RegExp(" " + req.body.text + " ", "i"),
    })
        .select("_id  name number ")

        .limit(75)
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });
});
 */

/* router.post("/discover-shorts", (req, res) => {
    console.log(req.body.text);


    Post.find({
        name: new RegExp("accept", "i"),
    })
        .limit(75)
        .then((posts) => {
            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
        });
});
 */


/* router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body}= req.body
    if(!title || !body){
        res.status(422).json({error:"Please add all the fields"})
    }
    console.log(req.user)
    

    const post = new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    }).catch(err=>{
        console.log(err)
    })
}) */

/* router.get('/myposts',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
}) */


module.exports = router