import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Login = () => {
    const {loginUser} = useContext(AuthContext);
  return (
    <div style={{ display: "block", marginLeft:"20px" }}>
        <form onSubmit={loginUser} >
            <h3>User login</h3>
            <input type="text" name='username' placeholder='Enter Username' />
            <input type="password" name='password' placeholder='Enter Password' />
            <input type="submit" value="Login" />
        </form>
    </div>
  )
}

export default Login