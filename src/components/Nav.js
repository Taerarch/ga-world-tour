import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar';
import fire from './fire'
import {storage} from './fire'
import GAlogo from '../GAlogo.png'

function Nav(props) {
    const navStyle={
        color: 'black',
        textDecoration: 'none',
        fontWeight: "bold"
    }
    const logoStyle={
        marginLeft: "40px"
    }
    const [dlUrl, setUrl] = React.useState("");

    const logout = () => {
      fire.auth().signOut();
    }

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
                    <img id="logo" src={GAlogo} alt="logo"/>
                    <li className="home_nav" > World Tour</li>
                </Link>
                {props.user
                ? (<Link style={navStyle} to="/profile">
                    <button className="btn btn-info" onClick={logout}>Logout</button>
                        <Avatar style={logoStyle} src={dlUrl} round={true}  />
                    </Link>)
                : null}
                
            </ul>
        </nav>
    )
}

export default Nav
