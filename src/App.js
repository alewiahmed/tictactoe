import React, { Component } from 'react';
import './App.css';

import SingleCell from './components/SingleCell/';

class App extends Component {
  state = {
    cells: ['', '', '', '', '', '', '', '', ''],
    player1: null,
    player2: null,
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

  selectPlayType = type => {
    this.setState({
      multiplayer: type === 1 ? false : true
    });
  };

  selectSymbol = symbol => {
    this.setState({
      player1: symbol,
      player2: symbol === 'X' ? 'O' : 'X'
    });
  };

  showSymbolSelector = () => {
    return (
      <div className="overlay">
        <div className="selector-container">
          <p className="selector-text">Would you like to be X or O?</p>
          <div className="selector-button-container">
            <button
              className="selector-button"
              onClick={() => {
                this.selectSymbol('X');
              }}
            >
              <p className="button-text">X</p>
            </button>
            <button
              className="selector-button"
              onClick={() => {
                this.selectSymbol('O');
              }}
            >
              <p className="button-text">O</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  showPlayerSelector = () => {
    return (
      <div className="overlay">
        <div className="selector-container">
          <p className="selector-text">How do you want to play?</p>
          <div className="selector-button-container">
            <button
              id="1"
              className="selector-button"
              onClick={() => {
                this.selectPlayType(1);
              }}
            >
              <p className="button-text">One Player</p>
            </button>
            <button
              id="1"
              className="selector-button"
              onClick={() => {
                this.selectPlayType(2);
              }}
            >
              <p className="button-text">Two Players</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  showScore = () => {
    return (
      <div className="score-container">
        <div className="single-score">
          <p className="player-text">Player One</p>
          <p className="score">0</p>
        </div>
        <div className="single-score">
          <p className="player-text">Player Two</p>
          <p className="score">0</p>
        </div>
        <button
          className="reset-button"
          onClick={() => {
            //this.resetGame();
          }}
        >
          Reset All
        </button>
      </div>
    );
  };

  render() {
    let { multiplayer, player1 } = this.state;
    return (
      <div className="App">
        <div className="container">
          {multiplayer === null || player1 === null ? null : this.showScore()}
          <div className="game-container">
            {this.showCells()}
            {multiplayer === null ? this.showPlayerSelector() : null}
            {multiplayer !== null && player1 === null
              ? this.showSymbolSelector()
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
