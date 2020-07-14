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

    let uploadTask = null;
    if (props.user !== null){
        uploadTask = storage.ref(`images/${props.user.uid}`);
    }
    if (uploadTask !== null){
        uploadTask.getDownloadURL().then((dlUrl)=>{
          setUrl(dlUrl)
          //grap a refcence to the user and attach to him
        })
      }
    console.log("URL is : "+dlUrl)
    return (
        <nav>
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                    <li className="home_nav" >GA World Tour</li>
                </Link>

                {props.user 
                ? (<Link  style={navStyle} to="/profile">
                        <Avatar src={dlUrl} size={100} round={true}  />
                    </Link>) 
                : null}
                
                
            </ul>
        </nav>
    )
}

export default Nav
