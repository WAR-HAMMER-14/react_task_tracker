import Task from "./Task"
const Tasks = ({tasks,setTasks,onDelete,onToggle}) => {

   

  return (
    <>
        {tasks.map((task)=>(<Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>))}
    </>
  )
}

export default Tasks