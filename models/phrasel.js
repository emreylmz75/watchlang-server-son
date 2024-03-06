const mongoose = require('mongoose')
const phraselSchema = new mongoose.Schema({
    word:{
        type:String,
        required:true
    },
    translate:{
        type:String,
        required:true
    },
    
},{timestamps:true})

mongoose.model("Phrasel",phraselSchema) 