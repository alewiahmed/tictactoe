import React, { Component } from 'react';
import './App.css';

import SingleCell from './components/SingleCell/';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <SingleCell id="1" value="" borderRight borderBottom />
            <SingleCell id="2" value="" borderRight borderBottom />
            <SingleCell id="3" value="" borderBottom />
          </div>
          <div className="row">
            <SingleCell id="4" value="" borderRight borderBottom />
            <SingleCell id="5" value="" borderRight borderBottom />
            <SingleCell id="6" value="" borderBottom />
          </div>
          <div className="row">
            <SingleCell id="7" value="" borderRight />
            <SingleCell id="8" value="" borderRight />
            <SingleCell id="9" value="" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
