import React, { Component } from 'react';
import './App.css';

import SingleCell from './components/SingleCell/';

class App extends Component {
  state = {
    cells: ['', '', '', '', '', '', '', '', ''],
    player1: 'X',
    player2: 'O',
    currentTurn: 'player1',
    multiplayer: null
  };

  nextPlayer = () => {
    this.setState(state => {
      state.currentTurn =
        state.currentTurn === 'player1' ? 'player2' : 'player1';
      return state;
    });
  };

  selectCell = id => {
    let { cells } = this.state;
    if (cells[id] !== '') return;
    this.setState(state => {
      state.cells[id] = state[state.currentTurn];
      return state;
    });
    this.nextPlayer();
  };

  showCells = () => {
    let { cells } = this.state;
    let cellsElement = [];
    let innerCells = [];
    cells.forEach((_, index) => {
      innerCells.push(
        <SingleCell
          id={index}
          key={index}
          value={cells[index]}
          onClick={this.selectCell}
        />
      );
      if ((index + 1) % 3 == 0) {
        cellsElement.push(
          <div className="row" key={index + 1 / 3}>
            {innerCells}
          </div>
        );
        innerCells = [];
      }
    });
    return cellsElement;
  };

  render() {
    return (
      <div className="App">
        <div className="container">{this.showCells()}</div>
      </div>
    );
  }
}

export default App;
