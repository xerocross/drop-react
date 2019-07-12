import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import MainTextInput from "./MainTextInput";
import DropSearch from "./DropSearch";
import UnsavedDrops from "./UnsavedDrops.jsx";

export default class MainDumbViewLayer extends BaseComponent {
    constructor (props) {
        super(props);
        this.updateDroptext = this.updateDroptext.bind(this);
        this.bindOwn(["updateDroptext", "createDrop", "deleteDrop", "dropDrop"]);
    }

    updateDroptext (droptext) {
        this.props.updateDroptext(droptext);
    }

    createDrop (drop) {
        this.props.createDrop(drop);
    }

    deleteDrop (drop) {
        this.props.deleteDrop(drop);
    }

    dropDrop () {
        this.createDrop(this.props.droptext);
    }

    render () {
        return (
            <div className="drop-main" data-testid="MainDumbViewLayer">
                <div>
                    <MainTextInput 
                        dropDrop = {this.dropDrop}
                        updateDroptext = {this.updateDroptext}
                        hashtags = {this.props.hashtags}
                        droptext = {this.props.droptext}
                    />
                    <DropSearch 
                        deleteDrop = {this.deleteDrop}
                        hashtags = {this.props.hashtags}
                        isSyncing = {this.props.isSyncing}
                        selectedDrops = {this.props.selectedDrops}
                    />
                </div>
                { this.props.unsavedDrops.length > 0 &&
                    <UnsavedDrops 
                        unsavedDrops = {this.props.unsavedDrops}
                        trySaveUnsavedDrops = {this.props.trySaveUnsavedDrops}
                    />
                }
            </div>
        );
    }
}