const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const requireLogin = require("../middleware/requireLogin")
const TestUser = mongoose.model("TestUser")
const {JWT_SECRET,PAYMENT_API_KEY,PAYMENT_SECRET_KEY,PAYMENT_URL} = require('../keys')
var Iyzipay = require('iyzipay');
const { v4: uuidv4 } = require('uuid');


var iyzipay = new Iyzipay({
    apiKey: PAYMENT_API_KEY,
    secretKey: PAYMENT_SECRET_KEY,
    uri: 'https://sandbox-api.iyzipay.com'
});
router.post("/email-confirm",(req,res)=>{
    const {email,password} = req.body
    if(!email || !password ){
        return res.json({please:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        res.json({message:"saved successfully"})

    })
    .catch(err=>{

        console.log(err)
    })
})

router.get("/payment-cancel",requireLogin,(req,res)=>{
    console.log(req.user.referenceCode)
    console.log("içeri girdi")
    var cancelRequest = {
        subscriptionReferenceCode: req.user.referenceCode
    };

    iyzipay.subscription.cancel(cancelRequest, function (err, result) {
        console.log(err, result);
    });

})


router.post("/payment-retrieve",(req,res)=>{
    var retrieveRequest = {
        subscriptionReferenceCode: '220f90ac-bb21-4e47-bbbb-3e31e6152fa1'
    };

    iyzipay.subscription.retrieve(retrieveRequest, function (err, result) {
        if(err){
            return res.status(422).json({error:"Ödemede hata oluştu."})
        }else {
            res.json({success:"başarılı"})

        }
    });

})

router.get("/protected",requireLogin,(req,res)=>{
    res.send("protected")
})


router.post("/email-confirm",(req,res)=>{
    const {email,password} = req.body
    if(!email || !password ){
        return res.json({please:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        res.json({message:"saved successfully"})

    })
    .catch(err=>{

        console.log(err)
    })
})


module.exports = router