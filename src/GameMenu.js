import { connect } from 'react-redux';
import * as Actions from './actions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameMenu extends Component {
    render() {
        let {newGame, resetLevel} = this.props;
        return (
            <div className="menu">
                <button onClick={() => newGame()}>New Game</button>
                <button onClick={() => resetLevel()}>Retry</button>
            </div>
        );
    }
}

GameMenu.propTypes = {
    level: PropTypes.shape({
    }),
    resetLevel: PropTypes.func.isRequired,
    newGame: PropTypes.func.isRequired
};

export default connect(
    state => ({
        level: state.level
    }),
    dispatch => ({
        resetLevel: id => dispatch(Actions.resetLevel(id)),
        newGame: id => dispatch(Actions.newGame(id))
    })
)(GameMenu);