import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import MainDumbViewLayer from "./MainDumbViewLayer.jsx";
import DropNote from "../helpers/DropNote.js";
import {NEW_DROPTEXT, CREATE_NEW_DROP, INIT_DELETE_DROP, TRY_SAVING_FAILED_DROPS_AGAIN} from  "../actions.js";
import { connect } from "react-redux";
import COPY from "../configuration/messages-copy.js";

class DropBusinessLogicLayer extends BaseComponent {
    constructor (props) {
        super(props);
        this.bindOwn(["updateDroptext", "createDrop", "deleteDrop", "trySavingFailedDropsAgain"]);

    }

    updateDroptext (text) {
        this.props.NEW_DROPTEXT(text);
    }

    deleteDrop (drop) {
        if (this.props.appConfirm(this.COPY.CONFIRM_DELETE_DROP)) {
            this.props.INIT_DELETE_DROP();
            this.props.deleteDrop(drop);
        }
    }

    trySavingFailedDropsAgain () {
        this.props.appAlert(COPY.TRY_SAVE_NOT_IMPLEMENTED);
        this.props.TRY_SAVING_FAILED_DROPS_AGAIN();
        this.props.trySavingFailedDropsAgain();
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
            this.props.CREATE_NEW_DROP(drop);
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
                    trySavingFailedDropsAgain = {this.trySavingFailedDropsAgain}
                    dropsFailedToSave = {this.props.dropsFailedToSave}
                    isTryingSaveAgain = {this.props.isTryingSaveAgain}
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
        unsavedDrops : state.unsavedDrops,
        dropsFailedToSave : state.dropsFailedToSave,
        isTryingSaveAgain : state.isTryingSaveAgain
    }
};
  
const mapDispatchToProps = {
    NEW_DROPTEXT, CREATE_NEW_DROP, INIT_DELETE_DROP, TRY_SAVING_FAILED_DROPS_AGAIN
}


export default connect(mapStateToProps, mapDispatchToProps)(DropBusinessLogicLayer);