const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortid: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [],
});

const URL = new mongoose.model("shortURL", urlSchema);

module.exports = URL;