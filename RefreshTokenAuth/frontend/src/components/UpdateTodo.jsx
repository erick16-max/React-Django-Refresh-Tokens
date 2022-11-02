import React from 'react'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateTodo = () => {
    const {updateTask, setUpdateTask, taskId, setTaskId, tokens} = useContext(AuthContext);
    const navigate = useNavigate()

    const handleUpdatedTodo = async (e) => {
      e.preventDefault()
      const response = await fetch(`http://127.0.0.1:8000/api/todo-detail/${taskId}`,{
        method:"PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + String(tokens.access)
        },
        body:JSON.stringify({"task":updateTask})
      })
      if (response.status === 200){
        navigate("/home")
      }
    }

  return (
    <div>
        <form onSubmit={handleUpdatedTodo}>
            <textarea name="task" id="" value={updateTask} onChange={(e) => setUpdateTask(e.target.value)} cols="30" rows="10" placeholder='Enter the task...' required></textarea><br />
            <input type="submit" value="Update Task" />
        </form>
    </div>
  )
}

export default UpdateTodo