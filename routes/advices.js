const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require("../middleware/requireLogin")
const Advice = mongoose.model("Advice")
const User = mongoose.model("User")





router.get('/alladvice',requireLogin,(req,res)=>{
    Advice.find()
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
}) 


router.post("/search-advice",requireLogin,(req, res) => {
    console.log("girdi",req.body)

    Movie.find({
        name: new RegExp(" " + req.body.text + " ", "i"),
    })
        .select("_id number name tr movie")

        .then((posts) => {
            res.json({ posts });
            console.log(posts)

        })
        .catch((err) => {
            console.log(err);
        });
});


router.post('/createadvice',requireLogin,(req,res)=>{
    const {name,tr,number,movie}= req.body
    if(!name || !tr || !number || !movie){
        res.status(422).json({error:"Please add all the fields"})
    }
    console.log(req.user)
    

    const post = new Advice({
        name,
        tr,
        number,
        movie
    })
    post.save().then(result=>{
        res.json({post:result})
    }).catch(err=>{
        console.log(err)
    })
})







module.exports = router