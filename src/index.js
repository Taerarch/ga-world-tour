import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Nav from './components/Nav';
<<<<<<< HEAD
// eslint-disable-next-line
import Home from './components/Home';
=======
>>>>>>> 285862a12beb94435d3f6a388f612004b310c92b
import Video from './components/Video';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Nav />

        <Switch>

          <App path="/" exact component ={App} />
          <Route path="/video" exact component ={Video} />

        </Switch>
      </div>

    </Router>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
