import React from 'react'
import { NavLink } from 'react-router-dom'

function Signup() {
    return (
        <div className='SignUpContainer'> 
            <h1>Glad you're in</h1>
            <h2>Full Name</h2>
            <input type="text"></input>
            <h2>Accout</h2>
            <input type="email"></input>
            <h2>Password</h2>
            <input type="password"></input>
            <h2>Phone Number</h2>
            <input type="text"></input>
            <br></br>
            <br></br>
            <NavLink to="/">Back to home</NavLink>
        </div>
    )
}

export default Signup
