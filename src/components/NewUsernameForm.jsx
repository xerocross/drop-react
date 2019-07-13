import React from "react";
import BaseComponent from "./BaseComponent";

export default class NewUsernameForm extends BaseComponent {
    constructor () {
        super();
        this.state = {
            usernameInput : ""
        }
    }
    name = NewUsernameForm;
    handleUsernameChange (e) {
        this.setState({
            usernameInput : e.target.value
        });
    }
    componentDidMount () {
        if (this.props.username) {
            this.setState({
                usernameInput : this.props.username
            });
        }
    }
    render () {
        return (
            <div data-testid = "NewUsernameForm">
                <p className = "info">Your username and password are <span className = "highlight">one and the same</span>. Anybody who guesses your username can access your account.  If you choose a username that is already occupied, there will be no error message.  You will just be accessing the same account as someone else.</p>
                <div className="login-row">
                    <label htmlFor="username">Username/Password</label>
                    <input 
                        type="text" 
                        className = "form-control"
                        data-testid = "username-input"
                        name = "username"
                        value = {this.state.usernameInput}
                        onChange = {e => this.handleUsernameChange(e)}
                    />
                            
                </div>
                <div  className="login-row">
                    <button 
                        data-testid = "login-done-button"
                        className = "button" 
                        onClick={() => this.props.postNewUsername(this.state.usernameInput)}
                    >done</button>
                </div>
                        
            </div>
        )
    }

}