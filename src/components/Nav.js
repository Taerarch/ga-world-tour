import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar';
import {storage} from './fire'

function Nav(props) {
    const navStyle={
        color: 'black',
        textDecoration: 'none',
        fontWeight: "bold"
    }
    const [dlUrl, setUrl] = React.useState("");


    let downloadTask = null;
    if (props.user !== null){
        downloadTask = storage.ref(`images/${props.user.uid}`);
    }

    if (downloadTask !== null){
        downloadTask.getDownloadURL().then((dlUrl)=>{
          setUrl(dlUrl)
        })
    }
    return (
        <nav>
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                    <img id="logo" src="https://seeklogo.com/images/G/general-assembly-logo-D5C634F07A-seeklogo.com.png" />
                    <li className="home_nav" > World Tour</li>
                </Link>



                {props.user
                ? (<Link  style={navStyle} to="/profile">

                        <Avatar src={dlUrl} round={true}  />
                    </Link>)
                : null}


            </ul>
            
        </nav>
    )
}

export default Nav
