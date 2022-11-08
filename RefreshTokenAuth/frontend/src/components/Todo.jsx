import React from 'react'
import { useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#fff',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));






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
     
                 <>
                     <TableContainer sx={{boxShadow: 3, maxWidth: 600, marginTop:2}} component={Paper}>
                        <Table sx={{ maxWidth: 600 }} aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell><Typography variant='h6'>Task</Typography></StyledTableCell>
                              
                            
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {todos.map((row) => (
                              <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                  {row.task}
                                </StyledTableCell>
                                <StyledTableCell align="right"><Button variant='contained' onClick={() => handleUpdateTodo(row.id)}><EditIcon /></Button></StyledTableCell>
                                <StyledTableCell align="right"><Button variant='contained' color="error" onClick={() => handleDelete(row.id)}><DeleteForeverIcon /></Button></StyledTableCell>
                                
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer> 
                 </>
                )
              
    
}

export default Todo