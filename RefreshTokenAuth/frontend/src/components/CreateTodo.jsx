import React from 'react'
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const CreateTodo = ({todos}) => {
    const {user, tokens, logoutUser} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(todos)
        const handleCreateTodo = async (e) => {
            e.preventDefault()
            
            const task = e.target.task.value
            const response = await fetch("http://127.0.0.1:8000/api/todos/", {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + String(tokens.access)
                },
                body:JSON.stringify({"task":task})
                })
            const data = await response.json()
            

            if(response.status === 200){
                
                navigate('/home')
            
                
            }else if(response.statusText === "Unauthorized"){
                logoutUser();
              }
            else{
                console.log("something went wrong")
            }
            
        }
  return (
    <div>
        <form onSubmit={handleCreateTodo}>
            <textarea name="task" id="" cols="30" rows="10" placeholder='Enter the task...' required></textarea><br />
            <input type="submit" value="Save Task" />
        </form>
    </div>
  )
}

export default CreateTodo