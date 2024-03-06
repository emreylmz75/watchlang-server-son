const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../keys")
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next) => {
    const {authorization} = req.headers

    //authorization == Bearer jkdajksjaskd
    if(!authorization){
        res.status(401).json({error:"you must be logged in"})
    }

    const token = authorization.replace("Bearer ","")
    console.log(token,"fa")

    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            res.status(401).json({error:"you must be logged in"})
        }
        
        const {_id} = payload
        console.log(_id,"id bu")
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
    })
}