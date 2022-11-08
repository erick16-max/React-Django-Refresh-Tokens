import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Todo from '../components/Todo';
import AuthContext from '../context/AuthContext';
import { useContext, useState, useEffect} from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';




const Home = () => {
  const [todos, setTodos] = useState([]) 
  const {user, tokens, logoutUser} = useContext(AuthContext);
  const navigate = useNavigate()

  

  const getTodos = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/todos/",{
      method:"GET",
      headers: {
        "Authorization": "Bearer " + String(tokens.access)
      }
    })

    const data = await response.json()
    if(response.status === 200) {
      setTodos(data)
      
    }else if(response.statusText === "Unauthorized"){
      logoutUser();
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
        
        <div style={{ marginLeft:"25%", marginTop:"5%" }}>
        <Button  sx={{fontWeight:"bold" }} color='success' onClick={() => navigate("/create-todo")} variant='outlined' startIcon={<AddIcon />} >Add Task</Button>
        {
          todos.length === 0 ? <><h4>No Todos</h4></>:
          <Todo todos={todos} setTodos={setTodos}/>
        }
        
        </div>
        
          

    </>
  )
}

export default Home