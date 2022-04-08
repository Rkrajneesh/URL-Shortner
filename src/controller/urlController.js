const urlModel = require("../models/urlModel.js")
const validUrl = require('valid-url')
const shortid = require('shortid')
//const cache = require("../middleware/mid")
const redis = require("redis");

const { promisify } = require("util");


//Connect to redis
const redisClient = redis.createClient(
  
  17592,  "redis-17592.c264.ap-south-1-1.ec2.cloud.redislabs.com", { no_ready_check: true } );
redisClient.auth("4L5rYcxzqFug0rsYukR9PkW7fpsXyUsX", function (err) { if (err) throw err })
redisClient.on("connect", async function () {  console.log("Connected to Redis..") })

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);






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
       if (!validUrl.isUri(longUrl)) {return res.status(401).send({status :false, msg :'Invalid longUrl URL'})}
       console.log(longUrl)
      let cachee = await GET_ASYNC(`${longUrl}`)
        if(cachee){ return res.status(200).send( {status :true ,data : JSON.parse(cachee)})}

       const ExistLUrl = await urlModel.findOne({longUrl : longUrl}).select({_id :0, __v :0})
        if(ExistLUrl) { return res.status(200).send({status : true , msg :ExistLUrl})}

        const urlCode = shortid.generate()
        const ExistUrl = await urlModel.findOne({urlCode : urlCode})
        if(ExistUrl) { return res.status(400).send({status :false ,msg :"UrlCode Alredy Exist"})}

        const shortUrl = baseUrl + '/' + urlCode
        const Data = {}
        
        if(valid(longUrl)){   Data["longUrl"] = longUrl}
        if(valid(shortUrl)){   Data["shortUrl"] = shortUrl }
        if(valid(urlCode)){   Data["urlCode"] = urlCode }
const url = await urlModel.create(Data)

 const ab = await SET_ASYNC(`${url.longUrl}`,JSON.stringify(url)) 
return  res.status(201).send({status :true , msg :url})
        

} catch(err){ 
  return res.status(500).send({status :false, msg:err})    } }




const getUrl = async (req,res) =>{
    try {
        
       const urlCode = req.params.urlCode
       if(urlCode.length != 9){ return res.status(400).send({status :false ,msg:'This url is not valid.Enter valid url'})}
       
      let cachee = await GET_ASYNC(`${urlCode}`)
      if(cachee){ return res.status(302).redirect( JSON.parse(cachee))}

      const url = await urlModel.findOne({   urlCode: urlCode  })
      if (!url) {return res.status(404).send({status :false , msg :'No URL Found with this short url .Enter valid url'}) }
      
      await SET_ASYNC(`${urlCode}`,JSON.stringify(url.longUrl))
      return res.status(302).redirect(url.longUrl)
  
    } catch (err) { console.error(err)
        res.status(500).send({status:false ,msg: err}) } 
  }




        module.exports = { ShortUrl,getUrl }


  // console.log("cachee")
 //  console.log("mongodb")

