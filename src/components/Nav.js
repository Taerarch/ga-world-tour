import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'

function Nav(props) {
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

                {props.user 
                ? (<Link style={navStyle} to="/profile">
                        <li>Profile</li>
                    </Link>) 
                : null}

                
            </ul>
        </nav>
    )
}

export default Nav
