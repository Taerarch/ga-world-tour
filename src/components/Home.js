import React, { Component } from 'react'
import fire from './fire'
import WorldMap from './WorldMap'

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
              <WorldMap />
            </div>
        )
    }
}

export default Home;
