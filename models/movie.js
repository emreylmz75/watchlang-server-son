const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const movieSchema = new mongoose.Schema({
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
},{timestamps:true})

mongoose.model("Movie",movieSchema)