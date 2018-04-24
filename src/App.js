import React, { Component } from 'react';
import './App.css';

import SingleCell from './components/SingleCell/';

class App extends Component {
  state = {
    player1: null,
    player2: null,
    player1Score: 0,
    player2Score: 0,
    player1Cells: [],
    player2Cells: [],
    multiplayer: null,
    currentTurn: null,
    gameFinishMessage: '',
    cells: [
      { value: '', win: false },
      { value: '', win: false },
      { value: '', win: false },
      { value: '', win: false },
      { value: '', win: false },
      { value: '', win: false },
      { value: '', win: false },
      { value: '', win: false },
      { value: '', win: false }
    ],
    magicSquares: [8, 1, 6, 3, 5, 7, 4, 9, 2]
  };

  componentDidUpdate = (prevProps, prevState) => {
    let { currentTurn: prevTurn } = prevState;
    let { currentTurn, cells } = this.state;
    let pushed = cells.filter(cell => {
      return cell.value !== '';
    }).length;
    if (
      prevTurn !== null &&
      currentTurn !== null &&
      prevTurn !== currentTurn &&
      pushed >= 5
    ) {
      this.checkGame();
    }
  };

  checkGame = () => {
    let { player1Cells, player2Cells, currentTurn } = this.state;
    let player = currentTurn === 'player1' ? 'player2' : 'player1';
    let arr = player === 'player1' ? player1Cells : player2Cells;
    let winners = [];
    for (var i = 0; i < arr.length - 2; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        for (var k = j + 1; k < arr.length; k++) {
          if (arr[i].value + arr[j].value + arr[k].value === 15) {
            winners.push(arr[i].id, arr[j].id, arr[k].id);
            break;
          }
        }
        if (winners.length) break;
      }
      if (winners.length) break;
    }
    if (
      player1Cells.length + player2Cells.length === 9 &&
      winners.length == 0
    ) {
      this.setState({
        gameFinishMessage: 'It was a draw..'
      });
    }
    if (!winners.length) return;
    this.setState(state => {
      if (!state.multiplayer) {
        state.gameFinishMessage =
          player === 'player1' ? 'Omg, you won!!!' : 'Uh oh, you lost..';
      } else {
        state.gameFinishMessage =
          player === 'player1' ? 'Player 1 wins!! :D' : 'Player 2 wins!! :D';
      }
      state[`${player}Score`]++;
      state.currentTurn = player;
      winners.forEach(value => (state.cells[value].won = true));
      return state;
    });
  };

  nextPlayer = () => {
    let { currentTurn } = this.state;
    if (!currentTurn) {
      currentTurn = Math.floor(Math.random() * 2) === 1 ? 'player2' : 'player1';
      this.setState({
        currentTurn
      });
      return;
    }
    this.setState(state => {
      state.currentTurn =
        state.currentTurn === 'player1' ? 'player2' : 'player1';
      return state;
    });
  };

  startGame = () => {
    this.nextPlayer();
  };

  selectCell = id => {
    let { cells } = this.state;
    if (cells[id].value !== '') return;
    this.setState(state => {
      let { currentTurn, magicSquares } = state;
      state.cells[id].value = state[state.currentTurn];
      currentTurn === 'player1'
        ? state.player1Cells.push({ id, value: magicSquares[id] })
        : state.player2Cells.push({ id, value: magicSquares[id] });
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
          won={cells[index].won}
          value={cells[index].value}
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
    this.setState(state => {
      state.player1 = symbol;
      state.player2 = symbol === 'X' ? 'O' : 'X';
    }, this.startGame);
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
    let { player1Score, player2Score, multiplayer, currentTurn } = this.state;
    let player1Class =
      currentTurn === 'player1' ? 'single-score current-turn' : 'single-score';
    let player2Class =
      currentTurn === 'player2' ? 'single-score current-turn' : 'single-score';
    return (
      <div className="score-container">
        <div className={player1Class}>
          <p className="player-text">Player one</p>
          <p className="score">{player1Score}</p>
        </div>
        <div className={player2Class}>
          <p className="player-text">
            {multiplayer ? 'Player Two' : 'Computer'}
          </p>
          <p className="score">{player2Score}</p>
        </div>
        <button
          className="reset-button"
          onClick={() => {
            this.resetEverything();
          }}
        >
          Reset All
        </button>
      </div>
    );
  };

  showGameMessage = () => {
    let { gameFinishMessage } = this.state;
    if (!gameFinishMessage) return null;
    setTimeout(() => {
      this.resetGame();
    }, 2000);
    return (
      <div className="overlay">
        <div className="result-container">
          <p className="result-text">{gameFinishMessage}</p>
        </div>
      </div>
    );
  };

  resetGame = () => {
    this.setState({
      player1Cells: [],
      player2Cells: [],
      gameFinishMessage: '',
      cells: [
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false }
      ]
    });
  };

  resetEverything = () => {
    this.setState({
      player1: null,
      player2: null,
      player1Score: 0,
      player2Score: 0,
      player1Cells: [],
      player2Cells: [],
      multiplayer: null,
      currentTurn: null,
      gameFinishMessage: '',
      cells: [
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false },
        { value: '', win: false }
      ]
    });
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
            {this.showGameMessage()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
