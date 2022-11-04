import { Outlet, Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon"

export default function App() {
  const {user, logoutUser} = useContext(AuthContext)
  
  return (
    <>
      <AppBar position="static" sx={{marginBottom:"20px"}}>
         <Toolbar >
          <IconButton size="large" edge="start" color="inherit" arial-label="logo">
              <CatchingPokemonIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{flexGrow:"1"}}>Todo App</Typography>
          <Stack direction="row" spacing={2}>
            <Link style={{color:"white", textDecoration:"none"}} to="/home" color="inherit">Home</Link>
            {
              user ? <>
                      <Link style={{color:"white", textDecoration:"none"}} color="inherit" onClick={logoutUser}>Logout</Link>
                      <Link style={{color:"white", textDecoration:"none"}} variant="h6" component="div">welcome {user.username}</Link>
                      </>
                   :
                      <>
                      <Link style={{color:"white", textDecoration:"none"}} to="/login" color="inherit">Login</Link>
                      <Link style={{color:"white", textDecoration:"none"}} to="/register" color="inherit">Sign Up</Link>
                      </>
            }

          </Stack>
          
         </Toolbar>
      </AppBar>
      
      <Outlet />
    </>
  );
}
