const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const grammerSchema = new mongoose.Schema(
    {
        status: {
            type: Number,
            required: true,
        },
        grammerBy:{
            type:ObjectId,
            ref:"Grammer",
            required:true
        },
        regex: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

mongoose.model("GrammerItem", grammerSchema);