import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './GameBoard';
import GameMenu from './GameMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
          <GameBoard />
          <GameMenu />
      </div>
    );
  }
}

export default App;
