const mongoose = require("mongoose")
const url =require('mongoose-type-url')

const urlSchema = new mongoose.Schema({
 
    longUrl: {
        type: mongoose.SchemaTypes.Url,
        required: true,
        //  valid url
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },   urlCode: {
        type: String,
         required: true,
         unique: true,
        lowercase: true,
        trim: true,
    },
},
    // {timestamps:true}
);
module.exports = mongoose.model("url", urlSchema)