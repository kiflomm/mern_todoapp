import axios from 'axios'
const Display = ({tasks}) => {  
    const handelDelete = async (id) =>{
        try {
            const response = await axios.delete(`/api/tasks/${id}`)
            if(response.status == 200){
                //update state
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {tasks.map((task)=>(
                <details key={task._id}>
                    <summary>
                        <span className="title">{task.title}</span>
                        <span className="label">{task.label}</span>
                        <input type="button" value="delete" onClick={()=>handelDelete(task._id)}/>
                    </summary>
                    <p className="description">{task.desc}</p>
                </details>
            ))}
        </div>
    )
}
export default Display