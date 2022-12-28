import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import '../src/App.css'

function App() {
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState("")
  const [editingTodo, setEditingTodo] = useState(null)

  const handleClick = (event) => {
    event.preventDefault()
    const key = uuidv4()
    setTodoList((prev) => [
      ...prev,
      {
        key: key,
        task: event.target.elements.todo.value,
        done: false
      },
    ])
    setInput("")
  }

  const toggleCompleted = (index) => {
    const newTodos = [...todoList]
    newTodos[index].done = !newTodos[index].done
    setTodoList(newTodos)
  }

  const handleDelete = (index) => {
    const newTodos = [...todoList]
    newTodos.splice(index, 1)
    setTodoList(newTodos)
  }

  const handleEdit = (index) => {
    setEditingTodo(todoList[index])
  }

  const handleSave = (index) => {
    const newTodos = [...todoList]
    newTodos[index] = {...newTodos[index], task: editingTodo.task}
    setTodoList(newTodos)
    setEditingTodo(null)
  }

  return (
      <div>
        <h1>Todo List</h1>
        <form onSubmit = {handleClick}>
          <label for = "todo">Enter Task</label>
          <input type="text" name="todo" onInput={(e) => setInput(e.target.value)} value = {input}/>
          <button type = "submit">Add Todo</button>
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
                        <button onClick={() => handleSave(index)}>Save</button>
                      </>
                    ) : (
                      <>
                        <input 
                          type='checkbox'  
                          onChange = {() => toggleCompleted(index)}
                        />
                          {todo.task}
                        <button onClick = {() => handleDelete(index)}>Delete 🗑️</button>
                        <button onClick = {() => handleEdit(index)}>Edit ✏️</button>
                      </>
                    )}
                  </li> 
                </div>
              )
            })}
          </ul>
        </div>
      </div>
  );
}

export default App;
