import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
//import { Box } from '@mui/system'
import { Card, Box, CardContent, Typography, CardActions, Button, Stack, TextField } from '@mui/material'

const Login = () => {
    const {loginUser} = useContext(AuthContext);
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
                </Stack>
              </CardContent>
              <CardActions>
                <Button sx={{width:"100%", textAlign:"center"}} type="submit" variant="contained" >Login</Button>
              </CardActions>
            </Card>
          </form>
        </Box>
    </div>
  )
}

export default Login