import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import HashtagHelpers from "../helpers/HashtagHelper.js";
import MainDumbViewLayer from "./MainDumbViewLayer.jsx";
import DropNote from "../helpers/DropNote.js";

export default class DropBusinessLogicLayer extends BaseComponent {
    constructor (props) {
        super(props);
        this.bindOwn(["updateDroptext", "createDrop", "deleteDrop"]);
        this.bindOwn(["getSelectedDrops"]);
    }

    get hashtags () {
        return HashtagHelpers.parse(this.props.droptext);
    }

    updateDroptext (droptext) {
        this.props.updateDroptext(droptext);
    }

    deleteDrop (drop) {
        this.props.deleteDrop(drop);
    }

    getSelectedDrops (droplist, hashtags) {
        let selectedDrops = droplist.slice();
        let test = (hashtags, tag) => {
            return (hashtags.indexOf(tag) > -1);
        }
        for (let tag of hashtags) {
            selectedDrops = selectedDrops.filter((drop) => (test(HashtagHelpers.parse(drop.text), tag)));
        }
        return selectedDrops;
    }
    get selectedDrops () {
        return this.getSelectedDrops(this.props.drops, this.hashtags);
    }

    createDrop (text) {
        if (!text) {
            this.props.appAlert("Please add text to drop.");
            return false;
        } else if (!this.props.username) {
            this.log("create drop was called without username set; this should not occur;");
            alert("Please select a username-password.");
            return false;
        } else {
            let drop = new DropNote(text, this.props.username);
            this.props.createDrop(drop);
            return true;
        }
    }

    render () {
        this.runRenderValidation();
        return (
            <div className="drop-main">
                <MainDumbViewLayer 
                    unsavedDrops = {this.props.unsavedDrops}
                    droptext = {this.props.droptext}
                    updateDroptext = {this.updateDroptext}
                    selectedDrops = {this.selectedDrops}
                    drops = {this.props.drops}
                    isSyncing = {this.props.isSyncing}
                    username = {this.props.username}
                    createDrop = {this.createDrop}
                    deleteDrop = {this.deleteDrop}
                    hashtags = {this.hashtags}
                />
            </div>
        );
    }
}