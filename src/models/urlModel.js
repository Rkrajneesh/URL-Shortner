const mongoose = require("mongoose");
require('mongoose-type-url');
const shortid = require('shortid')

const urlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        default :shortid.generate(),
         required: true,
         unique: true,
        lowercase: true,
        trim: true,
    },
    longUrl: {
        type: mongoose.SchemaTypes.Url,
        required: true,
        //  valid url
    },
    shortUrl: {
        type: String,
        required: true,
       // unique: true,
    },
});
module.exports = mongoose.model("url", urlSchema)