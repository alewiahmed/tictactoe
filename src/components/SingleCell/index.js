import React, { Component } from 'react';

class SingleCell extends Component {
  render() {
    return (
      <div>
        <div>{this.props.value}</div>
      </div>
    );
  }
}

export default SingleCell;
