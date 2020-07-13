import React, { Component } from 'react'
import Map from './WorldMap'
import fire from './fire'

class Home extends Component {
constructor(props){
    super(props)
    this.state={

    }
}

logout(){
    fire.auth().signOut();
}

    render() {
        return (
            <div>
              <div className="nav">
                <h1>You are logged in {this.props.user.email}</h1>
                <button onClick={this.logout}>Logout</button>
              </div>
              <Map />
            </div>
        )
    }
}

export default Home;
