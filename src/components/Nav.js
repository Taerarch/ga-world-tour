import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar';
import {storage} from './fire'
import pic1 from './pic.jpg'


function Nav(props) {
    const navStyle={
        color: 'white'
    }
    const [dlUrl, setUrl] = React.useState("");

    const uploadTask = storage.ref(`images/${props.user.uid}`);
    if (uploadTask !== null){
        uploadTask.getDownloadURL().then((dlUrl)=>{
          setUrl("URL is : "+dlUrl)
          //grap a refcence to the user and attach to him
        })
      }
    console.log(dlUrl)
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
                <Avatar icon="user" src="./pic.jpg" size={70} round={true}  />
                
            </ul>
        </nav>
    )
}

export default Nav
