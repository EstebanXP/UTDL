import React from 'react'
import { NavLink } from 'react-router-dom'

function InitialNav() {
    return (
        <div>
            <h2><NavLink to="/login"><button>Log In</button></NavLink>|<NavLink to="/register"><button>Sign Up</button></NavLink></h2>
        </div>
    )
}

export default InitialNav