import React, { Component } from 'react';

import styles from './styles.js';

class SingleCell extends Component {
  render() {
    let { borderRight, borderBottom, onClick, value, id } = this.props;
    borderRight = borderRight ? styles.borderRight : {};
    borderBottom = borderBottom ? styles.borderBottom : {};
    return (
      <div
        style={{ ...styles.cell, ...borderRight, ...borderBottom }}
        onClick={() => (onClick ? onClick(id) : null)}
      >
        <div style={styles.text}>{value}</div>
      </div>
    );
  }
}

export default SingleCell;
