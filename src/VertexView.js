import React, { Component } from 'react'
import PropTypes from 'prop-types'

class VertexView extends Component {
  render() {
    let {vertex, vertexId, vertexState, tileSize, edgeSize} = this.props;
    if (vertex.vertexType == "entry") {
    return (
      <div className={'vertex ' + (vertex.vertexType || "") + (vertexState.visited ? " visited" : "")} style={{
        width: edgeSize*3,
        height: edgeSize*3,
        left: (vertex.x * (tileSize + edgeSize) - edgeSize - edgeSize),
        top: (vertex.y * (tileSize + edgeSize) - edgeSize - edgeSize)
      }}>
      </div>
    );
    }
    else if (vertex.vertexType == "exit") {
    return (
      <div className={'vertex ' + (vertex.vertexType || "") + (vertexState.visited ? " visited" : "")} style={{
        width: edgeSize*3,
        height: edgeSize*3,
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
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  vertexState: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}

export default VertexView