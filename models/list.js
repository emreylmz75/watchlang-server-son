const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:Number,
        required:true
    },
    icon:{
        type:String,
        required:true
    }
    
    
},{timestamps:true})

mongoose.model("List",postSchema) 