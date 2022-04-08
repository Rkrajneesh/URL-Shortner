

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const route = require("./routes/route.js")
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://Rajneesh:LMPiDV0VO2cXL7Qg@cluster0.wdu0f.mongodb.net/group21Databasee?retryWrites=true&w=majority",
{useNewUrlparser:true},
{useUnifiedTopology: true}
)
.then(()=>console.log("MongoDb is connected"))
.catch(err =>console.log(err))

app.use('/',route);

app.listen(process.env.PORT ||3000,function(){
    console.log("Express is running on port ",+(process.env.Port || 3000))

});