import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import {Link} from 'react-router-dom'
import { Card, Box, CardContent, Typography, CardActions, Button, Stack, TextField } from '@mui/material'
import { LoadingButton} from '@mui/lab'

const Login = () => {
    const {loginUser, isLoading} = useContext(AuthContext);
  return (
    <div style={{ display: "flex", justifyContent:"center", alignItems:"center", marginTop:"80px" }}>
        <Box width="350px">
          <form onSubmit={loginUser}>
            <Card>
              <CardContent>
                <Typography sx={{width:"100%", textAlign:"center"}}  variant="h5" gutterBottom component="div">
                  Login
                </Typography>
                <Stack spacing={3} direction='column'>
                  <TextField type='text' variant='outlined' name='username' label='username' required/>
                  <TextField type='password' variant='outlined' name='password' label='password' required/>
                  <Typography >Don't have an account? <Link style={{color:"#1565c0", textDecoration:"none"}} to="/register" >Sign up</Link></Typography>
                </Stack>
              </CardContent>
              <CardActions>
              {
                  !isLoading ?
                    <Button loading sx={{width:"100%", textAlign:"center"}} type="submit" variant="contained" >Login</Button>
                  :
                    <LoadingButton loading   sx={{width:"100%", textAlign:"center"}} type="submit" variant="contained" >Login</LoadingButton>
                }
                
              </CardActions>
            </Card>
          </form>
        </Box>
    </div>
  )
}

export default Login