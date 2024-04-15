const express = require("express")
const app = express()  
const tasksRoute = require('./routes/todos')
const mongoose = require("mongoose")  
const cors = require('cors')
const bodyParser = require('body-parser')  
require('dotenv').config()
const dbURI = process.env.DB_CONNECTION_URL
const PORT = process.env.PORT || 500 
mongoose.connect(dbURI)
        .then((result)=>{
            console.log(`db connected successfuly`)  
            app.listen(PORT,console.log(`server listening on port number: ${PORT}`))
        })
        .catch((err)=>{ 
            console.log(err)
        }) 
const isProduction = process.env.NODE_ENV == 'production'? 'production':'development' 
const allowedOrgins = {
    production : ["http://localhost:3000","https://todolistappbykiflom.netlify.app"],
    development : ["http://localhost:3000"]
}
const corsOpt = {
    origin : (origin,callback) => { 
        if(!origin || allowedOrgins[isProduction].includes(origin)){ 
            callback(null,true)
        }else{
            callback(new Error(`${origin} is not allowed by cors`))
        }
    },
    optionsSuccessStatus : 200,
    credentials: true,
    methods : ["GET","POST","PUT","DELETE"]
}
app.use(cors(corsOpt))
app.use(bodyParser.json())
app.use((req,res,next)=>{
    console.log(req.originalUrl)
    next()
})
app.get("/api", (req, res) => {
    res.send("Hello World")
})
app.get("/api/home",(req,res)=>{
    res.send("This is home")
})
app.use('/api/tasks',tasksRoute) 

module.exports = app