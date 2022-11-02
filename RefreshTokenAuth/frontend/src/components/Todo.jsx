import React from 'react'
import { useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';


const Todo = ({todos, setTodos}) => {
  const {tokens, handleUpdateTodo} = useContext(AuthContext);
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/todo-detail/${id}`,{
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + String(tokens.access)
      }
    })
    console.log(response)
    if(response.status === 204){
      const todoIndex = todos.findIndex(todo => todo.id === id)
      todos.splice(todoIndex)
      setTodos([...todos])

    }
  }

  
   
  return (
    <div>
        {
            todos.map(todo => {
                return( 
                  <li key={todo.id}>{ todo.task} <button onClick={() => handleUpdateTodo(todo.id)}>Update</button> <button onClick={() => handleDelete(todo.id)}>Delete</button></li>
                )
              })
        }
    </div>
  )
}

export default Todo