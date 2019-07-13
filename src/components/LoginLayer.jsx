import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import LoginBar from "./LoginBar";
import BackendCommunicationLayer from "./BackendCommunicationLayer";
import { connect } from "react-redux";
import { POST_USERNAME_SET, UNSET_USERNAME} from  "../actions.js";

class LoginLayer extends BaseComponent {
    constructor (props) {
        super(props);
        this.tryToGetUsernameFromStorage = this.tryToGetUsernameFromStorage.bind(this);
        this.unsetUsername = this.unsetUsername.bind(this);
        this.postNewUsername = this.postNewUsername.bind(this);
    }

    componentDidMount () {
        this.tryToGetUsernameFromStorage();
    }

    tryToGetUsernameFromStorage () {
        let username = this.props.LoginHelper.tryToGetUsernameFromStorage();
        if (username) {
            this.postNewUsername(username);
        }
    }

    unsetUsername () {
        this.props.UNSET_USERNAME();
    }

    postNewUsername (newUsername) {
        this.props.POST_USERNAME_SET(newUsername);
        this.props.LoginHelper.setLocalUsername(newUsername);
    }

    render () {
        this.runRenderValidation();
        return (
            <div data-testid = "LoginLayer">
                <LoginBar 
                    username = {this.props.username}
                    isUsernameSet = {this.props.isUsernameSet}
                    unsetUsername = {this.unsetUsername}
                    postNewUsername = {this.postNewUsername}
                />

                {this.props.isUsernameSet &&
                    <BackendCommunicationLayer 
                        username = {this.props.username}
                        pushNewStatusMessage = {this.props.pushNewStatusMessage}
                        DropBackendService = {this.props.DropBackendService}
                        setFatalError = {this.props.setFatalError}
                        appAlert = {this.props.appAlert}
                        appConfirm = {this.props.appConfirm}
                    />
                }

            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    username : state.username,
    isUsernameSet : state.isUsernameSet
});
  
const mapDispatchToProps = {
    POST_USERNAME_SET, UNSET_USERNAME
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginLayer);