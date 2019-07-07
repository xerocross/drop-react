import React, { Component } from "react";
import BaseComponent from "./BaseComponent.jsx";
import './App.scss';
import HashtagHelpers from "../helpers/HashtagHelper.js";
import LocalStorageService from "./local-storage-service.js";
import MainDumbViewLayer from "./MainDumbViewLayer.jsx";
import StringHash from "../helpers/string-hash";
import DropNote from "../helpers/DropNote.js";

export default class DropMain extends BaseComponent {
    constructor (props) {
        super(props);
        this.dropDrop = this.dropDrop.bind(this);
        this.deleteDrop = this.deleteDrop.bind(this);
        this.pushNewLocalDrop = this.pushNewLocalDrop.bind(this);
        this.postDropFailed = this.postDropFailed.bind(this);
        this.deleteDropFailed = this.deleteDropFailed.bind(this);
        this.deleteLocalDrop = this.deleteLocalDrop.bind(this);
        this.trySaveUnsavedDrops = this.trySaveUnsavedDrops.bind(this);
        this.removeDropFromUnsaved = this.removeDropFromUnsaved.bind(this);
        this.setIsSynced = this.setIsSynced.bind(this);
        this.setIsSyncing = this.setIsSyncing.bind(this);
        this.mergeDropsIntoLocal = this.mergeDropsIntoLocal.bind(this);
        this.refreshDropsFromServer = this.refreshDropsFromServer.bind(this);
        this.persistDropToDatabase = this.persistDropToDatabase.bind(this);
        this.createDrop = this.createDrop.bind(this);
        this.processIncomingDropList = this.processIncomingDropList.bind(this);
        
        this.state = {
            unsavedDrops : [],
            drops : [],
            isSyncing : true,
        }
    }
    processIncomingDropList (droplist) {
        let clonelist = droplist.slice();
        for (let drop of clonelist) {
            drop.key = `${Date.now()}:${StringHash.getHash(drop.text)}:${drop._id}:${drop.key}`;
            drop.hashtags = HashtagHelpers.parse(drop.text);
        }
        return clonelist;
    }

    componentDidMount () {
        this.refreshDropsFromServer(this.props.username)
    }

    trySaveUnsavedDrops () {
        let unsavedDrops = this.state.unsavedDrops.slice();
        for (let drop of unsavedDrops) {
            this.persistNewDrop(drop)
        }
    }

    mergeDropsIntoLocal(dropList) {
        for (let drop of dropList) {
            LocalStorageService.saveDrop(drop);
        }
    }
    
    setIsSynced () {
        this.setState({
            isSyncing: false
        });
        this.props.pushNewStatusMessage(this.COPY.IS_SYNCED_MESSAGE);
    }
    setIsSyncing () {
        this.setState({
            isSyncing: true
        });
        this.props.pushNewStatusMessage(this.COPY.IS_SYNCING_MESSAGE);
    }
    
    persistDropToDatabase (drop) {
        this.props.pushNewStatusMessage(this.COPY.SENDING_DROP);
        let observable = this.props.DropBackendService.saveNewDrop(drop);
        observable.subscribe((response) => {
            switch (response.status) {
            case "SUCCESS":
                this.refreshDropsFromServer(this.props.username);
                this.removeDropFromUnsaved(drop)
                break;
            case "FAILED_ATTEMPT":
                this.props.pushNewStatusMessage(this.COPY.SERVER_RESPONSE_ERROR);
                break;
            case "FAIL":
                this.postDropFailed(drop);
                this.props.setFatalError();
                break;
            default:
                break;
            }
        });
    }

    refreshDropsFromServer (username) {
        this.setIsSyncing();
        let observable = this.props.DropBackendService.getUserDrops(username);
        observable.subscribe((response) => {
            switch (response.status) {
            case "SUCCESS":
                let droplist = response.data.slice();
                droplist = this.processIncomingDropList(droplist);
                this.setState({
                    drops :droplist,
                });
                this.mergeDropsIntoLocal(droplist);
                this.setIsSynced();
                break;
            case "FAILED_ATTEMPT":
                debugger;
                this.props.pushNewStatusMessage(this.COPY.SERVER_RESPONSE_ERROR);
                break;
            case "FAIL":
                this.props.setFatalError();
                break;
            default:
                break;
            }
        });
    }

    removeDropFromUnsaved (drop) {
        let unsavedDrops = this.state.unsavedDrops.slice();
        let index = unsavedDrops.indexOf(drop);
        if (index > -1){
            unsavedDrops.splice(index, 1);
            this.setState({
                unsavedDrops : unsavedDrops
            });
        }
    }
    

    postDropFailed (drop) {
        this.deleteLocalDrop(drop._id);
        this.props.pushNewStatusMessage(this.COPY.POST_DROP_FAILED);
        let unsavedDrops = this.state.unsavedDrops.slice();
        unsavedDrops.push(drop);
        this.setState({
            unsavedDrops : unsavedDrops
        });
    }

    deleteDropFailed (drop) {
        this.pushNewLocalDrop(drop);
        this.props.pushNewStatusMessage(this.COPY.DELETE_DROP_FAILED)
    }


    deleteDrop (drop) {
        if (window.confirm(this.COPY.CONFIRM_DELETE_DROP)) {
            this.deleteLocalDrop(drop)
            this.props.pushNewStatusMessage(this.COPY.DELETE_DROP_STATUS);
            let observable = this.props.DropBackendService.deleteDrop(drop._id);
            observable.subscribe((response) => {
                switch (response.status) {
                case "SUCCESS":
                    this.refreshDropsFromServer(this.props.username);
                    break;
                case "FAILED_ATTEMPT":
                    this.props.pushNewStatusMessage(this.COPY.SERVER_RESPONSE_ERROR);
                    break;
                case "FAIL":
                    this.deleteDropFailed(drop);
                    this.props.setFatalError();
                    break;
                default:
                    break;
                }
            });
        }
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

    get hashTags () {
        return HashtagHelpers.parse(this.state.droptext);
    }


    pushNewLocalDrop (drop) {
        let drops = this.state.drops.slice();
        drops.push(drop);
        this.setState({
            drops : drops
        });
    }

    deleteLocalDrop(drop) {
        let drops = this.state.drops.slice();
        let index = drops.indexOf(drop);
        if (index > -1) {
            drops.splice(drops.indexOf(drop), 1);
            this.setState({
                drops : drops
            });
        }
    }

    dropDrop () {
        throw new Error("dropDrop was called");
    }

    
    createDrop (text) {
        if (!text) {
            alert("Please add text to drop.");
            return false;
        } else if (!this.props.username) {
            // this should never occur
            alert("Please select a username-password.");
            return false;
        } else {
            let drop = new DropNote(text, this.props.username);
            this.pushNewLocalDrop(drop);
            this.persistDropToDatabase(drop);
            return true;
        }
    }

    render () {
        return (
            <div className="drop-main">
                <MainDumbViewLayer 
                    unsavedDrops = {this.state.unsavedDrops}
                    getSelectedDrops = {this.getSelectedDrops}
                    drops = {this.state.drops}
                    isSyncing = {this.state.isSyncing}
                    username = {this.props.username}
                    pushNewStatusMessage = {this.props.pushNewStatusMessage}
                    createDrop = {this.createDrop}
                    deleteDrop = {this.deleteDrop}
                />
            </div>
        );
    }
}