const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const myWordSchema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: true,
        },
        translate: {
            type: String,
            required: true,
        },
        listedBy: {
            type: ObjectId,
            ref: "MyList",
            required: true,
        },
    },
    { timestamps: true }
);

mongoose.model("MyWord", myWordSchema);
