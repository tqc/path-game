import { connect } from 'react-redux'
import { newGame, resetLevel } from './store'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    level: state.level
  }),
  dispatch => ({
    resetLevel: id => dispatch(resetLevel(id)),
    newGame: id => dispatch(newGame(id))
  })
)(GameMenu);