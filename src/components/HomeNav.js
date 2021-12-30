import React from 'react'
import { NavLink } from 'react-router-dom'

function HomeNav() {
    return (
        <div>
            <h2><NavLink to="/home/prueba">Prueba</NavLink></h2>
        </div>
    )
}

export default HomeNav