import React from 'react'
import { NavLink } from 'react-router-dom'

function HomeNav() {
    return (
        <div>
            <h2><NavLink to="/home/all">My Tasks</NavLink></h2>
        </div>
    )
}

export default HomeNav