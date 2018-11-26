import React, { Component } from 'react';
import './App.css';
import GameContainer from './GameContainer';
import GameMenu from './GameMenu';

class App extends Component {
    render() {
        return (
            <div className="App">
                <GameContainer />
                <GameMenu />
            </div>
        );
    }
}

export default App;
