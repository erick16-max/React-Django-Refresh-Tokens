import React, { useState } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Register = () => {
    const {registerUser} = useContext(AuthContext)
    
  return (
    <div style={{ display: "block", marginLeft:"20px" }}>
        <form onSubmit={registerUser} >
            <h3>Register User</h3>
            <input style={{"marginBottom":"10px"}}  type="text" name='username' placeholder='Enter Username' /><br />
            <input style={{"marginBottom":"10px"}} type="email" name='email' placeholder='Enter Email' /><br />
            <input style={{"marginBottom":"10px"}} type="password" name='password1' placeholder='Enter Password' /><br />
            <input style={{"marginBottom":"10px"}}  type="password" name='password2' placeholder='Cormfirm Password' /><br />
            <input style={{"marginBottom":"10px"}} type="submit" value="Register" />
        </form>
    </div>
  )
}

export default Register