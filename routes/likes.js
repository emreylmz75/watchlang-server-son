const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require("../middleware/requireLogin")
const Movie = mongoose.model("Movie")
const User = mongoose.model("User")

router.get('/likes',requireLogin,(req,res)=>{
    User.findById({_id:req.user._id})
    .populate("likes")
    .then((response)=> {
        res.json({posts:response.likes})
    }).catch(()=>{
        res.status(422).json({error:"eklenmedi"})

    })})


router.put('/like',requireLogin , (req,res) => {
    User.findById({_id:req.user._id})
    .then((response)=> {

      
             User.findByIdAndUpdate({_id:req.user._id},{
                $addToSet: {likes:req.body.postid}
            })
            .then((resp) => {
                res.json(resp)
                console.log(resp,"bura")
            }).catch((err) => {
                return res.status(422).json({error:err})
            });
         
    }).catch(()=>{
        res.status(422).json({error:"eklenmedi"})

    })

    

})



router.put('/unlike',requireLogin,(req,res) => {

    User.findByIdAndUpdate({_id:req.user._id},{
        $pull: {likes:req.body.postid}
    },{
        new:true
    }).then((resp) => {
        res.json(resp)
    }).catch((err) => {
        return res.status(422).json({error:err})
    });

})


module.exports = router