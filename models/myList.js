const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const myListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
});

mongoose.model("MyList", myListSchema);
