const mongoose = require("mongoose");
require('mongoose-type-url');
const shortid = require('shortid')

const urlSchema = new mongoose.Schema({
 
    longUrl: {
        type: mongoose.SchemaTypes.Url,
        required: true,
        //  valid url
    },
    shortUrl: {
        type: String,
        required: true,
       // unique: true,
    },   urlCode: {
        type: String,
        default :shortid.generate(),
         required: true,
         unique: true,
        lowercase: true,
        trim: true,
    },
});
module.exports = mongoose.model("url", urlSchema)