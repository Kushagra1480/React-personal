import React, {useState} from 'react'
import '../src/App.css'
import { handleClick, handleDelete, handleEdit, handleSave, toggleCompleted } from './helpers'

function App() {
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState("")
  const [editingTodo, setEditingTodo] = useState(null)

  return (
    <div className='outer-container'>
      <div className='container'> 
        <h1>TODO LIST</h1>
        <form className='todo-input' onSubmit = {(event) => handleClick(event, setTodoList, setInput)}>
          <label for = "todo">Enter Task</label>
          <input type="text" name="todo" onInput={(e) => setInput(e.target.value)} value = {input}/>
          <button className = 'todo-button' type = "submit">Add Todo</button>
        </form>
        <div>
          <ul>
            {todoList.map((todo, index) => {
              return(
                <div>
                  <li 
                  style = {{
                    textDecoration : todo.done ? 'line-through' : 'none', 
                    color : todo.done ? 'grey' : 'black'
                    }}
                  key = {index}  
                    >
                    {editingTodo && editingTodo.key === todo.key ? 
                    (
                      <>
                        <input 
                          type = "text" 
                          value = {editingTodo.task} 
                          onChange = {(event) => setEditingTodo({...editingTodo, task: event.target.value})}
                        />
                        <button onClick={() => handleSave(index, 
                          todoList, 
                          editingTodo,
                          setTodoList, 
                          setEditingTodo)}>Save</button>
                      </>
                    ) : (
                      <>
                        <input 
                          type='checkbox'  
                          onChange = {() => toggleCompleted(index, todoList, setTodoList)}
                        />
                          {todo.task}
                        <button onClick = {() => handleDelete(index, todoList, setTodoList)}>Delete 🗑️</button>
                        <button onClick = {() => handleEdit(index, todoList, setEditingTodo)}>Edit ✏️</button>
                      </>
                    )}
                  </li> 
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
