import React, { Component } from "react";
import DropList from "./DropList";

export default class DropSearch extends Component {
    render () {
        return (
            <div className = "drop-search"
                data-testid = "drop-search"
            >
                <DropList 
                    drops = {this.props.selectedDrops}
                    deleteDrop = {this.props.deleteDrop}
                    isSyncing = {this.props.isSyncing}
                />
            </div>
        )
    }
}