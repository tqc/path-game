import { connect } from 'react-redux'
import { newGame, resetLevel, visitVertex } from './store'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GameBoard from './GameBoard';

class GameContainer extends Component {
  constructor() {
    super();
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.level || !props.level) {
      return {
          nextLevel: null,
          level: props.level,
          prevLevel: null
      };
    }

    if (state.level && props.level && state.level.levelId != props.level.levelId) {
      // resetting to new level
      console.log("resetting");
      return {
        nextLevel: props.level,
        level: null,
        prevLevel: state.level
      };
    }

    if (!state.level.completed && props.level.completed) {
      if (props.level.won) {
        setTimeout(()=>props.newGame(), 500);
      }
      else {
        setTimeout(()=>props.resetLevel(), 1000);
      }
    }

    return {
        nextLevel: null,
        level: props.level,
        prevLevel: null
    };
  }

  render() {
    let {level, prevLevel, nextLevel} = this.state;

    return (
      <div className="boardcontainer" ref={e => (this.div = e)} onClick={this.onClick}>
        {(prevLevel ? (<div className="prevLevel"><GameBoard level={prevLevel} /></div>) : null)}
        {(level ? (<div className="currentLevel"><GameBoard level={level} /></div>) : null)}
        {(nextLevel ? (<div className="nextLevel"><GameBoard level={nextLevel} /></div>) : null)}

      </div>
    );

  }
}

GameContainer.propTypes = {
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
    level: state.level,
  }),
  dispatch => ({
    resetLevel: id => dispatch(resetLevel(id)),
    newGame: id => dispatch(newGame(id)),
    visitVertex: id => dispatch(visitVertex(id))
  })
)(GameContainer);