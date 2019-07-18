import React from "react";
import BaseComponent from "./BaseComponent";
import { LOGOUT } from "../actions.js";
import { connect } from "react-redux";
import "./TopMenu.scss";

class TopMenu extends BaseComponent {
    render () {
        return (
            <div className = "TopMenu" data-testid = "TopMenu">
                <button
                    className = "unstyled-button menu-item"
                    onClick = {this.props.LOGOUT}
                    data-testid = "logout-button"
                >logout</button>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    drops : state.drops,
    isSyncing : state.isSyncing
})
const mapDispatchToProps = {
    LOGOUT
}
export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);