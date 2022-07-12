import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task) => (<Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onToggle2={onToggle} />))}
    </>
  )
}
//added a second onToggle, onToggle2 for the important indicator
export default Tasks