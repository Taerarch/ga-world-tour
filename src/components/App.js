import React, { Component } from 'react';
import Nav from './Nav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import User from './User';
import Home from './Home';
import fire from './fire'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      user: {}
    }
  }
  componentDidMount(){
    this.authListener()
  }

  authListener(){
    fire.auth().onAuthStateChanged((user) =>{
      if(user){
        this.setState({user})
      }
      else{
        this.setState({user: null})
      }
    })
  }

  render(){
    return (

      <div className="App">
        {this.state.user ? (<Home/>) : (<User/>)}
      </div>
      
      // <Router>
      //   <div>
      //     <Nav />
      //     <Switch>
      //       <Route path="/" exact component ={Home} />
      //       <Route path="/user" component ={User} />
      //     </Switch>

      //     {this.state.user ? (<Home/>) : (<User/>)}
      //   </div>

      // </Router>
    );
  }

}

export default App;