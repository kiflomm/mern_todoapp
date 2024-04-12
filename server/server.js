const express = require("express")
const app = express()  
const tasksRoute = require('./routes/todos')
const mongoose = require("mongoose")  
const bodyParser = require('body-parser') 
const dbURI = `mongodb://0.0.0.0:27017/to-do-list`
const PORT = 5000; 
mongoose.connect(dbURI)
        .then((result)=>{
            console.log(`db connected successfuly in seconds`)  
            app.listen(PORT)
        })
        .catch((err)=>{ 
            console.log(err)
        }) 
app.use(bodyParser.json())
app.get("/api", (req, res) => {;-
    res.send("Hello World")
})
app.get("/api/home",(req,res)=>{
    res.send("This is home")
})
app.use('/api/tasks',tasksRoute)