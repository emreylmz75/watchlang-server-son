const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const TestUser = mongoose.model("TestUser")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_SECRET,PAYMENT_API_KEY,PAYMENT_SECRET_KEY,PAYMENT_URL} = require('../keys')
const requireLogin = require("../middleware/requireLogin")
var Iyzipay = require('iyzipay');
const { v4: uuidv4 } = require('uuid');

var iyzipay = new Iyzipay({
    apiKey: PAYMENT_API_KEY,
    secretKey: PAYMENT_SECRET_KEY,
    uri: 'https://api.iyzipay.com'
    
});


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

router.get("/payment-cancel",requireLogin,(req,res)=>{
    console.log(req.user.referenceCode)
    console.log("içeri girdi")
    var cancelRequest = {
        subscriptionReferenceCode: req.user.referenceCode
    };

    iyzipay.subscription.cancel(cancelRequest, function (err, result) {
        if(err){
            return res.status(422).json({error:"Ödemede hata oluştu."})
        }else {
            res.json({success:"başarılı"})

        }
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

router.post("/signup",(req,res)=>{
    const conversationId = uuidv4();
    const {cardName,cardNumber,expiryData,cvcMask,email,password} = req.body


    /* cardHolderName: 'John Doe',
    cardNumber: '5400360000000003',
    expireYear: '24',
    expireMonth: '12',
    cvc: '999',
    registerConsumerCard: true, */



    var request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: conversationId,
        callbackUrl: 'callbackUrl',
        pricingPlanReferenceCode: '77ba6852-5a6b-4276-a466-110bb9a56199',
        subscriptionInitialStatus: Iyzipay.SUBSCRIPTION_INITIAL_STATUS.ACTIVE,
        paymentCard: {
            cardHolderName: cardName,
            cardNumber: cardNumber.replace(/\s+/g, ''),
            expireMonth: expiryData.split("/")[0],
            expireYear: expiryData.split("/")[1],
            cvc: cvcMask,
            registerConsumerCard: true,
        },
        customer: {
            name: 'name',
            surname: 'surname',
            identityNumber: '11111111111',
            email: email,
            gsmNumber: '+9005555555555',
            billingAddress: {
                contactName: 'Jane Doe',
                city: 'Istanbul',
                district: 'altunizade',
                country: 'Turkey',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                zipCode: '34742'
            },
            shippingAddress: {
                contactName: 'Jane Doe',
                city: 'Istanbul',
                district: 'altunizade',
                country: 'Turkey',
                address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
                zipCode: '34742'
            }
        }
    };

    iyzipay.subscription.initialize(request, function (err, result) {
        if(err){
            console.log(err,"hata")
        }else {
            


            console.log(result,"başarılı")
            if(!email || !password ){
                return res.json({please:"Lütfen tüm alanları doldurunuz."})
            }
            User.findOne({email:email})
            .then((savedUser)=>{
                if(savedUser){
                    return res.status(422).json({error:"Bu email ile kayıtlı bir kullanıcı var."})
                }
                bcrypt.hash(password,12)
                .then(hashedpassword=>{
                    const user = new User({
                        email,
                        password:hashedpassword,
                        referenceCode:result.data.referenceCode,
                        parentReferenceCode:result.data.parentReferenceCode,
                        pricingPlanReferenceCode:result.data.pricingPlanReferenceCode,
                        customerReferenceCode:result.data.customerReferenceCode,
                        conversationId:conversationId
                    })
            
                    user.save()
                    .then(savedUser=>{
                        const token = jwt.sign({_id:savedUser},JWT_SECRET)
                            res.json({token,user:savedUser})
                       
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                })
                
            })
            .catch(err=>{
        
                console.log(err)
            })
        
        }
        
    });

/*     const {email,password} = req.body
    if(!email || !password ){
        return res.json({please:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                
            })
    
            user.save()
            .then(user=>{
                const token = jwt.sign({_id:savedUser},JWT_SECRET)
                    res.json({token,user:savedUser})
               
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{

        console.log(err)
    })
 */})

router.post('/signin',(req,res)=>{
    console.log("hello")
    const {email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                    const token = jwt.sign({_id:savedUser},JWT_SECRET)
                    res.json({token,user:savedUser})
                }else{
                    return res.status(422).json({error:"Invalide Email or password"})
                }
            }).catch(err=>{
                console.log(err)
            })
    })
})


router.post('/testsignin',(req,res)=>{
    console.log("hello")
    const {email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                    const token = jwt.sign({_id:savedUser},JWT_SECRET, { expiresIn: 60, audience: '12345677' })
                    res.json({token,user:savedUser})
                }else{
                    return res.status(422).json({error:"Invalide Email or password"})
                }
            }).catch(err=>{
                console.log(err)
            })
    })
})

router.post("/testsignup1453",(req,res)=>{
    const {email,password} = req.body
    if(!email || !password ){
        return res.json({please:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new TestUser({
                email,
                password:hashedpassword,
                
            })
    
            user.save()
            .then(user=>{
                const token = jwt.sign({_id:savedUser},JWT_SECRET)
                res.json({token,user:user})
           
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{

        console.log(err)
    })
})

module.exports = router