import React, { Component } from 'react';
import './App.css';
import GameContainer from './GameContainer';
import GameMenu from './GameMenu';
import RulesPage from './RulesPage';
import LevelSelect from './LevelSelect';

class App extends Component {
    render() {
        return (
            <div className="App" style={{
            }}>
                <h1>Path Game</h1>
                <GameContainer />
                <GameMenu />
                <RulesPage />
                <LevelSelect />
            </div>
        );
    }
}

export default App;
