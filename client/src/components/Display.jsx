const Display = (props) => { 
    const {tasks} = props
    return (
        <div>
            <ul> 
                {tasks.map((task,index)=> (
                    <li key={index}>{task.title}</li>
                ))}
            </ul> 
        </div>
    )
}

export default Display