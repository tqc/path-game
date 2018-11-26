import { connect } from 'react-redux';
import * as Actions from './actions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TileView from './TileView';
import EdgeView from './EdgeView';
import VertexView from './VertexView';

class GameBoard extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.state = {};
    }
    onClick(e) {
        let {level, visitVertex} = this.props;
        //console.log(e);
        //console.log(e.nativeEvent);
        let x = (e.nativeEvent.clientX - this.div.offsetLeft);
        let y = (e.nativeEvent.clientY - this.div.offsetTop);

        // find nearest vertex

        let col = Math.round(x / 60) - 1;
        let row = Math.round(y / 60) - 1;
        console.log(x + ", " + y + " => " + col + ", " + row);

        if (col >= 0 && row >= 0 && row <= level.rows && col <= level.cols) {
            let vertexId = row * (level.cols + 1) + col;
            visitVertex(vertexId);
        }

    }


    render() {
        let {level} = this.props;
        if (!level || !level.tiles || !level.tiles[0]) {
            return (
                <div className="board">
          No game loaded;
                </div>
            );
        }
        else {
            let overlay = null;
            if (level.completed && !level.won) {
                overlay = (
                    <div className="boardOverlay">
            Failed
                    </div>
                );
            }
            else if (level.completed && level.won) {
                overlay = (
                    <div className="boardOverlay">
            You win
                    </div>
                );
            }
            return (
                <div className={"board " + (level.completed ? " completed" : "") + (level.won ? " won" : "") } ref={e => (this.div = e)} onClick={this.onClick}>

                    {level.tiles.map((t, i) => (<TileView
                        key={i}
                        tile={t}
                        tileState={level.tileState[i]}
                        tileSize={50}
                        edgeSize={10} />))}
                    {level.edges.map((e, i) => (<EdgeView
                        key={i}
                        edge={e}
                        edgeId={i}
                        edgeState={level.edgeState[i]}
                        tileSize={50}
                        edgeSize={10} />))}
                    {level.vertices.map((v, i) => (<VertexView
                        key={i}
                        vertex={v}
                        vertexId={i}
                        vertexState={level.vertexState[i]}
                        tileSize={50}
                        edgeSize={10} />))}
                    {overlay}
                </div>
            );
        }
    }
}

GameBoard.propTypes = {
    level: PropTypes.shape({

    }).isRequired,
    resetLevel: PropTypes.func.isRequired,
    newGame: PropTypes.func.isRequired,
    visitVertex: PropTypes.func.isRequired,
};

export default connect(
    state => ({
        // level: state.level,
    }),
    dispatch => ({
        resetLevel: id => dispatch(Actions.resetLevel(id)),
        newGame: id => dispatch(Actions.newGame(id)),
        visitVertex: id => dispatch(Actions.visitVertex(id))
    })
)(GameBoard);