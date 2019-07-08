import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import './App.scss';
import LocalStorageService from "./local-storage-service.js";
import DropBusinessLogicLayer from "./DropBusinessLogicLayer.jsx";
import HashtagHelper from "../helpers/HashtagHelper.js";
import StringHash from "../helpers/string-hash.js";

let processIncomingDropList = function (droplist) {
    let clonelist = droplist.slice();
    for (let drop of clonelist) {
        drop.key = `${Date.now()}:${StringHash.getHash(drop.text)}:${drop._id}:${drop.key}`;
        drop.hashtags = HashtagHelper.parse(drop.text);
    }
    return clonelist;
};

export default class BackendCommunicationLayer extends BaseComponent {
    constructor (props) {
        super(props);

        this.state = {
            isSyncing : true,
        }
        this.bindOwn([
            "updateDroptext",
            "trySaveUnsavedDrops",
            "trySaveUnsavedDrops",
            "mergeDropsIntoLocal",
            "persistDropToDatabase",
            "createDrop",
            "deleteDrop"
        ]);
    }

    componentDidMount () {
        this.refreshDropsFromServer(this.props.username)
    }

    updateDroptext (droptext) {
        this.props.updateDroptext(droptext);
    }

    trySaveUnsavedDrops () {
        let unsavedDrops = this.props.unsavedDrops.slice();
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
                try {
                    this.refreshDropsFromServer(this.props.username);
                    this.removeDropFromUnsaved(drop)
                }
                catch(e) {
                    debugger;
                }
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

    processIncomingDropList (droplist) {
        let clonelist = droplist.slice();
        for (let drop of clonelist) {
            drop.key = `${Date.now()}:${StringHash.getHash(drop.text)}:${drop._id}:${drop.key}`;
            drop.hashtags = HashtagHelper.parse(drop.text);
        }
        return clonelist;
    }

    refreshDropsFromServer (username) {
        this.setIsSyncing();
        let observable = this.props.DropBackendService.getUserDrops(username);
        observable.subscribe((response) => {
            switch (response.status) {
            case "SUCCESS":
                try{
                    let droplist = response.data.slice();
                    droplist = processIncomingDropList(droplist);
                    this.updateDrops(droplist);
                    this.mergeDropsIntoLocal(droplist);
                    this.setIsSynced();
                }
                catch(e) {
                    debugger;
                }   
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

    updateDrops = function(drops) {
        this.props.updateDrops(drops);
    }

    removeDropFromUnsaved (drop) {
        let unsavedDrops = this.props.unsavedDrops.slice();
        let index = unsavedDrops.indexOf(drop);
        if (index > -1){
            unsavedDrops.splice(index, 1);
            this.props.updateUnsavedDrops(unsavedDrops);
        }
    }
    
    postDropFailed (drop) {
        this.deleteLocalDrop(drop._id);
        this.props.pushNewStatusMessage(this.COPY.POST_DROP_FAILED);
        let unsavedDrops = this.props.unsavedDrops.slice();
        unsavedDrops.push(drop);
        this.props.updateUnsavedDrops(unsavedDrops);
    }

    deleteDropFailed (drop) {
        this.pushNewLocalDrop(drop);
        this.props.pushNewStatusMessage(this.COPY.DELETE_DROP_FAILED)
    }


    deleteDropFromServer (drop) {
        if (this.props.appConfirm(this.COPY.CONFIRM_DELETE_DROP)) {
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

    pushNewLocalDrop (drop) {
        let drops = this.props.drops.slice();
        drops.push(drop);
        this.updateDrops(drops);
    }

    deleteLocalDrop(drop) {
        let drops = this.props.drops.slice();
        let index = drops.indexOf(drop);
        if (index > -1) {
            drops.splice(drops.indexOf(drop), 1);
            this.setState({
                drops : drops
            });
        }
    }

    createDrop (drop) {
        this.persistDropToDatabase(drop);
        this.props.createDrop(drop);
    }

    deleteDrop(drop) {
        this.deleteDropFromServer(drop);
        if (this.props.deleteDrop) {
            this.props.deleteDrop(drop);
        }
    }

    refreshDrops() {
        return this.refreshDropsFromServer();
    }

    updateDrops(drops) {
        this.props.updateDrops(drops);
    }

    render () {
        this.runRenderValidation();
        return (
            <div data-testid="BackendCommunicationLayer">
                <DropBusinessLogicLayer
                    unsavedDrops = {this.props.unsavedDrops}
                    drops = {this.props.drops}
                    isSyncing = {this.props.isSyncing}
                    droptext = {this.props.droptext}
                    deleteDrop = {this.deleteDrop}
                    createDrop = {this.createDrop}
                    refreshDrops = {this.refreshDrops}
                    updateDrops = {this.updateDrops}
                    updateDroptext = {this.updateDroptext}
                    username = {this.props.username}
                    updateUnsavedDrops = {this.props.updateUnsavedDrops}
                    appAlert = {this.props.appAlert}
                />
            </div>
        );
    }
}