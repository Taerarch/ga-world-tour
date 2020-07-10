import React from 'react';
import Nav from './Nav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component ={Home} />
          <Route path="/signup" component ={Signup} />
          <Route path="/login" component ={Login} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
