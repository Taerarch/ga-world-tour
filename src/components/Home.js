import React, { Component } from 'react'
import Map from './Map'
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
              <h1>You are logged in {this.props.user.email}</h1>
              <button onClick={this.logout}>Logout</button>
              <Map />
            </div>
        )
    }
}

export default Home;
