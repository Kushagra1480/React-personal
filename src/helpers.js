import {v4 as uuidv4} from 'uuid'

export const handleClick = (event, setTodoList, setInput) => {
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

export const toggleCompleted = (index, todoList, setTodoList, checked) => {
    const newTodos = [...todoList]
    newTodos[index].done = checked
    setTodoList(newTodos)
}

export const handleDelete = (index, todoList, setTodoList) => {
    const newTodos = [...todoList]
    newTodos.splice(index, 1)
    setTodoList(newTodos)
}

export const handleEdit = (index, todoList, setEditingTodo) => {
    setEditingTodo(todoList[index])
}

export const handleSave = (index, todoList, editingTodo, setTodoList, setEditingTodo) => {
    const newTodos = [...todoList]
    newTodos[index] = {...newTodos[index], task: editingTodo.task}
    setTodoList(newTodos)
    setEditingTodo(null)
}