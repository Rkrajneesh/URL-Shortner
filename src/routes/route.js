const express = require("express")
const router = express.Router();
const urlCont =require ("../controller/urlController.js")
//const urlModel = require("../models/urlModel")

router.post("/url/shorten",urlCont.ShortUrl)
router.get("/:urlCode",urlCont.getUrl)




module.exports = router ; 