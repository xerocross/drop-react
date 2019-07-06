import React, { Component } from "react";
import './App.scss';
// import DropAddText from "./DropAddText";
// import DropSearch from "./DropSearch";
import LoginBar from "./LoginBar";
// import Debounce from "lodash.debounce";
import WorkingBar from "./WorkingBar";
import DropBackendService from "./drop-backend-service";
import LocalStorageUsername from "./local-storage-username";
import COPY from "./messages-copy.js";
import StringHash from "./string-hash";
import LocalStorageService from "./local-storage-service.js";
import DropMain from "./DropMain.jsx";

export default class DropApp extends Component {
    constructor (props) {
        super(props);

        this.updateUsername = this.updateUsername.bind(this);
        this.tryToGetUsernameFromStorage = this.tryToGetUsernameFromStorage.bind(this);
        this.setLocalUsername = this.setLocalUsername.bind(this);
        this.pushNewStatusMessage = this.pushNewStatusMessage.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.postNewUsername = this.postNewUsername.bind(this);
        this.setFatalError = this.setFatalError.bind(this);
    

        this.state = {
            username : "",
            serverStatus: "",
            statusMessages : [],
            isUsernameSet : false,
            fatalError : false,
            statusVisibilityDelay : 1500,
        }
    }
    componentDidMount () {
        this.tryToGetUsernameFromStorage();
    }

    updateUsername (newValue) {
        this.setState({
            username: newValue,
        });
    }


    tryToGetUsernameFromStorage () {
        let localUsername = LocalStorageUsername.getUsername();
        if (localUsername) {
            this.updateUsername(localUsername);
            this.setState({
                isUsernameSet: true
            });
        }
    }

    setLocalUsername (username) {
        LocalStorageUsername.setUsername(username);
    }

    pushNewStatusMessage (statusText, noExpire) {
        let key = StringHash.getHash(Date.now() + statusText);
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
            setTimeout(()=>{
                let statusMessages = this.state.statusMessages.slice();
                let statusObjectIndex = statusMessages.indexOf(statusObject);
                statusMessages.splice(statusObjectIndex, 1);
                this.setState({
                    statusMessages: statusMessages
                });
            },this.state.statusVisibilityDelay);
        }
    }

    setFatalError () {
        this.pushNewStatusMessage(COPY.FATAL_ERR, true);
        this.setState({
            fatalError : true
        });
    }

    changeUser () {
        this.setState({
            isUsernameSet: false
        });
    }


    postNewUsername () {
        this.setLocalUsername(this.state.username);
        this.setState({
            isUsernameSet: true
        });
    }


    render () {
        return (
            <div className="App container">
                <WorkingBar 
                    statusMessages = {this.state.statusMessages}
                />

                <LoginBar 
                    username = {this.state.username}
                    updateUsername = {this.updateUsername}
                    isUsernameSet = {this.state.isUsernameSet}
                    changeUser = {this.changeUser}
                    postNewUsername = {this.postNewUsername}
                />

                {this.state.isUsernameSet &&
                <DropMain
                    username = {this.state.username}
                    pushNewStatusMessage = {this.pushNewStatusMessage}
                    changeUser = {this.changeUser}
                    drops = {this.state.drops}
                    DropBackendService = {DropBackendService}
                    setFatalError = {this.setFatalError}
                />
                }

            </div>
        );
    }
}
