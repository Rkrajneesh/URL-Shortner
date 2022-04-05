const urlModel = require("../models/urlModel.js")
const validUrl = require('valid-url')
const shortid = require('shortid')
const res = require("express/lib/response")



 const valid = function(input){
    if(input =="undefind" || input == null){ return res.status(400).send({status :false})}
    if(Object.keys(input).length === 0){ return res.status(400).send({status :false})}
    return true
 }

const baseUrl = "http://localhost:3000"

const ShortUrl = async (req,res)=> {


try{    const data = req.body
   
    if(!valid(data)){ return res.status(400).send({status :false , msg : "Enter longUrl"})}
  
const {longUrl} = data

    const ExistLUrl = await urlModel.findOne({longUrl : longUrl})
    if(ExistLUrl) { return res.status(200).send({msg :ExistLUrl})}



    const urlCode = shortid.generate()
    


             const Data = {}
             Data["urlCode"] = urlCode
             Data["longUrl"] = longUrl
            
            const shortUrl = baseUrl + '/' + urlCode
        Data["shortUrl"] = shortUrl
            
            url = await urlModel.create(Data)
            res.status(201).send({status :true , msg :url})
        

} catch(err){ return res.send({status :false, msg:err})

}
}



const getUrl = async (req,res) =>{
    const data =req.params.urlCode

    const origNal = await urlModel.findOne({urlCode :data})
   if(!origNal){ return res.status(404).send({status:false,msg :"Not Found" })}

    return res.status(200).send({status:true ,msg :origNal })

}

module.exports = {
    ShortUrl,
   getUrl
}