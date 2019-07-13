import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import MainDumbViewLayer from "./MainDumbViewLayer.jsx";
import DropNote from "../helpers/DropNote.js";
import {NEW_DROPTEXT, TRY_SAVE_UNSAVED_DROPS} from  "../actions.js";
import { connect } from "react-redux";

class DropBusinessLogicLayer extends BaseComponent {
    constructor (props) {
        super(props);
        this.bindOwn(["updateDroptext", "createDrop", "deleteDrop", "trySaveUnsavedDrops"]);

    }

    updateDroptext (text) {
        this.props.NEW_DROPTEXT(text);
    }

    deleteDrop (drop) {
        this.props.deleteDrop(drop);
    }

    trySaveUnsavedDrops () {
        this.props.TRY_SAVE_UNSAVED_DROPS();
    }

    createDrop (text) {
        if (!text) {
            this.props.appAlert("Please add text to drop.");
            return false;
        } else if (!this.props.username) {
            this.log("create drop was called without username set; this should not occur;");
            this.props.appAlert("Please select a username-password.");
            return false;
        } else {
            let drop = new DropNote(text, this.props.username);
            this.props.createDrop(drop);
            return true;
        }
    }

    render () {
        return (
            <div className="drop-main">
                <MainDumbViewLayer 
                    unsavedDrops = {this.props.unsavedDrops}
                    droptext = {this.props.droptext}
                    updateDroptext = {this.updateDroptext}
                    selectedDrops = {this.props.selectedDrops}
                    drops = {this.props.drops}
                    isSyncing = {this.props.isSyncing}
                    username = {this.props.username}
                    createDrop = {this.createDrop}
                    deleteDrop = {this.deleteDrop}
                    hashtags = {this.props.hashtags}
                    trySaveUnsavedDrops = {this.trySaveUnsavedDrops}
                />
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        droptext : state.droptext,
        drops: state.drops,
        hashtags : state.hashtags,
        selectedDrops : state.selectedDrops,
        isSyncing : state.isSyncing,
        unsavedDrops : state.unsavedDrops
    }
};
  
const mapDispatchToProps = {
    NEW_DROPTEXT, TRY_SAVE_UNSAVED_DROPS
}


export default connect(mapStateToProps, mapDispatchToProps)(DropBusinessLogicLayer);