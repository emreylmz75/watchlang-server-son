const mongoose = require('mongoose')
const collocationsSchema = new mongoose.Schema({
    word:{
        type:String,
        required:true
    },
    translate:{
        type:String,
        required:true
    },
    
},{timestamps:true})

mongoose.model("Collocations",collocationsSchema) 