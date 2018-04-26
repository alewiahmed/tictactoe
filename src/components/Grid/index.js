import React, { Component } from 'react';

import styles from './styles';

export default class Grid extends Component {
  componentDidMount = () => {
    this.createGrid();
  };

  createGrid = () => {
    let ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = '#dedede';
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 400);
    ctx.stroke();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 400);
    ctx.stroke();
    ctx.moveTo(0, 50.5);
    ctx.lineTo(300, 50.5);
    ctx.stroke();
    ctx.moveTo(0, 100.5);
    ctx.lineTo(300, 100.5);
    ctx.stroke();
  };

  render() {
    return (
      <canvas
        id="gridCanvas"
        style={styles.canvas}
        ref={r => (this.canvas = r)}
      />
    );
  }
}
