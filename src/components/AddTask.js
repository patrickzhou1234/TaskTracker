import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    const [important, setImportant] = useState(false);
    //added an improtant const

    const onSubmit = function(e) {
        e.preventDefault();
        if (!text) {
            alert('Please add a task');
            return;
        }

        onAdd({text, day, reminder, important})

        setText('');
        setDay('');
        setReminder(false);
        setImportant(false);
        //added an important boolean
    }

  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type="text" placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className='form-control'>
            <label>Day & Time</label>
//date
            <input type="date" placeholder='Add Day' value={day} onChange={(e) => setDay(e.target.value)} />
        </div>
        <div className='form-control'>
            <label>Set Reminder</label>
            <input checked={reminder} type="checkbox" onChange={(e) => setReminder(e.currentTarget.checked)} />
        </div>
        <div className='form-control'>
            <label>Mark as Important</label>
            <input checked={important} type="checkbox" onChange={(e) => setImportant(e.currentTarget.checked)} />
        </div>
        <input type="submit" value='Save Task' className='btn btn-block'/>
    </form>
  )
}
//added a mark as important tag

export default AddTask
