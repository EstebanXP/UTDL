import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/InitialNav.css';

function InitialNav() {
    return (
        <nav>
            <h2><NavLink to="/login"><button>Log In</button></NavLink>|<NavLink to="/register"><button>Sign Up</button></NavLink></h2>
        </nav>
    )
}

export default InitialNav