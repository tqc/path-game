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
                <textarea
                    value={tileSpec.description}
                    onChange={(e) => {
                        updateTileDescription(e.target.value);
                    }}
                    placeholder="Tap to edit when you know the rules"
                />
            </div>
        );
    }
}

class RulesPage extends Component {
    render() {
        let {hideRules, visible, progress, updateTileDescription} = this.props;
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

                    {progress.tileTypes.map((tileSpec, i) => (
                        <TileDescription
                            key={i}
                            tileSpec={tileSpec}
                            updateTileDescription={(description) => updateTileDescription(i, description)}
                        />
                    ))}

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
    hideRules: PropTypes.func.isRequired,
    updateTileDescription: PropTypes.func.isRequired
};

export default connect(
    state => ({
        progress: state.progress,
        visible: state.rulesShown
    }),
    dispatch => ({
        hideRules: id => dispatch(Actions.hideRules(id)),
        updateTileDescription: (id, description) => dispatch(Actions.updateTileDescription(id, description))
    })
)(RulesPage);