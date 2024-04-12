const express = require("express")  
const router = express.Router()  
const Task = require('../models/task')
router.post("/add-task", async (req,res) => {
    try{
        const {title,label,desc} = req.body
        const task = new Task({title,label,desc}) 
        const result = await task.save()
        res.status(201).json(result)
    }catch(error){
        res.status(500).json(`error: ${error.message}`)
    } 
}) 

router.get("/all",async (req,res) =>{
    try{
        const result = await Task.find() 
        res.status(201).json(result) 
    }catch(error){
        console.log(error)
    }
})
module.exports = router