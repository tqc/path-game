import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EdgeView extends Component {
  render() {
    let {edge, edgeId, edgeState, tileSize, edgeSize} = this.props;
    if (edge.x1 == edge.x2) {
      // vertical
      return (
        <div className={"edge" + (edgeState.visited ? " visited" : "")} style={{
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
        <div className={"edge" + (edgeState.visited ? " visited" : "")} style={{
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
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  edgeState: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}

export default EdgeView