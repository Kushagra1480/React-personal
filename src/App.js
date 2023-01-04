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
  Card,
  Checkbox, 
  Text,
  Modal } from '@mantine/core';

import {Trash, Pencil, Plus, Check} from 'tabler-icons-react'

function App() {
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState("")
  const [editingTodo, setEditingTodo] = useState(null)
  const [opened, setOpened] = useState(false)

  return (
    <MantineProvider 
      theme = {{
        colorScheme: 'dark', 
        fontFamily: 'Roboto',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        }} withGlobalStyles withNormalizeCSS>
      <Container size = 'xs' spacing = 'xl' position = 'apart'>
        <Box size = 'xs' mx = 'auto' spacing = 'xl' position = 'apart' mt = 'md'>
          <Group position='apart' spacing = 'xs'>
            <Title align='center' spacing = 'md'>ToDo List</Title>
            <Button leftIcon = {<Plus />} onClick = {() => setOpened(true)} align = 'left'>New Task</Button>
          </Group> 
          <Modal
            opened = {opened}
            title = 'New Task'
            withCloseButton = {false}
            onClose = {() => {setOpened(false)}}
            centered
            size = 'md'
          >
            <form onSubmit = {(event) => {handleClick(event, setTodoList, setInput)
            setOpened(false)}}>
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
                <Button onClick = {() => {setOpened(false)}}>Cancel</Button>
                <Button leftIcon = {<Plus />} type = "submit" >Add Todo</Button>
              </Group>
            </form>
          </Modal>
          <Box>
              {todoList.map((todo, index) => {
                return(
                  <Box>
                    <Card 
                    withBorder
                    mt={'md'}
                    key = {index}  
                      >
                      {editingTodo && editingTodo.key === todo.key ? 
                      (
                        <>
                          <Group position = 'apart'>
                            <TextInput
                              type = "text" 
                              value = {editingTodo.task} 
                              onChange = {(event) => 
                                setEditingTodo({...editingTodo, task: event.target.value})}
                            />
                            <Button 
                              onClick={() => handleSave(index, 
                                todoList, 
                                editingTodo,
                                setTodoList, 
                                setEditingTodo)}
                              leftIcon = {<Check />}
                              >Save</Button>
                          </Group>
                        </>
                      ) : (
                        <>
                          <Checkbox
                            radius = 'xl'
                            checked = {todo.done}
                            onChange={(event) => 
                              toggleCompleted(index, todoList, setTodoList, event.target.checked)}
                            label = {<Text size='lg' style = {{
                              textDecoration : todo.done ? 'line-through' : 'none', 
                              color : todo.done ? 'grey' : 'lightgrey',
                              }}>{todo.task}</Text>}
                            />
                          <Group position = 'apart' spacing='xl' mt={'md'}>
                            <Button 
                              color = 'red' 
                              leftIcon = {<Trash />} 
                              onClick = {() => handleDelete(index, todoList, setTodoList)}>
                              Delete
                            </Button>
                            <Button 
                              color = 'cyan' 
                              leftIcon = {<Pencil />} 
                              onClick = {() => handleEdit(index, todoList, setEditingTodo)}>
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
