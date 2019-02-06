import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import * as Actions from './actions';
import GameContainer from './GameContainer';
import GameMenu from './GameMenu';
import RulesPage from './RulesPage';
import LevelSelect from './LevelSelect';

class App extends Component {
    componentDidMount() {
        let {progress, loadProgress} = this.props;
        if (!progress) {
            loadProgress();
        }
    }
    render() {
        let {progress} = this.props;

        if (!progress) return null;
        return (
            <div className="App" style={{
            }}>
                <GameContainer />
                <GameMenu />
                <RulesPage />
                <LevelSelect />
            </div>
        );
    }
}

export default connect(
    state => ({
        progress: state.progress,
    }),
    dispatch => ({
        loadProgress: id => dispatch(Actions.loadProgress(id))
    })
)(App);
