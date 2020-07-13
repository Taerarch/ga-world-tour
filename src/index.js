import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Nav from './components/Nav';
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
