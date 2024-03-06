const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const adviceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    tr:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    movie:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.model("Advice",adviceSchema)