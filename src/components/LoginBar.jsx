import React, { Component } from "react";
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
                {this.props.isUsernameSet &&
                    <div className = "login-row">
                        <button 
                            className = "button" 
                            onClick={this.props.unsetUsername}
                            data-testid = "logout-button"
                        >logout/change user</button>
                    </div>
                }
            </div>
        )
    }
}