import React from "react";
import BaseComponent from "./BaseComponent";
import NewUsernameForm from "./NewUsernameForm.jsx";
import "./LoginBar.scss";

export default class LoginBar extends BaseComponent {
    render () {
        return (
            <div className = "login-bar" data-testid="LoginBar">
                {!this.props.isUsernameSet && 
                    <NewUsernameForm 
                        postNewUsername = {this.props.postNewUsername}
                        username = {this.props.username}
                    />
                }
            </div>
        )
    }
}