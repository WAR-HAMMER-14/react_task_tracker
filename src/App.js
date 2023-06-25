import './App.css';
import { useState } from "react"
import Header  from './components/Header';
import Tasks from "./components/Tasks"
import AddTask from './components/AddTask';

function App() {

	const [showAddTask, setShowAddTask] = useState(false)
	const [tasks, setTasks] = useState( [
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Groccery Shopping ',
            day: 'Feb 8th at 5:30pm',
            reminder: true,
        },
        {
            id: 3,
            text: 'Evening Party',
            day: 'Feb 5th at 2:30pm',
            reminder: false,
        },
    ]);

	// delete task
	const deleteTask = (id) => {
		// filter function basically it will return all the task except the task with the given id
		setTasks(tasks.filter((task) => task.id !== id))
	}

	// toggle reminder
	const toggleReminder = (id) => {
		setTasks(tasks.map((task) => task.id === id ?{...task, reminder: !task.reminder} : task))
	}

	//add task
	const addTask = (task) => {
		const id = Math.floor(Math.random() * 10000) + 1

		const newTask = {id, ...task}

		setTasks([...tasks, newTask])


	}

	//add form toggle
	const formToggle = () => {
		setShowAddTask(!showAddTask)
	}


  return (
    <div className='container'>

		<Header onPress={formToggle} showAdd={showAddTask}/>
		{showAddTask && (<AddTask onAdd={addTask} />)}
		{tasks.length > 0 ? (<Tasks tasks={tasks} setTasks={setTasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Tasks Available')}
    </div>
  );
}

export default App;
