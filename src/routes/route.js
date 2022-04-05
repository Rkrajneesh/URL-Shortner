const express = require("express")
const router = express.Router();
const {ShortUrl , getUrl} =require ("../controller/urlController.js")
//const urlModel = require("../models/urlModel")

router.post("/url/shorten",ShortUrl)
router.get("/:urlCode",getUrl)




module.exports = router ; 