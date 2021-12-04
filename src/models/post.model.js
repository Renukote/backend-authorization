const { Schema, model } = require("mongoose");

const postModel = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: Schema.Types.ObjectId , required: true, ref: "users" },
},
{
    versionKey: false,
    timestamps: true
})

module.exports = model("posts", postModel);