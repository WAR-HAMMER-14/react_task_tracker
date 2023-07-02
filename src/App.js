import './App.css';
import { useState, useEffect} from "react"
import Header  from './components/Header';
import Tasks from "./components/Tasks"
import AddTask from './components/AddTask';
import axios from 'axios';

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
		// setTasks(tasks.filter((task) => task.id !== id))

		const postData = new FormData();
		postData.append('id', id);
		postData.append('flag','delete');

		updateTask(postData);
	
	}

	// toggle reminder
	const toggleReminder = (id,reminder) => {
		
		if(reminder == "true") 
		{
			reminder = "false";
		}
		else
		{
			reminder = "true";
		}
		// setTasks(tasks.map((task) => task.id === id ?{...task, reminder: !task.reminder} : task))

		const postData = new FormData();
		postData.append('id', id);
		postData.append('reminder', reminder);
		postData.append('flag','update');

		updateTask(postData);
	}

	//add task
	const addTask = (task) => {
		// const id = Math.floor(Math.random() * 10000) + 1

		const postData = new FormData();
		postData.append('text', task.text);
		postData.append('day', task.day);
		postData.append('reminder', task.reminder);
		
		// // for debugging 
		// console.log(postData);
		// return false;

		// setTasks([...tasks, newTask])

		createTask(postData);
		

	}

	//add form toggle
	const formToggle = () => {
		setShowAddTask(!showAddTask)
	}

	// for fetching tasks from php backend
	async function getTasks() {
		try{
			const res = await axios.get('http://localhost/task_tracker/taskList.php');
			setTasks(res.data);
			console.log(res.data);
		
		}
		catch(err) {
			console.log(err);
		}
	}

	//for adding tasks to php backend
	async function createTask(formData){
		try{
			const response = await axios.post('http://localhost/task_tracker/addTask.php', formData);
			console.log(response.data);
			getTasks();
		}
		catch(err) {
			console.log(err);
		}

	}

	async function updateTask(data) {
		try{
			const response = await axios.post('http://localhost/task_tracker/updateTask.php', data);
			console.log(response.data);
			getTasks();
		}
		
		catch(err) {
			console.log(err);
		}
	}

	
	useEffect(() => {
		getTasks();
	},[]);

  return (
    <div className='container'>

		<Header onPress={formToggle} showAdd={showAddTask}/>
		{showAddTask && (<AddTask onAdd={addTask} />)}
		{tasks.length > 0 ? (<Tasks tasks={tasks} setTasks={setTasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Tasks Available')}
    </div>
  );
}

export default App;
