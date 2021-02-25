import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EdgeView extends Component {
  render() {
    let {edge, edgeState, tileSize, edgeSize} = this.props;
    if (edge.x1 === edge.x2) {
      // vertical
      return (
        <div className={"edge vertical" + (edgeState.visited ? " visited" : "") + (edge.broken ? " broken" : "")} style={{
          width: edgeSize,
          height: tileSize,
          left: (edge.x1 * (tileSize + edgeSize) - edgeSize),
          top: (edge.y1 * (tileSize + edgeSize))
        }}>
        </div>
      );
    }
    else {
      return (
        <div className={"edge horizontal" + (edgeState.visited ? " visited" : "") + (edge.broken ? " broken" : "")} style={{
          width: tileSize,
          height: edgeSize,
          left: (edge.x1 * (tileSize + edgeSize)),
          top: (edge.y1 * (tileSize + edgeSize) - edgeSize)
        }}>
        </div>
      );
    }
  }
}

EdgeView.propTypes = {
  edge: PropTypes.shape({
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    broken: PropTypes.bool.isRequired,
  }).isRequired,
  tileSize: PropTypes.number.isRequired,
  edgeSize: PropTypes.number.isRequired,
  edgeState: PropTypes.shape({
    visited: PropTypes.bool.isRequired
  }).isRequired
};

export default EdgeView;