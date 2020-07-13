import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'

function Nav() {
    const navStyle={
        color: 'white'
    }

    return (
        <nav>
            <h3>GA World Tour</h3>
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                    <li>Home</li>
                </Link>

                <Link style={navStyle} to="/video">
                    <li>Video</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav
