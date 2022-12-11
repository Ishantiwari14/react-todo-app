import "./index.css"
import trashIcon from "./trash-bin.png"
import React, {useState} from "react"


function App() {
  const [taskInput, updateTaskInput]=useState("");
  const [toDoList, updateToDoList] = useState([]);

  const addNote = () => {
    toDoList.push({description: taskInput, isComplete: false})
    updateToDoList(toDoList)
    updateTaskInput("")
  }

  const deleteTask = (index) => {
    const newList = toDoList.filter((item,i) => i !==index );
    updateToDoList(newList)
  }

  const markComplete = (index) => {
    const list=[...toDoList];
    list[index].isComplete = !list[index].isComplete;
    updateToDoList(list)
  }

  const inputKeyDown = (ev) => {
    console.log(ev.key)
    if (ev.key === "Enter"){
      toDoList.push({description: taskInput, isComplete: false})
      updateToDoList(toDoList)
      updateTaskInput("")
    }
  }
  return (
    <div className="container">
      <p className="app-title">React Todo list</p>
      <div className="task-container">
        <div>
          <input className="text-input" placeholder="Add a to-do" value={taskInput} 
          onChange={(event) => updateTaskInput(event.target.value)}
          onKeyDown={inputKeyDown}/>
          <button className="add-button" onClick={addNote}>ADD</button>
        </div>
        <div>
          {toDoList?.length? toDoList.map((toDoObject, index)=>
           <ListItem index={index} todos={toDoObject} 
           deleteTask={deleteTask} markComplete={markComplete}/>):
          <p className="no-item-text">No Task Added!</p>}
        </div>
      </div>
    </div>
  );
}

function ListItem(props){
  return(
    
    <div  className="list-item row jc-space-between">
      
      <span className={props.todos.isComplete?"task-complete":""} 
      onClick={(ev) => props.markComplete(props.index)}>{props.todos.description}</span>
      <img src={trashIcon} className="delete-icon" onClick={(ev) => props.deleteTask(props.index)}/>
    </div>
  )
}
export default App;
