import React, { Component } from "react";
import "./WorkingBar.scss";

export default class WorkingBar extends Component {
    render() {
        return (
            <div className="working-bar">
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