import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Nav from './Nav';
import Video from './Video';
import fire from './fire'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';


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
        <Router>
          <div>
            <Nav user={this.state.user}/>

            <Switch>
              {this.state.user 
                ? (<Route path="/" exact component={()=><Home user={this.state.user}/>} />) 
                : (<Route path="/" exact component={Login} />)}
              <Route path="/profile" exact component ={()=><Profile user={this.state.user}/>} />
              <Route path="/video" exact component ={()=><Video user={this.state.user}/>} />
              <Route path="/signup" exact component ={()=><Signup user={this.state.user}/>} />
              
            </Switch>
          </div>

        </Router>

      </div>

    );
  }

}

export default App;
