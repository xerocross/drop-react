import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import LoginBar from "./LoginBar";
import DropMain from "./DropMain.jsx";
import LoginHelper from "../helpers/LoginHelper.js";

export default class LoginLayer extends BaseComponent {
    constructor (props) {
        super(props);
        this.updateUsername = this.updateUsername.bind(this);
        this.tryToGetUsernameFromStorage = this.tryToGetUsernameFromStorage.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.postNewUsername = this.postNewUsername.bind(this);
       
        this.state = {
            username : "",
            isUsernameSet : false,
            
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
        let username = LoginHelper.tryToGetUsernameFromStorage();
        if (username) {
            this.updateUsername(username);
            this.setState({
                isUsernameSet: true
            });
        }
    }

    changeUser () {
        this.setState({
            isUsernameSet: false
        });
    }

    postNewUsername () {
        LoginHelper.setLocalUsername(this.state.username);
        this.setState({
            isUsernameSet: true
        });
    }

    render () {
        return (
            <div className="App container">
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
                    pushNewStatusMessage = {this.props.pushNewStatusMessage}
                    changeUser = {this.changeUser}
                    drops = {this.state.drops}
                    DropBackendService = {this.props.DropBackendService}
                    setFatalError = {this.setFatalError}
                />
                }

            </div>
        );
    }
}