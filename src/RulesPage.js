import { connect } from 'react-redux';
import * as Actions from './actions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TileDescription extends Component {
    static propTypes = {
        tileSpec: PropTypes.shape({
        }),
        updateTileDescription: PropTypes.func.isRequired
    }
    render() {
        let {tileSpec, updateTileDescription} = this.props;
        return (
            <div className="rulesrow">
                <div className={"tile symbol symbol-" + tileSpec.symbol} ></div>
            {tileSpec.description}
            </div>
        )
    }
}

class RulesPage extends Component {
    render() {
        let {hideRules, visible, progress} = this.props;
        return (
            <div className={"modalpage " + (visible ? "visible" : "hidden")}>
                <div className="contentbox">
                    <h1>Rules</h1>
                    <p style={{
                        maxWidth: 550,
                        margin: "auto",
                        marginBottom: 50
                    }}>
                        Draw a line from the start to the finish, separating the board into regions matching
                        the tile rules below.
                    </p>

                    {progress.tileTypes.map((tileSpec, i) => (<TileDescription key={i} tileSpec={tileSpec} />))}

                    <button className="donebutton" onClick={() => hideRules()}>Done</button>
                </div>
            </div>
        );
    }
}

RulesPage.propTypes = {
    progress: PropTypes.shape({
    }),
    visible: PropTypes.bool.isRequired,
    hideRules: PropTypes.func.isRequired
};

export default connect(
    state => ({
        progress: state.progress,
        visible: state.rulesShown
    }),
    dispatch => ({
        hideRules: id => dispatch(Actions.hideRules(id))
    })
)(RulesPage);