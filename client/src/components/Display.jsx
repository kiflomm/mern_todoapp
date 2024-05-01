import axios from 'axios' 
const Display = ({tasks,refresher}) => {  
    const handelDelete = async (id) =>{
        try {
            const response = await axios.delete(`https://mern-todoapp-api-kiflom.vercel.app/api/tasks/${id}`)
            if(response.status == 200){ 
                refresher()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='display-container'>
            {tasks.map((task)=>(
                <details key={task._id}>
                    <summary>
                        <span className="title">{task.title}</span>
                        <span className="label">{task.label}</span>
                        <input type="button" value="Remove" onClick={()=>handelDelete(task._id)}/>
                    </summary>
                    <p className="description">{task.desc}</p>
                </details>
            ))}
        </div>
    )
}
export default Display