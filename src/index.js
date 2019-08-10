import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import './index.css';
import Register from './App/register';

import 'bootstrap/dist/css/bootstrap.css';
import Logout from './App/logout';
import Login from './App/login';
import Admin from './App/admin';


const routing = (
  <Router>
    <div>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={App} />
      </Switch>
    </div>
  </Router>
);

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

ReactDOM.render(
  routing,
  document.getElementById('root')
);
