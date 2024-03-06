const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require("../middleware/requireLogin")
const Movie = mongoose.model("Movie")
const User = mongoose.model("User")

router.get('/saves',requireLogin,(req,res)=>{
    User.findById({_id:req.user._id})
    .populate("saves")
    .then((response)=> {
        res.json({word:response.saves})
    }).catch(()=>{
        res.status(422).json({error:"eklenmedi"})

    })})


router.put('/save',requireLogin , (req,res) => {
    User.findById({_id:req.user._id})
    .then((response)=> {

      
        if (false) { 
            res.status(422).json({error:"zaten beğendin"})
         }else {
             User.findByIdAndUpdate({_id:req.user._id},{
                $addToSet: {saves:req.body.wordid}
            })
            .then((resp) => {
                res.json(resp)
            }).catch((err) => {
                return res.status(422).json({error:err})
            });
         }
    }).catch(()=>{
        res.status(422).json({error:"eklenmedi"})

    })

    

})



router.put('/unsave',requireLogin,(req,res) => {

    User.findByIdAndUpdate({_id:req.user._id},{
        $pull: {saves:req.body.wordid}
    },{
        new:true
    }).then((resp) => {
        res.json(resp)
    }).catch((err) => {
        return res.status(422).json({error:err})
    });

})


module.exports = router