import React, { Component } from "react";
import BaseComponent from "./BaseComponent";
import "./LoginBar.scss";

export default class LoginBar extends BaseComponent {
    constructor () {
        super();
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleUsernameChange (e) {
        this.props.updateUsername(e.target.value);
    }

    render () {
        return (
            <div className = "login-bar" data-testid="LoginBar">
                {!this.props.isUsernameSet && 
                    <div>
                        <p className = "info">Your username and password are <span className = "highlight">one and the same</span>. Anybody who guesses your username can access your account.  If you choose a username that is already occupied, there will be no error message.  You will just be accessing the same account as someone else.</p>
                        <div className="login-row">
                            <label htmlFor="username">Username/Password</label>
                            <input 
                                type="text" 
                                className = "form-control"
                                data-testid = "username-input"
                                name = "username"
                                value = {this.props.username}
                                onChange = {e => this.handleUsernameChange(e)}
                            />
                            
                        </div>
                        <div  className="login-row">
                            <button 
                                data-testid = "login-done-button"
                                className = "button" 
                                onClick={this.props.postNewUsername}
                            >done</button>
                        </div>
                        
                    </div>
                }
                {this.props.isUsernameSet &&
                    <div className = "login-row">
                        <button 
                            className = "button" 
                            onClick={this.props.changeUser}
                            data-testid = "logout-button"
                        >logout/change user</button>
                    </div>
                }
            </div>
        )
    }
}