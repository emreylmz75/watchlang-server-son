const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const likesSchema = new mongoose.Schema({
    postedBy:{
        type:ObjectId,
        ref:"Movie"
    },
    likedBy:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

mongoose.model("Like",likesSchema)