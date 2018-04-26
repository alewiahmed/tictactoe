import React, { Component } from 'react';

import styles from './styles';

export default class Grid extends Component {
  componentDidMount = () => {
    this.createGrid();
  };

  createGrid = () => {
    let ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = '#dedede';
    ctx.lineWidth = 1;
    ctx.moveTo(99, 1);
    ctx.lineTo(99, 149);
    ctx.stroke();
    ctx.moveTo(201, 1);
    ctx.lineTo(201, 149);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.moveTo(0, 49.5);
    ctx.lineTo(300, 49.5);
    ctx.stroke();
    ctx.moveTo(0, 99.5);
    ctx.lineTo(300, 99.5);
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
