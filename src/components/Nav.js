import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar';
import {storage} from './fire'



function Nav(props) {
    const navStyle={
        color: 'white'
    }
    const [dlUrl, setUrl] = React.useState("");

    
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
                <Avatar avatarRedirectUrl={dlUrl} size="100" round={true} />
                
            </ul>
        </nav>
    )
}

export default Nav
