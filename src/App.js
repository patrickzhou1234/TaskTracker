import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'

function App() {
  const [showAddTask, setShowAddTask] = useState(true);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksfromserver = await fetchTasks();
      setTasks(tasksfromserver);
    }
    getTasks();
  }, []);
  
  const fetchTasks = async () => {
    const res = await fetch('http://localhost/tasks');
    const data = await res.json();

    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost/tasks/${id}`);
    const data = await res.json();

    return data;
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'        
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000)+1;
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask]);
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost/tasks/${id}`, {
      method: 'DELETE',
    });
    

    setTasks(tasks.filter((task) => task.id!== id));
  }

  const toggleReminder = async function(id) {
    const tasktoToggle = await fetchTask(id);
    const updTask = {
      ...tasktoToggle,
      reminder: !tasktoToggle.reminder
    }

    const res = await fetch(`http://localhost/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task));
  }

  const clearTask = async function() {
    const postidarr = tasks.map((task) => task.id);
    postidarr.forEach(async (id) => {
      await fetch(`http://localhost/tasks/${id}`, {
        method: 'DELETE',
      });
    });
    setTasks([]);
  }
  
  return (
    <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} title="Task Tracker" onClear={clearTask} />
        {showAddTask && <AddTask onAdd={addTask}></AddTask>}
        {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>) : <span>No Tasks To Show</span>}
        <Footer></Footer>
    </div>
  );
}

export default App;
