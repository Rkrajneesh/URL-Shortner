const express = require("express")
const router = express.Router();
const {ShortUrl,getUrl } =require ("../controller/urlController.js");




router.post("/url/shorten",ShortUrl)
router.get("/:urlCode",getUrl)
//router.get("/:urlCode",fetchAuthorProfile)






module.exports = router ; 