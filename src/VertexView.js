import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VertexView extends Component {
  render() {
    let {vertex, vertexState, tileSize, edgeSize} = this.props;
    if (vertex.vertexType === "entry") {
      return (
        <div className={'vertex ' + (vertex.vertexType || "") + (vertexState.visited ? " visited" : "")} style={{
          width: edgeSize * 3,
          height: edgeSize * 3,
          left: (vertex.x * (tileSize + edgeSize) - edgeSize - edgeSize),
          top: (vertex.y * (tileSize + edgeSize) - edgeSize - edgeSize)
        }}>
        </div>
      );
    }
    else if (vertex.vertexType === "exit") {
      return (
        <div className={'vertex ' + (vertex.vertexType || "") + (vertexState.visited ? " visited" : "")} style={{
          width: edgeSize * 3,
          height: edgeSize * 3,
          left: (vertex.x * (tileSize + edgeSize) - edgeSize - edgeSize),
          top: (vertex.y * (tileSize + edgeSize) - edgeSize - edgeSize)
        }}>
        </div>
      );
    }
    else {
      return (
        <div className={'vertex ' + (vertex.vertexType || "") + (vertexState.visited ? " visited" : "")} style={{
          width: edgeSize,
          height: edgeSize,
          left: (vertex.x * (tileSize + edgeSize) - edgeSize),
          top: (vertex.y * (tileSize + edgeSize) - edgeSize)
        }}>

        </div>
      );
    }

  }
}

VertexView.propTypes = {
  vertex: PropTypes.shape({
    vertexType: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  tileSize: PropTypes.number.isRequired,
  edgeSize: PropTypes.number.isRequired,
  vertexState: PropTypes.shape({
    visited: PropTypes.bool.isRequired
  }).isRequired
};

export default VertexView;