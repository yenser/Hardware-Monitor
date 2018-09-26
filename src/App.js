import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataGraph from './DataGraph/DataGraph';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hardware Monitor</h1>
        </header>
        <DataGraph />
      </div>
    );
  }
}

export default App;
