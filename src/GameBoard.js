import { connect } from 'react-redux';
import * as Actions from './actions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TileView from './TileView';
import EdgeView from './EdgeView';
import VertexView from './VertexView';

export class GameBoard extends Component {
    constructor() {
        super();
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.state = {};
        this.dragging = false;
    }
    componentDidMount() {
        if (this.div) {
            this.div.addEventListener("touchstart", this.onMouseDown);
            this.div.addEventListener("touchmove", this.onMouseMove, {passive: false});
            this.div.addEventListener("touchend", this.onMouseUp);
        }
    }
    onMouseDown(e) {
        this.dragging = true;
    }
    onMouseMove(e) {
        if (!this.dragging) return;
        let {level, visitVertex, tileSize, edgeSize} = this.props;
        let position, target;
        if (e.targetTouches) {
            position = e.targetTouches[0];
            target = e.target;
            e.preventDefault();
        }
        else {
            position = e.nativeEvent;
            target = e.nativeEvent.target;
        }
        if (!position || !target) return;

        let x = (position.clientX - target.offsetLeft);
        let y = (position.clientY - target.offsetTop);

        // find nearest vertex

        let col = Math.round(x / (tileSize + edgeSize)) - 1;
        let row = Math.round(y / (tileSize + edgeSize)) - 1;
        console.log(x + ", " + y + " => " + col + ", " + row);

        if (col >= 0 && row >= 0 && row <= level.rows && col <= level.cols) {
            let vertexId = row * (level.cols + 1) + col;
            visitVertex(vertexId);
        }
    }
    onMouseUp(e) {
        if (!this.dragging) return;
        this.dragging = false;
        let {level, visitVertex, tileSize, edgeSize} = this.props;

        let position, target;
        if (e.targetTouches) {
            position = e.targetTouches[0];
            target = e.target;
        }
        else {
            position = e.nativeEvent;
            target = e.nativeEvent.target;
        }
        if (!position || !target) return;

        let x = (position.clientX - target.offsetLeft);
        let y = (position.clientY - target.offsetTop);

        // find nearest vertex

        let col = Math.round(x / (tileSize + edgeSize)) - 1;
        let row = Math.round(y / (tileSize + edgeSize)) - 1;
        console.log(x + ", " + y + " => " + col + ", " + row);

        if (col >= 0 && row >= 0 && row <= level.rows && col <= level.cols) {
            let vertexId = row * (level.cols + 1) + col;
            visitVertex(vertexId);
        }
    }
    render() {
        let {level, tileSize, edgeSize, boardSize, vMargin, hMargin} = this.props;
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

                    </div>
                );
            }
            else if (level.completed && level.won) {
                overlay = (
                    <div className="boardOverlay">

                    </div>
                );
            }
            return (
                <div
                    className={"board " + (level.completed ? " completed" : "") + (level.won ? " won" : "") }
                    ref={e => (this.div = e)}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseUp={this.onMouseUp}
                    style={{
                        marginTop: vMargin,
                        marginBottom: vMargin,
                        marginLeft: hMargin,
                        marginRight: hMargin,
                        width: boardSize,
                        height: boardSize
                    }}
                >
                    {level.tiles.map((t, i) => (<TileView
                        key={i}
                        tile={t}
                        tileState={level.tileState[i]}
                        tileSize={tileSize}
                        edgeSize={edgeSize} />))}
                    {level.edges.map((e, i) => (<EdgeView
                        key={i}
                        edge={e}
                        edgeId={i}
                        edgeState={level.edgeState[i]}
                        tileSize={tileSize}
                        edgeSize={edgeSize} />))}
                    {level.vertices.map((v, i) => (<VertexView
                        key={i}
                        vertex={v}
                        vertexId={i}
                        vertexState={level.vertexState[i]}
                        tileSize={tileSize}
                        edgeSize={edgeSize} />))}
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
    tileSize: PropTypes.number.isRequired,
    edgeSize: PropTypes.number.isRequired,
    boardSize: PropTypes.number.isRequired
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
