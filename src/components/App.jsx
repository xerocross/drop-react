import React, { Component } from "react";
import BaseComponent from "./BaseComponent.jsx";
import LoginLayer from "./LoginLayer.jsx";
import StatusBar from "./StatusBar";
import DropBackendService from "../helpers/DropBackendService.js";
import './App.scss';

export default class DropApp extends BaseComponent {
    constructor (props) {
        super(props);
        this.pushNewStatusMessage = this.pushNewStatusMessage.bind(this);
        this.setFatalError = this.setFatalError.bind(this);
        this.state = {
            statusMessages : [],
            fatalError : false,
            statusVisibilityDelay : 1500,
        }
    }
    setFatalError () {
        this.pushNewStatusMessage(this.COPY.FATAL_ERR, true);
        this.setState({
            fatalError : true
        });
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

    render () {
        return (
            <div className="App container">
                <StatusBar 
                    statusMessages = {this.state.statusMessages}
                />
                <LoginLayer 
                    pushNewStatusMessage = {this.pushNewStatusMessage}
                    DropBackendService = {DropBackendService}
                />
            </div>
        );
    }
}
