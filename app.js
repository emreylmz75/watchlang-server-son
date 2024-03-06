const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT =3005
const {MONGOURI} = require('./keys')
const cors = require('cors');
const fs = require("fs")
const https = require("https")
app.use(express.json())
//
const key = fs.readFileSync("./private.key")
const cert = fs.readFileSync("./certificate.crt")

var cred={
    key,
    cert
}

const corsConf = {
    origin: '*',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  }
  
  app.use(cors(corsConf));
  

mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahhh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})



require("./models/user")
require("./models/post")
require("./models/movie")
require("./models/list")
require("./models/word")
require("./models/grammer")
require("./models/grammerItem")
require("./models/phrasel")
require("./models/collocations")
require("./models/advices")
require("./models/irregular")
require("./models/testuser")
require("./models/myList")
require("./models/myWord")











//mongoose.model("User")

app.use(require("./routes/auth"))
app.use(require("./routes/post"))
app.use(require("./routes/movie"))
app.use(require("./routes/list"))
app.use(require("./routes/word"))
app.use(require("./routes/grammer"))
app.use(require("./routes/phrasel"))
app.use(require("./routes/collocations"))
app.use(require("./routes/likes"))
app.use(require("./routes/saves"))
app.use(require("./routes/advices"))
app.use(require("./routes/irregular"))
app.use(require("./routes/payment"))
app.use(require("./routes/myList"))
app.use(require("./routes/myWord"))













const customMiddleware = (req,res,next) => {
    console.log("middleware executed!")
    next()
}

app.use(customMiddleware)

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.get('/about',customMiddleware,(req,res)=>{
    res.send("hello world")
})


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

const httpServer = https.createServer(cred,app)

httpServer.listen(8443)