import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TileView extends Component {
  render() {
    let {tile, tileState, tileSize, edgeSize} = this.props;
    let classes = ["tile", tile.tileType, tileState.valid ? " valid" : " invalid"];
    if (tile.symbol) {
      classes.push("symbol");
      classes.push("symbol-" + tile.symbol);
    }
    return (
      <div className={classes.join(" ")} style={{
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
    tileType: PropTypes.string.isRequired,
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
  }).isRequired,
  tileState: PropTypes.shape({
    valid: PropTypes.bool.isRequired,
  }).isRequired,
  tileSize: PropTypes.number.isRequired,
  edgeSize: PropTypes.number.isRequired,
};


export default TileView;