import { connect } from 'react-redux';
import * as Actions from './actions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameMenu extends Component {
    render() {
        let {newGame, resetLevel, showLevelSelect, showRules, progress} = this.props;
        return (
            <div className="menu">
                <button onClick={() => newGame()}>New Game</button>
                <button onClick={() => resetLevel()}>Retry</button>
                <button onClick={() => showLevelSelect()}>Level {progress.currentDifficulty}</button>
                <button onClick={() => showRules()}>Rules</button>
            </div>
        );
    }
}

GameMenu.propTypes = {
    level: PropTypes.shape({
    }),
    progress: PropTypes.shape({
    }),
    resetLevel: PropTypes.func.isRequired,
    newGame: PropTypes.func.isRequired,
    showRules: PropTypes.func.isRequired,
    showLevelSelect: PropTypes.func.isRequired
};

export default connect(
    state => ({
        progress: state.progress,
        level: state.level
    }),
    dispatch => ({
        resetLevel: id => dispatch(Actions.resetLevel(id)),
        newGame: id => dispatch(Actions.newGame(id)),
        showLevelSelect: id => dispatch(Actions.showLevelSelect(id)),
        showRules: id => dispatch(Actions.showRules(id)),
    })
)(GameMenu);