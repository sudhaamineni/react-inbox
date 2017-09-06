import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Inbox from './components/Inbox';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      composeMessageDisplayed: false
    }
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Inbox</h2>
        </div>

        <Inbox />
      </div>

    );
  }
}

export default App;
