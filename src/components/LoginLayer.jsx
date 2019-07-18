import React from "react";
import BaseComponent from "./BaseComponent.jsx";
import LoginBar from "./LoginBar";
import BackendCommunicationLayer from "./BackendCommunicationLayer";
import { connect } from "react-redux";
import { LOGIN } from  "../actions.js";

class LoginLayer extends BaseComponent {
    constructor (props) {
        super(props);
        this.tryToGetUsernameFromStorage = this.tryToGetUsernameFromStorage.bind(this);
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
    postNewUsername (newUsername) {
        this.props.LOGIN(newUsername);
    }
    render () {
        this.runRenderValidation();
        return (
            <div data-testid = "LoginLayer">
                <LoginBar 
                    username = {this.props.username}
                    isUsernameSet = {this.props.isUsernameSet}
                    postNewUsername = {this.postNewUsername}
                />
                {this.props.isUsernameSet &&
                    <div data-testid = "IsLoggedInStuff">
                        <BackendCommunicationLayer 
                            username = {this.props.username}
                            pushNewStatusMessage = {this.props.pushNewStatusMessage}
                            DropBackendService = {this.props.DropBackendService}
                            setFatalError = {this.props.setFatalError}
                            appAlert = {this.props.appAlert}
                            appConfirm = {this.props.appConfirm}
                        />
                    </div>
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
    LOGIN
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginLayer);