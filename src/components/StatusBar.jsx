import React, { Component } from "react";
import "./StatusBar.scss";

export default class StatusBar extends Component {
    render () {
        return (
            <div className="status-bar" data-testid = "StatusBar">
                {
                    this.props.statusMessages.map((statusObj) => {
                        return (
                            <div className="statusItem" key = {statusObj.key}>
                                {statusObj.text}
                            </div>
                        )
                    })
            
                }
            </div>
        )
    }
}