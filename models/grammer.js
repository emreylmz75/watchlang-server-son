const mongoose = require("mongoose");
const grammerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

mongoose.model("Grammer", grammerSchema);