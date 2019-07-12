import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import LoginBar from "./LoginBar";
import BackendCommunicationLayer from "./BackendCommunicationLayer";
import { connect } from "react-redux";

class LoginLayer extends BaseComponent {
    constructor (props) {
        super(props);
        this.updateUsername = this.updateUsername.bind(this);
        this.tryToGetUsernameFromStorage = this.tryToGetUsernameFromStorage.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.postNewUsername = this.postNewUsername.bind(this);
    }

    componentDidMount () {
        this.tryToGetUsernameFromStorage();
    }

    updateUsername (newValue) {
        this.props.updateUsername(newValue);
    }

    tryToGetUsernameFromStorage () {
        let username = this.props.LoginHelper.tryToGetUsernameFromStorage();
        if (username) {
            this.updateUsername(username);
            this.props.updateIsUsernameSet(true);
        }
    }

    changeUser () {
        this.props.updateIsUsernameSet(false);
    }

    postNewUsername () {
        this.props.LoginHelper.setLocalUsername(this.props.username);
        this.props.updateIsUsernameSet(true);
    }

    render () {
        this.runRenderValidation();
        return (
            <div data-testid = "LoginLayer">
                <LoginBar 
                    username = {this.props.username}
                    updateUsername = {this.updateUsername}
                    isUsernameSet = {this.props.isUsernameSet}
                    changeUser = {this.changeUser}
                    postNewUsername = {this.postNewUsername}
                />

                {this.props.isUsernameSet &&
                    <BackendCommunicationLayer 
                        username = {this.props.username}
                        pushNewStatusMessage = {this.props.pushNewStatusMessage}
                        changeUser = {this.changeUser}
                        DropBackendService = {this.props.DropBackendService}
                        setFatalError = {this.props.setFatalError}
                        droptext = {this.props.droptext}
                        isSyncing = {this.props.isSyncing}
                        unsavedDrops = {this.props.unsavedDrops}
                        updateDroptext = {this.props.updateDroptext}
                        createDrop = {this.props.createDrop}
                        updateUnsavedDrops = {this.props.updateUnsavedDrops}
                        appAlert = {this.props.appAlert}
                        appConfirm = {this.props.appConfirm}
                    />
                }

            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
});
  
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginLayer);