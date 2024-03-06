const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const irregularSchema = new mongoose.Schema(
    {
        first: {
            type: String,
            required: true,
        },
        second:{
            type: String,
            required:true
        },
        third: {
            type: String,
            required: true,
        },
        translate: {
            type: String,
            required: true,
        },
        add: {
            type: String,
        },
        add2: {
            type: String,
        },
    },
    { timestamps: true }
);

mongoose.model("Irregular", irregularSchema);