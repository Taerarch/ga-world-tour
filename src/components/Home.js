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
                {console.log(this.state.user.email)}
                <h1>Welcome {this.state.user}.</h1>
                <button onClick={this.logout}>Logout</button>
                <Map />
            </div>
        )
    }
}

export default Home;