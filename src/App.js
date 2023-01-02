import React, {useState} from 'react'
import { handleClick, 
  handleDelete, 
  handleEdit, 
  handleSave, 
  toggleCompleted } from './helpers'
import { MantineProvider, 
  Container, 
  TextInput, 
  Button, 
  Group, 
  Box, 
  Space, 
  Title, 
  List, 
  Card,
  Checkbox, 
  Text } from '@mantine/core';

import {Trash, Pencil} from 'tabler-icons-react'

function App() {
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState("")
  const [editingTodo, setEditingTodo] = useState(null)

  return (
    <MantineProvider 
      theme = {{
        colorScheme: 'dark', 
        fontFamily: 'Roboto',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        }} withGlobalStyles withNormalizeCSS>
      <Container size = 'xs'>
        <Box size = 'xs' mx = 'auto'> 
          <Title align='center'>TODO LIST</Title>
          <form onSubmit = {(event) => handleClick(event, setTodoList, setInput)}>
            <TextInput  
              type = 'text'
              label = 'Enter Todo'
              size = 'sm'
              name = 'todo' 
              onInput={(e) => setInput(e.target.value)} 
              value = {input}
            />
            <Space h = 'sm'/>
            <Group position = 'right' mt = 'mid'>
              <Button type = "submit">Add Todo</Button>
            </Group>
          </form>
          <Box>
              {todoList.map((todo, index) => {
                return(
                  <Box>
                    <Card 
                    withBorder
                    mt={'md'}
                    style = {{
                      textDecoration : todo.done ? 'line-through' : 'none', 
                      color : todo.done ? 'grey' : 'black',
                      }}
                    key = {index}  
                      >
                      {editingTodo && editingTodo.key === todo.key ? 
                      (
                        <>
                          <input 
                            type = "text" 
                            value = {editingTodo.task} 
                            onChange = {(event) => 
                              setEditingTodo({...editingTodo, task: event.target.value})}
                          />
                          <button onClick={() => handleSave(index, 
                            todoList, 
                            editingTodo,
                            setTodoList, 
                            setEditingTodo)}>Save</button>
                        </>
                      ) : (
                        <>
                          <Checkbox
                            onChange={(event) => 
                              toggleCompleted(index, todoList, setTodoList, event.target.checked)}
                            label = {<Text size='lg' style = {{
                              textDecoration : todo.done ? 'line-through' : 'none', 
                              color : todo.done ? 'grey' : 'lightgrey',
                              }}>{todo.task}</Text>}
                            />
                          <Group position = 'apart' spacing='xl' mt={'md'}>
                            <Button leftIcon = {<Trash />} onClick = {() => handleDelete(index, todoList, setTodoList)}>
                              Delete
                            </Button>
                            <Button leftIcon = {<Pencil />} onClick = {() => handleEdit(index, todoList, setEditingTodo)}>
                              Edit
                            </Button>
                          </Group>
                        </>
                      )}
                    </Card> 
                  </Box>
                )
              })}
          </Box>
        </Box>
      </Container>
    </MantineProvider>
  );
}

export default App;
