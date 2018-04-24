import React, { Component } from 'react';

import styles from './styles.js';

class SingleCell extends Component {
  render() {
    let { borderRight, borderBottom, onClick, value, id, won } = this.props;
    borderRight = borderRight ? styles.borderRight : {};
    borderBottom = borderBottom ? styles.borderBottom : {};
    won = won ? styles.won : {};
    return (
      <div
        style={{ ...styles.cell, ...borderRight, ...borderBottom, ...won }}
        onClick={() => (onClick ? onClick(id) : null)}
      >
        <div style={styles.text}>{value}</div>
      </div>
    );
  }
}

export default SingleCell;
