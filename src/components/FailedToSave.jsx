import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import DropList from "./DropList.jsx";
import PropTypes from "prop-types";
import "./FailedToSave.scss";
let noop = () => {};

class FailedToSave extends BaseComponent {
    render () {
        return (
            <div className = "FailedToSave"
                data-testid = "FailedToSave"
            >
                <div>
                    <label>failed to save the entries below to the database</label>
                </div>
                <p className = "info">
                    We tried <em>several</em> times to save these to the server, but every attempt failed.  Maybe try again when the Internet is working.
                </p>
                <div className="try-again-button-div">
                    <button 
                        onClick = {this.props.tryAgainSave}
                        data-testid="try-again-button"
                        className = "try-again-button button"
                        disabled = {this.props.isSyncing}
                    >
                            try saving again
                    </button>
                </div>
                <DropList 
                    drops = {this.props.drops}
                    deleteDrop = {noop}
                    isSyncing = {this.props.isSyncing}
                    isCanDelete = {false}
                />
            </div>
        )
    }
}
FailedToSave.propTypes = {
    drops: PropTypes.array.isRequired,
    isSyncing: PropTypes.bool.isRequired,
    tryAgainSave: PropTypes.func
}
export default FailedToSave;
