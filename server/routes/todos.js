const express = require("express")
const mongoose = require('mongoose')
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
        res.status(201).send(result) 
    }catch(error){
        console.log(error)
    }
})

router.delete('/:id',async (req,res) => {
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error:"Invalid document Id"})
        }else{
            const result = await Task.findByIdAndDelete(id)
            if(result){ 
                res.status(200).json({message:"document successfuly deleted."})
            }else{
                res.status(400).json({error:"document not found in the collection"})
            }
        }    
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "This is server error"})
    }
    
})
module.exports = router