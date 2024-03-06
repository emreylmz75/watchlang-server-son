const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const wordSchema = new mongoose.Schema({
    word:{
        type:String,
        required:true
    },
    translate:{
        type:String,
        required:true
    },
    listedBy:{
       type:ObjectId,
       ref:"List",
       required:true
    }
},{timestamps:true})

mongoose.model("Word",wordSchema) 