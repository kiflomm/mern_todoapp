import { useEffect, useState,useRef } from 'react'
import axios from 'axios'
import './App.css'
import Display from './components/Display'

const  App = () => {   
    const [formData,setFormData] = useState({
        title:"",
        label:"",
        desc:""
    }) 
    const [tasks,setTasks] = useState([]) 
    const called = useRef(false)
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit  = async (e) =>{
       e.preventDefault()
        try{
            const response = await axios.post('https://mern-todoapp-api-kiflom.vercel.app/api/tasks/add-task',formData)  
            getTasks()
            setFormData({
                title:"",
                label:"",
                desc:""
            })
            console.log("post request successful",response.data)
        }catch(error){
            console.log("Error making post request: ",error)
        }  
    } 
    useEffect(()=>{
        try{
            if(!called.current){ 
                getTasks() 
                called.current = true
            } 
        }catch(error){
            console.log(error)
        }
    },[])
    const getTasks = async ()=>{
        const response = await axios.get('https://mern-todoapp-api-kiflom.vercel.app/api/tasks/all') 
        setTasks(response.data)
    }
    return (
        <>
        <div className="container">
        <form onSubmit={handleSubmit} className='input-form'>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} placeholder='type the task name here' required/> 
            <select name="label" className ="label" value={formData.label} onChange={handleChange} required>
                <option value="" disabled>Select catagory</option>
                <option value="urgent">urgent</option>
                <option value="important">important</option>
                <option value="easy">easy</option>
                <option value="hard">hard</option>
            </select>
            <textarea name="desc" className="desc" value={formData.desc} onChange={handleChange} placeholder='write description for your task'required></textarea>
            <button type="submit">add task</button>
        </form>
        <Display tasks={tasks} refresher = {getTasks}/>
        </div> 
        </>
        )          
    }
    
export default App