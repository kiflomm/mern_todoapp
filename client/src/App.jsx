import { useEffect, useState } from 'react'
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
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit  = async (e) =>{
       e.preventDefault()
        try{
            const response = await axios.post('/api/tasks/add-task',formData) 
            setTasks([...tasks,formData])
            console.log("post request successful",response.data)
        }catch(error){
            console.log("Error making post request: ",error)
        } 
    } 
    useEffect(()=>{
        try{
            const getTasks = async ()=>{
                const response = await axios.get('/api/tasks/all') 
                setTasks(response.data)
            }
            getTasks()
        }catch(error){
            console.log(error)
        }
    },[])
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required/>
            <input type="text" name="label" id="label" value={formData.label} onChange={handleChange} required/>
            <input type="text" name="desc" id="desc" value={formData.desc} onChange={handleChange} required/>  
            <button type="submit">add task</button>
        </form>
        <Display tasks={tasks}/>
        </>
        )          
    }

export default App