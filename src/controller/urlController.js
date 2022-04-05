const urlModel = require("../models/urlModel.js")
const validUrl = require('valid-url')
const shortid = require('shortid')
const res = require("express/lib/response")



const valid = function (input){
    if (typeof (input)===  'undefined' || typeof(input) ===null){return false}
    if(typeof (input)==="string" && (input).trim().length===0) {return false}

    else {return true
}}


const baseUrl = "http://localhost:3000"

const ShortUrl = async (req,res)=> {


try{    const data = req.body
        const {longUrl} = data
        if(!valid(longUrl)){ return res.status(400).send({status :false , msg : "Enter longUrl"})}
        const ExistLUrl = await urlModel.findOne({longUrl : longUrl})
        if(ExistLUrl) { return res.status(200).send({msg :ExistLUrl})}

        const urlCode = shortid.generate()
        const shortUrl = baseUrl + '/' + urlCode
        const Data = {}
        
        if(valid(longUrl)){   Data["longUrl"] = longUrl}
        if(valid(shortUrl)){   Data["shortUrl"] = shortUrl }
        if(valid(urlCode)){   Data["urlCode"] = urlCode }
                       
        url = await urlModel.create(Data)
            res.status(201).send({status :true , msg :url})
        

} catch(err){ return res.send({status :false, msg:err})    }
}

const getUrl = async (req,res) =>{
try {
   const urlCod = req.params.urlCode
   if(urlCod.length != 9){ return res.status(400).send('Enter valid url')}
   
   const url = await urlModel.findOne({   urlCode: urlCod  })
    if (url) {    return res.status(302).redirect(url.longUrl)} 
    else {  return res.status(404).send('No URL Found') }
}

catch (err) { console.error(err)
    res.status(500).send('Server Error') }  }









module.exports = {
    ShortUrl,
   getUrl
}