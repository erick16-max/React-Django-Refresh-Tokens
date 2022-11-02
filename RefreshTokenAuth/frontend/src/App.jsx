import { Outlet, Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

export default function App() {
  const {user, logoutUser} = useContext(AuthContext)
  
  return (
    <div style={{ display: "block",}}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
          display: "flex", 
          flexDirection:"row",
        }}
      >
        
          <Link style={{ display: "block", marginRight:"20px" }} to="/home">Home</Link>  
          
          
          {
            user ?  
            <button style={{ display: "block", marginLeft:"20px"}} to="/login" onClick={logoutUser}>Logout</button>
            :
            <>
            <Link style={{ display: "block", marginLeft:"20px", cursor:"pointer"}} to="/login">Login</Link>
            <Link style={{ display: "block", marginLeft:"20px", cursor:"pointer"}} to="/register">Register</Link>
            </>
          }
          {user && <p>welcome {user.username}</p>}
      </nav>
      
      <Outlet/>
    </div>
  );
}
