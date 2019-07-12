import React, { Component } from "react";
import DropDisplay from "./DropDisplay";
import DropListInner from "./DropListInner.jsx";
import "./DropList.scss";

export default class DropList extends Component {
    render() {
        if (!this.props.drops) {
            console.log("props.drops was not defined");
            console.log(this.props);
            throw new Error("drops not defined");
        }
        return (
            <div className = "drop-list"
                data-testid="drop-list"
            >
                {this.props.isSyncing && 
                    <div className = "syncing-bar"></div>
                }
                <DropListInner
                    drops = {this.props.drops}
                    deleteDrop = {this.props.deleteDrop}
                />
            </div>
        )
    }
}