import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './App/admin';
import Login from "./App/login";

class App extends Component {

  constructor(props) {

    super(props);

  }

  render() {
    return (
      <div className="">
        <Login {...this.props}></Login>
      </div>
    );
  }
}

export default App;
