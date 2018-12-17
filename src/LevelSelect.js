import { connect } from 'react-redux';
import * as Actions from './actions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TileDescription extends Component {
    static propTypes = {
        progress: PropTypes.shape({
        }),
        setCurrentDifficulty: PropTypes.func.isRequired
    }
    render() {
        let {tileSpec, setCurrentDifficulty, difficulty, selected} = this.props;
        return (
            <div class={"rulesrow" + (selected ? " selected": "")} onClick={() => setCurrentDifficulty(difficulty)}>
            <div class={"tile symbol symbol-" + tileSpec.symbol} ></div>
            Level {difficulty}
            </div>
        )
    }
}

class UnlockRow extends Component {
    static propTypes = {
        progress: PropTypes.shape({
        }),
    }
    render() {
        let {progress} = this.props;
        if (progress.winsToNextUnlock <= 0) return null;

        return (
            <div className={"rulesrow"}>
                <div className={"tile symbol symbol-lock"} ></div>
                    Win {progress.winsToNextUnlock} more games on level {progress.maxDifficulty} to unlock
            </div>
        );
    }
}


class LevelSelect extends Component {
    render() {
        let {hideLevelSelect, setCurrentDifficulty, visible, progress} = this.props;
        return (
            <div className={"modalpage " + (visible ? "visible" : "hidden")}>
                <div className="contentbox">
                    <h1>Select a level</h1>
                    {progress.tileTypes.map((tileSpec, i) => (<TileDescription key={i} selected={progress.currentDifficulty===i+1} difficulty={i+1} tileSpec={tileSpec} setCurrentDifficulty={setCurrentDifficulty} />))}
                    <UnlockRow progress={progress} />
                </div>
            </div>
        );
    }
}

LevelSelect.propTypes = {
    progress: PropTypes.shape({
    }),
    visible: PropTypes.bool.isRequired,
    hideLevelSelect: PropTypes.func.isRequired
};

export default connect(
    state => ({
        progress: state.progress,
        visible: state.levelSelectShown
    }),
    dispatch => ({
        setCurrentDifficulty: val => dispatch(Actions.setCurrentDifficulty(val)),
        hideLevelSelect: id => dispatch(Actions.hideLevelSelect(id))
    })
)(LevelSelect);