import { connect } from 'react-redux'
import { newGame, visitVertex } from './store'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TileView from './TileView';
import EdgeView from './EdgeView';
import VertexView from './VertexView';

class GameBoard extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    let {level, visitVertex} = this.props;
    //console.log(e);
    //console.log(e.nativeEvent);
    let x = (e.nativeEvent.clientX - this.div.offsetLeft);
    let y = (e.nativeEvent.clientY - this.div.offsetTop);

    // find nearest vertex

    let col = Math.round(x/60) -1;
    let row = Math.round(y/60) -1;
    console.log(x+", "+y+" => "+col+", "+row)

    if (col >= 0 && row >= 0 && row <= level.rows && col <= level.cols) {
      let vertexId =row*(level.cols+1)+col;
      visitVertex(vertexId);
    }

  }
  render() {
    let {level} = this.props;
    if (!level || !level.tiles || ! level.tiles[0]) {
      return (
        <div className="board">
          No game loaded;
        </div>
        )
    }
    else if (level.completed && !level.won) {
      return (
        <div className="board">
          Failed
        </div>
      )
    }
    else if (level.completed && level.won) {
      return (
        <div className="board">
          You win
        </div>
        )
    }
    else {
      return (
        <div className="board" ref={e => (this.div = e)} onClick={this.onClick}>
          {level.name}
          {level.tiles.map((t, i)=>(<TileView
            tile={t}
            tileState={level.tileState[i]}
            tileSize={50}
            edgeSize={10} />))}
          {level.edges.map((e, i)=>(<EdgeView
            edge={e}
            edgeId={i}
            edgeState={level.edgeState[i]}
            tileSize={50}
            edgeSize={10} />))}
          {level.vertices.map((v, i)=>(<VertexView
            vertex={v}
            vertexId={i}
            vertexState={level.vertexState[i]}
            tileSize={50}
            edgeSize={10} />))}
        </div>
      );
    }
  }
}

GameBoard.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default connect(
  state => ({
    level: state.level,
  }),
  dispatch => ({
    newGame: id => dispatch(newGame(id)),
    visitVertex: id => dispatch(visitVertex(id))
  })
)(GameBoard);