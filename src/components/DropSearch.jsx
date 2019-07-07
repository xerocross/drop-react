import React, { Component } from "react";
import DropList from "./DropList";

export default class DropSearch extends Component {
    get selectedDrops () {
        return this.props.getSelectedDrops(this.props.drops, this.props.hashTags);
    }
    render () {
        return (
            <div className = "drop-search">
                <DropList 
                    drops = {this.selectedDrops}
                    deleteDrop = {this.props.deleteDrop}
                    isSyncing = {this.props.isSyncing}
                />
            </div>
        )
    }
}