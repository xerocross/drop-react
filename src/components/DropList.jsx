import React, { Component } from "react";
import DropDisplay from "./DropDisplay";
import DropListInner from "./DropListInner.jsx";
import "./DropList.scss";

export default class DropList extends Component {
    render () {
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
                    isCanDelete = {this.props.isCanDelete}
                />
            </div>
        )
    }
}