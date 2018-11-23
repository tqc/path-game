import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TileView extends Component {
  render() {
    let {tile, tileState, tileSize, edgeSize} = this.props;
    return (
      <div className={'tile ' + (tile.tileType || "") + (tileState.valid ? " valid" : " invalid")} style={{
        width: tileSize,
        height: tileSize,
        left: (tile.x1 * (tileSize + edgeSize)),
        top: (tile.y1 * (tileSize + edgeSize)),
        color: tile.color || "black"
      }}>

      </div>
    );
  }
}

TileView.propTypes = {
  tile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  tileState: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}

export default TileView