import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import LoginLayer from "./LoginLayer.jsx";
import StatusBar from "./StatusBar";
import DropBackendService from "../helpers/DropBackendService.js";
import LoginHelper from "../helpers/LoginHelper.js";
import { connect } from "react-redux";
import {} from  "../actions.js";

class StatusUpdateLayer extends BaseComponent {
    constructor (props) {
        super(props);
        this.bindOwn([
            "setFatalError",
            "updateDroptext",
            "pushNewStatusMessage",
            "createDrop",
            "updateUnsavedDrops",
            "updateUsername",
            "updateIsUsernameSet"
        ]);

        this.state = {
            statusMessages : [],
            fatalError : false,
            statusVisibilityDelay : 1500,
            unsavedDrops : [],
            username : "",
            isUsernameSet : false
        }
    }
    setFatalError () {
        this.pushNewStatusMessage(this.COPY.FATAL_ERR, true);
        this.setState({
            fatalError : true
        });
    }

    updateIsUsernameSet (val) {
        this.setState({
            isUsernameSet : val
        })
    };

    updateDroptext (droptext) {
        this.props.NEW_DROPTEXT(droptext);
    }

    appAlert (message) {
        window.alert(message);
    }

    appConfirm (message) {
        return window.confirm(message);
    }

    updateUnsavedDrops (unsavedDrops) {
        this.setState({
            unsavedDrops : unsavedDrops
        });
    }

    createDrop () {
        // do nothing
    }
        
    setIsSynced () {
        this.setState({
            isSyncing: false
        });
        this.props.pushNewStatusMessage(this.COPY.IS_SYNCED_MESSAGE);
    }

    updateUsername (username) {
        this.setState({
            username : username
        });
    }

    setIsSyncing () {
        this.setState({
            isSyncing: true
        });
        this.props.pushNewStatusMessage(this.COPY.IS_SYNCING_MESSAGE);
    }

    pushNewStatusMessage (statusText, noExpire) {
        let key = Date.now();
        let statusObject = {
            text : statusText,
            key : key
        };
        let statusMessages = this.state.statusMessages.slice();
        statusMessages.push(statusObject);
        this.setState({
            statusMessages : statusMessages
        });
        if (noExpire !== true) {
            setTimeout(() => {
                let statusMessages = this.state.statusMessages.slice();
                let statusObjectIndex = statusMessages.indexOf(statusObject);
                statusMessages.splice(statusObjectIndex, 1);
                this.setState({
                    statusMessages: statusMessages
                });
            },this.state.statusVisibilityDelay);
        }
    }

    render () {
        return (
            <div className="TopLayer">
                <StatusBar 
                    statusMessages = {this.state.statusMessages}
                />
                <LoginLayer 
                    pushNewStatusMessage = {this.pushNewStatusMessage}
                    DropBackendService = {DropBackendService}
                    updateDrops = {this.updateDrops}
                    drops = {this.props.drops}
                    droptext = {this.props.droptext}
                    unsavedDrops = {this.state.unsavedDrops}
                    updateDroptext = {this.updateDroptext}
                    createDrop = {this.createDrop}
                    updateUnsavedDrops = {this.updateUnsavedDrops}
                    setFatalError = {this.setFatalError}
                    appAlert = {this.appAlert}
                    appConfirm = {this.appConfirm}
                    updateUsername = {this.updateUsername}
                    username = {this.state.username}
                    updateIsUsernameSet = {this.updateIsUsernameSet}
                    isUsernameSet = {this.state.isUsernameSet}
                    LoginHelper = {LoginHelper}
                />
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
})
  
const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(StatusUpdateLayer);