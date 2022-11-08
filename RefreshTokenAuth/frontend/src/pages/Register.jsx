import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Card, Box, CardContent, Typography, CardActions, Button, Stack, TextField } from '@mui/material'
import { LoadingButton} from '@mui/lab'



const Register = () => {
    const {registerUser, isLoading} = useContext(AuthContext)
    
    
  return (
    <div style={{ display: "flex", justifyContent:"center", alignItems:"center", marginTop:"80px" }}>
     
      <Box width="350px">
          <form onSubmit={registerUser}>
            <Card>
              <CardContent>
                <Typography sx={{width:"100%", textAlign:"center"}}  variant="h5" gutterBottom component="div">
                  Sign Up
                </Typography>
                <Stack spacing={3} direction='column'>
                  <TextField type='text' variant='outlined' name='username' label='username' required/>
                  <TextField type='email' variant='outlined' name='email' label='email' required/>
                  <TextField type='password' variant='outlined' name='password1' label='password' required/>
                  <TextField type='password' variant='outlined' name='password2' label='confirm password' required/>
                  <Typography >Have an account already? <Link style={{color:"#1565c0", textDecoration:"none"}} to="/login" >Log in</Link></Typography>
                </Stack>
              </CardContent>
              <CardActions>
                {
                  !isLoading ?
                    <Button loading sx={{width:"100%", textAlign:"center"}} type="submit" variant="contained" >Sign Up</Button>
                  :
                    <LoadingButton loading   sx={{width:"100%", textAlign:"center"}} type="submit" variant="contained" >Saving</LoadingButton>
                }
                
              </CardActions>
            </Card>
          </form>
        </Box>
    </div>
  )
}

export default Register